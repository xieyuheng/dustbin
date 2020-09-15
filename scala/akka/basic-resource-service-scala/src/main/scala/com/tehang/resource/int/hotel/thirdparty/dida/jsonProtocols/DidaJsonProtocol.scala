package com.tehang.resource.int.hotel.thirdparty.dida

import com.tehang.resource.int.hotel.thirdparty.dida.bos._
import com.tehang.resource.int.hotel.thirdparty.dida.models._
import spray.json._

object DidaJsonProtocol extends DefaultJsonProtocol {
  implicit val CityBoFormat = jsonFormat10(CityBo.apply)
  implicit val SearchHotelSummariesBoFormat = jsonFormat5(SearchHotelSummariesBo.apply)

  implicit val CountryFormat = jsonFormat5(Country.apply)
  implicit val CityFormat = jsonFormat8(City.apply)
  implicit val BedTypeFormat = jsonFormat6(BedType.apply)
  implicit val BreakfastTypeFormat = jsonFormat5(BreakfastType.apply)
  implicit val MealTypeFormat = jsonFormat5(MealType.apply)
  implicit val PropertyCategoryFormat = jsonFormat5(PropertyCategory.apply)

  implicit object HotelSummaryFormat extends JsonFormat[HotelSummary] {

    def write(hotelSummary: HotelSummary): JsObject =
      JsObject(
        "hotelId" -> hotelSummary.hotelId.toJson,
        "name" -> hotelSummary.name.toJson,
        "nameCn" -> hotelSummary.nameCn.toJson,
        "address" -> hotelSummary.address.toJson,
        "cityCode" -> hotelSummary.cityCode.toJson,
        "cityName" -> hotelSummary.cityName.toJson,
        "cityNameCn" -> hotelSummary.cityNameCn.toJson,
        "stateCode" -> hotelSummary.stateCode.toJson,
        "countryCode" -> hotelSummary.countryCode.toJson,
        "countryName" -> hotelSummary.countryName.toJson,
        "countryNameCn" -> hotelSummary.countryNameCn.toJson,
        "zipCode" -> hotelSummary.zipCode.toJson,
        "longitude" -> hotelSummary.longitude.toJson,
        "latitude" -> hotelSummary.latitude.toJson,
        "starRating" -> hotelSummary.starRating.toJson,
        "telephone" -> hotelSummary.telephone.toJson,
        "airportCode" -> hotelSummary.airportCode.toJson,
        "propertyCategory" -> hotelSummary.propertyCategory.toJson,
        "destinationId" -> hotelSummary.destinationId.toJson,
        "destinationName" -> hotelSummary.destinationName.toJson,
        "destinationNameCn" -> hotelSummary.destinationNameCn.toJson,
        "addressCn" -> hotelSummary.addressCn.toJson,
        "updateDate" -> hotelSummary.updateDate.toJson,
        "updateTime" -> hotelSummary.updateTime.toJson,
        "createTime" -> hotelSummary.createTime.toJson)

    def read(value: JsValue) =
      value.asJsObject.getFields(
        "hotelId",
        "name",
        "nameCn",
        "address",
        "cityCode",
        "cityName",
        "cityNameCn",
        "stateCode",
        "countryCode",
        "countryName",
        "countryNameCn",
        "zipCode",
        "longitude",
        "latitude",
        "starRating",
        "telephone",
        "airportCode",
        "propertyCategory",
        "destinationId",
        "destinationName",
        "destinationNameCn",
        "addressCn",
        "updateDate") match {
        case seq: Seq[JsValue] =>
          val hotelId = seq(0)
          val name = seq(1)
          val nameCn = seq(2)
          val address = seq(3)
          val cityCode = seq(4)
          val cityName = seq(5)
          val cityNameCn = seq(6)
          val stateCode = seq(7)
          val countryCode = seq(8)
          val countryName = seq(9)
          val countryNameCn = seq(10)
          val zipCode = seq(11)
          val longitude = seq(12)
          val latitude = seq(13)
          val starRating = seq(14)
          val telephone = seq(15)
          val airportCode = seq(16)
          val propertyCategory = seq(17)
          val destinationId = seq(18)
          val destinationName = seq(19)
          val destinationNameCn = seq(20)
          val addressCn = seq(21)
          val updateDate = seq(22)
          val updateTime = seq(23)
          val createTime = seq(24)
          HotelSummary(
            hotelId.convertTo[Long],
            name.convertTo[String],
            nameCn.convertTo[String],
            address.convertTo[String],
            cityCode.convertTo[String],
            cityName.convertTo[String],
            cityNameCn.convertTo[String],
            stateCode.convertTo[String],
            countryCode.convertTo[String],
            countryName.convertTo[String],
            countryNameCn.convertTo[String],
            zipCode.convertTo[String],
            longitude.convertTo[String],
            latitude.convertTo[String],
            starRating.convertTo[Option[Double]],
            telephone.convertTo[String],
            airportCode.convertTo[String],
            propertyCategory.convertTo[String],
            destinationId.convertTo[String],
            destinationName.convertTo[String],
            destinationNameCn.convertTo[String],
            addressCn.convertTo[String],
            updateDate.convertTo[String],
            updateTime.convertTo[Option[String]],
            createTime.convertTo[Option[String]])
        case _ => throw new DeserializationException("HotelSummary expected")
      }
  }

  implicit val PolicyFormat = jsonFormat7(Policy.apply)
  implicit val FacilityFormat = jsonFormat7(Facility.apply)
  implicit val HotelImageFormat = jsonFormat7(HotelImage.apply)
  implicit val RoomImageFormat = jsonFormat7(RoomImage.apply)
  implicit val RoomTypeFormat = jsonFormat6(RoomType.apply)
  implicit val HotelDescriptionFormat = jsonFormat6(HotelDescription.apply)
}
