# Contributing

Thanks for your interest in contributing to **Kamod Hooks**. Pull requests and issues are welcome.

Please read this document before your first contribution. Check open issues and pull requests to avoid duplicate work.

## About this repository

This repository is a **pnpm monorepo** ([workspaces](https://pnpm.io/workspaces)).

- **Package manager:** [pnpm](https://pnpm.io) (version pinned via `packageManager` in the root `package.json`).
- **Runtime:** [Preact](https://preactjs.com/) hooks library with zero runtime npm dependencies (peer: `preact` only).

There is no Turborepo or Changesets setup in this repo; releases follow git tags and the publish workflow.

## Structure

```
packages
├── core          # @kamod-hooks/core — hook library (tsup, Vitest)
└── docs          # PreactPress documentation site
```

| Path              | Description                                      |
| ----------------- | ------------------------------------------------ |
| `packages/core`   | Hook library source, types, and unit tests.      |
| `packages/docs`   | Consumer-facing docs (Markdown + code examples). |

The root `README.md` and `packages/docs/hooks/all-hooks.md` should stay in sync for the hook reference table.

## Development

### Install dependencies

From the repository root:

```bash
pnpm install
```

### Run the documentation site

```bash
pnpm demo
# or
pnpm --filter @kamod-hooks/docs dev
```

Validate routes and links before deploy:

```bash
pnpm docs:check
```

### Build and quality checks

From the root:

| Command            | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `pnpm build`       | Build all packages (recursive).              |
| `pnpm typecheck`   | Typecheck all workspaces.                    |
| `pnpm test`        | Run **@kamod-hooks/core** unit tests.        |
| `pnpm test:ci`     | Same as `pnpm test` (used in CI).            |
| `pnpm docs:check`  | Validate PreactPress config and links.       |
| `pnpm qa:package`  | Build core and validate publish shape.       |

Please ensure `pnpm typecheck`, `pnpm test`, and `pnpm build` pass before opening a pull request.

## Hooks and documentation

- **Library code** belongs in `packages/core`. Match existing patterns for target refs, `useLatest`, and cleanup in effects.
- **Package exports** are generated during the core build from public `src/use*` folders plus `src/createUpdateEffect`. Add a hook folder with an `index.ts` or `index.tsx`; `scripts/sync-package-exports.mjs` keeps `package.json` subpath exports in sync.
- **Docs** live in `packages/docs`. When you add or change a hook’s public API or behavior, update the relevant topic page and the table in `hooks/all-hooks.md` (and the root `README.md`).

## Commit convention

Use [Conventional Commits](https://www.conventionalcommits.org/) style when possible:

`category(scope): message`

Common categories: `feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`.

Example: `feat(core): add useClipboard hook`

## Testing

Vitest runs in `packages/core` (`pnpm test` from root). New behavior should include tests where practical — especially for browser API hooks (mock `window`, `history`, `WebSocket`, etc.).

## Releases

Publishing is tag-driven: push a tag matching `v*` (for example `v0.1.1`) to trigger the GitHub Actions publish workflow for `@kamod-hooks/core` on npm. Configure the `NPM_TOKEN` repository secret with publish access to the `@kamod-hooks` scope.

Granular per-hook subpath exports are backward compatible with the root barrel API and should ship as the next minor release on the current major line, for example `v1.1.0` after `v1.0.x`.
