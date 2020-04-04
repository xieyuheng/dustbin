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
class Setoid {
    constructor(value_equal = util.equal) {
        this.value_equal = value_equal;
        this.array = new Array();
    }
    equal(that) {
        if (this.size !== that.size) {
            return false;
        }
        else {
            for (let x of this) {
                if (!that.has(x)) {
                    return false;
                }
            }
            for (let x of that) {
                if (!that.has(x)) {
                    return false;
                }
            }
            return true;
        }
    }
    to_array() {
        return Array.from(this.array);
    }
    add(x) {
        let i = this.array.findIndex(y => this.value_equal(x, y));
        if (i === -1) {
            this.array.push(x);
        }
        return this;
    }
    has(x) {
        let i = this.array.findIndex(y => this.value_equal(x, y));
        return i !== -1;
    }
    delete(x) {
        let result = this.has(x);
        let i = this.array.findIndex(y => this.value_equal(x, y));
        if (i !== -1) {
            this.array = this.array.slice(0, i).concat(this.array.slice(i + 1));
        }
        return result;
    }
    get size() {
        return this.array.length;
    }
    *[Symbol.iterator]() {
        for (let x of this.array) {
            yield x;
        }
    }
    *entries() {
        for (let [k, v] of this.array.entries()) {
            yield [k, v];
        }
    }
}
exports.Setoid = Setoid;
