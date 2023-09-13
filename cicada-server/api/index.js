require("./fetch-polyfill")
const express = require("express")
const asyncHandler = require("express-async-handler")
const { Loader, Mod, Errors } = require("@cicada-lang/cicada")

const app = express()

app.use(express.text({ type: "*/*" }))

app.post(
  "/",
  asyncHandler(async (req, res) => {
    const text = req.body
    const url = new URL("cicada-server://")
    const loader = new Loader({})

    loader.fetcher.register("cicada-server", (url) => "")

    try {
      const mod = await loader.load(url, { text })
      const outputs = Array.from(mod.outputs.values())
      res.setHeader("Content-Type", "application/jsonl")
      res.send(outputs.join("\n") + "\n")
    } catch (error) {
      if (!(error instanceof Error)) {
        res.send(JSON.stringify(error))
      } else if (error instanceof Errors.ParsingError) {
        res.send(error.report(text))
      } else {
        res.send(error.message)
      }
    }
  }),
)

module.exports = app
