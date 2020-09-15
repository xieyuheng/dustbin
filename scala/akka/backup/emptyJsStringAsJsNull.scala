  def emptyJsStringAsJsNull(value: JsValue): JsValue = {
    value match {
      case JsString("") => JsNull
      case JsArray(vec) => JsArray(vec.map(emptyJsStringAsJsNull))
      case JsObject(map) => JsObject(map.mapValues(emptyJsStringAsJsNull))
      case _ => value
    }
  }
