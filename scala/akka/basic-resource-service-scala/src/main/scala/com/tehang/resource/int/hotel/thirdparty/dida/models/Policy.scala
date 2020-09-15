package com.tehang.resource.int.hotel.thirdparty.dida.models

import slick.jdbc.PostgresProfile.api._

case class Policy(
  hotelId: Long,
  policyType: String,
  description: String,
  descriptionCn: String,
  policyId: Option[Long] = None,
  updateTime: Option[String] = None,
  createTime: Option[String] = None)

class PolicyTable(tag: Tag) extends Table[Policy](tag, "dida_policy") {
  def hotelId = column[Long]("hotel_id")
  def policyType = column[String]("policy_type")
  def description = column[String]("description")
  def descriptionCn = column[String]("description_cn")
  def policyId = column[Long]("policy_id", O.PrimaryKey, O.AutoInc)
  def updateTime = column[String]("update_time")
  def createTime = column[String]("create_time")

  def * = (
    hotelId,
    policyType,
    description,
    descriptionCn,
    policyId.?,
    updateTime.?,
    createTime.?,
  ).mapTo[Policy]
}
