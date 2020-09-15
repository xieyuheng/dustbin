package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class HotelDescription(
  hotelId: Long,
  hotelDescription: Option[String],
  hotelDescriptionCn: Option[String],
  hotelDescriptionId: Option[Long] = None,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class HotelDescriptionTable(tag: Tag)
    extends Table[HotelDescription](tag, "dida_hotel_description") {
  def hotelId = column[Long]("hotel_id")
  def hotelDescription = column[Option[String]]("hotel_description")
  def hotelDescriptionCn = column[Option[String]]("hotel_description_cn")
  def hotelDescriptionId = column[Long]("hotel_description_id", O.PrimaryKey, O.AutoInc)
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    hotelId,
    hotelDescription,
    hotelDescriptionCn,
    hotelDescriptionId.?,
    updateTime.?,
    createTime.?,
  ).mapTo[HotelDescription]
}
