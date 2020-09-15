package com.tehang.resource.int.hotel.essence

import java.time.LocalDateTime

case class Country(
  countryId: Long,
  name: String,
  nameCn: Option[String] = None,
  countryCode: String,
  updateTime: LocalDateTime = LocalDateTime.now())

case class City(
  cityId: Long,
  name: String,
  nameCn: Option[String] = None,
  countryId: Long,
  updateTime: LocalDateTime = LocalDateTime.now())

case class Hotel(
  hotelId: Long,
  name: String,
  nameCn: Option[String] = None,
  cityId: Long,
  countryId: Long,
  updateTime: LocalDateTime = LocalDateTime.now())
