---
title: Installation
description: Install the package and choose an import style.
---

## Install

```bash
pnpm add @kamod-ch/hooks preact
```

## Imports

Root import:

```ts
import { useToggle, useRequest } from '@kamod-ch/hooks'
```

Per-hook subpath import:

```ts
import useToggle from '@kamod-ch/hooks/useToggle'
```

## Peer dependency

The package declares `preact` as its peer dependency. Match the major version required in `packages/core/package.json`.
