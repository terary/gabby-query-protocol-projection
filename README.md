[This Repo's docs](https://terary.github.io/gabby-query-protocol-projection/)

# gabby-query-protocol-projection

### Description

This project was forked from Gabby Query Protocol Lib.

This project is focused on building tools to assist in field selections.

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
