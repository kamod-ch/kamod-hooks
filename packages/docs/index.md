---
title: Introduction
description: Preact hooks ported from ahooks — zero runtime npm dependencies.
---

**Kamod Hooks** (`@kamod-hooks/core`) is a Preact hooks library structured like [ahooks](https://github.com/alibaba/hooks): utilities for state, effects, browser APIs, async flows, and more.

## Why this package

- **Peer dependency:** `preact` (^10.26.0) only — **no runtime npm `dependencies`** in the published package.
- **ESM + TypeScript** builds for modern bundlers.
- **Browser-first APIs** where relevant (`ResizeObserver`, `IntersectionObserver`, History API for URL state, and so on).

## Documentation

This site is built with **PreactPress** (Vite + Preact, Markdown pages). Pages are **guides and copy-paste examples**, not live playgrounds. For behavior guarantees, rely on the library tests and TypeScript types.

Next: [Getting started](/getting-started). The full export list is on [All hooks (reference)](/hooks/all-hooks).
