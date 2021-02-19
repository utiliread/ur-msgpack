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
            const date = <Date>source[0];
            return DateTime.fromObject({
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getUTCDay(),
                hour: date.getUTCHours(),
                minute: date.getUTCMinutes(),
                second: date.getUTCSeconds(),
                millisecond: date.getUTCMilliseconds(),
                zone: FixedOffsetZone.instance(source[1])
            });
        }
        else {
            return DateTime.fromJSDate(source);
        }
    }
}

export const dateTimeFormatter = new DateTimeFormatter();