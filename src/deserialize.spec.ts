import 'reflect-metadata';

import { expect } from 'chai';
import { msgpackKey, deserialize } from './index';
import { decode, encode } from '@msgpack/msgpack';

class ModelWithArrayKey {
    @msgpackKey(0)
    number!: number;
    @msgpackKey(1)
    string!: string;
    @msgpackKey(2)
    numberArray!: number[];
    @msgpackKey(3)
    stringArray!: string[];
}

class ModelWithNamedKey {
    @msgpackKey()
    number?: number;
    @msgpackKey()
    string?: string;
    @msgpackKey()
    numberArray?: number[];
    @msgpackKey()
    stringArray?: string[];
}

describe('deserialize', () => {
    it('should correctly deserialize to model with index keys', () => {
        const result = deserialize(ModelWithArrayKey, decode(encode([1337, "hello", [1, 2], ["a", "b"]])));

        if (result) {
            expect(result.number).equals(1337);
            expect(result.string).equals('hello');
            expect(result.numberArray).deep.equals([1, 2]);
            expect(result.stringArray).deep.equals(["a", "b"]);
        }
        else {
            expect.fail();
        }
    });

    it('should correctly deserialize to model with named keys', () => {
        const result = deserialize(ModelWithNamedKey, decode(encode({ number: 1337, string: "hello", numberArray: [1, 2], stringArray: ["a", "b"] })));

        if (result) {
            expect(result.number).equals(1337);
            expect(result.string).equals('hello');
            expect(result.numberArray).deep.equals([1, 2]);
            expect(result.stringArray).deep.equals(["a", "b"]);
        }
        else {
            expect.fail();
        }
    });
});