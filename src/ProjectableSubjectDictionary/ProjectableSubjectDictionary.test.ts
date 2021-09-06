/* eslint-disable @typescript-eslint/no-use-before-define */
import { cloneDeep } from "lodash";
import { ProjectableSubjectDictionary } from "./ProjectableSubjectDictionary";
import { TProjectableSubjectProperties } from "./type";
import * as testCaseProjectableJson from "../test-case-files/projectable-fields-bad.json";
import { ProjectableDictionaryFactory } from "./ProjectableDictionaryFactory";
import { EXAMPLE_JSON_BLUE_SKIES } from "../external-files";

const projectableSubjectDictionaryJson = cloneDeep(
  EXAMPLE_JSON_BLUE_SKIES.projectableSubjectDictionaryJson
);

describe("ProjectableSubjectDictionary", () => {
  describe(".getSubjectIds", () => {
    it("Should return array of subjectIds", () => {
      const projectableSubjects = ProjectableDictionaryFactory.fromJson(
        projectableSubjectDictionaryJson
      );

      const expectedSubjectIds = [
        "firstname",
        "lastname",
        "annualRevenue",
        "numberOfEmployees",
        "region",
        "favoriteFruit",
        "favoriteNumber",
        "startDate",
      ];

      expect(projectableSubjects.getSubjectIds()).toStrictEqual(expectedSubjectIds);
    });
    it("Should return empty array if there are no subjectIds", () => {
      const projectableSubjects = new ProjectableSubjectDictionary();
      const expectedSubjectIds: string[] = [];
      projectableSubjects.getSubjectIds();
      expect(projectableSubjects.getSubjectIds()).toStrictEqual(expectedSubjectIds);
    });
  }); // describe getSubjectIds

  describe(".toJson", () => {
    it("Should create carbon copy of original JSON.", () => {
      const projectableSubjects = ProjectableDictionaryFactory.fromJson(
        projectableSubjectDictionaryJson
      );
      expect(projectableSubjectDictionaryJson).toStrictEqual(
        projectableSubjects.toJson()
      );
    });
  }); // describe(".toJson",
  describe(".getSubjectById", () => {
    it("Should return the subject of the given subjectId", () => {
      const projectableSubjects = ProjectableDictionaryFactory.fromJson(
        projectableSubjectDictionaryJson
      );
      // const projectableSubjects = ProjectableSubjectDictionary.fromJson(
      //   projectableSubjectDictionaryJson
      // );
      expect(projectableSubjects.getSubjectById("favoriteFruit")).toStrictEqual({
        datatype: "string",
        defaultLabel: "Favorite Fruit",
        isSortable: true,
      });
    });
    it("Should return the undefined if the subject does not exist", () => {
      const projectableSubjects = ProjectableDictionaryFactory.fromJson(
        projectableSubjectDictionaryJson
      );

      expect(projectableSubjects.getSubjectById("DOES_NOT_EXISTS")).toBeUndefined();
    });
  }); // describe(".getSubjectById",
  describe("ProjectableSubjectDictionary.fromJson", () => {
    it("Should throw ProjectionParseError missing 'isSortable' property", () => {
      expectParseError(
        testCaseProjectableJson.subjectIdMissingIsSortable,
        "Projectable subject 'missingIsSortable' is missing properties: 'isSortable'."
      );
    });
    it("Should throw ProjectionParseError missing 'datatype' property", () => {
      expectParseError(
        testCaseProjectableJson.subjectIdMissingDatatype,
        "Projectable subject 'subjectId' is missing properties: 'datatype'."
      );
    });
    it("Should throw ProjectionParseError missing 'defaultLabel' property", () => {
      expectParseError(
        testCaseProjectableJson.subjectIdMissingDefaultLabel,
        "Projectable subject 'subjectId' is missing properties: 'defaultLabel'."
      );
    });
    it("Should throw ProjectionParseError wrong property types  (isSortable not boolean)", () => {
      expectParseError(
        testCaseProjectableJson.wrongDataTypeSortable,
        "Projectable subject 'subjectId': isSortable is not boolean type."
      );
    });
    //
    it("Should throw ProjectionParseError wrong property types  (defaultLabel not string)", () => {
      expectParseError(
        testCaseProjectableJson.wrongDataTypeDefaultLabel,
        "Projectable subject 'subjectId': defaultLabel is not recognized as string"
      );
    });
    it("Should throw ProjectionParseError wrong property value  (datatype unsupported)", () => {
      expectParseError(
        testCaseProjectableJson.wrongDataTypeUnsupported,
        "Projectable subject 'subjectId': datatype not supported 'object', supported datatypes: integer, decimal, datetime, string, boolean"
      );
    });
  });
  describe(".subjectIdExists", () => {
    it("Should return true if subjectId exists false otherwise", () => {
      const projectableSubjects = ProjectableDictionaryFactory.fromJson(
        projectableSubjectDictionaryJson
      );

      expect(projectableSubjects.subjectIdExists("firstname")).toStrictEqual(true);
      expect(projectableSubjects.subjectIdExists("DOES_NOT_EXIST")).toStrictEqual(false);

      //@ts-ignore
      expect(projectableSubjects.subjectIdExists()).toStrictEqual(false);
    });
  }); // describe('.subjectIdExists'
  describe(".isLocked", () => {
    it("Should prevents adding new subject to dictionary after creation", () => {
      const projectableSubjects = ProjectableDictionaryFactory.fromJson(
        projectableSubjectDictionaryJson
      );
      const projectableProps = {
        datatype: "string",
        defaultLabel: "WILL NOT WORK",
        isSortable: false,
      } as TProjectableSubjectProperties;

      const willThrow = () => {
        ProjectableSubjectDictionary.addSubject(
          projectableSubjects as ProjectableSubjectDictionary,
          "WILL_NOT_WORK",
          projectableProps
        );
      };

      expect(willThrow).not.toThrow("something");
      expect(projectableSubjects.toJson()).toStrictEqual(
        projectableSubjectDictionaryJson
      );
    });
  }); // describe('.subjectIdExists'
}); // describe ProjectableSubjectDictionary

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectParseError = (subjectJson: any, expectedErrorMessage: string) => {
  try {
    ProjectableDictionaryFactory.fromJson(subjectJson);
  } catch (e) {
    expect(e.constructor.name).toBe("ProjectionError");
    expect(e.message).toBe("Failed to parse json");
    expect(e.parseErrors[0]).toBe(expectedErrorMessage);
  }
};
