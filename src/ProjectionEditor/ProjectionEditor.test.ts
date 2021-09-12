import { cloneDeep } from "lodash";

import { ProjectionSimple } from "./ProjectionSimple";
import { ProjectionError } from "../ProjectionError";
import { EXAMPLE_JSON_BLUE_SKIES } from "../external-files";
import { ProjectableDictionaryFactory } from "../ProjectableSubjectDictionary";
const projectionBlueSkyJson = EXAMPLE_JSON_BLUE_SKIES.projectionJson;

const projectableSubjectDictionaryJson = cloneDeep(
  EXAMPLE_JSON_BLUE_SKIES.projectableSubjectDictionaryJson
);

const projectableSubjects = ProjectableDictionaryFactory.fromJson(
  projectableSubjectDictionaryJson
);

type ProjectionPropertiesTesting = {
  label: any;
  subjectId?: any;
  sortOrder?: any;
  columnOrder?: any;
};

describe("Projection", () => {
  describe(".fromJson", () => {
    it("Should create a projection instance (smoke test/blue skies)", () => {
      const projection = ProjectionSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      expect(ProjectionSimple.toFlatFile(projection).length).toStrictEqual(5);
    });
    describe("Validation", () => {
      let testProperties: ProjectionPropertiesTesting;
      beforeEach(() => {
        testProperties = {
          subjectId: "subjectIdTest",
          sortOrder: 1, // between [-1,1]
          columnOrder: -42, // any number ok. This is not position
          label: "The Label",
        };
      });
      it("Should throw array of flatProjection is not an array", () => {
        const expectError = () => {
          ProjectionSimple.fromFlatFile(
            testProperties as unknown as any[],
            projectableSubjects
          );
        };
        expect(expectError).toThrow(
          "Failed to parse json, expected array, received object"
        );
        expect(expectError).toThrow(ProjectionError);
      });
      it("Should throw ProjectionError for missing properties", () => {
        delete testProperties.label;
        delete testProperties.columnOrder;
        delete testProperties.subjectId;
        delete testProperties.sortOrder;
        expectParseError(
          [testProperties],
          "Projection with subjectId 'undefined' : is missing properties: subjectId, sortOrder, columnOrder, label "
        );
      });
      it("Should throw ProjectionError label not string", () => {
        testProperties.label = 42;
        expectParseError(
          [testProperties],
          "Projection with subjectId 'subjectIdTest' : 'label' is not a string type (actual type: number)"
        );
      });
      it("Should throw ProjectionError sortOrder not number", () => {
        testProperties.sortOrder = "42";
        expectParseError(
          [testProperties],
          "Projection with subjectId 'subjectIdTest' : 'sortOrder' is not a string type (actual type: string)"
        );
      });
      it("Should throw ProjectionError sortOrder out of range", () => {
        testProperties.sortOrder = -3;
        expectParseError(
          [testProperties],
          "Projection with subjectId 'subjectIdTest' : 'sortOrder' out of range (-1, 1). actual range: '-3')"
        );
      });

      it("Should throw ProjectionError columnOrder not number", () => {
        testProperties.columnOrder = "42";
        expectParseError(
          [testProperties],
          "Projection with subjectId 'subjectIdTest' : 'columnOrder' is not a string type (actual type: string)"
        );
      });
      it("Should throw ProjectionError subjectId not string", () => {
        testProperties.subjectId = 42;
        expectParseError(
          [testProperties],
          "Projection with subjectId '42' : 'subjectionId' is not a string type (actual type: number)"
        );
      });
      it("Should throw ProjectionError unknown subjectId", () => {
        const expectedErrorMessage = `Projection with subjectId 'DOES_NOT_EXIST' : 'subjectId' does not exist in Projectable Subjects. Possible subjectIds: [firstname, lastname, annualRevenue, numberOfEmployees, region, favoriteFruit, favoriteNumber, startDate]`;

        testProperties.subjectId = "DOES_NOT_EXIST";
        expectParseError([testProperties], expectedErrorMessage);
      });
    });
  }); // describe validation?
  describe(".getProjectableSubjectsDictionary", () => {
    it("Should return an ProjectableSubjects", () => {
      const projection = ProjectionSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const projectables = projection.getProjectableSubjectsDictionary();
      expect(projectables.constructor.name).toBe("ProjectableSubjectDictionary");
    }); //
  });
  describe(".getSubProjectionBySubjectId", () => {
    it("Should return subset projection, only subject with given subjectId", () => {
      // set-up
      const projection = ProjectionSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );

      // exercise
      const subProjection = projection.getSubProjectionBySubjectId("firstname");

      // post conditions
      expect(Object.keys(subProjection).length).toBe(1);
      const { label } = { ...Object.values(subProjection).pop() };
      expect(label).toBe("Jackson 5 II");
    });
    it("Should always return an object, regardless if subjectId is found", () => {
      // set-up
      const projection = ProjectionSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );

      // exercise
      const subProjection = projection.getSubProjectionBySubjectId("DOES_NOT_EXIST");

      // post conditions
      expect(Object.keys(subProjection).length).toBe(0);
    });
  });
  describe(".updateSubject", () => {
    //describe(".getProjectableSubjectsDictionary"
    it("Should return an object", () => {
      // set-up
      const projection = ProjectionSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const subProjection = projection.getSubProjectionBySubjectId("firstname");
      const [projectionKey, projectedProperties] = Object.entries(subProjection)[0];

      // preConditions
      expect(projectionKey).toBe("key0");
      expect(projectedProperties).toStrictEqual({
        subjectId: "firstname",
        label: "Jackson 5 II",
        columnOrder: -1,
        sortOrder: -1,
      });

      //exercise
      projection.updateSubject(projectionKey, {
        //@ts-ignore
        subjectId: "Can not change subjectId",
        label: "new value",
        columnOrder: 15,
        sortOrder: 0,
        someFieldDoeNotExist: "Will have no effect",
      });

      //postCondition
      expect(projection.getProjectionSubject(projectionKey)).toStrictEqual({
        //@ts-ignore
        subjectId: "firstname",
        label: "new value",
        columnOrder: 15,
        sortOrder: 0,
      });
    }); //
  });
  describe(".removeSubject", () => {
    it("Should remove subject with key", () => {
      // setup
      const projection = ProjectionSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const deleteItem = {
        subjectId: "firstname",
        sortOrder: -1,
        columnOrder: -1,
        label: "Jackson 5 II",
      };
      const keys = projection.getKeys();
      const deleteKey = keys[0];

      // preCondition
      expect(keys.length).toBe(5);
      expect(projection.getProjectionSubject(deleteKey)).toStrictEqual(deleteItem);

      // exercise
      projection.removeProjectionSubject(deleteKey);

      // postCondition
      expect(projection.getKeys().length).toBe(4);
      expect(projection.getProjectionSubject(deleteKey)).toBeUndefined();
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectParseError = (json: any, expectedErrorMessage: string) => {
  try {
    ProjectionSimple.fromFlatFile(json, projectableSubjects);
    throw Error("Test Failed - expected .fromFlatFile to throw error - it did not.");
  } catch (e) {
    expect(e.constructor.name).toBe("ProjectionError");
    expect(e.message).toBe("Failed to parse json");
    expect(e.parseErrors[0]).toBe(expectedErrorMessage);
  }
};
