export declare abstract class Result<T, E> {
    bind<X>(f: (x: T) => Result<X, E>): Result<X, E>;
    static ok<X, Y>(value: X): Result<X, Y>;
    static err<X, Y>(error: Y): Result<X, Y>;
    unwrap(): T;
    unwrap_err(): E;
    unwrap_or_throw(error: Error): T;
    unwrap_err_or_throw(error: Error): E;
    match<X, Y>({ ok, err }: {
        ok: (value: T) => X;
        err: (error: E) => Y;
    }): X | Y;
}
export declare class Ok<T, E> extends Result<T, E> {
    value: T;
    constructor(value: T);
}
export declare class Err<T, E> extends Result<T, E> {
    error: E;
    constructor(error: E);
}
