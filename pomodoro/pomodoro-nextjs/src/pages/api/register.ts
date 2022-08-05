import { NextApiRequest, NextApiResponse } from "next"
import { EmailRegisterController } from "../../controllers/EmailRegisterController"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404).end()

  const controller = new EmailRegisterController(req, res)
  const data = await controller.store()
  res.status(200).json(data)
}
