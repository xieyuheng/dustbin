import { Mod } from "@cicada-lang/lambda/lib/lang/mod"
import { ParsingError } from "@cicada-lang/lambda/lib/lang/errors"
import { lambdaLoadMod } from "./lambda-load-mod"

export class LambdaBlockState {
  mod?: Mod
  outputs: Array<string | undefined> = []
  error?: {
    message: string
    report?: string
  }

  constructor(public index: number, public info: string, public text: string) {
    this.init()
  }

  async init(): Promise<void> {
    this.mod = await lambdaLoadMod()
  }

  async run(): Promise<void> {
    if (this.mod === undefined) return

    delete this.error

    try {
      const block = this.mod.blocks.getOrFail(this.index)
      await block.run(this.mod, this.text)
      this.outputs = block.outputs.filter((output) => output)
    } catch (error) {
      if (error instanceof ParsingError) {
        this.error = {
          message: error.message,
          report: error.span.report(this.text),
        }
      } else if (error instanceof Error) {
        this.error = {
          message: error.message,
        }
      } else {
        this.error = {
          message: "Unknown Error",
          report: JSON.stringify(error),
        }
      }
    }
  }
}
