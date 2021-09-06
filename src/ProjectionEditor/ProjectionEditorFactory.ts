import { ProjectionError } from "../ProjectionError";
import { Projection } from "./Projection";
import { IProjectionEditor } from "./IProjectionEditor";
import { TProjectionPropertiesJson, TProjectionProperties } from "./type";
import type { TProjectableSubjectsDictionaryJson } from "../ProjectableSubjectDictionary";
import { Validators } from "../validators";
import { ProjectableDictionaryFactory } from "../ProjectableSubjectDictionary";

interface ProjectionEditorJson {
  projectionItemsJson: TProjectionPropertiesJson[];
  projectableSubjectDictionaryJson: TProjectableSubjectsDictionaryJson;
}

export namespace ProjectionEditorFactory {
  export function fromJson(json: ProjectionEditorJson): IProjectionEditor {
    const projectableSubjects = ProjectableDictionaryFactory.fromJson(
      json.projectableSubjectDictionaryJson
    );

    if (!Array.isArray(json.projectionItemsJson)) {
      throw new ProjectionError(
        `Failed to parse json, expected array, received ${typeof json}`
      );
    }
    const projection = new Projection(projectableSubjects);

    json.projectionItemsJson.forEach((projectionItem) => {
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
