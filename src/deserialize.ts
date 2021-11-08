import { getPropertyMetadata, getPropertyNames } from "./msgpack-key";

import { MessagePackMetadata } from "./msgpack-metadata";

export function deserialize<T>(
  source: any,
  type: { new (): T }
): T | null | undefined {
  if (source === undefined || source === null) {
    return source;
  }

  const destination: any = new type();

  // Get all the property names that has the jsonProperty attribute
  const propertyNames = new Set<string>(getPropertyNames(destination));

  if (type.prototype === Array.prototype && propertyNames.size === 0) {
    return source;
  }

  if (Object.getPrototypeOf(destination) === Object.prototype) {
    // The type is Object, assume a dictionary and read all the keys from the source
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        propertyNames.add(key);
      }
    }
  } else {
    // The type is a custom type, get all (assigned) property names from the destination (which does not have the jsonProperty attribute)
    for (const key in destination) {
      if (destination.hasOwnProperty(key)) {
        propertyNames.add(key);
      }
    }
  }

  for (const propertyName of Array.from(propertyNames)) {
    const propertyMetadata = getPropertyMetadata(destination, propertyName);
    if (propertyMetadata) {
      destination[propertyName] = getValue(
        source,
        destination,
        propertyName,
        propertyMetadata
      );
    } else if (source[propertyName] !== undefined) {
      destination[propertyName] = source[propertyName];
    }
  }

  return destination;
}

function getValue<T>(
  source: any,
  destination: T,
  propertyName: string,
  propertyMetadata: MessagePackMetadata
) {
  let key = propertyMetadata.key ?? propertyName;
  let propertyType = getPropertyType(destination, propertyName);
  const formatterDeserialize = propertyMetadata.formatter
    ? propertyMetadata.formatter.deserialize
    : undefined;

  if (isArray(propertyType)) {
    const type = propertyMetadata.type;

    if (formatterDeserialize) {
      if (isArray(source[key])) {
        return source[key].map((item: any) => formatterDeserialize(item));
      } else {
        return formatterDeserialize(source[key]);
      }
    } else if (type) {
      if (isArray(source[key])) {
        return source[key].map((item: any) => deserialize(item, type));
      } else {
        return undefined;
      }
    }
  }

  if (formatterDeserialize) {
    return formatterDeserialize(source[key]);
  } else if (!isPrimitive(propertyType)) {
    return deserialize(source[key], propertyType);
  } else {
    return source[key];
  }
}

function getPropertyType(target: any, propertyName: string) {
  return Reflect.getOwnMetadata(
    "design:type",
    Object.getPrototypeOf(target),
    propertyName
  );
}

function isArray(object: any) {
  if (object === Array) {
    return true;
  } else if (typeof Array.isArray === "function") {
    return Array.isArray(object);
  } else {
    return object instanceof Array;
  }
}

function isPrimitive(object: any) {
  switch (typeof object) {
    case "string":
    case "number":
    case "boolean":
      return true;
  }
  return (
    object instanceof String ||
    object === String ||
    object instanceof Number ||
    object === Number ||
    object instanceof Boolean ||
    object === Boolean
  );
}
