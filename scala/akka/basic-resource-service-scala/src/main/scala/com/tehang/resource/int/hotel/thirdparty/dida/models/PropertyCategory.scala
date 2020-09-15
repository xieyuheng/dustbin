package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class PropertyCategory(
  propertyCategoryId: Long,
  description: String,
  descriptionCn: Option[String],
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class PropertyCategoryTable(tag: Tag)
    extends Table[PropertyCategory](tag, "dida_property_category") {
  def propertyCategoryId = column[Long]("property_category_id", O.PrimaryKey)
  def description = column[String]("description_en")
  def descriptionCn = column[Option[String]]("description_cn")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    propertyCategoryId,
    description,
    descriptionCn,
    updateTime.?,
    createTime.?,
  ).mapTo[PropertyCategory]
}
