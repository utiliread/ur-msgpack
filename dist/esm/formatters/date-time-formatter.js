import { DateTime, FixedOffsetZone } from "luxon";
var invalid = DateTime.invalid("invalid");
var DateTimeFormatter = /** @class */ (function () {
    function DateTimeFormatter() {
    }
    DateTimeFormatter.prototype.serialize = function (source) {
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
            throw new Error("Not supported " + source);
        }
    };
    DateTimeFormatter.prototype.deserialize = function (source) {
        if (!source) {
            return invalid;
        }
        if (Array.isArray(source) && source.length === 2) {
            var date = source[0];
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
    };
    return DateTimeFormatter;
}());
export var dateTimeFormatter = new DateTimeFormatter();
//# sourceMappingURL=date-time-formatter.js.map