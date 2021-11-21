import { TValidatorResponse } from "./types";
import { IProjectableSubjectDictionary } from "../index";
import helperFunctions from "./helperFunctions";
import { TProjectionItemPropertiesJson } from "../ProjectionEditor/type";

export interface IValidateProjectionPropertiesProps {
  (
    properties: TProjectionItemPropertiesJson,
    projectableSubjects: IProjectableSubjectDictionary
  ): TValidatorResponse;
}
export const ValidateProjectionProperties: IValidateProjectionPropertiesProps = (
  properties,
  projectableSubjects
): TValidatorResponse => {
  const errorMessages: string[] = [];
  const { subjectId } = properties;
  const messageSegment = `Projection with subjectId '${subjectId}' `;

  // ["subjectId", "sortOrder", "columnOrder", "label"]
  const missingProps = helperFunctions.findMissingProperties(properties, [
    "subjectId",
    "sortOrder",
    "columnOrder",
    "label",
  ]);
  if (missingProps.length > 0) {
    errorMessages.push(`is missing properties: ${missingProps.join(", ")} `);
  }

  errorMessages.push(...validatePropertySortOrder(properties));
  errorMessages.push(...validatePropertyLabel(properties));
  errorMessages.push(...validatePropertyColumnOrder(properties));
  errorMessages.push(...validatePropertySubjectId(properties, projectableSubjects));

  if (errorMessages.length > 0) {
    errorMessages.forEach((message, idx) => {
      errorMessages[idx] = `${messageSegment}: ${message}`;
    });
  }
  return { hasError: errorMessages.length > 0, errorMessages };
};

const validatePropertySortOrder = (
  properties: TProjectionItemPropertiesJson
): string[] => {
  const errorMessages: string[] = [];

  if (typeof properties.sortOrder !== "number") {
    errorMessages.push(
      `'sortOrder' is not a string type (actual type: ${typeof properties.sortOrder})`
    );
  }

  if (properties.sortOrder === undefined || properties.sortOrder === null) {
    errorMessages.push(`invalid sortOrder: '${properties.sortOrder}')`);
  }
  return errorMessages;
};

const validatePropertyLabel = (properties: TProjectionItemPropertiesJson): string[] => {
  const errorMessages: string[] = [];

  if (typeof properties.label !== "string") {
    errorMessages.push(
      `'label' is not a string type (actual type: ${typeof properties.label})`
    );
  }

  return errorMessages;
};

const validatePropertySubjectId = (
  properties: TProjectionItemPropertiesJson,
  projectableSubjects: IProjectableSubjectDictionary
): string[] => {
  const errorMessages: string[] = [];

  if (typeof properties.subjectId !== "string") {
    errorMessages.push(
      `'subjectionId' is not a string type (actual type: ${typeof properties.subjectId})`
    );
  }

  if (
    !properties.subjectId ||
    !projectableSubjects.subjectIdExists(properties.subjectId)
  ) {
    projectableSubjects.getSubjectIds();
    errorMessages.push(
      `'subjectId' does not exist in Projectable Subjects. Possible subjectIds: [${projectableSubjects
        .getSubjectIds()
        .join(", ")}]`
    );
  }

  return errorMessages;
};

const validatePropertyColumnOrder = (
  properties: TProjectionItemPropertiesJson
): string[] => {
  const errorMessages: string[] = [];

  if (typeof properties.columnOrder !== "number") {
    errorMessages.push(
      `'columnOrder' is not a string type (actual type: ${typeof properties.columnOrder})`
    );
  }

  return errorMessages;
};

export const untestable = {
  ValidateProjectionProperties,
};
