---
title: Storage & URL
description: localStorage, sessionStorage, cookies, and URL query state via the History API.
---

## useLocalStorageState / useSessionStorageState

```tsx
import { useLocalStorageState, useSessionStorageState } from '@kamod-hooks/core'

const [token, setToken] = useLocalStorageState('auth-token', { defaultValue: '' })
const [draft, setDraft] = useSessionStorageState('editor-draft', {
  defaultValue: ''
})
```

## useCookieState

```tsx
import { useCookieState } from '@kamod-hooks/core'

const [theme, setTheme] = useCookieState('theme', {
  defaultValue: 'system'
})
```

## useUrlState

Mirrors state in the query string using `history.pushState` / `replaceState` and listens for `popstate`. It is **not** identical to React-router–based URL state from ahooks; there is no dependency on a router package.

```tsx
import { useUrlState } from '@kamod-hooks/core'

function Filters() {
  const [query, setQuery] = useUrlState({ tab: 'home' })
  return (
    <nav>
      <button type="button" onClick={() => setQuery({ ...query, tab: 'docs' })}>
        Docs
      </button>
    </nav>
  )
}
```

Use `navigateMode: 'replace'` in the second argument when you want `replaceState` instead of `pushState` (fewer history entries).

```tsx
const [query, setQuery] = useUrlState({ q: '' }, { navigateMode: 'replace' })
```
