package com.tehang.resource.int.hotel.services

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.DidaJsonProtocol._
import dida.{ DidaDao, ConfigName }

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.event.{ Logging, LogSource, LoggingAdapter }

import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.Directives
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._

import scala.concurrent.{ ExecutionContext, Future }

import slick.jdbc.PostgresProfile.api._

import spray.json._

object routes {
  def intHotelRoute
    (version: String, prefix: String, db: Database)
    (implicit executionContext: ExecutionContext)
      : Route = {
    pathPrefix(version) {
      pathPrefix(prefix) {
        GetCountries(db).route ~
        GetAllCities(db).route ~
        GetCities(db).route ~
        GetBedTypes(db).route ~
        GetBreakfastTypes(db).route ~
        GetMealTypes(db).route ~
        GetHotelSummary(db).route ~
        GetPolicies(db).route ~
        GetFacilities(db).route ~
        GetHotelImages(db).route ~
        GetRoomTypes(db).route ~
        GetRoomImages(db).route
      }
    }
  }
}

object IntHotelService {
  implicit val system = ActorSystem("IntHotelService")
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher
  implicit val logSource = new LogSource[AnyRef] {
    def genString(o: AnyRef) = o.getClass.getName
  }
  implicit val log = Logging(system, this)

  def main(args: Array[String]): Unit = {

    var argDatabaseConfigName: Option[String] = None
    var argSwaggerBasePath: Option[String] = None

    args.grouped(2).toList.foreach {
      case Array("--databaseConfigName", databaseConfigName: String) =>
        argDatabaseConfigName = Some(databaseConfigName)
      case Array("--swaggerBasePath", swaggerBasePath: String) =>
        argSwaggerBasePath = Some(swaggerBasePath)
      case Array(arg1, arg2) =>
        println(s"unknown argument pair: ${arg1} ${arg2}")
      case Array(arg) =>
        println(s"unknown argument: ${arg}")
    }

    (argDatabaseConfigName, argSwaggerBasePath) match {
      case (Some(databaseConfigName), Some(swaggerBasePath)) =>
        implicit val db = Database.forConfig(databaseConfigName)
        val dao: DidaDao = new DidaDao(db)
        val version = "v1"
        val prefix = "intHotel"
        val route = {
          routes.intHotelRoute(version, prefix, db) ~
          SwaggerDocService(swaggerBasePath).routes
        }
        Http().bindAndHandle(route,"0.0.0.0", 10052)
      case _ =>
        val usage = """
         |usage:
         |  --databaseConfigName
         |  --swaggerBasePath
        """.stripMargin

        println(usage)

        System.exit(1)
    }
  }
}
