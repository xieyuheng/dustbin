package com.tehang.resource.int.hotel.thirdparty.dida

import slick.lifted
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ Future, ExecutionContextExecutor }
import scala.concurrent.duration._
import scala.util.{ Failure, Success }
import scala.collection.immutable.Stream

import akka.util.ByteString
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.stream.scaladsl._
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import HttpMethods._
import MediaTypes._

import spray.json._

import com.typesafe.config.ConfigFactory

object util {
  def reqGenFromConfig(configName: String) = {
    (functionName: String, fields: Map[String, JsValue]) =>

    val config = ConfigFactory.load()
    val ApiHeader = config.getConfig(configName)

    val urlPrefix = ApiHeader.getString("urlPrefix")
    val clientID = ApiHeader.getString("clientID")
    val licenseKey = ApiHeader.getString("licenseKey")

    val uri = urlPrefix + s"${functionName}" + HttpParam.FormatJson
    val header = JsObject(JsonField.Header -> JsObject(
      JsonField.ClientID -> JsString(clientID),
      JsonField.LicenseKey -> JsString(licenseKey)))
    val entity = HttpEntity(`application/json`,
      new JsObject(header.fields ++ fields).compactPrint)
    HttpRequest(POST, uri = uri, entity = entity)
  }

  def matchSuccessList(value: JsValue, fieldName: String): Option[Vector[JsValue]] =
    value match {
      case JsObject(fields) =>
        for {
          JsObject(subFields) <- fields.get(JsonField.Success)
          JsArray(elements) <- subFields.get(fieldName)
        } yield elements
      case _ => None
    }

  def recreateTable[T <: Table[_]]
    (table: lifted.TableQuery[T])
    (implicit
      executionContext: ExecutionContextExecutor)
      : DBIO[Int] = {
    val io = for {
      _ <- table.schema.create.asTry
      result <- table.delete
    } yield result
    // io.transactionally
    io
  }

  def initTable[E, T <: Table[E]]
    (table: lifted.TableQuery[T], values: Iterable[E])
    (implicit
      executionContext: ExecutionContextExecutor)
      : DBIO[Option[Int]] = {
    val io = for {
      _ <- table.schema.create.asTry
      _ <- table.delete
      result <- table ++= values
    } yield result
    // io.transactionally
    io
  }

  def simpleRequest(req: HttpRequest)
    (implicit
      system: ActorSystem,
      materializer: Materializer,
      executionContext: ExecutionContextExecutor)
      : Future[JsValue] = {
    for {
      res <- Http().singleRequest(req)
      body <- res.entity.dataBytes.runFold(ByteString(""))(_ ++ _)
    } yield body.utf8String.parseJson
  }
}
