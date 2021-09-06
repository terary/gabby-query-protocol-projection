import { SUPPORTED_DATATYPES } from "./consts";

describe("consts", () => {
  it("(SUPPORTED_DATATYPES) Should not change (or test should be updated", () => {
    expect(SUPPORTED_DATATYPES).toStrictEqual([
      "integer",
      "decimal",
      "datetime",
      "string",
      "boolean",
    ]);
  });
});
