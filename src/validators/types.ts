export type TValidatorResponse = { hasError: boolean; errorMessages: string[] };

export interface IValidator {
  (...args: any[]): TValidatorResponse;
}
