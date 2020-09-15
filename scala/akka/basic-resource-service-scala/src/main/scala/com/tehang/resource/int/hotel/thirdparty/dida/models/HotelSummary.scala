package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._
import slick.collection.heterogeneous.{ HList, HCons, HNil }
import slick.collection.heterogeneous.syntax._

case class HotelSummary(
  hotelId: Long,
  name: String,
  nameCn: String,
  address: String,
  cityCode: String,
  cityName: String,
  cityNameCn: String,
  stateCode: String,
  countryCode: String,
  countryName: String,
  countryNameCn: String,
  zipCode: String,
  longitude: String,
  latitude: String,
  starRating: Option[Double],
  telephone: String,
  airportCode: String,
  propertyCategory: String,
  destinationId: String,
  destinationName: String,
  destinationNameCn: String,
  addressCn: String,
  updateDate: String,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class HotelSummaryTable(tag: Tag) extends Table[HotelSummary](tag, "dida_hotel_summary") {
  def hotelId = column[Long]("hotel_id", O.PrimaryKey)
  def name = column[String]("name")
  def nameCn = column[String]("name_cn")
  def address = column[String]("address")
  def cityCode = column[String]("city_code")
  def cityName = column[String]("city_name")
  def cityNameCn = column[String]("city_name_cn")
  def stateCode = column[String]("state_code")
  def countryCode = column[String]("country_code")
  def countryName = column[String]("country_name")
  def countryNameCn = column[String]("country_name_cn")
  def zipCode = column[String]("zip_code")
  def longitude = column[String]("longitude")
  def latitude = column[String]("latitude")
  def starRating = column[Option[Double]]("star_rating")
  def telephone = column[String]("telephone")
  def airportCode = column[String]("airport_code")
  def propertyCategory = column[String]("property_category")
  def destinationId = column[String]("destination_id")
  def destinationName = column[String]("destination_name")
  def destinationNameCn = column[String]("destination_name_cn")
  def addressCn = column[String]("address_cn")
  def updateDate = column[String]("update_date")
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    hotelId ::
      name ::
      nameCn ::
      address ::
      cityCode ::
      cityName ::
      cityNameCn ::
      stateCode ::
      countryCode ::
      countryName ::
      countryNameCn ::
      zipCode ::
      longitude ::
      latitude ::
      starRating ::
      telephone ::
      airportCode ::
      propertyCategory ::
      destinationId ::
      destinationName ::
      destinationNameCn ::
      addressCn ::
      updateDate ::
      updateTime.? ::
      createTime.? ::
      HNil
  ).mapTo[HotelSummary]
}
