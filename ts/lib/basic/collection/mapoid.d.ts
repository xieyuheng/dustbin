export declare class Mapoid<K, V> {
    key_equal: (x: K, y: K) => boolean;
    value_equal: (x: V, y: V) => boolean;
    private array;
    constructor(key_equal?: (x: K, y: K) => boolean, value_equal?: (x: V, y: V) => boolean);
    to_array(): Array<[K, V]>;
    equal(that: Mapoid<K, V>): boolean;
    get size(): number;
    has(x: K): boolean;
    get(x: K): V | undefined;
    get_unwrap(x: K): V;
    set(x: K, v: V): this;
    set_array(array: Array<[K, V]>): this;
    set_iter(iter: Iterator<[K, V]>): this;
    [Symbol.iterator](): Generator<[K, V], void, unknown>;
    entries(): Generator<[K, V], void, unknown>;
    keys(): Generator<K, void, unknown>;
    values(): Generator<V, void, unknown>;
    compose<W>(that: Mapoid<V, W>): Mapoid<K, W>;
}
