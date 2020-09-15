package com.tehang.resource.int.hotel.thirdparty.dida.sync

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.models._
import dida.DidaSyncJsonProtocol._
import dida.util._

import slick.lifted
import slick.jdbc.PostgresProfile.api._
import slick.model.ForeignKeyAction

import scala.concurrent.{ Future, Await, ExecutionContextExecutor }
import scala.concurrent.duration._
import scala.util.{ Failure, Success }

import akka.{ Done, NotUsed }
import akka.util.ByteString
import akka.actor.ActorSystem
import akka.event.{ Logging, LogSource, LoggingAdapter }
import akka.stream.Materializer
import akka.stream.scaladsl._
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._

import spray.json._

import java.time.LocalDateTime

object SyncCityList {

  def getCityList
    (code: String)
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database,
      executionContext: ExecutionContextExecutor,
      log: LoggingAdapter)
      : Future[Done] = {

    val req = reqGen(ApiName.GetCityList, Map(
      JsonField.IncludeSubCity -> JsTrue,
      JsonField.CountryCode -> JsString(code)))

    for {
      value <- simpleRequest(req)
      inserted <- matchSuccessList(value, JsonField.Cities) match {
        case Some(vector) =>
          db.run(TableQuery[CityTable] ++= vector.map(_.convertTo[City]))
        case None =>
          log.warning(LogMsg.noJsonFieldForAsset(JsonField.Cities, code))
          Future { None }
      }
    } yield {
      log.info(LogMsg.inserting(code, inserted))
      Done
    }
  }

  def getCountryList()
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database,
      executionContext: ExecutionContextExecutor,
      log: LoggingAdapter): Future[Done] = {
    SyncSimpleList.getSimpleList(
      ApiName.GetCountryList,
      JsonField.Countries,
      TableQuery[CountryTable],
      _.convertTo[Country])
  }

  def getCodes()
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database,
      executionContext: ExecutionContextExecutor,
      log: LoggingAdapter): Future[Seq[String]] = {
    db.run(
      recreateTable(TableQuery[CityTable]) >>
        TableQuery[CountryTable].map(_.countryCode).result)
  }

  def getAllCityList(codes: List[String])
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database,
      executionContext: ExecutionContextExecutor,
      log: LoggingAdapter): Future[Done] = {

    /** we need to block here because of FK dependencies  */
    val GetCityListTImeout = 60.minutes

    Await.ready(Future.sequence(codes.map(getCityList)), GetCityListTImeout)
      .map(_ => Done)
  }

  def run()
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database,
      executionContext: ExecutionContextExecutor): Future[Done] = {

    implicit val logSource = new LogSource[AnyRef] {
      def genString(o: AnyRef) = o.getClass.getName
    }
    implicit val log = Logging(system, this)

    for {
      _ <- getCountryList()
      codes <- getCodes()
      _ = {
        assert(codes.length > 0)
        log.info(LogMsg.willProcess("country codes", codes))
      }
      _ <- getAllCityList(codes.toList)
    } yield Done
  }
}
