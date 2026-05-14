---
title: State & logic
description: Booleans, counters, toggles, maps, sets, and stable callbacks.
---

## useBoolean / useToggle

```tsx
import { useBoolean, useToggle } from '@kamod-hooks/core'

function Flags() {
  const [open, { setTrue, setFalse, toggle }] = useBoolean(false)
  const [mode, { toggle: toggleTheme }] = useToggle('light', 'dark')
  return (
    <div>
      <button type="button" onClick={toggle}>{open ? 'Close' : 'Open'}</button>
      <button type="button" onClick={toggleTheme}>{mode}</button>
    </div>
  )
}
```

## useSetState

Merge-style object state (similar to class `setState`).

```tsx
import { useSetState } from '@kamod-hooks/core'

function Form() {
  const [state, setState] = useSetState({ name: '', age: 0 })
  return (
    <input
      value={state.name}
      onInput={(e) => setState({ name: (e.target as HTMLInputElement).value })}
    />
  )
}
```

## useMap / useSet

Reactive `Map` and `Set` helpers with immutable-style updates.

```tsx
import { useMap, useSet } from '@kamod-hooks/core'

function Tags() {
  const [map, { set, remove }] = useMap<string, number>([['a', 1]])
  const [tags, { add, remove: removeTag }] = useSet(['x', 'y'])
  return null
}
```

## useMemoizedFn

Stable function identity that always calls the latest implementation — useful for listeners and child props.

```tsx
import { useMemoizedFn } from '@kamod-hooks/core'

const onScroll = useMemoizedFn(() => {
  // always sees latest refs/state from closure
})
```

See also: `useLatest`, `useGetState`, `useCreation`, `useReactive`, `useResetState`, `useSafeState`, `useControllableValue`, and related exports in the core package.
