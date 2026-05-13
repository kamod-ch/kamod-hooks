# kamod-hooks

Preact hooks library ported from [ahooks](https://github.com/alibaba/hooks), structured similarly to [kamod-ui](../kamod-ui): pnpm workspace, `packages/core`, `tsup`, Vitest.

## Highlights

- **Peer dependency:** `preact` (^10.26.0) only — **no runtime npm `dependencies`** in `@kamod-hooks/core`.
- **ESM + TypeScript** build (`pnpm -r build`).
- **Browser APIs:** native `ResizeObserver`, `IntersectionObserver`, Fullscreen API, `URLSearchParams` / `history` for URL state (no `react-router`).

## Usage

```bash
pnpm add @kamod-hooks/core preact
```

```ts
import { useToggle, useUrlState } from "@kamod-hooks/core";
```

`useUrlState` syncs query string with `history.pushState` / `replaceState` and listens for `popstate`. It is not API-identical to `@ahooks.js/use-url-state` (no `react-router` / `query-string`).

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `pnpm build`   | Build all packages         |
| `pnpm test`    | Run `@kamod-hooks/core` tests |
| `pnpm typecheck` | Typecheck workspace     |

## License

MIT — see [LICENSE](LICENSE) and [NOTICE](NOTICE).
