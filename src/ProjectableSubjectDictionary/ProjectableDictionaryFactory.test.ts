import { EXAMPLE_JSON_BLUE_SKIES } from "../external-files";
import { ProjectableDictionaryFactory } from "./ProjectableDictionaryFactory";
import { TProjectableSubjectsDictionaryJson } from "./type";
const projectableDictionaryJson =
  EXAMPLE_JSON_BLUE_SKIES.projectableSubjectDictionaryJson;
describe("ProjectableDictionaryFactory", () => {
  describe("fromJson", () => {
    it("Should accept json and create IProjectableDictionary", () => {
      const projectableDictionary = ProjectableDictionaryFactory.fromJson(
        projectableDictionaryJson as TProjectableSubjectsDictionaryJson
      );
      expect(ProjectableDictionaryFactory.toJson(projectableDictionary)).toStrictEqual(
        projectableDictionaryJson
      );
    });
  }); //   describe('toJson',()=>{})
  describe("fromJson", () => {}); //   describe('fromJson',()=>{})
});
