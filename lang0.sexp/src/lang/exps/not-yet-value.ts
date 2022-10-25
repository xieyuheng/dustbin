import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.neutral.readback(ctx)
  }

  apply(arg: Value): Value {
    return new Exps.NotYetValue(new Exps.ApNeutral(this.neutral, arg))
  }
}
