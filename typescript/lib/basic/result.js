"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    bind(f) {
        if (this instanceof Ok) {
            return f(this.value);
        }
        else if (this instanceof Err) {
            return new Err(this.error);
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    static ok(value) {
        return new Ok(value);
    }
    static err(error) {
        return new Err(error);
    }
    unwrap() {
        if (this instanceof Ok) {
            return this.value;
        }
        else if (this instanceof Err) {
            throw new Error(`unwrap an Err`);
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    unwrap_err() {
        if (this instanceof Err) {
            return this.error;
        }
        else if (this instanceof Ok) {
            throw new Error(`unwrap_err an Ok`);
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    unwrap_or_throw(error) {
        if (this instanceof Ok) {
            return this.value;
        }
        else if (this instanceof Err) {
            throw error;
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    unwrap_err_or_throw(error) {
        if (this instanceof Err) {
            return this.error;
        }
        else if (this instanceof Ok) {
            throw error;
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
    match({ ok, err }) {
        if (this instanceof Ok) {
            return ok(this.value);
        }
        else if (this instanceof Err) {
            return err(this.error);
        }
        else {
            throw new Error(`unknown sub class: ${this.constructor.name}`);
        }
    }
}
exports.Result = Result;
class Ok extends Result {
    constructor(value) {
        super();
        this.value = value;
    }
}
exports.Ok = Ok;
class Err extends Result {
    constructor(error) {
        super();
        this.error = error;
    }
}
exports.Err = Err;
