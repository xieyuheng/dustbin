import assert from "assert"

import * as util from "../util"
import { Setoid } from "./setoid"

{
  let x = new Setoid()
    .add(1)
    .add(2)
    .add(3)
  let y = new Setoid()
    .add(3)
    .add(2)
    .add(1)
  assert(util.equal(x, y))
}

{
  let a = new Setoid()
    .add(1)
    .add(2)
    .add(3)
  assert(a.size === 3)

  let x = new Setoid()
    .add(a)
    .add(a)
    .add(a)
  assert(x.size === 1)

  let b = new Setoid()
    .add(3)
    .add(2)
    .add(1)
  assert(b.size === 3)

  let y = new Setoid()
    .add(b)
    .add(b)
    .add(b)
  assert(y.size === 1)

  assert(util.equal(x, y))
}
