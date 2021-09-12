import pick from "lodash.pick";
import type {
  TProjectionDictionary,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
} from "./type";
import { IProjectableSubjectDictionary } from "../ProjectableSubjectDictionary";
import { ProjectionError } from "../ProjectionError";
import { IProjectionEditor } from "./IProjectionEditor";
import { Validators } from "../validators";
import { TProjectionPropertiesJson } from "./type";

/**
 * Example usage:
 * [[include:ExampleProjectionEditor.html]]
 * [[include:ExampleProjectionEditor2.html]]
 * [[include:ExampleProjectionEditor3.html]]
 */
export class Projection implements IProjectionEditor {
  private _projections: TProjectionDictionary = {};

  private _projectableSubjects: IProjectableSubjectDictionary;

  private _keyCount = 0;

  constructor(projectableSubjects: IProjectableSubjectDictionary) {
    this._projectableSubjects = projectableSubjects;
  }

  addSubject(projection: TProjectionProperties): string {
    const projectionSubjectId = this._nextIndex();
    this._projections[projectionSubjectId] = projection;
    return projectionSubjectId;
  }

  getProjectableSubjectsDictionary(): IProjectableSubjectDictionary {
    return this._projectableSubjects;
    //    return cloneDeep(this._projectableSubjects);
  }

  getSubProjectionBySubjectId(subjectId: string): TProjectionDictionary {
    const subjects: TProjectionDictionary = {};
    Object.entries(this._projections).forEach(([projectionKey, subject]) => {
      if (subjectId === subject.subjectId) {
        subjects[projectionKey] = { ...subject };
      }
    });
    return subjects;
  }

  getKeys(): string[] {
    return Object.keys(this._projections);
  }

  getProjectionOrderByColumPosition(): TProjectionDictionary {
    const a = Object.assign(
      {},
      ...Object.entries(this._projections)
        .sort(([keyA, propA], [keyB, propB]) => {
          return propA.columnOrder - propB.columnOrder;
        })
        .map(([index, props]) => {
          return { [index]: { ...props } };
        })
    );
    return a;
  }

  getProjectionSubject(key: string): TProjectionProperties {
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

  toJson(): TProjectionProperties[] {
    return Object.values(this._projections);
  }

  // TODO - *tmc* -- from/to JSON should acception projectionProperties[]
  static toFlatFile(projection: Projection) {
    return Object.values(projection.getProjectionOrderByColumPosition());
  }

  static fromFlatFile(
    json: TProjectionPropertiesJson[],
    projectableSubjects: IProjectableSubjectDictionary
  ): Projection {
    if (!Array.isArray(json)) {
      throw new ProjectionError(
        `Failed to parse json, expected array, received ${typeof json}`
      );
    }
    const projection = new Projection(projectableSubjects);

    json.forEach((projectionItem) => {
      const { hasError, errorMessages } = Validators.ValidateProjectionProperties(
        projectionItem,
        projectableSubjects
      );

      if (hasError) {
        throw new ProjectionError("Failed to parse json", errorMessages);
      }

      projection.addSubject(projectionItem as TProjectionProperties);
    });
    return projection;
  }
}