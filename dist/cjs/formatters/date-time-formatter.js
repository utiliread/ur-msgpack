"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimeFormatter = void 0;
var luxon_1 = require("luxon");
var invalid = luxon_1.DateTime.invalid("invalid");
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
            return invalid;
        }
        if (Array.isArray(source) && source.length === 2) {
            return luxon_1.DateTime.fromJSDate(source[0], {
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