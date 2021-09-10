import type { TSupportedDatatype } from "./type";
import type { IExportToJson } from "./IExportToJson";
import type { IImportFromJson } from "./IImportFromJson";
import * as CONSTS from "./consts";

Object.freeze(CONSTS);
export { CONSTS };

export type { IExportToJson, IImportFromJson, TSupportedDatatype };
