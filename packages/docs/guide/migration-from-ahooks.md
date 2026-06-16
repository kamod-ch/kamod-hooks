---
title: Migration from ahooks
description: Notes for teams moving from ahooks to kamod-hooks.
---

kamod-hooks intentionally follows the broad shape of ahooks, but this repository is the source of truth.

## Important differences documented in the codebase

- the package is built for **Preact**, not React
- `useUrlState` uses the native History API and `URLSearchParams`
- browser APIs use native platform implementations instead of extra runtime dependencies

## Recommendation

When migrating an ahooks example, confirm the current kamod-hooks signature and behavior on the corresponding hook page before copying advanced options.
