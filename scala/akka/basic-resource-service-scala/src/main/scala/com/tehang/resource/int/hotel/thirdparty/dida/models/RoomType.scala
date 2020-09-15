package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class RoomType(
  roomTypeId: Long,
  hotelId: Long,
  name: String,
  nameCn: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class RoomTypeTable(tag: Tag) extends Table[RoomType](tag, "dida_room_type") {
  def roomTypeId = column[Long]("room_type_id", O.PrimaryKey)
  def hotelId = column[Long]("hotel_id")
  def name = column[String]("name")
  def nameCn = column[String]("name_cn")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    roomTypeId,
    hotelId,
    name,
    nameCn,
    updateTime.?,
    createTime.?,
  ).mapTo[RoomType]
}
