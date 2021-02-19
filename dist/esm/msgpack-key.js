var PROPERTY_METADATA_KEY = 'msgpackKey';
var PROPERTY_NAMES_METADATA_KEY = 'msgpackKeyNames';
/**
 * Attribute specifying a key to be serialized
 * @param keyOrMetadata The array index, map key name or metadata describing how to construct the property
 */
export function msgpackKey(keyOrMetadata) {
    var metadata = {};
    if (typeof keyOrMetadata === "number" || typeof keyOrMetadata === 'string') {
        metadata.key = keyOrMetadata;
    }
    else if (keyOrMetadata) {
        metadata = keyOrMetadata;
    }
    if (!!metadata.type && !!metadata.formatter) {
        throw "Only one of type or formatter can be specified";
    }
    return function (target, propertyKey) {
        var propertyNames = Reflect.getOwnMetadata(PROPERTY_NAMES_METADATA_KEY, target) || [];
        propertyNames.push(propertyKey);
        Reflect.defineMetadata(PROPERTY_NAMES_METADATA_KEY, propertyNames, target);
        Reflect.defineMetadata(PROPERTY_METADATA_KEY, metadata, target, propertyKey);
    };
}
export function getPropertyMetadata(instance, propertyKey) {
    return Reflect.getOwnMetadata(PROPERTY_METADATA_KEY, Object.getPrototypeOf(instance), propertyKey);
}
export function getPropertyNames(instance) {
    return Reflect.getOwnMetadata(PROPERTY_NAMES_METADATA_KEY, Object.getPrototypeOf(instance)) || [];
}
//# sourceMappingURL=msgpack-key.js.map