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

  /**
   * @deprecated - use 'filterProjectionBySubjectId'
   * @param subjectId
   */
  getSubProjectionBySubjectId(subjectId: string): TProjectionDictionary;

  getKeys(): string[];

  getProjectionOrderByColumPosition(): TProjectionDictionary;

  getProjectionOrderByProperty(
    property: keyof TProjectionItemProperties
  ): TProjectionDictionary;

  getProjectedItemByProjectionKey(key: string): TProjectionItemProperties;

  /**
   * @deprecated - use 'getProjectedItemByProjectionKey'
   * @param key
   */
  getProjectionSubject(key: string): TProjectionItemProperties;

  removeProjectionItem(key: string): void;

  /**
   * @deprecated - use 'removeProjectionItem'
   */
  removeProjectionSubject(key: string): void;

  /**
   * @deprecated - use 'updateProjectionItem'
   * @param key
   * @param properties
   */
  updateSubject(key: string, props: TProjectionPropertiesUpdatable): void;
  updateProjectionItem(key: string, properties: TProjectionPropertiesUpdatable): void;

  toJson(): TProjectionItemProperties[];
}
