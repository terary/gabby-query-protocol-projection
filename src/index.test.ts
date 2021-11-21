import * as exportNonTypes from "./index";
describe("Library index - export non-type", () => {
  it('Should export only "PredicateTree" non type thing', () => {
    expect(Object.keys(exportNonTypes).length).toBe(9);

    expect("CONSTS" in exportNonTypes).toBeTruthy();
    expect("Projection" in exportNonTypes).toBeTruthy();
    expect("ProjectionEditor" in exportNonTypes).toBeTruthy();
    expect("ProjectionError" in exportNonTypes).toBeTruthy();
    expect("ProjectableSubjectDictionary" in exportNonTypes).toBeTruthy();
    expect("ProjectableDictionaryFactory" in exportNonTypes).toBeTruthy();
    expect("ProjectionEditorFactory" in exportNonTypes).toBeTruthy();
    expect("Validators" in exportNonTypes).toBeTruthy();
  });
  it("Should not have undefined exports", () => {
    // sometimes coverage shows index 0, this test helps - I don't understand why
    // also I thought I as doing that by checking expect key count. Guess not.
    Object.keys(exportNonTypes).forEach((exportKey) =>
      //@ts-ignore
      expect(Boolean(exportNonTypes[exportKey])).toBe(true)
    );
  });
});
