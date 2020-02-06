"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TODO() {
    throw new Error("TODO");
}
exports.TODO = TODO;
function log(x) {
    console.dir(x, { depth: null });
}
exports.log = log;
/**
 * left close, right open integer interval.
 */
function* range(lo, hi) {
    let i = lo;
    while (i < hi) {
        yield i;
        i += 1;
    }
}
exports.range = range;
function* ranges(array) {
    for (let [lo, hi] of array) {
        for (let i of range(lo, hi)) {
            yield i;
        }
    }
}
exports.ranges = ranges;
function repeats(x, n) {
    let array = new Array();
    for (let _ of range(0, n)) {
        array.push(x);
    }
    return array;
}
exports.repeats = repeats;
function map_eq(x, y, eq) {
    if (x.size !== y.size) {
        return false;
    }
    for (let k of x.keys()) {
        let v = x.get(k);
        let w = y.get(k);
        if (v === undefined) {
            return false;
        }
        else if (w === undefined) {
            return false;
        }
        else if (!eq(v, w)) {
            return false;
        }
    }
    return true;
}
exports.map_eq = map_eq;
function array_eq(x, y, eq) {
    if (x.length !== y.length) {
        return false;
    }
    for (let i of range(0, x.length)) {
        let v = x[i];
        let w = y[i];
        if (!eq(v, w)) {
            return false;
        }
    }
    return true;
}
exports.array_eq = array_eq;
function panic(message) {
    throw new Error(message);
}
exports.panic = panic;
function map2obj(map) {
    let obj = {};
    for (let [k, v] of map.entries()) {
        obj[k] = v;
    }
    return obj;
}
exports.map2obj = map2obj;
function obj2map(obj) {
    let map = new Map();
    for (let k in obj) {
        map.set(k, obj[k]);
    }
    return map;
}
exports.obj2map = obj2map;
function map_from(x) {
    if (x instanceof Map) {
        return x;
    }
    else {
        return obj2map(x);
    }
}
exports.map_from = map_from;
function mapmap(map, f) {
    let new_map = new Map();
    for (let [k, a] of map.entries()) {
        new_map.set(k, f(a));
    }
    return new_map;
}
exports.mapmap = mapmap;
