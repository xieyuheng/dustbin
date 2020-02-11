export declare abstract class Option<T> {
    bind<X>(f: (x: T) => Option<X>): Option<X>;
    static none<X>(): Option<X>;
    static some<X>(value: X): Option<X>;
    unwrap(): T;
    unwrap_or_throw(error: Error): T;
    none_or_throw(error: Error): void;
    match<X, Y>({ some, none }: {
        some: (value: T) => X;
        none: () => Y;
    }): X | Y;
}
export declare class Some<T> extends Option<T> {
    value: T;
    constructor(value: T);
}
export declare class None<T> extends Option<T> {
    constructor();
}
