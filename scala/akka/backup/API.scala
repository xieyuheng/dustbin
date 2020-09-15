package com.tehang.resource.hotel.international

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import scala.io.StdIn

// TODO

object APIApp extends App {
  implicit val system = ActorSystem("my-system")
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher

  val server = Http(system)

  val route = path("hi") {
    get {
      complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "hi"))
    }
  } ~ path("ha") {
    get {
      complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "ha"))
    }
  }

  val bindingFuture = server.bindAndHandle(route, "localhost", 8080)

  println(s"[server] http://localhost:8080")
  println(s"[server] Press RETURN to stop")
  StdIn.readLine()
  bindingFuture
    .flatMap(_.unbind())
    .onComplete(_ => system.terminate())
}
