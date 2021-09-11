# gabby-query-protocol-projection

[![Build Status](https://app.travis-ci.com/terary/typescript-travis-trial-do-not-use.svg?branch=main)](https://app.travis-ci.com/terary/typescript-travis-trial-do-not-use)
[![codecov](https://codecov.io/gh/terary/typescript-travis-trial-do-not-use/branch/main/graph/badge.svg?token=MWXX9ASDMG)](https://codecov.io/gh/terary/typescript-travis-trial-do-not-use)
[![awesome](https://img.shields.io/badge/awesome-100%25-blue)](https://github.com/terary/typescript-travis-trial-do-not-use)
[![Gabby Query Protocol](https://img.shields.io/badge/GQP-projection-blue)](https://github.com/terary/typescript-travis-trial-do-not-use)

Utility to assist with field selection routines. AKA: Column selection utility.

## Installation

Using npm:

`$ npm install gabby-query-protocol-projection`

### Description

This is a sub-project project the Gabby Query Protocol.  
The purpose of the project is to provide utilities for column selection (a projection).

A projection item:

```ts
export type TProjectionProperties = {
  subjectId: string;
  sortOrder: number; // between [-1,1]
  columnOrder: number; // any number ok. This is not position
  label: string;
};
```

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
