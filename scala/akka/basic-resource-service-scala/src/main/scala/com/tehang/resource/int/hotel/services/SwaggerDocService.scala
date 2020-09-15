package com.tehang.resource.int.hotel.services

import com.github.swagger.akka.SwaggerHttpService
import com.github.swagger.akka.model._

case class SwaggerDocService(swaggerBasePath: String)
    extends SwaggerHttpService {

  override val apiClasses = Set(
    classOf[GetCountries],
    classOf[GetAllCities],
    classOf[GetCities],
    classOf[GetBedTypes],
    classOf[GetBreakfastTypes],
    classOf[GetMealTypes],
    classOf[GetHotelSummary],
    classOf[GetPolicies],
    classOf[GetFacilities],
    classOf[GetHotelImages],
    classOf[GetRoomTypes],
    classOf[GetRoomImages],
  )

  override val basePath = swaggerBasePath

  override val info = Info(
    version = "1.0.0",
    title = "IntHotelService")
}
