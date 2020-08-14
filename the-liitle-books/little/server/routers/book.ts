import * as Router from "../router"
import * as Node from "../../node"
import path from "path"
import fs from "fs"

export function book(file: string): Router.Router {
  return Router.safe(async (_req, res) => {
    const text = await fs.promises.readFile(path.resolve(file), {
      encoding: "utf-8",
    })

    res.json(Node.parse_nodes(text))
  })
}
