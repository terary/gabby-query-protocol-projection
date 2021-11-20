import pick from "lodash.pick";
import type {
  TProjectionDictionary,
  TProjectionItemProperties,
  TProjectionPropertiesUpdatable,
} from "./type";
import { IProjectableSubjectDictionary } from "../ProjectableSubjectDictionary";
import { ProjectionError } from "../ProjectionError";
import { IProjectionEditor } from "./IProjectionEditor";
import { Validators } from "../validators";
import { TProjectionItemPropertiesJson } from "./type";
import { TProjectionItemPropertyName } from "../common";

/**
 * Example usage:
 * [[include:ExampleProjectionEditor.html]]
 * [[include:ExampleProjectionEditor2.html]]
 * [[include:ExampleProjectionEditor3.html]]
 */
export class ProjectionEditorSimple implements IProjectionEditor {
  private _projections: TProjectionDictionary = {};

  private _projectableSubjects: IProjectableSubjectDictionary;

  private _keyCount = 0;

  constructor(projectableSubjects: IProjectableSubjectDictionary) {
    this._projectableSubjects = projectableSubjects;
  }

  addProjectionItem(projectionItem: TProjectionItemProperties) {
    const validation = Validators.ValidateProjectionProperties(
      projectionItem,
      this._projectableSubjects
    );
    if (validation.hasError) {
      throw new ProjectionError("Failed to parse json", validation.errorMessages);
    }

    const projectionSubjectId = this._nextIndex();
    this._projections[projectionSubjectId] = projectionItem;
    return projectionSubjectId;
  }

  //deprecated - use addProjectionItem
  addSubject(projection: TProjectionItemProperties): string {
    return this.addProjectionItem(projection);
  }
  filterProjection(filter: (projection: TProjectionItemProperties) => boolean) {
    return Object.entries(this._projections)
      .filter(([key, value]) => {
        return filter(value);
      })
      .map(([key, value]) => {
        return value;
      }) as TProjectionItemProperties[];
  }

  filterProjectionBySubjectId(subjectId: string): TProjectionDictionary {
    // this is {[key]:ProjectionItem}
    // a subset projection that contains only given subjectId
    const subjects: TProjectionDictionary = {};
    Object.entries(this._projections).forEach(([projectionKey, subject]) => {
      if (subjectId === subject.subjectId) {
        subjects[projectionKey] = { ...subject };
      }
    });
    return subjects;
  }

  getProjectableSubjectsDictionary(): IProjectableSubjectDictionary {
    return this._projectableSubjects;
    //    return cloneDeep(this._projectableSubjects);
  }

  getSubProjectionBySubjectId(subjectId: string): TProjectionDictionary {
    // a subset projection that contains only given subjectId
    return this.filterProjectionBySubjectId(subjectId);
  }

  getKeys(): string[] {
    return Object.keys(this._projections);
  }

  getProjectionOrderByColumPosition(): TProjectionDictionary {
    return this.getProjectionOrderByProperty("columnOrder");
  }

  getProjectionOrderByProperty(
    property: TProjectionItemPropertyName
  ): TProjectionDictionary {
    return Object.assign(
      {},
      ...Object.entries(this._projections)
        .sort(([xKey, xObject], [yKey, yObject]) => {
          // equality check not necessary for our purposes
          return xObject[property] > yObject[property] ? 1 : -1;
        })
        .map(([key, value]) => {
          return { [key]: value };
        })
    );
  }

  getProjectedItemByProjectionKey(projectionKey: string): TProjectionItemProperties {
    return this._projections[projectionKey];
  }

  /**
   * @deprecated - use getProjectedItemByProjectionKey
   * @param key
   * @returns
   */
  getProjectionSubject(key: string): TProjectionItemProperties {
    return this.getProjectedItemByProjectionKey(key);
  }

  removeProjectionItem(key: string): void {
    delete this._projections[key];
  }

  /**
   * @deprecated - use removeProjectionItem
   * @param key
   */
  removeProjectionSubject(key: string): void {
    this.removeProjectionItem(key);
  }

  /**
   * @deprecated use 'updateProjectionItem'
   * @param key
   * @param props
   */
  updateSubject(key: string, props: TProjectionPropertiesUpdatable): void {
    this.updateProjectionItem(key, props);
  }

  updateProjectionItem(key: string, props: TProjectionPropertiesUpdatable): void {
    const currentProjection = this.getProjectedItemByProjectionKey(key);
    const changeProjection = pick(props, "sortOrder", "label", "columnOrder");
    this._projections[key] = { ...currentProjection, ...changeProjection };
  }

  private _nextIndex() {
    return `key${this._keyCount++}`;
  }

  toJson(): TProjectionItemProperties[] {
    return Object.values(this._projections);
  }

  // TODO - *tmc* -- from/to JSON should accept projectionProperties[]
  static toFlatFile(projection: ProjectionEditorSimple) {
    return Object.values(projection.getProjectionOrderByColumPosition());
  }

  static fromFlatFile(
    json: TProjectionItemPropertiesJson[],
    projectableSubjects: IProjectableSubjectDictionary
  ): ProjectionEditorSimple {
    if (!Array.isArray(json)) {
      throw new ProjectionError(
        `Failed to parse json, expected array, received ${typeof json}`
      );
    }
    const projection = new ProjectionEditorSimple(projectableSubjects);

    json.forEach((projectionItem) => {
      const { hasError, errorMessages } = Validators.ValidateProjectionProperties(
        projectionItem,
        projectableSubjects
      );

      if (hasError) {
        throw new ProjectionError("Failed to parse json", errorMessages);
      }

      projection.addSubject(projectionItem as TProjectionItemProperties);
    });
    return projection;
  }
}
