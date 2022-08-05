import { NextApiRequest, NextApiResponse } from "next"
import { EmailRegister, EmailRegisterJson } from "../models/EmailRegister"
import ty from "@xieyuheng/ty"
import crypto from "crypto"

export class EmailRegisterController {
  constructor(public req: NextApiRequest, public res: NextApiResponse) {}

  async store(): Promise<Record<string, any>> {
    const scheme = ty.object({
      username: ty.string(),
      name: ty.string(),
      email: ty.string(),
    })

    const json = {
      ...scheme.validate(JSON.parse(this.req.body)),
      verification_token: crypto.randomBytes(32).toString("hex"),
      confirmation_token: crypto.randomBytes(32).toString("hex"),
      confirmation_code: crypto.randomBytes(3).toString("hex"),
    }

    const emailRegister = await EmailRegister.create(json)

    return emailRegister.toJSON()
  }

  confirm() {}

  verify() {}

  revoke() {}
}
