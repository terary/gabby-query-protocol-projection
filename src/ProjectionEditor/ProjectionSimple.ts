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
export class ProjectionSimple implements IProjectionEditor {
  private _projections: TProjectionDictionary = {};

  private _projectableSubjects: IProjectableSubjectDictionary;

  private _keyCount = 0;

  constructor(projectableSubjects: IProjectableSubjectDictionary) {
    this._projectableSubjects = projectableSubjects;
  }

  addSubject(projection: TProjectionItemProperties): string {
    const projectionSubjectId = this._nextIndex();
    this._projections[projectionSubjectId] = projection;
    return projectionSubjectId;
  }

  filterProjectionBySubjectId(subjectId: string): TProjectionDictionary {
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

  getProjectionSubject(key: string): TProjectionItemProperties {
    return this._projections[key];
  }

  removeProjectionSubject(key: string): void {
    delete this._projections[key];
  }

  updateSubject(key: string, props: TProjectionPropertiesUpdatable): void {
    const currentProjection = this.getProjectionSubject(key);
    const changeProjection = pick(props, "sortOrder", "label", "columnOrder");
    this._projections[key] = { ...currentProjection, ...changeProjection };
  }

  private _nextIndex() {
    return `key${this._keyCount++}`;
  }

  toJson(): TProjectionItemProperties[] {
    return Object.values(this._projections);
  }

  // TODO - *tmc* -- from/to JSON should acception projectionProperties[]
  static toFlatFile(projection: ProjectionSimple) {
    return Object.values(projection.getProjectionOrderByColumPosition());
  }

  static fromFlatFile(
    json: TProjectionItemPropertiesJson[],
    projectableSubjects: IProjectableSubjectDictionary
  ): ProjectionSimple {
    if (!Array.isArray(json)) {
      throw new ProjectionError(
        `Failed to parse json, expected array, received ${typeof json}`
      );
    }
    const projection = new ProjectionSimple(projectableSubjects);

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
