import type { TSupportedDatatype } from "../common";

export type TProjectableSubjectProperties = {
  isSortable: boolean; // this would likely translate into ORDER BY, now always are projectable fields sortable
  datatype: TSupportedDatatype;
  defaultLabel: string;
};
export type TProjectableSubjectPropertiesJson = {
  isSortable?: boolean; // this would likely translate into ORDER BY, now always are projectable fields sortable
  datatype?: TSupportedDatatype;
  defaultLabel?: string;
};

// this should not be used outside this module.
export type TProjectableSubjectsDictionary = {
  [subjectId: string]: TProjectableSubjectProperties;
};

export type TProjectableSubjectsDictionaryJson = {
  [subjectId: string]: TProjectableSubjectPropertiesJson;
};
