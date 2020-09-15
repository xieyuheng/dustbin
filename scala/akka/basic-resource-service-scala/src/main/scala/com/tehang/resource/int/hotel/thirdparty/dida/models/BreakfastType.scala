package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class BreakfastType(
  breakfastTypeId: Long,
  name: String,
  nameCn: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class BreakfastTypeTable(tag: Tag)
    extends Table[BreakfastType](tag, "dida_breakfast_type") {
  def breakfastTypeId = column[Long]("break_fast_type_id", O.PrimaryKey)
  def name = column[String]("name")
  def nameCn = column[String]("name_cn")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    breakfastTypeId,
    name,
    nameCn,
    updateTime.?,
    createTime.?,
  ).mapTo[BreakfastType]
}
