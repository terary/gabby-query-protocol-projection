import { ProjectionError } from "../ProjectionError";
import { ProjectionEditorSimple } from "./ProjectionEditorSimple";
import { IProjectionEditor } from "./IProjectionEditor";
import { TProjectionItemPropertiesJson, TProjectionItemProperties } from "./type";
import type { IExportToJson, IImportFromJson } from "../common";
import type {
  IProjectableSubjectDictionary,
  TProjectableSubjectsDictionaryJson,
} from "../ProjectableSubjectDictionary";
import { Validators } from "../validators";
import { ProjectableDictionaryFactory } from "../ProjectableSubjectDictionary";

interface ProjectionEditorJson {
  projectableSubjectDictionaryJson: TProjectableSubjectsDictionaryJson;
  projectionItemsJson?: TProjectionItemPropertiesJson[];
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
    } as TProjectionItemProperties;
  });
};
// prettier-ignore
type ProjectionImportExportType = 
  IImportFromJson<ProjectionEditorJson, IProjectionEditor> &
  IExportToJson<IProjectionEditor, ProjectionEditorJson>;

export const ProjectionEditorFactory: ProjectionImportExportType = {
  fromJson: (json: ProjectionEditorJson) => {
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
    const projection = new ProjectionEditorSimple(projectableSubjects);

    projectableItems.forEach((projectionItem) => {
      const { hasError, errorMessages } = Validators.ValidateProjectionProperties(
        projectionItem,
        projectableSubjects
      );

      if (hasError) {
        throw new ProjectionError("Failed to parse json", errorMessages);
      }

      projection.addProjectionItem(projectionItem as TProjectionItemProperties);
    });
    return projection as IProjectionEditor;
  },

  toJson: (projection: IProjectionEditor): ProjectionEditorJson => {
    return {
      projectionItemsJson: projection.toJson(),
      projectableSubjectDictionaryJson: projection
        .getProjectableSubjectsDictionary()
        .toJson(),
    };
  },
};
