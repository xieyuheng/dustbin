import assert from "assert"
import fastDeepEqual from "fast-deep-equal"
import objectHash from "object-hash"

export function TODO(): never {
  throw new Error("TODO")
}

export function log<T>(x: T) {
  console.dir(x, { depth: null })
}

// NOTE Left close, right open integer interval.
export function* range(lo: number, hi: number) {
  let i = lo
  while (i < hi) {
    yield i
    i += 1
  }
}

export function* ranges(array: Array<[number, number]>) {
  for (let [lo, hi] of array) {
    for (let i of range(lo, hi)) {
      yield i
    }
  }
}

export function repeats<T>(f: () => T, n: number): Array<T> {
  let array = new Array()
  for (let _ of range(0, n)) {
    array.push(f())
  }
  return array
}

export function map_eq<K, V>(
  x: Map<K, V>,
  y: Map<K, V>,
  eq: (v: V, w: V) => boolean,
): boolean {
  if (x.size !== y.size) { return false }
  for (let k of x.keys()) {
    let v = x.get(k)
    let w = y.get(k)
    if (v === undefined) {
      return false
    } else if (w === undefined) {
      return false
    } else if (! eq(v, w)) {
      return false
    }
  }
  return true
}

export function obj_eq<K, V>(
  x: { [key: string]: V },
  y: { [key: string]: V },
  eq: (v: V, w: V) => boolean,
): boolean {
  return map_eq(obj2map(x), obj2map(y), eq)
}

export function array_eq<V>(
  x: Array<V>,
  y: Array<V>,
  eq: (v: V, w: V) => boolean,
): boolean {
  if (x.length !== y.length) { return false }
  for (let i of range(0, x.length)) {
    let v = x [i]
    let w = y [i]
    if (! eq(v, w)) {
      return false
    }
  }
  return true
}

export function panic(message: string): never {
  throw new Error(message)
}

export function map2obj<V>(
  map: Map<string, V>
): { [key: string]: V } {
  let obj: any = {}
  for (let [k, v] of map.entries()) {
    obj [k] = v
  }
  return obj
}

export function obj2map<V>(
  obj: { [key: string]: V }
): Map<string, V> {
  let map = new Map<string, V>()
  for (let k in obj) {
    map.set(k, obj [k])
  }
  return map
}

export function array2map<V>(array: Array<V>): Map<string, V> {
  let map = new Map()
  let len = array.length / 2
  assert(len = Math.floor(len))
  for (let i of range(0, len)) {
    map.set(array[i], array[i+1])
  }
  return map
}

export function array2obj<V>(array: Array<V>): { [key: string]: V } {
  return map2obj(array2map(array))
}

export function map_from<V>(
  x: Map<string, V> | { [key: string]: V }
): Map<string, V> {
  if (x instanceof Map) {
    return x
  } else {
    return obj2map(x)
  }
}

export function mapmap<K, A, B>(
  map: Map<K, A>,
  f: (a: A) => B,
): Map<K, B> {
  let new_map = new Map()
  for (let [k, a] of map.entries()) {
    new_map.set(k, f(a))
  }
  return new_map
}

export function rand_nat(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function rand_member<T>(array: Array<T>): T {
  let i = rand_nat(array.length)
  return array [i]
}

export function both(x: any, y: any, p: (x: any) => boolean): boolean {
  return p(x) && p(y)
}

export function str_find_index(str: string, p: (x: string) => boolean): number {
  let index = 0
  while (index < str.length) {
    let x = str[index]
    if (p(x)) {
      return index
    } else {
      index += 1
    }
  }
  return -1
}

// NOTE The module "fast-deep-equal": https://github.com/epoberezkin/fast-deep-equal
// Comparison details of Node's `assert.deepEqual()`:
//   https://nodejs.org/api/all.html#assert_assert_deepstrictequal_actual_expected_message
export function equal(x: any, y: any): boolean {
  if (typeof x.equal === 'function') {
    return x.equal(y)
  } else {
    return fastDeepEqual(x, y)
  }
}

export function hash(x: any): string {
  if (typeof x === "function") {
    return objectHash(x.toString())
  } else {
    return objectHash(JSON.stringify(x))
  }
}
