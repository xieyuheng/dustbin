export declare function TODO(): never;
export declare function log<T>(x: T): void;
/**
 * left close, right open integer interval.
 */
export declare function range(lo: number, hi: number): Generator<number, void, unknown>;
export declare function ranges(array: Array<[number, number]>): Generator<number, void, unknown>;
export declare function repeats<T>(x: T, n: number): Array<T>;
export declare function map_eq<K, V>(x: Map<K, V>, y: Map<K, V>, eq: (v: V, w: V) => boolean): boolean;
export declare function array_eq<V>(x: Array<V>, y: Array<V>, eq: (v: V, w: V) => boolean): boolean;
export declare function panic(message: string): never;
export declare function map2obj<V>(map: Map<string, V>): {
    [key: string]: V;
};
export declare function obj2map<V>(obj: {
    [key: string]: V;
}): Map<string, V>;
export declare type to_map_t<V> = Map<string, V> | {
    [key: string]: V;
};
export declare function map_from<V>(x: Map<string, V> | {
    [key: string]: V;
}): Map<string, V>;
export declare function mapmap<K, A, B>(map: Map<K, A>, f: (a: A) => B): Map<K, B>;
