package com.tehang.resource.int.hotel.thirdparty.dida

import com.tehang.resource.int.hotel.thirdparty.dida.bos._
import com.tehang.resource.int.hotel.thirdparty.dida.models._
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}

class DidaDao(db: Database)(implicit executionContext: ExecutionContext) {
  def bedTypeTable = TableQuery[BedTypeTable]
  def countryTable = TableQuery[CountryTable]
  def hotelImageTable = TableQuery[HotelImageTable]
  def policyTable = TableQuery[PolicyTable]
  def roomTypeTable = TableQuery[RoomTypeTable]
  def breakfastTypeTable = TableQuery[BreakfastTypeTable]
  def facilityTable = TableQuery[FacilityTable]
  def hotelSummaryTable = TableQuery[HotelSummaryTable]
  def propertyCategoryTable = TableQuery[PropertyCategoryTable]
  def cityTable = TableQuery[CityTable]
  def hotelDescriptionTable = TableQuery[HotelDescriptionTable]
  def mealTypeTable = TableQuery[MealTypeTable]
  def roomImageTable = TableQuery[RoomImageTable]

  def getCountries(): Future[Seq[Country]] = db.run(countryTable.result)
  def getBedTypes(): Future[Seq[BedType]] = db.run(bedTypeTable.result)
  def getBreakfastTypes(): Future[Seq[BreakfastType]] = db.run(breakfastTypeTable.result)
  def getMealTypes(): Future[Seq[MealType]] = db.run(mealTypeTable.result)

  def getAllCities(): Future[Seq[CityBo]] = {
    val query = for {
      city <- cityTable
      country <- countryTable if city.countryCode === country.countryCode
    } yield (city, country)

    db.run(query.result)
      .map { result =>
        result.map { case (city, country) =>
          CityBo.fromCityAndCountry(city, country) } }
  }

  def getCities(countryCode: String): Future[Seq[CityBo]] = {
    val query = for {
      city <- cityTable if city.countryCode === countryCode
      country <- countryTable if country.countryCode === countryCode
    } yield (city, country)

    db.run(query.result)
      .map { result =>
        result.map { case (city, country) =>
          CityBo.fromCityAndCountry(city, country) } }
  }

  def getHotelSummary(hotelId: Long): Future[HotelSummary] = {
    val query = hotelSummaryTable
      .filter(_.hotelId === hotelId)

    db.run(query.result.head)
  }

  def getPolicies(hotelId: Long): Future[Seq[Policy]] = {
    val query = policyTable
      .filter(_.hotelId === hotelId)

    db.run(query.result)
  }

  def getFacilities(hotelId: Long): Future[Seq[Facility]] = {
    val query = facilityTable
      .filter(_.hotelId === hotelId)

    db.run(query.result)
  }

  def getHotelImages(hotelId: Long): Future[Seq[HotelImage]] = {
    val query = hotelImageTable
      .filter(_.hotelId === hotelId)

    db.run(query.result)
  }

  def getRoomTypes(hotelId: Long): Future[Seq[RoomType]] = {
    val query = for {
      roomType <- roomTypeTable if roomType.hotelId === hotelId
    } yield roomType

    db.run(query.result)
  }

  def getRoomImages(roomTypeId: Long): Future[Seq[RoomImage]] = {
    val query = for {
      roomImage <- roomImageTable if roomImage.roomTypeId === roomTypeId
    } yield roomImage

    db.run(query.result)
  }

  import slick.jdbc.GetResult

  implicit val GetHotelSummary =
    GetResult { r => HotelSummary(
      hotelId = r.<<,
      name = r.<<,
      nameCn = r.<<,
      address = r.<<,
      cityCode = r.<<,
      cityName = r.<<,
      cityNameCn = r.<<,
      stateCode = r.<<,
      countryCode = r.<<,
      countryName = r.<<,
      countryNameCn = r.<<,
      zipCode = r.<<,
      longitude = r.<<,
      latitude = r.<<,
      starRating = r.<<?,
      telephone = r.<<,
      airportCode = r.<<,
      propertyCategory = r.<<,
      destinationId = r.<<,
      destinationName = r.<<,
      destinationNameCn = r.<<,
      addressCn = r.<<,
      updateDate = r.<<,
      updateTime = r.<<?,
      createTime = r.<<?)
    }

  // https://stackoverflow.com/questions/32861818/slick-plain-sql-query-with-dynamic-conditions

  import slick.jdbc.{SQLActionBuilder, SetParameter, PositionedParameters}

  implicit class SQLActionBuilderConcat (a: SQLActionBuilder) {
    def concat (b: SQLActionBuilder): SQLActionBuilder = {
      SQLActionBuilder(a.queryParts ++ b.queryParts, new SetParameter[Unit] {
        def apply(p: Unit, pp: PositionedParameters): Unit = {
          a.unitPConv.apply(p, pp)
          b.unitPConv.apply(p, pp)
        }
      })
    }
  }

  def searchHotelSummaries(searchBo: SearchHotelSummariesBo): Future[Seq[HotelSummary]] = {
    val select = sql"""
      SELECT * FROM dida_hotel_summary
    """

    val filter = sql"""
      WHERE name % ${searchBo.hotelQuery.get}
    """

    val action = select.concat(filter).as[HotelSummary]

    db.run(action)
  }
}
