import { cloneDeep } from "lodash";

import { ProjectionEditorSimple } from "./ProjectionEditorSimple";
import { ProjectionError } from "../ProjectionError";
import { EXAMPLE_JSON_BLUE_SKIES } from "../external-files";
import { ProjectableDictionaryFactory } from "../ProjectableSubjectDictionary";
import { TProjectionItemProperties } from "./type";
import { CONSTS } from "../common";
import { TProjectionItemPropertiesJson } from "../../dist/ProjectionEditor";

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
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      expect(ProjectionEditorSimple.toFlatFile(projection).length).toStrictEqual(5);
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
          ProjectionEditorSimple.fromFlatFile(
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
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const projectables = projection.getProjectableSubjectsDictionary();
      expect(projectables.constructor.name).toBe("ProjectableSubjectDictionary");
    }); //
  });
  describe(".getProjectionOrderByColumPosition", () => {
    it("Should return projection ordered by colum", () => {
      // set-up
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );

      // exercise
      const orderedProjection = projection.getProjectionOrderByColumPosition();

      // post conditions

      const columnOrders = Object.entries(orderedProjection).map(
        ([projectionKey, projection]) => {
          return projection.columnOrder;
        }
      );
      expect(columnOrders.length).toBe(Object.keys(projectionBlueSkyJson).length);
      expect(columnOrders.length).toBe(5);

      let prevColumOrder = columnOrders[0];
      for (let i = 1; i < columnOrders.length; i++) {
        expect(prevColumOrder <= columnOrders[i]).toBeTruthy();
        prevColumOrder = columnOrders[i];
      }
    });
  });
  describe(".getProjectionOrderByProperty", () => {
    it("Should return projection ordered by given property", () => {
      // set-up
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );

      CONSTS.PROJECT_ITEM_PROPERTY_NAMES.forEach((propertyName) => {
        // exercise
        const orderedProjection = projection.getProjectionOrderByProperty(propertyName);

        // post conditions
        const propertiesInOrder = Object.entries(orderedProjection).map(
          ([projectionKey, projection]) => {
            return projection[propertyName];
          }
        );
        expect(propertiesInOrder.length).toBe(Object.keys(projectionBlueSkyJson).length);
        expect(propertiesInOrder.length).toBe(5);

        let prevColumOrder = propertiesInOrder[0];
        for (let i = 1; i < propertiesInOrder.length; i++) {
          expect(prevColumOrder <= propertiesInOrder[i]).toBeTruthy();
          prevColumOrder = propertiesInOrder[i];
        }
      });
    });
  });
  // filterProjection
  describe(".filterProjection", () => {
    it("Should filter by property", () => {
      const projection = ProjectionEditorSimple.fromFlatFile([], projectableSubjects);
      projection.addProjectionItem({
        subjectId: "firstname",
        label: "First Name",
        sortOrder: -1,
        columnOrder: -1,
      });
      projection.addProjectionItem({
        subjectId: "lastname",
        label: "Last Name",
        sortOrder: -1,
        columnOrder: 0,
      });
      projection.addProjectionItem({
        subjectId: "annualRevenue",
        label: "Annual Income",
        sortOrder: 0,
        columnOrder: 1,
      });
      projection.addProjectionItem({
        subjectId: "numberOfEmployees",
        label: "Number of Employees",
        sortOrder: 1,
        columnOrder: 2,
      });

      const visibleColumnsFilter = (projectionItem: TProjectionItemProperties) => {
        return projectionItem.columnOrder >= 0;
      };
      const sortColumnsFilter = (projectionItem: TProjectionItemProperties) => {
        return projectionItem.sortOrder != 0;
      };
      const nonSortColumnsFilter = (projectionItem: TProjectionItemProperties) => {
        return projectionItem.sortOrder === 0;
      };
      const visibleColumns = projection.filterProjection(visibleColumnsFilter);
      const sortColumns = projection.filterProjection(sortColumnsFilter);
      const nonSortColumns = projection.filterProjection(nonSortColumnsFilter);

      expect(visibleColumns.length).toStrictEqual(3);
      expect(sortColumns.length).toStrictEqual(3);
      expect(nonSortColumns.length).toStrictEqual(1);
    });
  }); // describe(".filterProjection"
  describe(".filterProjectionBySubjectId", () => {
    it("Should return subset projection, only subject with given subjectId", () => {
      // set-up
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );

      // exercise
      const subProjection = projection.filterProjectionBySubjectId("firstname");

      // post conditions
      expect(Object.keys(subProjection).length).toBe(1);
      const { label } = { ...Object.values(subProjection).pop() };
      expect(label).toBe("Jackson 5 II");
    });
    it("Should always return an object, regardless if subjectId is found", () => {
      // set-up
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );

      // exercise
      const subProjection = projection.filterProjectionBySubjectId("DOES_NOT_EXIST");

      // post conditions
      expect(Object.keys(subProjection).length).toBe(0);
    });
  });
  describe(".addProjectionItem", () => {
    it("Should add a projection item", () => {
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const newProjectionItem = {
        subjectId: "firstname",
        label: "newLabel",
        sortOrder: 1,
        columnOrder: 1,
      };

      const projectionKey = projection.addProjectionItem(newProjectionItem);

      expect(projection.getProjectedItemByProjectionKey(projectionKey)).toStrictEqual(
        newProjectionItem
      );
    });
    it("Should throw validation errors missing subjectId", () => {
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const missingSubjectProjectionItem: TProjectionItemPropertiesJson = {
        //subjectId: "firstname",
        label: "newLabel",
        sortOrder: 1,
        columnOrder: 1,
      };
      const willThrowMissingSubjectId = () => {
        projection.addProjectionItem(
          missingSubjectProjectionItem as TProjectionItemProperties
        );
      };

      expect(willThrowMissingSubjectId).toThrowError("Failed to parse json");
    });
    it("Should throw validation errors unknown subjectId", () => {
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const missingSubjectProjectionItem: TProjectionItemPropertiesJson = {
        subjectId: "DOES_NOT_EXIST",
        label: "newLabel",
        sortOrder: 1,
        columnOrder: 1,
      };
      const willThrowMissingSubjectId = () => {
        projection.addProjectionItem(
          missingSubjectProjectionItem as TProjectionItemProperties
        );
      };

      expect(willThrowMissingSubjectId).toThrowError("Failed to parse json");
    });
    it("Should throw validation errors missing label", () => {
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const missingSubjectProjectionItem: TProjectionItemPropertiesJson = {
        subjectId: "firstname",
        // label: "newLabel",
        sortOrder: 1,
        columnOrder: 1,
      };
      const willThrowMissingSubjectId = () => {
        projection.addProjectionItem(
          missingSubjectProjectionItem as TProjectionItemProperties
        );
      };

      expect(willThrowMissingSubjectId).toThrowError("Failed to parse json");
    });
    it("Should throw validation errors missing sortOrder", () => {
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const missingSubjectProjectionItem: TProjectionItemPropertiesJson = {
        subjectId: "firstname",
        label: "newLabel",
        //sortOrder: 1,
        columnOrder: 1,
      };
      const willThrowMissingSubjectId = () => {
        projection.addProjectionItem(
          missingSubjectProjectionItem as TProjectionItemProperties
        );
      };

      expect(willThrowMissingSubjectId).toThrowError("Failed to parse json");
    });
    it("Should throw validation errors missing columnOrder", () => {
      const projection = ProjectionEditorSimple.fromFlatFile(
        projectionBlueSkyJson,
        projectableSubjects
      );
      const missingSubjectProjectionItem: TProjectionItemPropertiesJson = {
        subjectId: "firstname",
        label: "newLabel",
        sortOrder: 1,
        // columnOrder: 1,
      };
      const willThrowMissingSubjectId = () => {
        projection.addProjectionItem(
          missingSubjectProjectionItem as TProjectionItemProperties
        );
      };

      expect(willThrowMissingSubjectId).toThrowError("Failed to parse json");
    });
  }); // describe(".addProjectionItem",
  describe(".updateSubject", () => {
    //describe(".getProjectableSubjectsDictionary"
    it("Should return an object", () => {
      // set-up
      const projection = ProjectionEditorSimple.fromFlatFile(
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
      const projection = ProjectionEditorSimple.fromFlatFile(
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
    ProjectionEditorSimple.fromFlatFile(json, projectableSubjects);
    throw Error("Test Failed - expected .fromFlatFile to throw error - it did not.");
  } catch (e) {
    if (e instanceof ProjectionError) {
      expect(e.constructor.name).toBe("ProjectionError");
      expect(e.message).toBe("Failed to parse json");
      expect(e.parseErrors[0]).toBe(expectedErrorMessage);
    } else {
      throw Error(`Test Failed - unexpected. Expected '' Error but got '${typeof e}'`);
    }
  }
};
