package com.tehang.resource.int.hotel.essence

import slick.jdbc.PostgresProfile.api._

import java.time.LocalDateTime

trait DatabaseSchema {

  class CountryTable(tag: Tag) extends Table[Country](tag, "country") {

    def countryId = column[Long]("country_id", O.PrimaryKey)
    def name = column[String]("name")
    def nameCn = column[Option[String]]("name_cn")
    def countryCode = column[String]("country_code", O.Unique)
    def updateTime = column[LocalDateTime]("update_time")

    def * = (countryId, name, nameCn, countryCode, updateTime).mapTo[Country]
  }

  val countryTable = TableQuery[CountryTable]


  class CityTable(tag: Tag) extends Table[City](tag, "city") {

    def cityId = column[Long]("city_id", O.PrimaryKey)
    def name = column[String]("name")
    def nameCn = column[Option[String]]("name_cn")
    def countryId = column[Long]("country_id")
    def updateTime = column[LocalDateTime]("update_time")

    def countryFk = foreignKey("country_fk", countryId, countryTable)(_.countryId)

    def * = (cityId, name, nameCn, countryId, updateTime).mapTo[City]
  }

  val cityTable = TableQuery[CityTable]


  class HotelTable(tag: Tag) extends Table[Hotel](tag, "hotel") {

    def hotelId = column[Long]("hotel_id", O.PrimaryKey)
    def name = column[String]("name")
    def nameCn = column[Option[String]]("name_cn")
    def cityId = column[Long]("city_id")
    def countryId = column[Long]("country_id")
    def updateTime = column[LocalDateTime]("update_time")

    def cityFk = foreignKey("city_fk", cityId, cityTable)(_.cityId)
    def countryFk = foreignKey("country_fk", countryId, countryTable)(_.countryId)

    def * = (hotelId, name, nameCn, cityId, countryId, updateTime).mapTo[Hotel]
  }

  val hotelTable = TableQuery[HotelTable]


  val allSchemas = {
    countryTable.schema ++
    cityTable.schema ++
    hotelTable.schema
  }
}
