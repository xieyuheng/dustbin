"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function add(a, b) {
    if (b) {
        return a + b;
    }
    else {
        return x => a + x;
    }
}
exports.add = add;
