export declare function deserialize<T>(type: {
    new (): T;
}, source: any): T | null | undefined;
