import assert from "assert"
import * as util from "./util"

{
  let x = util.hash([1, 2, new Set([1, 2, [1, 2, 3]])])
  let y = util.hash([1, 2, new Set([1, 2, [1, 2, 3]])])
  assert(x === y)
}

{
  let x = util.hash([1, {x: "x", y: "y"}, new Set([1, 2, [1, 2, {x: "x", y: "y"}]])])
  let y = util.hash([1, {x: "x", y: "y"}, new Set([1, 2, [1, 2, {x: "x", y: "y"}]])])
  assert(x === y)
}

{
  function f(x: number): string {
    return `x: ${x}`
  }

  let x = util.hash([f, {x: "x", y: "y"}, new Set([1, 2, [1, 2, {x: "x", y: "y"}]])])
  let y = util.hash([f, {x: "x", y: "y"}, new Set([1, 2, [1, 2, {x: "x", y: "y"}]])])
  assert(x === y)
}

{
  function f(x: number): (y: number) => string {
    return (y: number) => `x: ${x}, y: ${y}`
  }

  let x = util.hash(f(1))
  let y = util.hash(f(1))
  assert(x === y)
}
