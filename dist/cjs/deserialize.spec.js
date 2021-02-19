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
var chai_1 = require("chai");
var index_1 = require("./index");
var msgpack_1 = require("@msgpack/msgpack");
var ModelWithArrayKey = /** @class */ (function () {
    function ModelWithArrayKey() {
    }
    __decorate([
        index_1.msgpackKey(0),
        __metadata("design:type", Number)
    ], ModelWithArrayKey.prototype, "number", void 0);
    __decorate([
        index_1.msgpackKey(1),
        __metadata("design:type", String)
    ], ModelWithArrayKey.prototype, "string", void 0);
    __decorate([
        index_1.msgpackKey(2),
        __metadata("design:type", Array)
    ], ModelWithArrayKey.prototype, "numberArray", void 0);
    __decorate([
        index_1.msgpackKey(3),
        __metadata("design:type", Array)
    ], ModelWithArrayKey.prototype, "stringArray", void 0);
    return ModelWithArrayKey;
}());
var ModelWithNamedKey = /** @class */ (function () {
    function ModelWithNamedKey() {
    }
    __decorate([
        index_1.msgpackKey(),
        __metadata("design:type", Number)
    ], ModelWithNamedKey.prototype, "number", void 0);
    __decorate([
        index_1.msgpackKey(),
        __metadata("design:type", String)
    ], ModelWithNamedKey.prototype, "string", void 0);
    __decorate([
        index_1.msgpackKey(),
        __metadata("design:type", Array)
    ], ModelWithNamedKey.prototype, "numberArray", void 0);
    __decorate([
        index_1.msgpackKey(),
        __metadata("design:type", Array)
    ], ModelWithNamedKey.prototype, "stringArray", void 0);
    return ModelWithNamedKey;
}());
describe('deserialize', function () {
    it('should correctly deserialize to model with index keys', function () {
        var result = index_1.deserialize(ModelWithArrayKey, msgpack_1.decode(msgpack_1.encode([1337, "hello", [1, 2], ["a", "b"]])));
        if (result) {
            chai_1.expect(result.number).equals(1337);
            chai_1.expect(result.string).equals('hello');
            chai_1.expect(result.numberArray).deep.equals([1, 2]);
            chai_1.expect(result.stringArray).deep.equals(["a", "b"]);
        }
        else {
            chai_1.expect.fail();
        }
    });
    it('should correctly deserialize to model with named keys', function () {
        var result = index_1.deserialize(ModelWithNamedKey, msgpack_1.decode(msgpack_1.encode({ number: 1337, string: "hello", numberArray: [1, 2], stringArray: ["a", "b"] })));
        if (result) {
            chai_1.expect(result.number).equals(1337);
            chai_1.expect(result.string).equals('hello');
            chai_1.expect(result.numberArray).deep.equals([1, 2]);
            chai_1.expect(result.stringArray).deep.equals(["a", "b"]);
        }
        else {
            chai_1.expect.fail();
        }
    });
});
//# sourceMappingURL=deserialize.spec.js.map