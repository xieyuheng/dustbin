import assert from "assert"

import * as util from "./util"
import { Option } from "./option"

{
  let x: Option<number> = Option.some(3)
  let y: Option<number> = Option.some(1)
    .bind(x => Option.some(x + 1))
    .bind(x => Option.some(x + 1))
  assert(util.equal(x, y))
}

{
  let x: Option<number> = Option.none()
  let y: Option<number> = Option.some(1)
    .bind(x => Option.none<number>())
    .bind(x => Option.some(x + 1))
  assert(util.equal(x, y))
}

{
  let x: Option<number> = Option.some(3)
  let y: Option<number> = Option.some(1)
    .bind(x => Option.some(x + 1))
    .bind(x => Option.some(x + 1))
  assert(util.equal(x, y))
}
