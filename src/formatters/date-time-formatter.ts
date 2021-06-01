import { DateTime, FixedOffsetZone } from "luxon";
import { MessagePackFormatter } from "../msgpack-formatter";

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
            return source;
        }

        if (Array.isArray(source) && source.length === 2) {
            const date = <Date>source[0];
            return DateTime.fromObject({
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getUTCDate(),
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