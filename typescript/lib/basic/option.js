"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Option {
    bind(f) {
        if (this instanceof Some) {
            return f(this.value);
        }
        else if (this instanceof None) {
            return new None();
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    static none() {
        return new None();
    }
    static some(value) {
        return new Some(value);
    }
    unwrap() {
        if (this instanceof Some) {
            return this.value;
        }
        else if (this instanceof None) {
            throw new Error(`unwrap a None`);
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    unwrap_or_throw(error) {
        if (this instanceof Some) {
            return this.value;
        }
        else if (this instanceof None) {
            throw error;
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    none_or_throw(error) {
        if (this instanceof None) {
        }
        else if (this instanceof Some) {
            throw error;
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    match({ some, none }) {
        if (this instanceof Some) {
            return some(this.value);
        }
        else if (this instanceof None) {
            return none();
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
}
exports.Option = Option;
class Some extends Option {
    constructor(value) {
        super();
        this.value = value;
    }
}
exports.Some = Some;
class None extends Option {
    constructor() {
        super();
    }
}
exports.None = None;
