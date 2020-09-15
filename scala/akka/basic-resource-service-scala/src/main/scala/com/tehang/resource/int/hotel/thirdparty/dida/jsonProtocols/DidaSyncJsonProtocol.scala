package com.tehang.resource.int.hotel.thirdparty.dida

import com.tehang.resource.int.hotel.thirdparty.dida
import dida.models._

import spray.json._

import java.time.LocalDateTime

object DidaSyncJsonProtocol extends DefaultJsonProtocol {

  val fmt = dida.formats.dateTimeFormat

  implicit val CountryFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      Country(_, _, _, Some(time), Some(time)),
      "ISOCountryCode",
      "CountryName",
      "CountryName_CN")
  }

  implicit val CityFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      City(_, _, _, _, _, _, Some(time), Some(time)),
      "CityCode",
      "CityName",
      "CityName_CN",
      "CityLongName",
      "CityLongName_CN",
      "CountryCode")
  }

  implicit val BedTypeFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      BedType(_, _, _, _, Some(time), Some(time)),
      "ID",
      "DefaultOccupancy",
      "Name",
      "Name_CN")
  }

  implicit val BreakfastTypeFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      BreakfastType(_, _, _, Some(time), Some(time)),
      "ID",
      "Name",
      "Name_CN")
  }

  implicit val MealTypeFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      MealType(_, _, _, Some(time), Some(time)),
      "ID",
      "Name",
      "Name_CN")
  }

  implicit val PropertyCategoryFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      PropertyCategory(_, _, _, Some(time), Some(time)),
      "ID",
      "Description_EN",
      "Description_CN")
  }

  implicit object HotelSummaryFormat extends JsonFormat[HotelSummary] {

    def write(hotelSummary: HotelSummary): JsObject =
      JsObject(
        "HotelID" -> hotelSummary.hotelId.toJson,
        "Name" -> hotelSummary.name.toJson,
        "Name_CN" -> hotelSummary.nameCn.toJson,
        "Address" -> hotelSummary.address.toJson,
        "CityCode" -> hotelSummary.cityCode.toJson,
        "CityName" -> hotelSummary.cityName.toJson,
        "CityName_CN" -> hotelSummary.cityNameCn.toJson,
        "StateCode" -> hotelSummary.stateCode.toJson,
        "CountryCode" -> hotelSummary.countryCode.toJson,
        "CountryName" -> hotelSummary.countryName.toJson,
        "CountryName_CN" -> hotelSummary.countryNameCn.toJson,
        "ZipCode" -> hotelSummary.zipCode.toJson,
        "Longitude" -> hotelSummary.longitude.toJson,
        "Latitude" -> hotelSummary.latitude.toJson,
        "StarRating" -> hotelSummary.starRating.toJson,
        "Telephone" -> hotelSummary.telephone.toJson,
        "AirportCode" -> hotelSummary.airportCode.toJson,
        "PropertyCategory" -> hotelSummary.propertyCategory.toJson,
        "DestinationID" -> hotelSummary.destinationId.toJson,
        "DestinationName" -> hotelSummary.destinationName.toJson,
        "DestinationName_CN" -> hotelSummary.destinationNameCn.toJson,
        "Address_CN" -> hotelSummary.addressCn.toJson,
        "UpdateDate" -> hotelSummary.updateDate.toJson)

    def read(value: JsValue) =
      value.asJsObject.getFields(
        "HotelID",
        "Name",
        "Name_CN",
        "Address",
        "CityCode",
        "CityName",
        "CityName_CN",
        "StateCode",
        "CountryCode",
        "CountryName",
        "CountryName_CN",
        "ZipCode",
        "Longitude",
        "Latitude",
        "StarRating",
        "Telephone",
        "AirportCode",
        "PropertyCategory",
        "DestinationID",
        "DestinationName",
        "DestinationName_CN",
        "Address_CN",
        "UpdateDate") match {
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
          val time = LocalDateTime.now().format(fmt)
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
            updateTime = Some(time),
            createTime = Some(time))
        case _ => throw new DeserializationException("HotelSummary expected")
      }
  }

  implicit val PolicyFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      Policy(_, _, _, _, None, Some(time), Some(time)),
      "HotelID",
      "Type",
      "Description",
      "Description_CN")
  }

  implicit val FacilityFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      Facility(_, _, _, _, None, Some(time), Some(time)),
      "HotelID",
      "Type",
      "Description",
      "Description_CN")
  }

  implicit val HotelImageFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      HotelImage(_, _, _, _, None, Some(time), Some(time)),
      "HotelID",
      "ImageCaption",
      "ImageUrl",
      "ImageOrder")
  }

  implicit object RoomImageFormat extends RootJsonFormat[RoomImage] {

    def write(roomImage: RoomImage) = {
      JsObject(
        "HotelID" -> JsNumber(roomImage.hotelId),
        "RoomTypeID" -> JsNumber(roomImage.roomTypeId),
        "ImageUrl" -> JsString(roomImage.imageUrl),
        "DefaultImage" -> { if (roomImage.defaultImage) JsString("True") else JsString("False") })
    }

    def read(value: JsValue) = {
      val time = LocalDateTime.now().format(fmt)
      value.asJsObject.getFields("HotelID", "RoomTypeID", "ImageUrl", "DefaultImage") match {
        case Seq(JsNumber(hotelId), JsNumber(roomTypeId), JsString(imageUrl), JsString(str)) =>
          if (str == "True") {
            RoomImage(hotelId.toLong, roomTypeId.toLong, imageUrl, true, None, Some(time), Some(time))
          } else if (str == "False") {
            RoomImage(hotelId.toLong, roomTypeId.toLong, imageUrl, false, None, Some(time), Some(time))
          } else throw new DeserializationException(
            s"RoomImage expected, DefaultImage should be True or False, instead of ${str}")
        case _ => throw new DeserializationException("RoomImage expected")
      }
    }
  }

  implicit val RoomTypeFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      RoomType(_, _, _, _, Some(time), Some(time)),
      "RoomTypeID",
      "HotelID",
      "Name",
      "Name_CN")
  }

  implicit val HotelDescriptionFormat = {
    val time = LocalDateTime.now().format(fmt)
    jsonFormat(
      HotelDescription(_, _, _, None, Some(time), Some(time)),
      "HotelID",
      "HotelDescription",
      "HotelDescription_CN")
  }
}
