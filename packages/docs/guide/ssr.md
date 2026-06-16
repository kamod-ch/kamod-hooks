---
title: SSR and browser APIs
description: Which hooks are SSR-safe and which should only run after mount.
---

## SSR-safe hooks

Pure state and effect helpers such as `useToggle`, `useBoolean`, `useCounter`, `useSetState`, `usePrevious`, `useMemoizedFn`, and `useRequest` are safe to import during SSR.

## Browser-only hooks

Hooks that rely on `window`, `document`, storage, observers, fullscreen, drag and drop, or WebSocket APIs should render only after mount. This site wraps those demos in `BrowserOnly` so the static build stays safe.

Examples include:

- `useLocalStorageState`
- `useSessionStorageState`
- `useCookieState`
- `useUrlState`
- `useTheme`
- `useResponsive`
- `useInViewport`
- `useVirtualList`
- `useWebSocket`

## Practical rule

If a hook touches a browser global in its implementation or needs a DOM target, treat it as client-only in SSR and SSG applications.
