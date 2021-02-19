import { MessagePackMetadata } from './msgpack-metadata';

const PROPERTY_METADATA_KEY = 'msgpackKey';
const PROPERTY_NAMES_METADATA_KEY = 'msgpackKeyNames';

/**
 * Attribute specifying a key to be serialized
 * @param keyOrMetadata The array index, map key name or metadata describing how to construct the property
 */
export function msgpackKey(keyOrMetadata?: number | string | MessagePackMetadata) {
    let metadata: MessagePackMetadata = {};
    
    if (typeof keyOrMetadata === "number" || typeof keyOrMetadata === 'string') {
        metadata.key = keyOrMetadata;
    }
    else if (keyOrMetadata) {
        metadata = keyOrMetadata;
    }

    if (!!metadata.type && !!metadata.formatter) {
        throw "Only one of type or formatter can be specified";
    }

    return function (target: any, propertyKey: string) {
        const propertyNames = Reflect.getOwnMetadata(PROPERTY_NAMES_METADATA_KEY, target) || [];
        
        propertyNames.push(propertyKey);
        Reflect.defineMetadata(PROPERTY_NAMES_METADATA_KEY, propertyNames, target);
        Reflect.defineMetadata(PROPERTY_METADATA_KEY, metadata, target, propertyKey);
    };
}

export function getPropertyMetadata(instance: any, propertyKey: string): MessagePackMetadata | undefined {
    return Reflect.getOwnMetadata(PROPERTY_METADATA_KEY, Object.getPrototypeOf(instance), propertyKey);
}

export function getPropertyNames(instance: any): string[] {
    return Reflect.getOwnMetadata(PROPERTY_NAMES_METADATA_KEY, Object.getPrototypeOf(instance)) || [];
}