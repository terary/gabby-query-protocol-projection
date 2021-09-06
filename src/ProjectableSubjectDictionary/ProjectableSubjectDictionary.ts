import {
  TProjectableSubjectsDictionary,
  TProjectableSubjectProperties,
  TProjectableSubjectsDictionaryJson,
} from "./type";
import { IProjectableSubjectDictionary } from "./IProjectableSubjectDictionary";
import cloneDeep from "lodash.clonedeep";

export class ProjectableSubjectDictionary implements IProjectableSubjectDictionary {
  private _projectableSubjects: TProjectableSubjectsDictionary = {};

  get isLocked(): boolean {
    return Object.isFrozen(this._projectableSubjects);
  }

  getSubjectIds(): string[] {
    return Object.keys(this._projectableSubjects);
  }

  getSubjectById(subjectId: string): TProjectableSubjectProperties {
    return this._projectableSubjects[subjectId];
  }

  subjectIdExists(subjectId: string | undefined): boolean {
    if (subjectId === undefined) {
      return false;
    }
    return !!this._projectableSubjects[subjectId];
  }

  private addSubject(subjectId: string, properties: TProjectableSubjectProperties): void {
    this._projectableSubjects[subjectId] = properties;
  }

  private lock() {
    Object.freeze(this._projectableSubjects);
  }

  toJson(): TProjectableSubjectsDictionaryJson {
    return cloneDeep(this._projectableSubjects);
  }

  static addSubject(
    subjectDictionary: ProjectableSubjectDictionary,
    subjectId: string,
    properties: TProjectableSubjectProperties
  ) {
    if (!subjectDictionary.isLocked) {
      subjectDictionary.addSubject(subjectId, properties);
    }
  }

  static lock(subjectDictionary: ProjectableSubjectDictionary) {
    subjectDictionary.lock();
  }
}
