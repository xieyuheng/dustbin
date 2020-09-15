package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class Facility(
  hotelId: Long,
  facilityType: String,
  description: String,
  descriptionCn: String,
  facilityId: Option[Long] = None,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class FacilityTable(tag: Tag) extends Table[Facility](tag, "dida_facility") {
  def hotelId = column[Long]("hotel_id")
  def facilityType = column[String]("facility_type")
  def description = column[String]("description")
  def descriptionCn = column[String]("description_cn")
  def facilityId = column[Long]("facility_id", O.PrimaryKey, O.AutoInc)
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    hotelId,
    facilityType,
    description,
    descriptionCn,
    facilityId.?,
    updateTime.?,
    createTime.?,
  ).mapTo[Facility]
}
