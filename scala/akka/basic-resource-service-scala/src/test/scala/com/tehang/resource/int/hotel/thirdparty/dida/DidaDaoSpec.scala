import org.scalatest._

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.models._
import dida.bos._
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

import scala.concurrent.{ ExecutionContext, Future, Await }
import scala.concurrent.duration._
import scala.util.{ Failure, Success }

import slick.jdbc.PostgresProfile.api._

import spray.json._

class DidaDaoSpec extends FlatSpec with Matchers {
  implicit val system = ActorSystem("IntHotelService")
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher
  implicit val logSource = new LogSource[AnyRef] {
    def genString(o: AnyRef) = o.getClass.getName
  }
  implicit val log = Logging(system, this)

  implicit val db = Database.forConfig("IntHotelServiceLocalDatabase")
  val dao: DidaDao = new DidaDao(db)

  "DidaDao" can "getAllCities" in {
    Await.ready(dao.getAllCities(), 10.seconds).onComplete {
      case Success(result) => assert(result.length > 100)
      case Failure(error) => println(error)
    }
  }

  it can "searchHotelSummaries" in {
    val bo = SearchHotelSummariesBo(hotelQuery = Some("Lit tle"))

    Await.ready(dao.searchHotelSummaries(bo), 10000.seconds).onComplete {
      case Success(result) => result.foreach { println }
      case Failure(error) => println(error)
    }
  }
}
