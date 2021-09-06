import type {
  TProjectableSubjectProperties,
  TProjectableSubjectsDictionaryJson,
} from "./type";
export interface IProjectableSubjectDictionary {
  subjectIdExists: (subjectId: string) => boolean;
  getSubjectIds: () => string[];
  getSubjectById: (subjectId: string) => TProjectableSubjectProperties;
  toJson: () => TProjectableSubjectsDictionaryJson;
}
