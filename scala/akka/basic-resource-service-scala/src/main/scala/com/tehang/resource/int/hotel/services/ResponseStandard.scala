package com.tehang.resource.int.hotel.services

import spray.json._

trait ResponseStandard {

  def okJsonRes(value: JsValue): JsObject = {
    JsObject(
      "code" -> JsNumber(0),
      "message" -> JsString("ok"),
      "data" -> value)
  }
}
