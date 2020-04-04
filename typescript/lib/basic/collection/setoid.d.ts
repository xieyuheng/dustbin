export declare class Setoid<V> {
    value_equal: (x: V, y: V) => boolean;
    private array;
    constructor(value_equal?: (x: V, y: V) => boolean);
    equal(that: Setoid<V>): boolean;
    to_array(): Array<V>;
    add(x: V): this;
    has(x: V): boolean;
    delete(x: V): boolean;
    get size(): number;
    [Symbol.iterator](): Generator<V, void, unknown>;
    entries(): Generator<[number, V], void, unknown>;
}
