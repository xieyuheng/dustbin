package com.tehang.resource.int.hotel.essence

import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Future

import java.time.LocalDateTime

trait InitData extends DatabaseSchema {

  def db: Database

  def insertInitData(): Future[Unit] = ???
}
