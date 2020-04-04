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
const util = __importStar(require("./util"));
const result_1 = require("./result");
{
    let x = result_1.Result.ok(3);
    let y = result_1.Result.ok(1)
        .bind(x => result_1.Result.ok(x + 1))
        .bind(x => result_1.Result.ok(x + 1));
    assert_1.default(util.equal(x, y));
}
{
    let x = result_1.Result.ok(10 + 1 + 10);
    let y = result_1.Result.ok(10)
        .bind(x => result_1.Result.ok(x + 1)
        .bind(y => result_1.Result.ok(y + x)));
    assert_1.default(util.equal(x, y));
}
{
    let x = result_1.Result.err("an error");
    let y = result_1.Result.ok(1)
        .bind(x => result_1.Result.err("an error"))
        .bind(x => result_1.Result.ok(x + 1));
    assert_1.default(util.equal(x, y));
}
