---
title: TypeScript
description: How the docs reflect the published declaration files.
---

Every hook page includes the generated declaration signature from the built package.

## Recommendations

- let TypeScript infer generic parameters where possible
- prefer explicit generic arguments when the hook stores `undefined` or unions
- use the hook pages as examples for return tuple and object shapes

## Package types

The package exports declaration files from `dist/` and does not require a separate `@types` package.
