package com.tehang.resource.int.hotel.thirdparty.dida.sync

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.models._
import dida.DidaSyncJsonProtocol._
import dida.util._

import slick.lifted
import slick.jdbc.PostgresProfile.api._

import org.postgresql.util.PSQLException

import scala.concurrent.{ Future, ExecutionContextExecutor }
import scala.concurrent.duration._
import scala.util.{ Failure, Success }
import scala.collection.immutable.Stream

import akka.{ Done, NotUsed }
import akka.util.ByteString
import akka.actor.ActorSystem
import akka.event.{ Logging, LogSource, LoggingAdapter }
import akka.stream.{
  Supervision,
  Materializer,
  Attributes,
  ActorMaterializer,
  ActorMaterializerSettings,
}
import akka.stream.scaladsl._
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import HttpMethods._

import spray.json._
import com.github.tototoshi.csv._

import java.time.LocalDateTime

object SyncStaticInformation {

  def decodeLines =
    Framing.delimiter(ByteString("\n"), Int.MaxValue)
      .map(_.utf8String)

  def parseCsvtoJsValue =
    Flow[String]
      .map(CSVParserQuoteNone.parse(_, '|'))
      .prefixAndTail(1).flatMapConcat { case (headVector, tail) =>
        val Some(head) = headVector(0)
        tail.map {
          case Some(row) =>
            head.zip(row).toMap.toJson
          case None =>
            throw new Exception(ExceptionMsg.parsingFail(CSVParserQuoteNone))
        }
      }

  /**
    * The CSV parser only returns String.
    * We normalize it to required value here for JsValue.
    */

  def normalizeJsStringToJsNumber
    (jsonFieldName: String)
    (f: String => JsNumber)
    (value: JsValue)
      : JsValue = {
    value match {
      case JsObject(fields) =>
        fields.get(jsonFieldName) match {
          case Some(JsString(str)) if str.isEmpty =>
            JsObject(fields + (jsonFieldName -> JsNull))
          case Some(JsString(str)) =>
            JsObject(fields + (jsonFieldName -> f(str)))
          case _ =>
            JsObject(fields)
        }
      case _ => value
    }
  }

  val InsertionGroupSize: Int = 1000
  val InsertionTimeWindow: FiniteDuration = 1.seconds
  val InsertionParallelism: Int = 25

  def insertToTable[E, T <: Table[E]]
    (db: Database, table: lifted.TableQuery[T])
    (implicit
      executionContext: ExecutionContextExecutor,
      log: LoggingAdapter) =
    Flow[E]
      .groupedWithin(InsertionGroupSize, InsertionTimeWindow)
      .mapAsyncUnordered(InsertionParallelism) { case rows =>
        db.run(table ++= rows) recover {
          case error: PSQLException =>
            log.error(LogMsg.error(error.getSQLState))
          case error =>
            log.error(LogMsg.failToUpdateRows(rows, error))
        }
      }

  def insertionLog(assetName: String) =
    Flow[Any]
      .zip(Source(Stream.from(1)))
      .log(name = "insertion", { case (inserted, tick) =>
        LogMsg.inserting(assetName, inserted, tick = Some(tick)) })
      .addAttributes(
        Attributes.logLevels(
          onElement = Attributes.LogLevels.Info,
          onFailure = Attributes.LogLevels.Error,
          onFinish = Attributes.LogLevels.Info))

  def downloadStaticInformation[E, T <: Table[E]]
    (staticType: String)
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      executionContext: ExecutionContextExecutor,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      log: LoggingAdapter): Future[os.Path] = {

    val req = reqGen(ApiName.GetStaticInformation, Map(
      JsonField.IsGetUrlOnly -> JsTrue,
      JsonField.StaticType -> JsString(staticType)))

    for {
      JsObject(fields) <- simpleRequest(req)
      url= fields.get(JsonField.Url) match {
        case Some(JsString(url)) =>
          url
        case _ =>
          throw new Exception(ExceptionMsg.noJsonField(JsonField.Url))
      }
      path <- Future {
        import java.text.SimpleDateFormat
        import java.util.{ Date, Calendar }

        val DateFormat = "yyyy-MM-dd"
        val dateFormat = new SimpleDateFormat(DateFormat)
        val calendar = Calendar.getInstance()

        val dateString = dateFormat.format(calendar.getTime())

        val dataDir = os.pwd / "data" / dateString
        val fileName = s"${staticType}.csv"
        val path = dataDir / fileName

        os.makeDir.all(dataDir)

        log.info(LogMsg.willRequest(staticType, url))
        log.info(LogMsg.willSaveTo(staticType, path.toString))

        os.proc("curl",
          "--retry", "10",
          "-o", fileName,
          "-C", "-", url)
          .call(cwd = dataDir)

        path
      }
    } yield {
      log.info(LogMsg.successfullySavedTo(staticType, path.toString))
      path
    }
  }

  def updateStaticInformation[E, T <: Table[E]]
    (path: os.Path,
      table: lifted.TableQuery[T],
      convertFromJsValue: JsValue => E)
    (implicit
      system: ActorSystem,
      executionContext: ExecutionContextExecutor,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database,
      log: LoggingAdapter): Future[Done] = {

    val decider: Supervision.Decider = {
      case _: java.sql.BatchUpdateException => Supervision.Resume
      case _ => Supervision.Stop
    }

    implicit val materializer =
      ActorMaterializer(
        ActorMaterializerSettings(system)
          .withSupervisionStrategy(decider))

    for {
      _ <- db.run(recreateTable(table))
      done <- FileIO.fromPath(java.nio.file.Paths.get(path.toString))
      .via(decodeLines)
      .via(parseCsvtoJsValue)
      .map(normalizeJsStringToJsNumber(JsonField.HotelID){ str => JsNumber(str.toLong) })
      .map(normalizeJsStringToJsNumber(JsonField.RoomTypeID){ str => JsNumber(str.toLong) })
      .map(normalizeJsStringToJsNumber(JsonField.ImageOrder){ str => JsNumber(str.toInt) })
      .map(normalizeJsStringToJsNumber(JsonField.StarRating){ str => JsNumber(str.toDouble) })
      .map(convertFromJsValue)
      .via(insertToTable(db, table))
      .via(insertionLog(path.toString))
      .runWith(Sink.ignore)
    } yield done
  }

  def run()
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      executionContext: ExecutionContextExecutor,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database): Future[Done] = {

    implicit val logSource = new LogSource[AnyRef] {
      def genString(o: AnyRef) = o.getClass.getName
    }
    implicit val log = Logging(system, this)

    def getStaticInformation[E, T <: Table[E]]
      (staticType: String,
        table: lifted.TableQuery[T],
        convertFromJsValue: JsValue => E): Future[Done] = {
      downloadStaticInformation(staticType)
        .flatMap(path => updateStaticInformation(path, table, convertFromJsValue))
    }

    for {
      _ <- getStaticInformation(
        StaticInformationName.HotelSummary,
        TableQuery[HotelSummaryTable],
        _.convertTo[HotelSummary])

      _ <- Future.sequence(List(
        getStaticInformation(
          StaticInformationName.Policy,
          TableQuery[PolicyTable],
          _.convertTo[Policy]),

        getStaticInformation(
          StaticInformationName.Facilities,
          TableQuery[FacilityTable],
          _.convertTo[Facility]),

        getStaticInformation(
          StaticInformationName.HotelImage,
          TableQuery[HotelImageTable],
          _.convertTo[HotelImage]),

        getStaticInformation(
          StaticInformationName.HotelDescription,
          TableQuery[HotelDescriptionTable],
          _.convertTo[HotelDescription])))

      _ <- getStaticInformation(
        StaticInformationName.RoomType,
        TableQuery[RoomTypeTable],
        _.convertTo[RoomType])

      _ <- getStaticInformation(
        StaticInformationName.RoomImage,
        TableQuery[RoomImageTable],
        _.convertTo[RoomImage])

    }
    yield Done
  }
}
