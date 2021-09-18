import { CONSTS } from "./common";
import type { TSupportedDatatype, TProjectionItemPropertyName } from "./common/type";

import { EXAMPLE_JSON_BLUE_SKIES } from "./external-files";
import { Projection, ProjectionEditorFactory } from "./ProjectionEditor";
import { IProjectionEditor } from "./ProjectionEditor";
import {
  ProjectableSubjectDictionary,
  ProjectableDictionaryFactory,
} from "./ProjectableSubjectDictionary";
import type {
  IProjectableSubjectDictionary,
  TProjectableSubjectPropertiesJson,
  TProjectableSubjectsDictionaryJson,
} from "./ProjectableSubjectDictionary";

import type {
  TProjectionDictionary,
  TProjectionItemProperties,
  TProjectionItemPropertiesJson,
  TProjectionPropertiesUpdatable,
} from "./ProjectionEditor";

// deprecated - here for backwards compatibility
type TProjectionProperties = TProjectionItemProperties;
type TProjectionPropertiesJson = TProjectionItemPropertiesJson;

export {
  CONSTS,
  EXAMPLE_JSON_BLUE_SKIES,
  ProjectableDictionaryFactory,
  ProjectableSubjectDictionary,
  Projection,
  ProjectionEditorFactory,
};

export type {
  IProjectionEditor,
  IProjectableSubjectDictionary,
  TProjectableSubjectPropertiesJson,
  TProjectableSubjectsDictionaryJson,
  TProjectionDictionary,
  TProjectionItemPropertyName, // "columnOrder" | "label" | "sortOrder" | "subjectId";
  TProjectionProperties, // actual projection item,
  TProjectionPropertiesJson,
  TProjectionPropertiesUpdatable, // subset properties of actual that can be updated
  TSupportedDatatype,
};
