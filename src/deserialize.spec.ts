import "reflect-metadata";

import { expect } from "chai";
import { msgpackKey, deserialize } from "./index";
import { decode, encode } from "@msgpack/msgpack";

class ModelWithArrayKey {
  @msgpackKey(0)
  number!: number;
  @msgpackKey(1)
  string!: string;
  @msgpackKey(2)
  numberArray!: number[];
  @msgpackKey(3)
  stringArray!: string[];
  @msgpackKey(4)
  true!: boolean;
  @msgpackKey(5)
  false!: boolean;
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
  @msgpackKey()
  true!: boolean;
  @msgpackKey()
  false!: boolean;
}

describe("deserialize", () => {
  it("should correctly deserialize to model with index keys", () => {
    const source = decode(encode([1337, "hello", [1, 2], ["a", "b"], true, false]));
    const result = deserialize(source, ModelWithArrayKey);

    if (result) {
      expect(result.number).equals(1337);
      expect(result.string).equals("hello");
      expect(result.numberArray).deep.equals([1, 2]);
      expect(result.stringArray).deep.equals(["a", "b"]);
      expect(result.true).equals(true);
      expect(result.false).equals(false);
    } else {
      expect.fail();
    }
  });

  it("should correctly deserialize to model with named keys", () => {
    const source = decode(
      encode({
        number: 1337,
        string: "hello",
        numberArray: [1, 2],
        stringArray: ["a", "b"],
        true: true,
        false: false,
      })
    );
    const result = deserialize(source, ModelWithNamedKey);

    if (result) {
      expect(result.number).equals(1337);
      expect(result.string).equals("hello");
      expect(result.numberArray).deep.equals([1, 2]);
      expect(result.stringArray).deep.equals(["a", "b"]);
      expect(result.true).equals(true);
      expect(result.false).equals(false);
    } else {
      expect.fail();
    }
  });
});
