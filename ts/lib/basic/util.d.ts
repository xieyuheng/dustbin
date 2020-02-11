export declare function TODO(): never;
export declare function log<T>(x: T): void;
export declare function range(lo: number, hi: number): Generator<number, void, unknown>;
export declare function ranges(array: Array<[number, number]>): Generator<number, void, unknown>;
export declare function repeats<T>(f: () => T, n: number): Array<T>;
export declare function map_eq<K, V>(x: Map<K, V>, y: Map<K, V>, eq: (v: V, w: V) => boolean): boolean;
export declare function obj_eq<K, V>(x: {
    [key: string]: V;
}, y: {
    [key: string]: V;
}, eq: (v: V, w: V) => boolean): boolean;
export declare function array_eq<V>(x: Array<V>, y: Array<V>, eq: (v: V, w: V) => boolean): boolean;
export declare function panic(message: string): never;
export declare function map2obj<V>(map: Map<string, V>): {
    [key: string]: V;
};
export declare function obj2map<V>(obj: {
    [key: string]: V;
}): Map<string, V>;
export declare function array2map<V>(array: Array<V>): Map<string, V>;
export declare function array2obj<V>(array: Array<V>): {
    [key: string]: V;
};
export declare function map_from<V>(x: Map<string, V> | {
    [key: string]: V;
}): Map<string, V>;
export declare function mapmap<K, A, B>(map: Map<K, A>, f: (a: A) => B): Map<K, B>;
export declare function rand_nat(max: number): number;
export declare function rand_member<T>(array: Array<T>): T;
export declare function both(x: any, y: any, p: (x: any) => boolean): boolean;
export declare function str_find_index(str: string, p: (x: string) => boolean): number;
export declare function equal(x: any, y: any): boolean;
export declare function hash(x: any): string;
