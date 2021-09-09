# gabby-query-protocol-projection

[![Build Status](https://app.travis-ci.com/terary/typescript-travis-trial-do-not-use.svg?branch=main)](https://app.travis-ci.com/terary/typescript-travis-trial-do-not-use)

Utility to assist with field selection routines.

## Installation

Using npm:

`$ npm install gabby-query-protocol-projection`

### Description

[This Repo's docs](https://terary.github.io/gabby-query-protocol-projection/)

[Project's docs](https://terary.github.io/gabby-query-protocol-www/)

## Example

Simple usage:

```ts
import { ProjectionEditorFactory } from "gabby-query-protocol-projection";
import { EXAMPLE_JSON_BLUE_SKIES } from "gabby-query-protocol-projection";

const { projectionJson: projectionItemsJson } = EXAMPLE_JSON_BLUE_SKIES;
const { projectableSubjectDictionaryJson } = EXAMPLE_JSON_BLUE_SKIES;

export const exampleProjectionEditor = ProjectionEditorFactory.fromJson({
  projectionItemsJson,
  projectableSubjectDictionaryJson,
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

### terminology

**projection** - a field, or column, or similar, or a collection thereof.
Possible uses of a projection:

- `SELECT [projection]`
- `ORDER BY [projection]`
- record definition
- non-SQL column definition

### npm run

**gabby:build**  
Transpile to js includes source map
and types, target directory './dist'

**gabby:pack**  
Create npm friendly tgz package

**gabby:ship**  
All the above and cp file to
publicly available website
