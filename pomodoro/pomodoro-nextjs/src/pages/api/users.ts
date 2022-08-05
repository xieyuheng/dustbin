import { NextApiRequest, NextApiResponse } from "next"
import { User } from "../../models/User"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const user = await User.create({
    username: "xieyuheng",
    name: "Xie Yuheng",
    email: "xyheme@gmail.com",
  })

  res.status(200).json({ id: user.entityId })
}
