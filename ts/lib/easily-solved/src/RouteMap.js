"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteMap {
    constructor(map = new Map()) {
        this.map = map;
    }
    registerHandler(method, url, handlerName) {
        let method_map = this.map.get(url);
        if (method_map !== undefined) {
            method_map.set(method, handlerName);
        }
        else {
            this.map.set(url, new Map([
                [method, handlerName],
            ]));
        }
    }
    findHandler(method, url) {
        let method_map = this.map.get(url);
        if (method_map) {
            let handlerName = method_map.get(method);
            if (handlerName) {
                return handlerName;
            }
            else {
                throw new Error(`unknown url: ${url}`);
            }
        }
        else {
            throw new Error(`unknown method: ${method}`);
        }
    }
}
exports.RouteMap = RouteMap;
