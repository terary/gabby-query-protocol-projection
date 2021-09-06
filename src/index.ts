import { CONSTS } from "./common";
import type { TSupportedDatatype } from "./common/type";

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
  TProjectionProperties,
  TProjectionPropertiesJson,
  TProjectionPropertiesUpdatable,
} from "./ProjectionEditor";

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
  // TProjectableSubjectsDictionary, // projectable - not actual
  TProjectionDictionary, // dictionary -- return value for state management. Not applicable in lib but left here because why not
  TProjectionProperties, // actual projection item,
  TProjectionPropertiesJson,
  TProjectionPropertiesUpdatable, // subset properties of actual that can be updated
  TSupportedDatatype,
};
