package com.tehang.resource.int.hotel.thirdparty.dida.sync

object ExceptionMsg {
  def noJsonField(fieldName: String) =
    s"no JsonField: ${fieldName}"

  def parsingFail(report: Any) =
    s"parsing fail, report: ${report}"
}
