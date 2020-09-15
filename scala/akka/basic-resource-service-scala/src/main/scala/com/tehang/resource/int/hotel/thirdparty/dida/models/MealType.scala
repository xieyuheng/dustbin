package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class MealType(
  mealTypeId: Long,
  name: String,
  nameCn: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class MealTypeTable(tag: Tag) extends Table[MealType](tag, "dida_meal_type") {
  def mealTypeId = column[Long]("meal_type_id", O.PrimaryKey)
  def name = column[String]("name")
  def nameCn = column[String]("name_cn")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    mealTypeId,
    name,
    nameCn,
    updateTime.?,
    createTime.?,
  ).mapTo[MealType]
}
