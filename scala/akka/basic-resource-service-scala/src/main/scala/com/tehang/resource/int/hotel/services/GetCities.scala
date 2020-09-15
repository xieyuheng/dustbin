package com.tehang.resource.int.hotel.services

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.DidaJsonProtocol._
import dida.DidaDao

import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.Directives
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._

import scala.concurrent.ExecutionContext

import slick.jdbc.PostgresProfile.api._

import spray.json._

import io.swagger.annotations._

import javax.ws.rs.Path

@Api(value = "int-hotel-controller")
@Path("/getCities")
case class GetCities
  (db: Database)
  (implicit executionContext: ExecutionContext)
    extends Directives
    with ResponseStandard {

  val dao = new DidaDao(db)

  @ApiOperation(
    value = "getCities",
    nickname = "getCities",
    httpMethod = "POST",
    response = classOf[Array[dida.bos.CityBo]])
  @ApiImplicitParams(Array(
    new ApiImplicitParam(
      name = "countryCode",
      required = true,
      dataType = "string",
      paramType = "query")))
  def route = path("getCities") {
    post {
      parameter("countryCode") { countryCode =>
        complete(dao.getCities(countryCode).map(_.toJson).map(okJsonRes))
      }
    }
  }
}
