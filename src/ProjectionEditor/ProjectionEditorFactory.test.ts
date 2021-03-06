import { ProjectionEditorFactory } from "./ProjectionEditorFactory";
import { EXAMPLE_JSON_BLUE_SKIES } from "../external-files";
import { ProjectionError } from "../ProjectionError";
import { TProjectionItemPropertiesJson } from "./type";

const subjectDictionaryJson = EXAMPLE_JSON_BLUE_SKIES.projectableSubjectDictionaryJson;
const existingProjectionJson = EXAMPLE_JSON_BLUE_SKIES.projectionJson;

describe("ProjectionEditorFactory", () => {
  it("Should create editor from Json (fromJson)", () => {
    const editorJson = {
      projectionItemsJson: existingProjectionJson,
      projectableSubjectDictionaryJson: subjectDictionaryJson,
    };
    const projectionEditor = ProjectionEditorFactory.fromJson(editorJson);
    expect(projectionEditor.toJson()).toStrictEqual(editorJson.projectionItemsJson);
  });
  it("Should create new projection if projectionItems not provided", () => {
    const editorJson = {
      projectionItemsJson: undefined,
      projectableSubjectDictionaryJson: subjectDictionaryJson,
    };
    expectedDefaultProjection;
    const projectionEditor = ProjectionEditorFactory.fromJson(editorJson);
    expect(projectionEditor.toJson()).toStrictEqual(expectedDefaultProjection);
  });
  it("Should throw error projectionItems not an array", () => {
    const editorJson = {
      //@ts-ignore
      projectionItemsJson: { existingProjectionJson } as TProjectionItemPropertiesJson[],
      projectableSubjectDictionaryJson: subjectDictionaryJson,
    };

    const willThrow = () => {
      const projectionEditor = ProjectionEditorFactory.fromJson(editorJson);
    };

    expect(willThrow).toThrow("Failed to parse json, expected array, received object");
    expect(willThrow).toThrow(ProjectionError);
  });
  it("Should throw error any projectionItem has bad format (missing fields)", () => {
    const badProjection = {
      subjectId: "firstname",
      // "sortOrder": -1,
      columnOrder: -1,
      label: "Jackson 5 II",
    } as TProjectionItemPropertiesJson;

    const editorJson = {
      //@ts-ignore
      projectionItemsJson: [badProjection],
      projectableSubjectDictionaryJson: subjectDictionaryJson,
    };

    const willThrow = () => {
      const projectionEditor = ProjectionEditorFactory.fromJson(editorJson);
    };

    expect(willThrow).toThrow("Failed to parse json");
    expect(willThrow).toThrow(ProjectionError);
  });
  it("Should throw error with some details about invalid projection items", () => {
    const badProjection = {
      subjectId: "firstname",
      // "sortOrder": -1,
      columnOrder: -1,
      label: "Jackson 5 II",
    } as TProjectionItemPropertiesJson;

    const editorJson = {
      //@ts-ignore
      projectionItemsJson: [badProjection],
      projectableSubjectDictionaryJson: subjectDictionaryJson,
    };

    try {
      const projectionEditor = ProjectionEditorFactory.fromJson(editorJson);
      expect(" this not ").toBe("");
    } catch (e) {
      const projectionError = e as ProjectionError;
      expect(projectionError.parseErrors).toStrictEqual([
        "Projection with subjectId 'firstname' : is missing properties: sortOrder ",
        "Projection with subjectId 'firstname' : 'sortOrder' is not a string type (actual type: undefined)",
        "Projection with subjectId 'firstname' : invalid sortOrder: 'undefined')",
      ]);
    }
  });

  it("toJson", () => {
    const editorJson = {
      projectionItemsJson: existingProjectionJson,
      projectableSubjectDictionaryJson: subjectDictionaryJson,
    };
    const projectionEditor = ProjectionEditorFactory.fromJson(editorJson);

    expect(ProjectionEditorFactory.toJson(projectionEditor)).toStrictEqual(editorJson);
  });
});

const expectedDefaultProjection = [
  {
    subjectId: "firstname",
    label: "First Name",
    sortOrder: 1,
    columnOrder: 0,
  },
  {
    subjectId: "lastname",
    label: "Last Name",
    sortOrder: 1,
    columnOrder: 1,
  },
  {
    subjectId: "annualRevenue",
    label: "Annual Revenue",
    sortOrder: 1,
    columnOrder: 2,
  },
  {
    subjectId: "numberOfEmployees",
    label: "Workforce Size",
    sortOrder: 1,
    columnOrder: 3,
  },
  {
    subjectId: "region",
    label: "Region",
    sortOrder: 1,
    columnOrder: 4,
  },
  {
    subjectId: "favoriteFruit",
    label: "Favorite Fruit",
    sortOrder: 1,
    columnOrder: 5,
  },
  {
    subjectId: "favoriteNumber",
    label: "Favorite Number",
    sortOrder: 1,
    columnOrder: 6,
  },
  {
    subjectId: "startDate",
    label: "Start Date",
    sortOrder: 1,
    columnOrder: 7,
  },
];
