package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class BedType(
  bedTypeId: Long,
  defaultOccupancy: Int,
  name: String,
  nameCn: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class BedTypeTable(tag: Tag) extends Table[BedType](tag, "dida_bed_type") {
  def bedTypeId = column[Long]("id", O.PrimaryKey)
  def defaultOccupancy = column[Int]("default_occupancy")
  def name = column[String]("name")
  def nameCn = column[String]("name_cn")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    bedTypeId,
    defaultOccupancy,
    name,
    nameCn,
    updateTime.?,
    createTime.?,
  ).mapTo[BedType]
}
