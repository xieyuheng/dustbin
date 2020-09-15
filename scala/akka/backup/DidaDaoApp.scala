package com.tehang.resource.int.hotel.thirdparty.dida

import slick.jdbc.PostgresProfile.api._

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.event.{ Logging, LogSource, LoggingAdapter }

import scala.concurrent.{ Future, ExecutionContextExecutor }
import scala.concurrent.duration._
import scala.util.{ Failure, Success }

object DidaDaoApp extends App {
  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher
  implicit val db = Database.forConfig(ConfigName.IntHotelServiceDatabase)
  implicit val logSource = new LogSource[AnyRef] {
    def genString(o: AnyRef) = o.getClass.getName
  }
  implicit val log = Logging(system, this)

  val dao = new DidaDao(db)

  // dao.getCities("CN").onComplete{
  //   case Success(result) => result.foreach(println)
  //   case Failure(error) => log.error(s"error: ${error}")
  // }

  dao.getHotelSummary(472587).onComplete{
    case Success(result) => println(result)
    case Failure(error) => log.error(s"error: ${error}")
  }

  dao.getPolicies(472587).onComplete{
    case Success(result) => result.foreach(println)
    case Failure(error) => log.error(s"error: ${error}")
  }

  dao.getRoomTypes(472587).onComplete{
    case Success(result) => result.foreach(println)
    case Failure(error) => log.error(s"error: ${error}")
  }
}
