import helperFunctions from "./helperFunctions";

describe("helperFunctions", () => {
  describe("findMissingProperties", () => {
    it("Should find missing properties", () => {
      const o = {
        x: 1,
        y: 2,
      };
      expect(helperFunctions.findMissingProperties(o, ["x", "y", "z"])).toStrictEqual([
        "z",
      ]);
    });
    it("Should return empty array if searchProperties is undefined", () => {
      const o = {
        x: 1,
        y: 2,
      };
      expect(helperFunctions.findMissingProperties(o)).toStrictEqual([]);
    });
    it("Should return empty array if all searchProperties are found", () => {
      const o = {
        x: 1,
        y: 2,
      };
      expect(helperFunctions.findMissingProperties(o, ["x", "y"])).toStrictEqual([]);
    });
    it("Should return all supplied property names if object is empty ", () => {
      const o = {
        x: 1,
        y: 2,
      };
      expect(helperFunctions.findMissingProperties(undefined, ["x", "y"])).toStrictEqual([
        "x",
        "y",
      ]);
    });
  }); // describe('findMissingProperties'
}); // describe('helperFunctions',
