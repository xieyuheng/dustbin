  implicit object LocalDateTimeFormat extends JsonFormat[LocalDateTime] {

    def write(dateTime: LocalDateTime): JsString =
      JsString(dateTime.toString)

    def read(value: JsValue) = value match {
      case JsString(dateTime) =>
        LocalDateTime.parse(dateTime, DateTimeFormatter.ISO_INSTANT)
      case _ =>
        deserializationError("LocalDateTime expected.")
    }
  }
