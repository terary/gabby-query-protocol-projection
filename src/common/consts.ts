import { TProjectionItemProperties } from "../ProjectionEditor";

export const SUPPORTED_DATATYPES = [
  "integer",
  "decimal",
  "datetime",
  "string",
  "boolean",
];

export const DECIMAL_SYMBOL = ".";

export const PROJECT_ITEM_PROPERTY_NAMES = [
  "columnOrder",
  "label",
  "sortOrder",
  "subjectId",
] as (keyof TProjectionItemProperties)[];
