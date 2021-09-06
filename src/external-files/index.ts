import type { TProjectableSubjectsDictionaryJson, TProjectionProperties } from "../";

import projectionEditorJson from "./projection-blue-skies.json";
import projectableSubjectDictionaryJson from "./projectable-subjects-blue-skies.json";

export const EXAMPLE_JSON_BLUE_SKIES = {
  projectableSubjectDictionaryJson:
    projectableSubjectDictionaryJson as TProjectableSubjectsDictionaryJson,
  projectionJson: projectionEditorJson.projection as TProjectionProperties[],
};
