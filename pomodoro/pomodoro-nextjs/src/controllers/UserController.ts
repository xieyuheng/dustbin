import { NextApiRequest, NextApiResponse } from "next"

export class UserController {
  constructor(public req: NextApiRequest, public res: NextApiResponse) {}
}
