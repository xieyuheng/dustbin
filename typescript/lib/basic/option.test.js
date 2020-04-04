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
const option_1 = require("./option");
{
    let x = option_1.Option.some(3);
    let y = option_1.Option.some(1)
        .bind(x => option_1.Option.some(x + 1))
        .bind(x => option_1.Option.some(x + 1));
    assert_1.default(util.equal(x, y));
}
{
    let x = option_1.Option.none();
    let y = option_1.Option.some(1)
        .bind(x => option_1.Option.none())
        .bind(x => option_1.Option.some(x + 1));
    assert_1.default(util.equal(x, y));
}
{
    let x = option_1.Option.some(3);
    let y = option_1.Option.some(1)
        .bind(x => option_1.Option.some(x + 1))
        .bind(x => option_1.Option.some(x + 1));
    assert_1.default(util.equal(x, y));
}
