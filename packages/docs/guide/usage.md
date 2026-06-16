---
title: Usage
description: Practical usage patterns for the library.
---

## Preferred workflow

- import the hook directly from `@kamod-ch/hooks`
- keep browser-only hooks behind a mounted client boundary during SSR and SSG
- use the live demo source blocks as starting points for your own components
- prefer namespaced storage keys for localStorage, sessionStorage, cookies, and URL params

## Source of truth

This site derives its content from the actual exported hooks and their TypeScript declarations in `packages/core/dist`.
