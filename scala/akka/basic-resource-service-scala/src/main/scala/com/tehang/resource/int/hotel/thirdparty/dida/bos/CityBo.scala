package com.tehang.resource.int.hotel.thirdparty.dida.bos

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.models._

case class CityBo(
  cityCode: String,
  cityName: String,
  cityNameCn: Option[String],
  cityLongName: String,
  cityLongNameCn: Option[String],
  countryCode: String,
  countryName: String,
  countryNameCn: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

object CityBo {
  def fromCityAndCountry(city: City, country: Country) =
    CityBo(
      city.cityCode,
      city.cityName,
      city.cityNameCn,
      city.cityLongName,
      city.cityLongNameCn,
      city.countryCode,
      country.countryName,
      country.countryNameCn,
      city.updateTime,
      city.createTime)
}
