# gabby-query-protocol-projection

[![Build Status](https://app.travis-ci.com/terary/typescript-travis-trial-do-not-use.svg?branch=main)](https://app.travis-ci.com/terary/typescript-travis-trial-do-not-use)
[![codecov](https://codecov.io/gh/terary/gabby-query-protocol-projection/branch/main/graph/badge.svg?token=EOCDJS5RWC)](https://codecov.io/gh/terary/gabby-query-protocol-projection)
[![awesome](https://img.shields.io/badge/awesome-100%25-blue)](https://github.com/terary/typescript-travis-trial-do-not-use)
[![Gabby Query Protocol](https://img.shields.io/badge/GQP-projection-blue)](https://github.com/terary/typescript-travis-trial-do-not-use)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/terary/gabby-query-protocol-projection.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/terary/gabby-query-protocol-projection/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/terary/gabby-query-protocol-projection.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/terary/gabby-query-protocol-projection/context:javascript)

Utility to assist with field selection routines. AKA: Column selection utility.

## Installation

Using npm:

`$ npm install gabby-query-protocol-projection`

### Documentation

[This Repo's docs](https://terary.github.io/gabby-query-protocol-projection/)

[Project's docs](https://terary.github.io/gabby-query-protocol-www/)

`./examples/*` contains executable snippets found in documentation.

### Description

This is a sub-project the Gabby Query Protocol. The purpose of this project is to provide utilities for column selection (a projection).

**projection** - a field, or column, or similar, or a collection thereof.
Possible uses of a projection:

- `SELECT [projection]`
- `ORDER BY [projection]`
- record definition
- non-SQL column definition

### Main classes/types

A projection item:

```ts
type TProjectionItemProperties = {
  subjectId: string;
  sortOrder: number; // between [-1,1]
  columnOrder: number; // any number ok. This is not position
  label: string;
};
```

A projection:

```ts
type TProjection = TProjectionItemProperties[];
```

A Projection Editor:

```ts
export interface IProjectionEditor {
  addSubject(projection: TProjectionItemProperties): string;

  getProjectableSubjectsDictionary(): IProjectableSubjectDictionary;

  getSubProjectionBySubjectId(subjectId: string): TProjectionDictionary;

  getKeys(): string[];

  getProjectionOrderByColumPosition(): TProjectionDictionary;

  getProjectionSubject(key: string): TProjectionItemProperties;

  removeProjectionSubject(key: string): void;

  updateSubject(key: string, props: TProjectionPropertiesUpdatable): void;

  toJson(): TProjectionItemProperties[];
}
```

Projectable Subject (field properties to be used to create projectionItem)

```ts
export type TProjectableSubjectProperties = {
  isSortable: boolean; // this would likely used in things like ORDER BY
  datatype: TSupportedDatatype;
  defaultLabel: string;
};
```

## Example

Simple usage:

```ts
import { ProjectionEditorFactory } from "gabby-query-protocol-projection";
import { EXAMPLE_JSON_BLUE_SKIES } from "gabby-query-protocol-projection";

const { projectionJson: projectionItemsJson } = EXAMPLE_JSON_BLUE_SKIES;
const { projectableSubjectDictionaryJson } = EXAMPLE_JSON_BLUE_SKIES;

export const exampleProjectionEditor = ProjectionEditorFactory.fromJson({
  projectableSubjectDictionaryJson,
  projectionItemsJson, // optional, if undefined a new default projection created
});

const projectionItemId = exampleProjectionEditor.addSubject({
  label: "My New Projection Item",
  subjectId: "lastname",
  columnOrder: 1000,
  sortOrder: -1,
});

exampleProjectionEditor.updateSubject(projectionItemId, { columnOrder: 10 });

console.log(exampleProjectionEditor.getProjectionOrderByColumPosition());
```

### npm run

**gabby:build**  
Transpile to js includes source map
and types, target directory './dist'

**gabby:pack**  
Create npm friendly tgz package
