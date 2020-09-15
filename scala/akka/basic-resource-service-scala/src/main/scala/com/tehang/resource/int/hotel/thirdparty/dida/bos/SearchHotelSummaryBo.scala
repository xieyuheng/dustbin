package com.tehang.resource.int.hotel.thirdparty.dida.bos

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.models._

case class SearchHotelSummariesBo(
  hotelQuery: Option[String] = None, // to match hotelName hotelNameCn
  cityQuery: Option[String] = None, // to match cityName cityNameCn
  countryQuery: Option[String] = None, // to match countryCode countryName countryNameCn
  starRatingLowerBound: Option[Double] = None,
  starRatingUpperBound: Option[Double] = None)
