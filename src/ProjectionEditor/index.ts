/* eslint-disable import/prefer-default-export */
import { ProjectionSimple } from "./Projection";
import { IProjectionEditor } from "./IProjectionEditor";
import { ProjectionEditorFactory } from "./ProjectionEditorFactory";
import type {
  TProjectionProperties,
  TProjectionPropertiesJson,
  TProjectionDictionary,
  TProjectionPropertiesUpdatable,
} from "./type";

export { ProjectionSimple as Projection, ProjectionEditorFactory };
export type {
  TProjectionProperties,
  TProjectionPropertiesJson,
  TProjectionDictionary,
  TProjectionPropertiesUpdatable,
  IProjectionEditor,
};
