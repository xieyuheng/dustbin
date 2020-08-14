import * as server from "../server"
import get_port from "get-port"
import process from "process"

export async function run(file: string, opts: any): Promise<void> {
  const port = opts.port || process.env.PORT || (await get_port({ port: 3000 }))
  const wsport = await get_port({ port: port + 1 })
  server.run(file, port, wsport)
}
