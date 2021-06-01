var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { DateTime } from "luxon";
import { msgpackKey, deserialize, dateTimeFormatter } from "..";
import { expect } from 'chai';
import { decode, encode } from '@msgpack/msgpack';
var Model = /** @class */ (function () {
    function Model() {
    }
    __decorate([
        msgpackKey({ key: 0, formatter: dateTimeFormatter }),
        __metadata("design:type", DateTime)
    ], Model.prototype, "dateTime", void 0);
    return Model;
}());
describe('deserialize', function () {
    it('should correctly deserialize a datetime with offset', function () {
        var milleniumUtc = DateTime.fromISO("2000-01-01T00:00:00Z");
        var result = deserialize(Model, decode(encode([milleniumUtc.toJSDate()])));
        if (result) {
            expect(+result.dateTime).equals(+milleniumUtc);
        }
        else {
            expect.fail();
        }
    });
    it('should correctly deserialize a datetime with offset', function () {
        var millenium = DateTime.fromISO("2000-01-01T00:00:00", { zone: "Europe/Copenhagen" });
        var milleniumUtc = DateTime.fromISO("2000-01-01T00:00:00Z");
        var result = deserialize(Model, decode(encode([[milleniumUtc.toJSDate(), millenium.offset]])));
        if (result) {
            expect(+result.dateTime).equals(+millenium);
        }
        else {
            expect.fail();
        }
    });
    it('should correctly deserialize a datetime with offset and ms', function () {
        var millenium = DateTime.fromISO("2000-01-01T00:00:00.427", { zone: "Europe/Copenhagen" });
        var milleniumUtc = DateTime.fromISO("2000-01-01T00:00:00.427Z");
        var result = deserialize(Model, decode(encode([[milleniumUtc.toJSDate(), millenium.offset]])));
        if (result) {
            expect(+result.dateTime).equals(+millenium);
        }
        else {
            expect.fail();
        }
    });
});
//# sourceMappingURL=date-time-formatter.spec.js.map