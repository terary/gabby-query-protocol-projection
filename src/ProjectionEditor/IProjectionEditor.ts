import type {
  TProjectionDictionary,
  TProjectionItemProperties,
  TProjectionPropertiesUpdatable,
} from "./type";
import type { IProjectableSubjectDictionary } from "../ProjectableSubjectDictionary";

export interface IProjectionEditor {
  addSubject(projection: TProjectionItemProperties): string;

  filterProjectionBySubjectId(subjectId: string): TProjectionDictionary;

  getProjectableSubjectsDictionary(): IProjectableSubjectDictionary;

  // deprecated - use 'filterProjectionBySubjectId'
  getSubProjectionBySubjectId(subjectId: string): TProjectionDictionary;

  getKeys(): string[];

  getProjectionOrderByColumPosition(): TProjectionDictionary;

  getProjectionOrderByProperty(
    property: keyof TProjectionItemProperties
  ): TProjectionDictionary;

  getProjectionSubject(key: string): TProjectionItemProperties;

  removeProjectionSubject(key: string): void;

  updateSubject(key: string, props: TProjectionPropertiesUpdatable): void;

  toJson(): TProjectionItemProperties[];
}
