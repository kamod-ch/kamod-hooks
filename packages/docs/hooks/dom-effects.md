---
title: DOM & effects
description: Event listeners, click-away, lifecycle helpers, and observers.
---

## useEventListener

```tsx
import { useRef } from 'preact/hooks'
import { useEventListener } from '@kamod-hooks/core'

function KeyLogger() {
  const ref = useRef<HTMLDivElement>(null)
  useEventListener('keydown', (ev) => console.log(ev.key), { target: ref })
  return <div ref={ref} tabIndex={0}>Focus me</div>
}
```

## useClickAway

```tsx
import { useRef } from 'preact/hooks'
import { useClickAway } from '@kamod-hooks/core'

function Popover() {
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(() => console.log('outside'), ref)
  return <div ref={ref}>Panel</div>
}
```

## useMount / useUnmount / useUpdateEffect

```tsx
import { useMount, useUnmount, useUpdateEffect } from '@kamod-hooks/core'

useMount(() => {
  console.log('mounted')
})
useUnmount(() => {
  console.log('unmounted')
})
useUpdateEffect(() => {
  console.log('runs on updates, not on mount')
}, [dep])
```

## useSize / useInViewport

```tsx
import { useRef } from 'preact/hooks'
import { useSize, useInViewport } from '@kamod-hooks/core'

function Measured() {
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  const [inView] = useInViewport(ref)
  return <div ref={ref}>{size?.width} × visible: {String(inView)}</div>
}
```

## useDrag / useDrop

Native HTML5 drag and drop: `useDrag` marks an element as draggable and writes JSON payload into `dataTransfer`; `useDrop` listens on a target and parses files, URIs, text, or that custom payload.

```tsx
import { useRef, useState } from 'preact/hooks'
import { useDrag, useDrop } from '@kamod-hooks/core'

function DragDropDemo() {
  const dragRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const [dropped, setDropped] = useState<string | null>(null)

  useDrag({ id: 1, label: 'Drag me' }, dragRef, {
    onDragStart: () => setDropped(null),
  })

  useDrop(dropRef, {
    onDom: (data) => setDropped(JSON.stringify(data)),
  })

  return (
    <>
      <div ref={dragRef} style={{ padding: 12, border: '1px dashed #888' }}>
        Drag source
      </div>
      <div ref={dropRef} style={{ marginTop: 12, padding: 24, border: '1px solid #ccc' }}>
        Drop zone {dropped ? `→ ${dropped}` : ''}
      </div>
    </>
  )
}
```

See also: `useScroll`, `useHover`, `useFocusWithin`, `useMutationObserver`, `useKeyPress`, `useDocumentVisibility`, `useDebounceEffect`, `useThrottleEffect`, `useDeepCompareEffect`, and layout-effect variants where exported.
