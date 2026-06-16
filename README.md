# kamod-hooks

Preact hooks library ported from [ahooks](https://github.com/alibaba/hooks), structured similarly to [kamod-ui](../kamod-ui): pnpm workspace, `packages/core`, `tsup`, Vitest.

## Highlights

- **Peer dependency:** `preact` (^10.26.0) only — **no runtime npm `dependencies`** in `@kamod-hooks/core`.
- **ESM + TypeScript** build (`pnpm -r build`).
- **Browser APIs:** native `ResizeObserver`, `IntersectionObserver`, Fullscreen API, `URLSearchParams` / `history` for URL state (no `react-router`).

## Usage

```bash
pnpm add @kamod-ch/hooks preact
```

```ts
import { useToggle, useUrlState } from "@kamod-ch/hooks";
```

Per-hook subpath imports are also supported for more granular development and bundle analysis:

```ts
import useToggle from "@kamod-ch/hooks/useToggle";
import useUrlState from "@kamod-ch/hooks/useUrlState";
```

Each `@kamod-hooks/core/<hookName>` subpath maps to the matching camelCase source folder. The root barrel remains available and is tree-shakeable in modern bundlers.

`useUrlState` syncs query string with `history.pushState` / `replaceState` and listens for `popstate`. It is not API-identical to `@ahooks.js/use-url-state` (no `react-router` / `query-string`).

## Documentation site

The **PreactPress** site in `packages/docs` is the consumer-facing guide (Markdown + live Preact demos). It ships with **search**, an on-page **outline**, **light/dark** switching, and GitHub Pages-ready static output. Published URL:

- https://kamod-ch.github.io/kamod-hooks/

```bash
pnpm install
pnpm docs:dev
```

Validate config, routes, and internal links before deploy or in CI:

```bash
pnpm docs:check
```

Production build:

```bash
pnpm docs:build
pnpm docs:preview
```

The site links to the local `preactpress` package via `file:../../../preactpress` (same checkout as this repo’s parent `kamod` folder). For **GitHub Pages** or any host that serves the app under a subpath, set `site.base` in `packages/docs/.preactpress/config.ts` (see the **Deploying this documentation site** section in the `getting-started` page source under `packages/docs`).

## Hooks and utilities

| Export | Description |
| --- | --- |
| `useAntdTable` | Table data flow for Ant Design–style tables: async service, pagination, filters, and sorters. |
| `useAsyncEffect` | `useEffect` that allows an async function and optional async cleanup. |
| `useBoolean` | Boolean state with helpers (`setTrue`, `setFalse`, `toggle`). |
| `useClickAway` | Fires a callback when the user clicks outside given target(s). |
| `useControllableValue` | Controlled / uncontrolled value pattern with a single API. |
| `useCookieState` | State persisted in a browser cookie. |
| `useCountDown` | Countdown to a target time with formatted remaining time. |
| `useCounter` | Numeric counter with increment, decrement, and bounds. |
| `useCreation` | Memoizes a value with a stable reference (similar intent to `useMemo` for instances). |
| `useDebounce` | Debounced value that updates after a delay. |
| `useDebounceEffect` | `useEffect` that debounces when dependencies change. |
| `useDebounceFn` | Returns a debounced version of a function. |
| `useDeepCompareEffect` | `useEffect` with deep-equality dependency comparison. |
| `useDeepCompareLayoutEffect` | `useLayoutEffect` variant with deep-equality deps. |
| `useDocumentVisibility` | Subscribes to `document.visibilityState` (tab visible / hidden). |
| `useDrag` | HTML5 drag source: sets `draggable`, serializes payload into `dataTransfer` (pairs with `useDrop`). |
| `useDrop` | HTML5 drop target: accepts custom DOM data, files, URIs, text, and paste events. |
| `useDynamicList` | List state with add, remove, replace, reorder, and bulk updates. |
| `useEventEmitter` | Simple pub/sub event bus shared across components. |
| `useEventListener` | Attaches a DOM event listener with sensible defaults and cleanup. |
| `useEventTarget` | Normalized state for form-like targets (`value`, `onChange`). |
| `useExternal` | Loads external scripts or stylesheets and tracks loading status. |
| `useFavicon` | Sets the document favicon URL. |
| `useFocusWithin` | Whether focus is inside a subtree (focus-within semantics). |
| `useFullscreen` | Fullscreen API for an element (enter / exit / toggle). |
| `useFusionTable` | Like `useAntdTable` but oriented toward Fusion Design table usage. |
| `useGetState` | `useState` plus a `getState()` function that always reads the latest value. |
| `useHistoryTravel` | Undo / redo over a value with past and future stacks. |
| `useHover` | Whether the pointer is hovering over a target element. |
| `useInfiniteScroll` | Infinite scroll: load more when a sentinel enters the viewport. |
| `useInViewport` | Whether an element is visible via `IntersectionObserver`. |
| `useInterval` | Declarative `setInterval` tied to the component lifecycle. |
| `useIsomorphicLayoutEffect` | `useLayoutEffect` in the browser, `useEffect` on the server. |
| `useKeyPress` | Listens for specific keys or key combinations. |
| `useLatest` | Ref that always holds the latest value of a variable. |
| `useLocalStorageState` | State synced with `localStorage`. |
| `useLockFn` | Wraps an async function so concurrent calls are serialized / deduped. |
| `useLongPress` | Detects a long-press gesture with configurable delay. |
| `useMap` | Reactive `Map` with immutable-style update helpers. |
| `useMemoizedFn` | Stable function reference that always calls the latest implementation. |
| `useMount` | Runs a callback once when the component mounts. |
| `useMouse` | Tracks mouse position (page / screen / element-relative). |
| `useMutationObserver` | Subscribes to DOM mutations on an element. |
| `useNetwork` | Online / offline and connection-aware network state. |
| `usePagination` | Pagination state and helpers for list or table data. |
| `usePrevious` | Holds the previous value of a state or prop across renders. |
| `useRafInterval` | Interval callbacks scheduled with `requestAnimationFrame`. |
| `useRafState` | State updates coalesced on `requestAnimationFrame`. |
| `useRafTimeout` | Delayed callback scheduled with `requestAnimationFrame`. |
| `useReactive` | Mutable proxy object that triggers re-renders on deep changes. |
| `useRequest` | Async request lifecycle: loading, data, error, refresh, and cache. |
| `useResetState` | State with a `reset` back to the initial value. |
| `useResponsive` | Breakpoint flags from `matchMedia` (uses `configResponsive`). |
| `useSafeState` | `useState` that ignores updates after unmount. |
| `useScroll` | Scroll position and scrolling for `window` or an element. |
| `useSelections` | Multi-select items from a list with select-all / partial logic. |
| `useSessionStorageState` | State synced with `sessionStorage`. |
| `useSet` | Reactive `Set` with add/remove/has helpers. |
| `useSetState` | Object state merged like class `setState`. |
| `useSize` | Observed width and height of a DOM element (`ResizeObserver`). |
| `useTextSelection` | Current text selection within a target or document. |
| `useTheme` | Light / dark / system theme with media-query and storage sync. |
| `useThrottle` | Throttled value that updates at most every N ms. |
| `useThrottleEffect` | `useEffect` that throttles when dependencies change. |
| `useThrottleFn` | Returns a throttled version of a function. |
| `useTimeout` | Declarative `setTimeout` with cancel / reset. |
| `useTitle` | Sets `document.title` and restores on unmount if configured. |
| `useToggle` | Cycles or toggles among two or more values. |
| `useTrackedEffect` | `useEffect` that reports which dependencies changed. |
| `useUnmount` | Runs a callback when the component unmounts. |
| `useUnmountedRef` | Ref that becomes `true` after the component has unmounted. |
| `useUpdate` | Returns a function that forces a re-render. |
| `useUpdateEffect` | Like `useEffect` but skips the first run (updates only). |
| `useUpdateLayoutEffect` | Like `useLayoutEffect` but skips the first run. |
| `useUrlState` | State mirrored in the URL query string via the History API. |
| `useVirtualList` | Virtual list: only renders visible slice of a long list. |
| `useWebSocket` | WebSocket connection with reconnect and message helpers. |
| `useWhyDidYouUpdate` | Logs which props or state changed between renders (dev aid). |
| `clearCache` | Clears cached results used by `useRequest`. |
| `configResponsive` | Registers breakpoint names and widths for `useResponsive`. |
| `createUpdateEffect` | Builds an effect hook that runs only on updates, not on mount. |

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `pnpm build`   | Build all packages         |
| `pnpm test`    | Run `@kamod-hooks/core` tests |
| `pnpm typecheck` | Typecheck workspace     |
| `pnpm docs:dev` | Run PreactPress docs locally |
| `pnpm docs:check` | Validate docs pages, demos, links, and routes |
| `pnpm docs:build` | Build static docs to `packages/docs/dist` |
| `pnpm docs:preview` | Preview the built docs locally |

## License

MIT — see [LICENSE](LICENSE) and [NOTICE](NOTICE).
