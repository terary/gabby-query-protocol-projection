/* eslint-disable import/prefer-default-export */
export class ProjectionError extends Error {
  public parseErrors: string[] = [];

  constructor(message: string, parseErrors: string[] = []) {
    super(message);
    this.parseErrors = parseErrors;
  }
}
