import "reflect-metadata";

import { DateTime } from "luxon";
import { msgpackKey, deserialize, dateTimeFormatter } from "..";
import { expect } from "chai";
import { decode, encode } from "@msgpack/msgpack";

class Model {
  @msgpackKey({ key: 0, formatter: dateTimeFormatter })
  dateTime!: DateTime;
}

describe("deserialize", () => {
  it("should correctly deserialize a datetime with offset", () => {
    const milleniumUtc = DateTime.fromISO("2000-01-01T00:00:00Z");
    const source = decode(encode([milleniumUtc.toJSDate()]));
    const result = deserialize(source, Model);

    if (result) {
      expect(+result.dateTime).equals(+milleniumUtc);
    } else {
      expect.fail();
    }
  });

  it("should correctly deserialize a datetime with offset", () => {
    const millenium = DateTime.fromISO("2000-01-01T00:00:00", {
      zone: "Europe/Copenhagen",
    });
    const milleniumUtc = DateTime.fromISO("2000-01-01T00:00:00Z");
    const source = decode(encode([[milleniumUtc.toJSDate(), millenium.offset]]));
    const result = deserialize(source, Model);

    if (result) {
      expect(+result.dateTime).equals(+millenium);
    } else {
      expect.fail();
    }
  });

  it("should correctly deserialize a datetime with offset and ms", () => {
    const millenium = DateTime.fromISO("2000-01-01T00:00:00.427", {
      zone: "Europe/Copenhagen",
    });
    const milleniumUtc = DateTime.fromISO("2000-01-01T00:00:00.427Z");
    const source = decode(encode([[milleniumUtc.toJSDate(), millenium.offset]]));
    const result = deserialize(source, Model);

    if (result) {
      expect(+result.dateTime).equals(+millenium);
    } else {
      expect.fail();
    }
  });
});
