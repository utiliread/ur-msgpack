"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var luxon_1 = require("luxon");
var __1 = require("..");
var chai_1 = require("chai");
var msgpack_1 = require("@msgpack/msgpack");
var Model = /** @class */ (function () {
    function Model() {
    }
    __decorate([
        __1.msgpackKey({ key: 0, formatter: __1.dateTimeFormatter }),
        __metadata("design:type", luxon_1.DateTime)
    ], Model.prototype, "dateTime", void 0);
    return Model;
}());
describe('deserialize', function () {
    it('should correctly deserialize a datetime with offset', function () {
        var milleniumUtc = luxon_1.DateTime.fromISO("2000-01-01T00:00:00Z");
        var result = __1.deserialize(Model, msgpack_1.decode(msgpack_1.encode([milleniumUtc.toJSDate()])));
        if (result) {
            chai_1.expect(+result.dateTime).equals(+milleniumUtc);
        }
        else {
            chai_1.expect.fail();
        }
    });
    it('should correctly deserialize a datetime with offset', function () {
        var millenium = luxon_1.DateTime.fromISO("2000-01-01T00:00:00", { zone: "Europe/Copenhagen" });
        var milleniumUtc = luxon_1.DateTime.fromISO("2000-01-01T00:00:00Z");
        var result = __1.deserialize(Model, msgpack_1.decode(msgpack_1.encode([[milleniumUtc.toJSDate(), millenium.offset]])));
        if (result) {
            chai_1.expect(+result.dateTime).equals(+millenium);
        }
        else {
            chai_1.expect.fail();
        }
    });
    it('should correctly deserialize a datetime with offset and ms', function () {
        var millenium = luxon_1.DateTime.fromISO("2000-01-01T00:00:00.427", { zone: "Europe/Copenhagen" });
        var milleniumUtc = luxon_1.DateTime.fromISO("2000-01-01T00:00:00.427Z");
        var result = __1.deserialize(Model, msgpack_1.decode(msgpack_1.encode([[milleniumUtc.toJSDate(), millenium.offset]])));
        if (result) {
            chai_1.expect(+result.dateTime).equals(+millenium);
        }
        else {
            chai_1.expect.fail();
        }
    });
});
//# sourceMappingURL=date-time-formatter.spec.js.map