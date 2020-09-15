package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class Country(
  countryCode: String,
  countryName: String,
  countryNameCn: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class CountryTable(tag: Tag) extends Table[Country](tag, "dida_country") {
  def countryCode = column[String]("country_code", O.PrimaryKey)
  def countryName = column[String]("country_name")
  def countryNameCn = column[String]("country_name_cn")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    countryCode,
    countryName,
    countryNameCn,
    updateTime.?,
    createTime.?,
  ).mapTo[Country]
}
