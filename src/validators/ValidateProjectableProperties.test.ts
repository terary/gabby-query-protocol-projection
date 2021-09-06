import { TProjectableSubjectPropertiesJson } from "../ProjectableSubjectDictionary";
import { ValidateProjectableProperties } from "./ValidateProjectableProperties";

describe("ValidateProjectableProperties", () => {
  it("Should *non* fail if all properties are present and sane (blue skies)", () => {
    const props: TProjectableSubjectPropertiesJson = {
      isSortable: true,
      defaultLabel: "something",
      datatype: "string",
    };
    const expectedValidation = {
      hasError: false,
      errorMessages: [],
    };
    const actualValidation = ValidateProjectableProperties("subjectId", props);

    expect(actualValidation).toStrictEqual(expectedValidation);
  });
  it("Should detect missing 'datatype'", () => {
    const props: TProjectableSubjectPropertiesJson = {
      isSortable: true,
      defaultLabel: "something",
      // datatype: "string",
    };
    const expectedValidation = {
      hasError: true,
      errorMessages: [
        "Projectable subject 'testFirstName' is missing properties: 'datatype'.",
        "Projectable subject 'testFirstName' is not recognized as string",
        "Projectable subject 'testFirstName': datatype not supported 'undefined', supported datatypes: integer, decimal, datetime, string, boolean",
      ],
    };

    const actualValidation = ValidateProjectableProperties("testFirstName", props);

    expect(actualValidation).toStrictEqual(expectedValidation);
  });
  it("Should detect missing: 'defaultLabel'", () => {
    const props: TProjectableSubjectPropertiesJson = {
      isSortable: true,
      //defaultLabel: "something",
      datatype: "string",
    };
    const expectedValidation = {
      hasError: true,
      errorMessages: [
        "Projectable subject 'testFirstName' is missing properties: 'defaultLabel'.",
        "Projectable subject 'testFirstName': defaultLabel is not recognized as string",
      ],
    };

    const actualValidation = ValidateProjectableProperties("testFirstName", props);

    expect(actualValidation).toStrictEqual(expectedValidation);
  });
  it("Should detect missing: 'isSortable'", () => {
    const props: TProjectableSubjectPropertiesJson = {
      // isSortable: true,
      defaultLabel: "something",
      datatype: "string",
    };
    const expectedValidation = {
      hasError: true,
      errorMessages: [
        "Projectable subject 'testFirstName' is missing properties: 'isSortable'.",
        "Projectable subject 'testFirstName': isSortable is not boolean type.",
      ],
    };

    const actualValidation = ValidateProjectableProperties("testFirstName", props);

    expect(actualValidation).toStrictEqual(expectedValidation);
  });
});
