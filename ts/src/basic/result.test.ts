import assert from "assert"

import * as util from "./util"
import { Result } from "./result"

{
  let x = Result.ok(3)
  let y = Result.ok(1)
    .bind(x => Result.ok(x + 1))
    .bind(x => Result.ok(x + 1))
  assert(util.equal(x, y))
}

{
  let x = Result.ok(10 + 1 + 10)
  let y = Result.ok(10)
    .bind(x => Result.ok(x + 1)
          .bind(y => Result.ok(y + x)))
  assert(util.equal(x, y))
}

{
  let x = Result.err("an error")
  let y = Result.ok(1)
    .bind(x => Result.err<number, string>("an error"))
    .bind(x => Result.ok<number, string>(x + 1))
  assert(util.equal(x, y))
}
