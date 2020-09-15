package com.tehang.resource.int.hotel.thirdparty.dida.sync

object LogMsg {
  def finishedWithAnyReport(report: Any) =
    s"finished, report: ${report}"

  def error(error: Any) =
    s"error: ${error}"

  def failToUpdateRows[A](rows: Seq[A], error: Throwable) = {
    var s = ""
    rows.foreach { row => s += row.toString + "\n" }
    // s"fail to update rows, error: ${error}, rows: \n${s}\n"
    s"fail to update rows, error: ${error}"
  }

  def noJsonFieldForAsset(fieldName: String, assetName: String) =
    s"no JsonField: ${fieldName}, for ${assetName}"

  def willRequest(assetName: String, url: String) =
    s"will request ${assetName} from: ${url}"

  def willSaveTo(assetName: String, path: String) =
    s"will save ${assetName} to ${path}"

  def successfullySavedTo(assetName: String, path: String) =
    s"successfully saved ${assetName} to: ${path}"

  def willProcess(assetName: String, report: Any) =
    s"will process ${assetName}: ${report}"

  def inserting(
    assetName: String,
    inserted: Any,
    tick: Option[Long] = None
  ) = {
    tick match {
      case Some(n) =>
        s"inserting ${assetName}, inserted: ${inserted}, tick: ${n}"
      case None =>
        s"inserting ${assetName}, inserted: ${inserted}"
    }
  }
}
