package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class RoomImage(
  hotelId: Long,
  roomTypeId: Long,
  imageUrl: String,
  defaultImage: Boolean,
  roomImageId: Option[Long] = None,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class RoomImageTable(tag: Tag) extends Table[RoomImage](tag, "dida_room_image") {
  def hotelId = column[Long]("hotel_id")
  def roomTypeId = column[Long]("room_type_id")
  def imageUrl = column[String]("image_url")
  def defaultImage = column[Boolean]("default_image")
  def roomImageId = column[Long]("room_image_id", O.PrimaryKey, O.AutoInc)
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    hotelId,
    roomTypeId,
    imageUrl,
    defaultImage,
    roomImageId.?,
    updateTime.?,
    createTime.?,
  ).mapTo[RoomImage]
}
