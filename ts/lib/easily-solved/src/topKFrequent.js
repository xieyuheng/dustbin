"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function num_histgram(nums) {
    let map = new Map();
    for (let n of nums) {
        if (map.has(n)) {
            map.set(n, map.get(n) + 1);
        }
        else {
            map.set(n, 1);
        }
    }
    return map;
}
exports.num_histgram = num_histgram;
function topKFrequent(nums, k) {
    let sorted = Array.from(num_histgram(nums).entries())
        .sort(([k1, v1], [k2, v2]) => v2 - v1);
    return sorted.slice(0, k).map(([k, v]) => k);
}
exports.topKFrequent = topKFrequent;
