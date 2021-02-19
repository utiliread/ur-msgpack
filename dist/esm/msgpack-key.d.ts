import { MessagePackMetadata } from './msgpack-metadata';
/**
 * Attribute specifying a key to be serialized
 * @param keyOrMetadata The array index, map key name or metadata describing how to construct the property
 */
export declare function msgpackKey(keyOrMetadata?: number | string | MessagePackMetadata): (target: any, propertyKey: string) => void;
export declare function getPropertyMetadata(instance: any, propertyKey: string): MessagePackMetadata | undefined;
export declare function getPropertyNames(instance: any): string[];
