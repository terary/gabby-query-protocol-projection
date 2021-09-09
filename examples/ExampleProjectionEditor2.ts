import { ProjectionEditorFactory } from "../src";
import { EXAMPLE_JSON_BLUE_SKIES } from "../src";

const { projectionJson: projectionItemsJson } = EXAMPLE_JSON_BLUE_SKIES;
const { projectableSubjectDictionaryJson } = EXAMPLE_JSON_BLUE_SKIES;

export const exampleProjectionEditor = ProjectionEditorFactory.fromJson({
  projectionItemsJson,
  projectableSubjectDictionaryJson,
});

// EXAMPLE_BEGIN
const projectionItemId = exampleProjectionEditor.addSubject({
  label: "My New Projection Item",
  subjectId: "lastname",
  columnOrder: 1000,
  sortOrder: -1,
});
//  EXAMPLE_END

exampleProjectionEditor.updateSubject(projectionItemId, { columnOrder: 10 });

console.log(exampleProjectionEditor.getProjectionOrderByColumPosition());
