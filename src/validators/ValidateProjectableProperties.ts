import { TValidatorResponse } from "./types";
import { CONSTS } from "../index";
import helperFunctions from "./helperFunctions";
import { TProjectableSubjectPropertiesJson } from "../ProjectableSubjectDictionary";
const PROJECTABLE_PROPERTY_NAMES = ["datatype", "defaultLabel", "isSortable"];

export interface IValidateProjectablePropertiesProps {
  (subjectId: string, properties: TProjectableSubjectPropertiesJson): TValidatorResponse;
}

export const ValidateProjectableProperties: IValidateProjectablePropertiesProps = (
  subjectId: string,
  properties: any
): TValidatorResponse => {
  const errorMessages: string[] = [];

  const missingProps = helperFunctions.findMissingProperties(
    properties,
    PROJECTABLE_PROPERTY_NAMES
  );

  if (missingProps.length > 0) {
    errorMessages.push(
      `Projectable subject '${subjectId}' is missing properties: '${missingProps.join(
        "', '"
      )}'.`
    );
  }

  if (typeof properties.isSortable !== "boolean") {
    errorMessages.push(
      `Projectable subject '${subjectId}': isSortable is not boolean type.`
    );
  }

  if (typeof properties.defaultLabel !== "string") {
    errorMessages.push(
      `Projectable subject '${subjectId}': defaultLabel is not recognized as string`
    );
  }

  if (typeof properties.datatype !== "string") {
    errorMessages.push(`Projectable subject '${subjectId}' is not recognized as string`);
  }

  if (
    !properties.datatype ||
    CONSTS.SUPPORTED_DATATYPES.indexOf(properties.datatype) === -1
  ) {
    errorMessages.push(
      `Projectable subject '${subjectId}': datatype not supported '${
        properties.datatype
      }', supported datatypes: ${CONSTS.SUPPORTED_DATATYPES.join(", ")}`
    );
  }
  return { hasError: errorMessages.length > 0, errorMessages };
};
