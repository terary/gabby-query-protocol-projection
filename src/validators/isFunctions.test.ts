import {
  hasNegativeScientificNotation,
  isString,
  isDecimal,
  isInteger,
  isDateISO8601String,
  isDate,
  hasExactlyProperties,
} from "./isFunctions";

describe("isFunctions", () => {
  describe("hasScientificNotation", () => {
    it("Should find nn(e-)nn, n being any integer, but not nn(e)nn or nn(e+)nn", () => {
      const x = 1;
      expect(hasNegativeScientificNotation("2e-1")).toStrictEqual(true);
      expect(hasNegativeScientificNotation("e-1")).toStrictEqual(false);
      expect(hasNegativeScientificNotation("1e-")).toStrictEqual(false);
      expect(hasNegativeScientificNotation("1e-0")).toStrictEqual(true);
      expect(hasNegativeScientificNotation("1e0")).toStrictEqual(false);
      expect(hasNegativeScientificNotation("1e3")).toStrictEqual(false);
    });
  }); //hasScientificNotation
  describe("isString", () => {
    ["1", "0.3", "3e10", "true", "2020-12-31", String("red dragon")].forEach((str) => {
      it(`Should be true for anything that looks like a string (${str})`, () => {
        expect(isString(str)).toStrictEqual(true);
      });
    });
    [
      undefined,
      false,
      1,
      0.3,
      3e10,
      true,
      new Date("2020-12-31"),
      [String("red dragon")],
    ].forEach((str) => {
      it(`Should be false for anything that is not string (${str})`, () => {
        expect(isString(str)).toStrictEqual(false);
      });
    });
  }); // isString
  describe("isDecimal", () => {
    it("Should return true for decimals number", () => {
      [1.2, -0.1, 0.0, 0.1, 3.14, 3e-10].forEach((dec) => {
        expect(isDecimal(dec)).toStrictEqual(true);
      });
    });
    it("Should return false for strings that look like decimals", () => {
      ["1.2", "0.0", "-0.1", "0.1", "0.0", "3.14", "3e-10"].forEach((dec) => {
        // console.log("3e-10", `${3e-10 + 3.1}`);
        expect(isDecimal(dec)).toStrictEqual(false);
      });
    });
    it("Should return false for non numbers", () => {
      [undefined, false, true, new Date()].forEach((dec) => {
        expect(isDecimal(dec)).toStrictEqual(false);
      });
    });
    it("Should return false for integers", () => {
      [1, 2, -1, -2, 2e10].forEach((dec) => {
        expect(isDecimal(dec)).toStrictEqual(false);
      });
    });
    it("Should return true for special case 0 and 0.0", () => {
      expect(isDecimal(0)).toBe(true);
      expect(isDecimal(0.0)).toBe(true);
    });
  }); // describe isDecimal

  describe("isInteger", () => {
    ["12", "1", "0", "-1", "314", "3e10"].forEach((int) => {
      it(`Should return false for strings that look like integers (${int})`, () => {
        expect(isInteger(int)).toStrictEqual(false);
      });
    });
    [12, 1, 0, -1, 314, 3e10].forEach((int) => {
      it(`Should return true for real integers (${int})`, () => {
        expect(isInteger(int)).toStrictEqual(true);
      });
    });
    it(`Should return true for real integers (3e10)`, () => {
      expect(isInteger(3e10)).toStrictEqual(true);
    });

    ["1.2", "1.0", "-1.0", "3.14", "3e-10"].forEach((int) => {
      it(`Should return false for things that look like decimals (${int})`, () => {
        expect(isInteger(int)).toStrictEqual(false);
      });
    });
    [1.2, 3.14, 3e-10].forEach((int) => {
      it(`Should return false for things that are decimals (${int})`, () => {
        expect(isInteger(int)).toStrictEqual(false);
      });
    });
    describe("Special cases where numbers can be safely converted to int (see notes)", () => {
      // this is because js coverts n.0 to n if can do so without loss of precision.
      // this is done when calling function.. Nothing can be done about it.
      // 'The method will also return true for floating point numbers that can be represented as integer.'
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
      // js seem to automatically convert when pass parameter
      it("-1.0 will be true", () => {
        expect(isInteger(-1.0)).toStrictEqual(true);
      });
      it(" 0.0 will be true", () => {
        expect(isInteger(0.0)).toStrictEqual(true);
      });
      it(" 1.0 will be true", () => {
        expect(isInteger(1.0)).toStrictEqual(true);
      });
    });
  }); // isInteger
  describe("isDate", () => {
    it("Should return true of date type object", () => {
      expect(isDate(new Date())).toStrictEqual(true);
    });
    it("Should return false otherwise", () => {
      expect(isDate(undefined)).toStrictEqual(false);
      expect(isDate(true)).toStrictEqual(false);
      expect(isDate("06/29/74")).toStrictEqual(false);
      expect(isDate("1974-06-29T03:32:17")).toStrictEqual(false);
    });
  }); // isDate
  describe("isDateISO8601String", () => {
    it("Should return true for string that accurately describe ISO8601 date 2021-03-23T23:23:58Z ", () => {
      expect(isDateISO8601String("2021-03-23T23:23:58Z")).toStrictEqual(true);
      expect(isDateISO8601String("2021-03-23T23:23:58+03:00")).toStrictEqual(true);
    });
    it("Should return true for string that accurately describe ISO8601 date 2021-03-23T23:23:58+03:00 ", () => {
      expect(isDateISO8601String("2021-03-23T23:23:58+03:00")).toStrictEqual(true);
    });
    it("Should return true for string that accurately describe ISO8601 date 2021-03-23T23:23:58-03:00 ", () => {
      expect(isDateISO8601String("2021-03-23T23:23:58-03:00")).toStrictEqual(true);
    });
    describe("Rejects invalid looking dates", () => {
      [
        "2021-03-23T23:23:58-34:00",
        "2021-03-23T33:23:62-03:00",
        "2021-03-2323:23:58-03:00",
        "2021-03-23",
        "2021-03-23 23:23:58-03:00 ",
        " 2021-03-23T23:23:58-03:00",
        "2021-93-23T23:23:58-03:00",
      ].forEach((dateString) => {
        it(`Should return false for: '${dateString}'`, () => {
          expect(isDateISO8601String(dateString)).toStrictEqual(false);
        });
      });
    });
  }); // isDateISO8601String
  describe("hasExactlyProperties", () => {
    it("Should return true if object has exactly given properties", () => {
      const o: object = { prop1: "prop1" };
      expect(hasExactlyProperties(o, "prop1")).toStrictEqual(true);
    });

    it("Should return false if given object is undefined", () => {
      const o = undefined; /// { prop1: "prop1" };
      expect(hasExactlyProperties(o, "prop1")).toStrictEqual(false);
    });
    it("Should return false if given object in not object type", () => {
      // this maybe a problem - what about classes?
      const o = new Date();
      expect(hasExactlyProperties(o, "prop1")).toStrictEqual(false);
    });
    it("Should return false if object does not have specified keys", () => {
      const o: object = { prop1: "prop1" };
      expect(hasExactlyProperties(o, "prop1Other")).toStrictEqual(false);
    });
    it("Should return false if object has more keys than specified", () => {
      const o: object = { prop1: "prop1", prop2: "prop2" };
      expect(hasExactlyProperties(o, "prop1")).toStrictEqual(false);
    });
    it("Should return false if object does not have all specified keys", () => {
      const o: object = { prop1: "prop1" };
      expect(hasExactlyProperties(o, "prop1", "prop2")).toStrictEqual(false);
    });
    it("Should return false if no keys are provided", () => {
      const o: object = { prop1: "prop1" };
      //@ts-ignore
      expect(hasExactlyProperties(o, null)).toStrictEqual(false);
    });
  });
});
