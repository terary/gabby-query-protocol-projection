export { CONSTS } from "./common";
export type { TSupportedDatatype, TProjectionItemPropertyName } from "./common/type";

export { EXAMPLE_JSON_BLUE_SKIES } from "./external-files";
export { Projection, ProjectionEditorFactory } from "./ProjectionEditor";
export { IProjectionEditor } from "./ProjectionEditor";
export {
  ProjectableSubjectDictionary,
  ProjectableDictionaryFactory,
} from "./ProjectableSubjectDictionary";
export type {
  IProjectableSubjectDictionary,
  TProjectableSubjectPropertiesJson,
  TProjectableSubjectsDictionaryJson,
} from "./ProjectableSubjectDictionary";

export type {
  TProjectionDictionary,
  TProjectionPropertiesUpdatable,
} from "./ProjectionEditor";

export type {
  // deprecated - here for backwards compatibility
  TProjectionItemProperties as TProjectionProperties,
  TProjectionItemPropertiesJson as TProjectionPropertiesJson,
} from "./ProjectionEditor";
