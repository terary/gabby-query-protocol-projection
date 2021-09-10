import { ProjectionError } from "../ProjectionError";
import { ProjectionSimple } from "./Projection";
import { IProjectionEditor } from "./IProjectionEditor";
import { TProjectionPropertiesJson, TProjectionProperties } from "./type";
import type {
  IProjectableSubjectDictionary,
  TProjectableSubjectsDictionaryJson,
} from "../ProjectableSubjectDictionary";
import { Validators } from "../validators";
import { ProjectableDictionaryFactory } from "../ProjectableSubjectDictionary";

interface ProjectionEditorJson {
  projectableSubjectDictionaryJson: TProjectableSubjectsDictionaryJson;
  projectionItemsJson?: TProjectionPropertiesJson[];
}

const buildDefaultProjection = (subjectDictionary: IProjectableSubjectDictionary) => {
  const subjectIds = subjectDictionary.getSubjectIds();

  return subjectIds.map((subjectId, index) => {
    const defaults = subjectDictionary.getSubjectById(subjectId);
    return {
      subjectId,
      label: defaults.defaultLabel,
      sortOrder: defaults.isSortable ? 1 : 0,
      columnOrder: index,
    } as TProjectionProperties;
  });
};

export namespace ProjectionEditorFactory {
  export function fromJson(json: ProjectionEditorJson): IProjectionEditor {
    //
    const projectableSubjects = ProjectableDictionaryFactory.fromJson(
      json.projectableSubjectDictionaryJson
    );

    let projectableItems = json.projectionItemsJson;

    if (!projectableItems) {
      projectableItems = buildDefaultProjection(projectableSubjects);
    }

    if (!Array.isArray(projectableItems)) {
      throw new ProjectionError(
        `Failed to parse json, expected array, received ${typeof json}`
      );
    }
    const projection = new ProjectionSimple(projectableSubjects);

    projectableItems.forEach((projectionItem) => {
      const { hasError, errorMessages } = Validators.ValidateProjectionProperties(
        projectionItem,
        projectableSubjects
      );

      if (hasError) {
        throw new ProjectionError("Failed to parse json", errorMessages);
      }

      projection.addSubject(projectionItem as TProjectionProperties);
    });
    return projection as IProjectionEditor;
  }

  export const toJson = (projection: IProjectionEditor): ProjectionEditorJson => {
    return {
      projectionItemsJson: projection.toJson(),
      projectableSubjectDictionaryJson: projection
        .getProjectableSubjectsDictionary()
        .toJson(),
    };
  };
}
