import { DateTime, FixedOffsetZone } from "luxon";
import { MessagePackFormatter } from "../msgpack-formatter";

const invalid = DateTime.invalid("invalid");

class DateTimeFormatter implements MessagePackFormatter {
    serialize(source: any) {
        if (!source) {
            return null;
        }

        if (DateTime.isDateTime(source)) {
            if (!source.isValid) {
                return null;
            }

            return [source.toJSDate(), source.zone.offset];
        }
        else {
            throw new Error(`Not supported ${source}`);
        }
    }

    deserialize(source: any) {
        if (!source) {
            return invalid;
        }

        if (Array.isArray(source) && source.length === 2) {
            return DateTime.fromJSDate(source[0], {
                zone: FixedOffsetZone.instance(source[1])
            });
        }
        else {
            return DateTime.fromJSDate(source);
        }
    }
}

export const dateTimeFormatter = new DateTimeFormatter();