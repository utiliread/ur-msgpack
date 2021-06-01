"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialize = void 0;
var msgpack_key_1 = require("./msgpack-key");
function deserialize(type, source) {
    if (source === undefined || source === null) {
        return source;
    }
    var destination = new type();
    // Get all the property names that has the jsonProperty attribute
    var propertyNames = new Set(msgpack_key_1.getPropertyNames(destination));
    if (type.prototype === Array.prototype && propertyNames.size === 0) {
        return source;
    }
    if (Object.getPrototypeOf(destination) === Object.prototype) {
        // The type is Object, assume a dictionary and read all the keys from the source
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                propertyNames.add(key);
            }
        }
    }
    else {
        // The type is a custom type, get all (assigned) property names from the destination (which does not have the jsonProperty attribute)
        for (var key in destination) {
            if (destination.hasOwnProperty(key)) {
                propertyNames.add(key);
            }
        }
    }
    for (var _i = 0, _a = Array.from(propertyNames); _i < _a.length; _i++) {
        var propertyName = _a[_i];
        var propertyMetadata = msgpack_key_1.getPropertyMetadata(destination, propertyName);
        if (propertyMetadata) {
            destination[propertyName] = getValue(source, destination, propertyName, propertyMetadata);
        }
        else if (source[propertyName] !== undefined) {
            destination[propertyName] = source[propertyName];
        }
    }
    return destination;
}
exports.deserialize = deserialize;
function getValue(source, destination, propertyName, propertyMetadata) {
    var _a;
    var key = (_a = propertyMetadata.key) !== null && _a !== void 0 ? _a : propertyName;
    var propertyType = getPropertyType(destination, propertyName);
    var formatterDeserialize = propertyMetadata.formatter ? propertyMetadata.formatter.deserialize : undefined;
    if (isArray(propertyType)) {
        var type_1 = propertyMetadata.type;
        if (formatterDeserialize) {
            if (isArray(source[key])) {
                return source[key].map(function (item) { return formatterDeserialize(item); });
            }
            else {
                return formatterDeserialize(source[key]);
            }
        }
        else if (type_1) {
            if (isArray(source[key])) {
                return source[key].map(function (item) { return deserialize(type_1, item); });
            }
            else {
                return undefined;
            }
        }
    }
    if (formatterDeserialize) {
        return formatterDeserialize(source[key]);
    }
    else if (!isPrimitive(propertyType)) {
        return deserialize(propertyType, source[key]);
    }
    else {
        return source[key];
    }
}
;
function getPropertyType(target, propertyName) {
    return Reflect.getOwnMetadata("design:type", Object.getPrototypeOf(target), propertyName);
}
function isArray(object) {
    if (object === Array) {
        return true;
    }
    else if (typeof Array.isArray === "function") {
        return Array.isArray(object);
    }
    else {
        return object instanceof Array;
    }
}
function isPrimitive(object) {
    switch (typeof object) {
        case "string":
        case "number":
        case "boolean":
            return true;
    }
    return (object instanceof String || object === String ||
        object instanceof Number || object === Number ||
        object instanceof Boolean || object === Boolean);
}
//# sourceMappingURL=deserialize.js.map