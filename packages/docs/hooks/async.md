---
title: Async & data
description: Request lifecycle, debounced/throttled calls, and locking async work.
---

## useRequest

Async request with loading, data, error, refresh, and pluggable behavior (polling, debounce, cache, and more — see tests and source in `@kamod-hooks/core`).

```tsx
import { useRequest } from '@kamod-hooks/core'

function UserCard({ id }: { id: string }) {
  const { data, loading, error, refresh } = useRequest(async () => {
    const res = await fetch(`/api/users/${id}`)
    if (!res.ok) throw new Error(String(res.status))
    return res.json()
  }, { refreshDeps: [id] })

  if (loading) return <p>Loading…</p>
  if (error) return <p role="alert">{String(error)}</p>
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button type="button" onClick={refresh}>Refresh</button>
    </div>
  )
}
```

## useAsyncEffect

Runs an async function inside `useEffect`. Cleanup is synchronous (cancellation flag inside the implementation); do not rely on returning a `Promise` from cleanup.

```tsx
import { useAsyncEffect } from '@kamod-hooks/core'

useAsyncEffect(async () => {
  const res = await fetch('/api/ping')
  if (!res.ok) return
  await res.json()
}, [])
```

## useLockFn

Serialize concurrent calls to the same async function.

```tsx
import { useLockFn } from '@kamod-hooks/core'

const submit = useLockFn(async () => {
  await new Promise((r) => setTimeout(r, 500))
})
```

See also: `useDebounceFn`, `useThrottleFn`, `useInterval`, `useTimeout`, `useRafInterval`, `useRafTimeout`, `usePagination`, `useInfiniteScroll`, and table helpers like `useAntdTable` / `useFusionTable` where applicable to your UI stack.
