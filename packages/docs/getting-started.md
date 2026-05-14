---
title: Getting started
description: Install @kamod-hooks/core with Preact and import hooks in your app.
---

## Install

```bash
pnpm add @kamod-hooks/core preact
```

Use the same major line of **Preact** as declared in the package peer dependency (see `@kamod-hooks/core` `package.json` on npm or in the repo).

## Minimal usage

```tsx
import { render } from 'preact'
import { useToggle } from '@kamod-hooks/core'

function Demo() {
  const [on, { toggle }] = useToggle(false)
  return (
    <button type="button" onClick={toggle}>
      {on ? 'On' : 'Off'}
    </button>
  )
}

render(<Demo />, document.getElementById('app')!)
```

## TypeScript

Types ship with the package (`exports` includes `types`). No extra `@types` package is required.

## Explore hooks

Browse the **Hooks** section in the sidebar for topic guides and code samples. Every export is listed on [All hooks (reference)](/hooks/all-hooks); the same table exists in the repository root `README.md`.

## Deploying this documentation site

From `packages/docs`, `pnpm build` writes static files to `dist/`. Point any static host (GitHub Pages, Netlify, etc.) at that folder after CI runs the build.

If the site is served under a **subpath** (for example GitHub Pages at `https://user.github.io/repo-name/`), set `site.base` in `.preactpress/config.ts`:

```ts
site: {
  base: '/repo-name/'
}
```

For a root URL, keep `base: '/'`. PreactPress forwards this to Vite so assets and client routing match the host path.

This package depends on `preactpress` via `file:../../../preactpress`, which assumes this repo layout (`kamod/kamod-hooks/packages/docs` next to `kamod/preactpress`). For a standalone hooks-only checkout, point `preactpress` at a published version instead.
