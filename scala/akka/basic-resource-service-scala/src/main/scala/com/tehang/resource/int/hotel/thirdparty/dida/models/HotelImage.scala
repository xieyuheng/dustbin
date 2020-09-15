package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class HotelImage(
  hotelId: Long,
  imageCaption: String,
  imageUrl: String,
  imageOrder: Int,
  hotelImageId: Option[Long] = None,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class HotelImageTable(tag: Tag) extends Table[HotelImage](tag, "dida_hotel_image") {
  def hotelId = column[Long]("hotel_id")
  def imageCaption = column[String]("image_caption")
  def imageUrl = column[String]("image_url")
  def imageOrder = column[Int]("image_order")
  def hotelImageId = column[Long]("hotel_image_id", O.PrimaryKey, O.AutoInc)
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    hotelId,
    imageCaption,
    imageUrl,
    imageOrder,
    hotelImageId.?,
    updateTime.?,
    createTime.?,
  ).mapTo[HotelImage]
}
