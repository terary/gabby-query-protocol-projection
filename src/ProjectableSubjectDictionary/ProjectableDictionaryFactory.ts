import { IProjectableSubjectDictionary } from "./IProjectableSubjectDictionary";
import { TProjectableSubjectsDictionaryJson } from ".";
import { ProjectableSubjectDictionary } from "./ProjectableSubjectDictionary";
import { Validators } from "../validators";
import { ProjectionError } from "../ProjectionError";
import { TProjectableSubjectProperties } from "./type";

export namespace ProjectableDictionaryFactory {
  export function fromJson(
    json: TProjectableSubjectsDictionaryJson
  ): IProjectableSubjectDictionary {
    const projectableSubjects = new ProjectableSubjectDictionary();

    Object.entries(json).forEach(([subjectId, properties]) => {
      const { hasError, errorMessages } = Validators.ValidateProjectableProperties(
        subjectId,
        properties
      );

      if (hasError) {
        throw new ProjectionError("Failed to parse json", errorMessages);
      }

      ProjectableSubjectDictionary.addSubject(
        projectableSubjects,
        subjectId,
        properties as TProjectableSubjectProperties
      );
    });

    ProjectableSubjectDictionary.lock(projectableSubjects);
    return projectableSubjects;
  }

  export function toJson(
    predicateFormulaEditor: IProjectableSubjectDictionary
  ): TProjectableSubjectsDictionaryJson {
    return predicateFormulaEditor.toJson();
  }
}
