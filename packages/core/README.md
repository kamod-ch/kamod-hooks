# kamod-hooks

[![npm version](https://img.shields.io/npm/v/@kamod-ch/hooks)](https://www.npmjs.com/package/@kamod-ch/hooks)
[![License: MIT](https://img.shields.io/badge/license-MIT-0f766e.svg)](https://github.com/kamod-ch/kamod-hooks/blob/main/LICENSE)
[![Preact](https://img.shields.io/badge/preact-10%2B-673ab8.svg)](https://preactjs.com/)
[![Docs](https://img.shields.io/badge/docs-live-0ea5a4.svg)](https://kamod-ch.github.io/kamod-hooks/)
[![Demo](https://img.shields.io/badge/demo-interactive-334155.svg)](https://kamod-ch.github.io/kamod-hooks/)

[![kamod-hooks docs preview](https://github.com/kamod-ch/kamod-hooks/raw/main/assets/readme-banner.svg)](https://kamod-ch.github.io/kamod-hooks/)

Production-ready hooks for **Preact** — fast to adopt, easy to tree-shake, and built with **zero runtime dependencies** beyond `preact` itself.

`kamod-hooks` is a Preact-first hook library inspired by [ahooks](https://github.com/alibaba/hooks). It brings together state, lifecycle, browser, async, and utility hooks in a single TypeScript-friendly package, backed by a live docs site with interactive demos and visible source code.

### Start in 30 seconds

```bash
pnpm add @kamod-ch/hooks preact
```

```ts
import { useToggle, useCounter, useLocalStorageState } from '@kamod-ch/hooks'
```

**Explore now:** [Live docs](https://kamod-ch.github.io/kamod-hooks/) · [Hooks index](https://kamod-ch.github.io/kamod-hooks/hooks) · [Getting started](https://kamod-ch.github.io/kamod-hooks/guide/introduction)

## Quick links

- **Docs & live demos:** https://kamod-ch.github.io/kamod-hooks/
- **Hooks overview:** https://kamod-ch.github.io/kamod-hooks/hooks
- **Getting started:** https://kamod-ch.github.io/kamod-hooks/guide/introduction
- **Package:** `@kamod-ch/hooks`
- **Local demo:** `pnpm demo`

## Table of contents

- [Why kamod-hooks?](#why-kamod-hooks)
- [Feature matrix](#feature-matrix)
- [Install](#install)
- [Basic usage](#basic-usage)
- [Most used hooks](#most-used-hooks)
- [Demo](#demo)
- [Example](#example)
- [Documentation site](#documentation-site)
- [Notable behavior](#notable-behavior)
- [Hooks and utilities](#hooks-and-utilities)
- [Scripts](#scripts)
- [License](#license)

## Why kamod-hooks?

### Built for real Preact apps

Use hooks for the things you actually need in production:

- state and lifecycle helpers
- debounce / throttle / timing
- storage and URL state sync
- DOM and browser APIs
- drag & drop, viewport, fullscreen, selection, media
- async requests, caching, and pagination

### Lean by default

- **Peer dependency only:** `preact`
- **No runtime npm dependencies** in `@kamod-ch/hooks`
- **ESM output** for modern bundlers
- **TypeScript-first** with generated declarations
- **Tree-shakeable root exports** and **subpath imports**

### Easy to evaluate

The project ships with a documentation site that doubles as a live demo environment:

- interactive examples
- source code shown directly with each example
- searchable hook docs
- guide pages for setup and usage

## Feature matrix

| Capability | Included |
| --- | --- |
| Preact-first hooks | Yes |
| Zero runtime dependencies besides `preact` | Yes |
| TypeScript declarations | Yes |
| ESM package output | Yes |
| Tree-shakeable root exports | Yes |
| Subpath imports | Yes |
| Interactive docs demos | Yes |
| Visible example source | Yes |
| GitHub Pages-ready docs | Yes |
| Hooks for state, effects, browser APIs, async, URL, storage | Yes |

## Install

```bash
pnpm add @kamod-ch/hooks preact
```

## Basic usage

```ts
import { useToggle, useUrlState } from '@kamod-ch/hooks'
```

Subpath imports are also supported:

```ts
import useToggle from '@kamod-ch/hooks/useToggle'
import useUrlState from '@kamod-ch/hooks/useUrlState'
```

The root export remains tree-shakeable in modern bundlers. Subpath imports can be useful when you prefer more explicit dependency boundaries or want to inspect bundle composition more directly.

## Most used hooks

If you're new to the library, these are strong starting points:

- **[`useToggle`](https://kamod-ch.github.io/kamod-hooks/hooks/use-toggle)** — small, practical boolean/value toggling helper
- **[`useCounter`](https://kamod-ch.github.io/kamod-hooks/hooks/use-counter)** — counter state with ergonomic actions
- **[`useDebounce`](https://kamod-ch.github.io/kamod-hooks/hooks/use-debounce)** / **[`useThrottle`](https://kamod-ch.github.io/kamod-hooks/hooks/use-throttle)** — common UI responsiveness helpers
- **[`useLocalStorageState`](https://kamod-ch.github.io/kamod-hooks/hooks/use-local-storage-state)** — persist UI state across reloads
- **[`useUrlState`](https://kamod-ch.github.io/kamod-hooks/hooks/use-url-state)** — sync filters and view state into the URL
- **[`useRequest`](https://kamod-ch.github.io/kamod-hooks/hooks/use-request)** — async lifecycle, refresh, cache, and loading state
- **[`useClickAway`](https://kamod-ch.github.io/kamod-hooks/hooks/use-click-away)** — close popovers, dropdowns, and menus safely
- **[`useSize`](https://kamod-ch.github.io/kamod-hooks/hooks/use-size)** / **[`useInViewport`](https://kamod-ch.github.io/kamod-hooks/hooks/use-in-viewport)** — layout- and viewport-aware UI behavior
- **[`useTheme`](https://kamod-ch.github.io/kamod-hooks/hooks/use-theme)** — light/dark/system theme handling

## Demo

The fastest way to understand the library is to try the live documentation:

- **Live demo + docs:** https://kamod-ch.github.io/kamod-hooks/
- **Hooks index:** https://kamod-ch.github.io/kamod-hooks/hooks
- **Guide:** https://kamod-ch.github.io/kamod-hooks/guide/introduction

Run the local demo/dev site from the repository root:

```bash
pnpm install
pnpm demo
```

## Example

```tsx
import { useCounter, useToggle } from '@kamod-ch/hooks'

export function Example() {
  const [count, { inc, dec, reset }] = useCounter(0)
  const [enabled, { toggle }] = useToggle(false)

  return (
    <div>
      <p>Count: {count}</p>
      <p>Enabled: {String(enabled)}</p>

      <button onClick={() => inc()}>+</button>
      <button onClick={() => dec()}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}
```

## Documentation site

The documentation in `packages/docs` is built with **PreactPress** and acts as both reference and demo site.

It includes:

- getting-started guides
- hook reference pages
- live interactive demos
- visible example source code
- search and outline navigation
- static deployment support for GitHub Pages

Run locally from the repository root:

```bash
pnpm docs:dev
```

Check docs integrity:

```bash
pnpm docs:check
```

Production build and preview:

```bash
pnpm docs:build
pnpm docs:preview
```

## Notable behavior

- `useUrlState` syncs query params via the History API (`pushState` / `replaceState`) and listens to `popstate`.
- Browser-facing hooks use native platform APIs such as `ResizeObserver`, `IntersectionObserver`, Fullscreen API, `matchMedia`, and storage APIs.
- The project is inspired by ahooks, but hooks are adapted for a **Preact-first** and **browser-native** setup.

## Hooks and utilities

### State and value helpers

**Recommended:** [`useToggle`](https://kamod-ch.github.io/kamod-hooks/hooks/use-toggle), [`useCounter`](https://kamod-ch.github.io/kamod-hooks/hooks/use-counter), [`useSetState`](https://kamod-ch.github.io/kamod-hooks/hooks/use-set-state), [`useLocalStorageState`](https://kamod-ch.github.io/kamod-hooks/hooks/use-local-storage-state)

| Export | Description |
| --- | --- |
| `useBoolean` | Boolean state with helpers (`setTrue`, `setFalse`, `toggle`). |
| `useControllableValue` | Controlled / uncontrolled value pattern with a single API. |
| `useCounter` | Numeric counter with increment, decrement, and bounds. |
| `useDynamicList` | List state with add, remove, replace, reorder, and bulk updates. |
| `useGetState` | `useState` plus a `getState()` function that always reads the latest value. |
| `useHistoryTravel` | Undo / redo over a value with past and future stacks. |
| `useMap` | Reactive `Map` with immutable-style update helpers. |
| `usePrevious` | Holds the previous value of a state or prop across renders. |
| `useReactive` | Mutable proxy object that triggers re-renders on deep changes. |
| `useResetState` | State with a `reset` back to the initial value. |
| `useSafeState` | `useState` that ignores updates after unmount. |
| `useSelections` | Multi-select items from a list with select-all / partial logic. |
| `useSet` | Reactive `Set` with add/remove/has helpers. |
| `useSetState` | Object state merged like class `setState`. |
| `useToggle` | Cycles or toggles among two or more values. |

### Effects, lifecycle, and render control

**Recommended:** [`useMemoizedFn`](https://kamod-ch.github.io/kamod-hooks/hooks/use-memoized-fn), [`useLatest`](https://kamod-ch.github.io/kamod-hooks/hooks/use-latest), [`useUpdateEffect`](https://kamod-ch.github.io/kamod-hooks/hooks/use-update-effect), [`useIsomorphicLayoutEffect`](https://kamod-ch.github.io/kamod-hooks/hooks/use-isomorphic-layout-effect)

| Export | Description |
| --- | --- |
| `useAsyncEffect` | `useEffect` that allows an async function and optional async cleanup. |
| `useCreation` | Memoizes a value with a stable reference (similar intent to `useMemo` for instances). |
| `useDeepCompareEffect` | `useEffect` with deep-equality dependency comparison. |
| `useDeepCompareLayoutEffect` | `useLayoutEffect` variant with deep-equality deps. |
| `useIsomorphicLayoutEffect` | `useLayoutEffect` in the browser, `useEffect` on the server. |
| `useLatest` | Ref that always holds the latest value of a variable. |
| `useMemoizedFn` | Stable function reference that always calls the latest implementation. |
| `useMount` | Runs a callback once when the component mounts. |
| `useTrackedEffect` | `useEffect` that reports which dependencies changed. |
| `useUnmount` | Runs a callback when the component unmounts. |
| `useUnmountedRef` | Ref that becomes `true` after the component has unmounted. |
| `useUpdate` | Returns a function that forces a re-render. |
| `useUpdateEffect` | Like `useEffect` but skips the first run (updates only). |
| `useUpdateLayoutEffect` | Like `useLayoutEffect` but skips the first run. |
| `createUpdateEffect` | Builds an effect hook that runs only on updates, not on mount. |

### Timing, debounce, and throttle

**Recommended:** [`useDebounce`](https://kamod-ch.github.io/kamod-hooks/hooks/use-debounce), [`useDebounceFn`](https://kamod-ch.github.io/kamod-hooks/hooks/use-debounce-fn), [`useThrottle`](https://kamod-ch.github.io/kamod-hooks/hooks/use-throttle), [`useTimeout`](https://kamod-ch.github.io/kamod-hooks/hooks/use-timeout)

| Export | Description |
| --- | --- |
| `useDebounce` | Debounced value that updates after a delay. |
| `useDebounceEffect` | `useEffect` that debounces when dependencies change. |
| `useDebounceFn` | Returns a debounced version of a function. |
| `useInterval` | Declarative `setInterval` tied to the component lifecycle. |
| `useLockFn` | Wraps an async function so concurrent calls are serialized / deduped. |
| `useRafInterval` | Interval callbacks scheduled with `requestAnimationFrame`. |
| `useRafState` | State updates coalesced on `requestAnimationFrame`. |
| `useRafTimeout` | Delayed callback scheduled with `requestAnimationFrame`. |
| `useThrottle` | Throttled value that updates at most every N ms. |
| `useThrottleEffect` | `useEffect` that throttles when dependencies change. |
| `useThrottleFn` | Returns a throttled version of a function. |
| `useTimeout` | Declarative `setTimeout` with cancel / reset. |

### Browser, DOM, and interaction hooks

**Recommended:** [`useClickAway`](https://kamod-ch.github.io/kamod-hooks/hooks/use-click-away), [`useSize`](https://kamod-ch.github.io/kamod-hooks/hooks/use-size), [`useInViewport`](https://kamod-ch.github.io/kamod-hooks/hooks/use-in-viewport), [`useFullscreen`](https://kamod-ch.github.io/kamod-hooks/hooks/use-fullscreen)

| Export | Description |
| --- | --- |
| `useClickAway` | Fires a callback when the user clicks outside given target(s). |
| `useDocumentVisibility` | Subscribes to `document.visibilityState` (tab visible / hidden). |
| `useDrag` | HTML5 drag source: sets `draggable`, serializes payload into `dataTransfer` (pairs with `useDrop`). |
| `useDrop` | HTML5 drop target: accepts custom DOM data, files, URIs, text, and paste events. |
| `useEventListener` | Attaches a DOM event listener with sensible defaults and cleanup. |
| `useExternal` | Loads external scripts or stylesheets and tracks loading status. |
| `useFavicon` | Sets the document favicon URL. |
| `useFocusWithin` | Whether focus is inside a subtree (focus-within semantics). |
| `useFullscreen` | Fullscreen API for an element (enter / exit / toggle). |
| `useHover` | Whether the pointer is hovering over a target element. |
| `useInViewport` | Whether an element is visible via `IntersectionObserver`. |
| `useInfiniteScroll` | Infinite scroll: load more when a sentinel enters the viewport. |
| `useKeyPress` | Listens for specific keys or key combinations. |
| `useLongPress` | Detects a long-press gesture with configurable delay. |
| `useMouse` | Tracks mouse position (page / screen / element-relative). |
| `useMutationObserver` | Subscribes to DOM mutations on an element. |
| `useScroll` | Scroll position and scrolling for `window` or an element. |
| `useSize` | Observed width and height of a DOM element (`ResizeObserver`). |
| `useTextSelection` | Current text selection within a target or document. |
| `useTitle` | Sets `document.title` and restores on unmount if configured. |

### Storage, URL, and environment

**Recommended:** [`useUrlState`](https://kamod-ch.github.io/kamod-hooks/hooks/use-url-state), [`useLocalStorageState`](https://kamod-ch.github.io/kamod-hooks/hooks/use-local-storage-state), [`useTheme`](https://kamod-ch.github.io/kamod-hooks/hooks/use-theme), [`useResponsive`](https://kamod-ch.github.io/kamod-hooks/hooks/use-responsive)

| Export | Description |
| --- | --- |
| `useCookieState` | State persisted in a browser cookie. |
| `useEventTarget` | Normalized state for form-like targets (`value`, `onChange`). |
| `useLocalStorageState` | State synced with `localStorage`. |
| `useNetwork` | Online / offline and connection-aware network state. |
| `useResponsive` | Breakpoint flags from `matchMedia` (uses `configResponsive`). |
| `useSessionStorageState` | State synced with `sessionStorage`. |
| `useTheme` | Light / dark / system theme with media-query and storage sync. |
| `useUrlState` | State mirrored in the URL query string via the History API. |
| `configResponsive` | Registers breakpoint names and widths for `useResponsive`. |

### Async data and advanced utilities

**Recommended:** [`useRequest`](https://kamod-ch.github.io/kamod-hooks/hooks/use-request), [`usePagination`](https://kamod-ch.github.io/kamod-hooks/hooks/use-pagination), [`useWebSocket`](https://kamod-ch.github.io/kamod-hooks/hooks/use-web-socket), [`clearCache`](https://kamod-ch.github.io/kamod-hooks/utilities/clear-cache)

| Export | Description |
| --- | --- |
| `useAntdTable` | Table data flow for Ant Design–style tables: async service, pagination, filters, and sorters. |
| `useCountDown` | Countdown to a target time with formatted remaining time. |
| `useEventEmitter` | Simple pub/sub event bus shared across components. |
| `useFusionTable` | Like `useAntdTable` but oriented toward Fusion Design table usage. |
| `usePagination` | Pagination state and helpers for list or table data. |
| `useRequest` | Async request lifecycle: loading, data, error, refresh, and cache. |
| `useVirtualList` | Virtual list: only renders visible slice of a long list. |
| `useWebSocket` | WebSocket connection with reconnect and message helpers. |
| `useWhyDidYouUpdate` | Logs which props or state changed between renders (dev aid). |
| `clearCache` | Clears cached results used by `useRequest`. |

## Scripts

| Command | Description |
| --- | --- |
| `pnpm build` | Build all packages |
| `pnpm test` | Run `@kamod-ch/hooks` tests |
| `pnpm typecheck` | Typecheck workspace |
| `pnpm demo` | Start the docs/demo site locally |
| `pnpm docs:dev` | Run PreactPress docs locally |
| `pnpm docs:check` | Validate docs pages, demos, links, and routes |
| `pnpm docs:build` | Build static docs to `packages/docs/dist` |
| `pnpm docs:preview` | Preview the built docs locally |
| `pnpm qa:package` | Build package and run package-quality checks |

## Contributing

Issues and improvements are welcome. If you change docs behavior or hook APIs, please validate both package and docs flows:

```bash
pnpm build
pnpm test
pnpm docs:check
```

## License

Released under the MIT License. See [LICENSE](https://github.com/kamod-ch/kamod-hooks/blob/main/LICENSE) and [NOTICE](https://github.com/kamod-ch/kamod-hooks/blob/main/NOTICE).
