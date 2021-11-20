export { CONSTS } from "./common";
export type { TSupportedDatatype, TProjectionItemPropertyName } from "./common/type";

export { EXAMPLE_JSON_BLUE_SKIES } from "./external-files";
export { ProjectionEditor, ProjectionEditorFactory } from "./ProjectionEditor";
export { ProjectionError } from "./ProjectionError";

// "Projection" renamed, exported as "Projection" for backward compatibility
export { ProjectionEditor as Projection } from "./ProjectionEditor";

export { IProjectionEditor } from "./ProjectionEditor";
export { Validators } from "./validators";

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
  TProjectionItemProperties, //TODO - *tmc* - sort this mess, and remove the TProjectionProperties
  TProjectionItemProperties as TProjectionProperties,
  TProjectionItemPropertiesJson as TProjectionPropertiesJson,
  TProjectionPropertiesUpdatable,
} from "./ProjectionEditor";
