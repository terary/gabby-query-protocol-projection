import * as exportNonTypes from "./index";
describe("Projection.index - export non-type", () => {
  it('Should export only "ProjectableSubjects" and "Projection" non type thing"', () => {
    expect(Object.keys(exportNonTypes).length).toBe(2);
    expect("Projection" in exportNonTypes).toBeTruthy();
    expect("ProjectionEditorFactory" in exportNonTypes).toBeTruthy();
  });
});
