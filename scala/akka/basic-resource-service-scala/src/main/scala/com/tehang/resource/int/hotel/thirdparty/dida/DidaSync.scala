package com.tehang.resource.int.hotel.thirdparty.dida

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.sync._
import dida.util._

import slick.jdbc.PostgresProfile.api._

import spray.json._

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.event.{ Logging, LogSource, LoggingAdapter }

import scala.concurrent.{ Future, ExecutionContext, ExecutionContextExecutor }
import scala.concurrent.duration._
import scala.util.{ Failure, Success }

object DidaSync {
  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher
  implicit val reqGen = util.reqGenFromConfig(ConfigName.DidaApiHeader)
  implicit val logSource = new LogSource[AnyRef] {
    def genString(o: AnyRef) = o.getClass.getName
  }
  implicit val log = Logging(system, this)

  object PlainQuery {
    val createIndexForCityTable = sqlu"""
      CREATE INDEX idx_dida_city_on_country_code ON dida_city (country_code);
    """

    val createIndexForHotelTables = sqlu"""
      CREATE INDEX idx_dida_facility_on_hotel_id ON dida_facility (hotel_id);
      CREATE INDEX idx_dida_policy_on_hotel_id ON dida_policy (hotel_id);
      CREATE INDEX idx_dida_hotel_description_on_hotel_id ON dida_hotel_description (hotel_id);
      CREATE INDEX idx_dida_hotel_image_on_hotel_id ON dida_hotel_image (hotel_id);
    """

    val createIndexForRoomTables = sqlu"""
      CREATE INDEX idx_dida_room_type_on_hotel_id ON dida_room_type (hotel_id);
      CREATE INDEX idx_dida_room_image_on_hotel_id ON dida_room_image (hotel_id);
      CREATE INDEX idx_dida_room_image_on_room_type_id ON dida_room_image (room_type_id);
    """

    val createExtensionPgTrgm = sqlu"""
      CREATE EXTENSION pg_trgm;
    """

    val createIndexForPgTrgm = sqlu"""
      CREATE INDEX trgm_idx_dida_hotel_summary_on_name
      ON dida_hotel_summary USING GIN (name gin_trgm_ops);

      CREATE INDEX trgm_idx_dida_hotel_summary_on_name_cn
      ON dida_hotel_summary USING GIN (name_cn gin_trgm_ops);
    """
  }

  def main(args: Array[String]): Unit = {

    var argDatabaseConfigName: Option[String] = None

    args.grouped(2).toList.foreach {
      case Array("--databaseConfigName", databaseConfigName: String) =>
        argDatabaseConfigName = Some(databaseConfigName)
      case Array(arg1, arg2) =>
        println(s"unknown argument pair: ${arg1} ${arg2}")
      case Array(arg) =>
        println(s"unknown argument: ${arg}")
    }

    argDatabaseConfigName match {
      case Some(databaseConfigName) =>
        implicit val db = Database.forConfig(databaseConfigName)

        val futureList = List(
          SyncSimpleList.run(),
          SyncCityList.run()
            .flatMap(_ => db.run(PlainQuery.createIndexForCityTable)),
          SyncStaticInformation.run()
            .flatMap(_ => db.run(PlainQuery.createIndexForHotelTables))
            .flatMap(_ => db.run(PlainQuery.createIndexForRoomTables))
            .flatMap(_ => db.run(PlainQuery.createExtensionPgTrgm))
            .flatMap(_ => db.run(PlainQuery.createIndexForPgTrgm))
        )

        Future.sequence(futureList)
          .onComplete {
            case Success(report) =>
              log.info(LogMsg.finishedWithAnyReport(report))
              system.terminate()
            case Failure(error) =>
              log.error(LogMsg.error(error))
              system.terminate()
          }
      case None =>
        val usage = """
         |usage:
         |  --databaseConfigName
        """.stripMargin

        println(usage)

        System.exit(1)
    }
  }
}
