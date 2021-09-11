/* eslint-disable import/prefer-default-export */
import { ProjectionSimple } from "./Projection";
import { IProjectionEditor } from "./IProjectionEditor";
import { ProjectionEditorFactory } from "./ProjectionEditorFactory";
import type {
  TProjectionItemProperties,
  TProjectionItemPropertiesJson,
  TProjectionDictionary,
  TProjectionPropertiesUpdatable,
} from "./type";

export { ProjectionSimple as Projection, ProjectionEditorFactory };
export type {
  TProjectionItemProperties,
  TProjectionItemPropertiesJson,
  TProjectionDictionary,
  TProjectionPropertiesUpdatable,
  IProjectionEditor,
};
