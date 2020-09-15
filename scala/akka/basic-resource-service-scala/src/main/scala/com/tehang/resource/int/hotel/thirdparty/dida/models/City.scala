package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class City(
  cityCode: String,
  cityName: String,
  cityNameCn: Option[String],
  cityLongName: String,
  cityLongNameCn: Option[String],
  countryCode: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class CityTable(tag: Tag) extends Table[City](tag, "dida_city") {
  def cityCode = column[String]("city_code", O.PrimaryKey)
  def cityName = column[String]("city_name")
  def cityNameCn = column[Option[String]]("city_name_cn")
  def cityLongName = column[String]("city_long_name")
  def cityLongNameCn = column[Option[String]]("city_long_name_cn")
  def countryCode = column[String]("country_code")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    cityCode,
    cityName,
    cityNameCn,
    cityLongName,
    cityLongNameCn,
    countryCode,
    updateTime.?,
    createTime.?,
  ).mapTo[City]
}
