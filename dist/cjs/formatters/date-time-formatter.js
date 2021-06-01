"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimeFormatter = void 0;
var luxon_1 = require("luxon");
var DateTimeFormatter = /** @class */ (function () {
    function DateTimeFormatter() {
    }
    DateTimeFormatter.prototype.serialize = function (source) {
        if (!source) {
            return null;
        }
        if (luxon_1.DateTime.isDateTime(source)) {
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
            return source;
        }
        if (Array.isArray(source) && source.length === 2) {
            var date = source[0];
            return luxon_1.DateTime.fromObject({
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getUTCDate(),
                hour: date.getUTCHours(),
                minute: date.getUTCMinutes(),
                second: date.getUTCSeconds(),
                millisecond: date.getUTCMilliseconds(),
                zone: luxon_1.FixedOffsetZone.instance(source[1])
            });
        }
        else {
            return luxon_1.DateTime.fromJSDate(source);
        }
    };
    return DateTimeFormatter;
}());
exports.dateTimeFormatter = new DateTimeFormatter();
//# sourceMappingURL=date-time-formatter.js.map