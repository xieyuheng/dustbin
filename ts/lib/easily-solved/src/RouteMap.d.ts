export declare class RouteMap {
    map: Map<string, Map<string, string>>;
    constructor(map?: Map<string, Map<string, string>>);
    registerHandler(method: string, url: string, handlerName: string): void;
    findHandler(method: string, url: string): string;
}
