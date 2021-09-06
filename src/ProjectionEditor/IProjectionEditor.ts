import type {
  TProjectionDictionary,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
} from "./type";
import type { IProjectableSubjectDictionary } from "../ProjectableSubjectDictionary";

export interface IProjectionEditor {
  addSubject(projection: TProjectionProperties): string;

  getProjectableSubjectsDictionary(): IProjectableSubjectDictionary;

  getSubProjectionBySubjectId(subjectId: string): TProjectionDictionary;

  getKeys(): string[];

  getProjectionOrderByColumPosition(): TProjectionDictionary;

  getProjectionSubject(key: string): TProjectionProperties;

  removeProjectionSubject(key: string): void;

  updateSubject(key: string, props: TProjectionPropertiesUpdatable): void;

  toJson(): TProjectionProperties[];
}
