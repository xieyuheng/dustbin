"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const util = __importStar(require("../util"));
const setoid_1 = require("./setoid");
{
    let x = new setoid_1.Setoid()
        .add(1)
        .add(2)
        .add(3);
    let y = new setoid_1.Setoid()
        .add(3)
        .add(2)
        .add(1);
    assert_1.default(util.equal(x, y));
}
{
    let a = new setoid_1.Setoid()
        .add(1)
        .add(2)
        .add(3);
    assert_1.default(a.size === 3);
    let x = new setoid_1.Setoid()
        .add(a)
        .add(a)
        .add(a);
    assert_1.default(x.size === 1);
    let b = new setoid_1.Setoid()
        .add(3)
        .add(2)
        .add(1);
    assert_1.default(b.size === 3);
    let y = new setoid_1.Setoid()
        .add(b)
        .add(b)
        .add(b);
    assert_1.default(y.size === 1);
    assert_1.default(util.equal(x, y));
}
