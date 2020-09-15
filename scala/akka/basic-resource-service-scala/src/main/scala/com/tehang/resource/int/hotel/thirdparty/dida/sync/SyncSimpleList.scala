package com.tehang.resource.int.hotel.thirdparty.dida.sync

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.models._
import dida.DidaSyncJsonProtocol._
import dida.util._

import slick.lifted
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ Future, ExecutionContextExecutor }
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

object SyncSimpleList {

  def getSimpleList[E, T <: Table[E]]
    (requestName: String,
      fieldName: String,
      table: lifted.TableQuery[T],
      convertFromJsValue: JsValue => E)
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      reqGen: (String, Map[String, JsValue]) => HttpRequest,
      db: Database,
      executionContext: ExecutionContextExecutor,
      log: LoggingAdapter)
      : Future[Done] = {

    for {
      value <- simpleRequest(reqGen(requestName, Map()))
      inserted <- matchSuccessList(value, fieldName) match {
        case Some(vector) =>
          db.run(initTable(table, vector.map(convertFromJsValue)))
        case None =>
          log.error(LogMsg.noJsonFieldForAsset(fieldName, requestName))
          Future { None }
      }
    } yield {
      log.info(LogMsg.inserting(fieldName, inserted))
      Done
    }
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

    val futureList = List(
      getSimpleList(
        ApiName.GetBedTypeList,
        JsonField.BedTypes,
        TableQuery[BedTypeTable],
        _.convertTo[BedType]),
      getSimpleList(
        ApiName.GetBreakfastTypeList,
        JsonField.Breakfasts,
        TableQuery[BreakfastTypeTable],
        _.convertTo[BreakfastType]),
      getSimpleList(
        ApiName.GetMealTypeList,
        JsonField.MealTypes,
        TableQuery[MealTypeTable],
        _.convertTo[MealType]),
      getSimpleList(
        ApiName.GetPropertyCategoryList,
        JsonField.PropertyCategorys,
        TableQuery[PropertyCategoryTable],
        _.convertTo[PropertyCategory]))

    Future.sequence(futureList).map(_ => Done)
  }
}
