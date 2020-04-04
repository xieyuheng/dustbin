import * as util from "../util"

export class Setoid<V> {
  private array: Array <V> = new Array()

  constructor(
    public value_equal: (x: V, y: V) => boolean = util.equal,
  ) {}

  equal(that: Setoid<V>): boolean {
    if (this.size !== that.size) {
      return false
    } else {
      for (let x of this) {
        if (! that.has(x)) {
          return false
        }
      }
      for (let x of that) {
        if (! that.has(x)) {
          return false
        }
      }
      return true
    }
  }

  to_array(): Array <V> {
    return Array.from(this.array)
  }

  add(x: V): this {
    let i = this.array.findIndex(y => this.value_equal(x, y))
    if (i === -1) {
      this.array.push(x)
    }
    return this
  }

  has(x: V): boolean {
    let i = this.array.findIndex(y => this.value_equal(x, y))
    return i !== -1
  }

  delete(x: V): boolean {
    let result = this.has(x)
    let i = this.array.findIndex(y => this.value_equal(x, y))
    if (i !== -1) {
      this.array = this.array.slice(0, i).concat(this.array.slice(i + 1))
    }
    return result
  }

  get size(): number {
    return this.array.length
  }

  *[Symbol.iterator] () {
    for (let x of this.array) {
      yield x as V
    }
  }

  *entries () {
    for (let [k, v] of this.array.entries()) {
      yield [k, v] as [number, V]
    }
  }
}
