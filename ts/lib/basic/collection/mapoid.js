"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(require("../util"));
class Mapoid {
    constructor(key_equal = util.equal, value_equal = util.equal) {
        this.key_equal = key_equal;
        this.value_equal = value_equal;
        this.array = new Array();
    }
    to_array() {
        return Array.from(this.array);
    }
    equal(that) {
        if (this.size !== that.size) {
            return false;
        }
        else {
            for (let [x, y] of this) {
                let z = that.get(x);
                if (z === undefined) {
                    return false;
                }
                else if (!this.value_equal(y, z)) {
                    return false;
                }
                else if (!that.value_equal(y, z)) {
                    return false;
                }
            }
            for (let [x, y] of that) {
                let z = this.get(x);
                if (z === undefined) {
                    return false;
                }
                else if (!this.value_equal(y, z)) {
                    return false;
                }
                else if (!that.value_equal(y, z)) {
                    return false;
                }
            }
            return true;
        }
    }
    get size() {
        return this.array.length;
    }
    has(x) {
        let i = this.array.findIndex(([y, _]) => this.key_equal(x, y));
        return i !== -1;
    }
    get(x) {
        let i = this.array.findIndex(([y, _]) => this.key_equal(x, y));
        if (i === -1) {
            return undefined;
        }
        else {
            let [_, v] = this.array[i];
            return v;
        }
    }
    get_unwrap(x) {
        let v = this.get(x);
        if (v) {
            return v;
        }
        else {
            throw new Error("map.get_unwrap");
        }
    }
    set(x, v) {
        let i = this.array.findIndex(([y, _]) => this.key_equal(x, y));
        if (i === -1) {
            this.array.push([x, v]);
        }
        else {
            this.array[i] = [x, v];
        }
        return this;
    }
    set_array(array) {
        for (let [k, v] of array) {
            this.set(k, v);
        }
        return this;
    }
    set_iter(iter) {
        while (true) {
            let result = iter.next();
            if (result.done) {
                break;
            }
            else {
                let [k, v] = result.value;
                this.set(k, v);
            }
        }
        return this;
    }
    *[Symbol.iterator]() {
        for (let [k, v] of this.array) {
            yield [k, v];
        }
    }
    *entries() {
        for (let [k, v] of this.array) {
            yield [k, v];
        }
    }
    *keys() {
        for (let [k, v] of this.array) {
            yield k;
        }
    }
    *values() {
        for (let [k, v] of this.array) {
            yield v;
        }
    }
    // endo_map_on_value(f: (v: V) => V): Mapoid<K, V> {
    //   let map: Mapoid<K, V> = new Mapoid(this.key_equal, this.value_equal)
    //   return map
    // }
    compose(that) {
        let map = new Mapoid(this.key_equal, that.value_equal);
        for (let [key, value] of this) {
            map.set(key, that.get_unwrap(value));
        }
        return map;
    }
}
exports.Mapoid = Mapoid;
