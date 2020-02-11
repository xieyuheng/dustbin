import * as util from "../util"

export class Mapoid<K, V> {
  private array: Array<[K, V]> = new Array()

  constructor(
    public key_equal: (x: K, y: K) => boolean = util.equal,
    public value_equal: (x: V, y: V) => boolean = util.equal,
  ) {}

  to_array(): Array<[K, V]> {
    return Array.from(this.array)
  }

  equal(that: Mapoid<K, V>): boolean {
    if (this.size !== that.size) {
      return false
    } else {
      for (let [x, y] of this) {
        let z = that.get(x)
        if (z === undefined) {
          return false
        } else if (! this.value_equal(y, z)) {
          return false
        } else if (! that.value_equal(y, z)) {
          return false
        }
      }
      for (let [x, y] of that) {
        let z = this.get(x)
        if (z === undefined) {
          return false
        } else if (! this.value_equal(y, z)) {
          return false
        } else if (! that.value_equal(y, z)) {
          return false
        }
      }
      return true
    }
  }

  get size(): number {
    return this.array.length
  }

  has(x: K): boolean {
    let i = this.array.findIndex(([y, _]) => this.key_equal(x, y))
    return i !== -1
  }

  get(x: K): V | undefined {
    let i = this.array.findIndex(([y, _]) => this.key_equal(x, y))
    if (i === -1) {
      return undefined
    } else {
      let [_, v] = this.array[i]
      return v
    }
  }

  get_unwrap(x: K): V {
    let v = this.get(x)
    if (v) {
      return v
    } else {
      throw new Error("map.get_unwrap")
    }
  }

  set(x: K, v: V): this {
    let i = this.array.findIndex(([y, _]) => this.key_equal(x, y))
    if (i === -1) {
      this.array.push([x, v])
    } else {
      this.array[i] = [x, v]
    }
    return this
  }

  set_array(array: Array<[K, V]>): this {
    for (let [k, v] of array) {
      this.set(k, v)
    }
    return this
  }

  set_iter(iter: Iterator<[K, V]>): this {
    while (true) {
      let result = iter.next()
      if (result.done) {
        break
      } else {
        let [k, v] = result.value
        this.set(k, v)
      }
    }
    return this
  }

  *[Symbol.iterator]() {
    for (let [k, v] of this.array) {
      yield [k, v] as [K, V]
    }
  }

  *entries() {
    for (let [k, v] of this.array) {
      yield [k, v] as [K, V]
    }
  }

  *keys() {
    for (let [k, v] of this.array) {
      yield k as K
    }
  }

  *values() {
    for (let [k, v] of this.array) {
      yield v as V
    }
  }

  // endo_map_on_value(f: (v: V) => V): Mapoid<K, V> {
  //   let map: Mapoid<K, V> = new Mapoid(this.key_equal, this.value_equal)
  //   return map
  // }

  compose<W>(that: Mapoid<V, W>): Mapoid<K, W> {
    let map: Mapoid<K, W> = new Mapoid(this.key_equal, that.value_equal)
    for (let [key, value] of this) {
      map.set(key, that.get_unwrap(value))
    }
    return map
  }
}
