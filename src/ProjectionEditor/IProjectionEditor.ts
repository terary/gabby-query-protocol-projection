import type {
  TProjectionDictionary,
  TProjectionItemProperties,
  TProjectionPropertiesUpdatable,
} from "./type";
import type { IProjectableSubjectDictionary } from "../ProjectableSubjectDictionary";

export interface IProjectionEditor {
  addSubject(projection: TProjectionItemProperties): string;

  getProjectableSubjectsDictionary(): IProjectableSubjectDictionary;

  getSubProjectionBySubjectId(subjectId: string): TProjectionDictionary;

  getKeys(): string[];

  getProjectionOrderByColumPosition(): TProjectionDictionary;

  getProjectionSubject(key: string): TProjectionItemProperties;

  removeProjectionSubject(key: string): void;

  updateSubject(key: string, props: TProjectionPropertiesUpdatable): void;

  toJson(): TProjectionItemProperties[];
}
