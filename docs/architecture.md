# Ease UI — Architecture

This document explains how Ease UI is structured, why it makes the choices it does,
and how to extend it safely.

## Package architecture

Ease UI ships as a **single npm package** (`ease-ui`), not a monorepo. The source
lives in `ease-ui/src/`, and the built output goes to `ease-ui/dist/`.

```
ease-ui/
├── src/
│   ├── components/          # all visual components, grouped by category
│   │   ├── foundations/     # Box, Stack, Grid, Text, …
│   │   ├── button/          # Button, IconButton, ButtonGroup
│   │   ├── forms/           # Field, Input, Select, …
│   │   ├── display/         # Card, Badge, Status, …
│   │   ├── table/           # Table, DataTable, …
│   │   ├── navigation/      # Breadcrumb, Tabs, Sidebar, …
│   │   ├── overlays/        # Dialog, Drawer, Tooltip, …
│   │   ├── layout/          # Page, Section, …
│   │   ├── feedback/        # Alert, Toast, Spinner, …
│   │   └── enterprise/      # AppShell, ResourceHeader, …
│   ├── icons/               # inline SVG icons + Icon registry
│   ├── providers/           # EaseProvider (theming)
│   ├── styles/              # tokens.css, themes.css, components.css, ease-ui.css
│   ├── utils/               # cn, id, portal, focus-trap, scroll-lock, …
│   ├── hooks/               # (reserved)
│   └── index.ts             # flat public API (re-exports)
├── dist/                    # built output (ESM + .d.ts + copied CSS)
├── tests/                   # shared test setup
├── scripts/                 # build helpers, component template
└── …
```

## Server / Client boundaries

Next.js App Router splits code into **Server Components** (default) and **Client
Components** (`"use client"`). Ease UI respects this boundary strictly:

| Layer                                                                                 | Directive      | Why                                                    |
| ------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------ |
| Foundations, display, table, layout, enterprise                                       | (none)         | Pure presentational, no state                          |
| Button (static form)                                                                  | (none)         | No state unless `loading`/`disabled` driven by parent  |
| Overlays (Dialog, Drawer, Popover, Tooltip, DropdownMenu, CommandMenu, ConfirmDialog) | `"use client"` | Need focus trap, Escape, portal, body scroll lock      |
| Toast / ToastProvider / useToast                                                      | `"use client"` | Needs imperative state                                 |
| EaseProvider / ThemeToggle / useTheme                                                 | `"use client"` | Reads/writes `document.documentElement` + localStorage |

**Rule of thumb:** a component is client-only if it needs `useEffect`,
`useRef`-driven DOM manipulation, or event listeners that mutate the document.
Everything else stays server-safe.

## Styling architecture

- **No runtime CSS-in-JS.** All styles are static CSS files.
- **Token-driven.** Every visual value (color, size, radius, shadow, motion) is a
  CSS custom property. Component CSS reads only from `--ease-*` variables.
- **Data-attribute selectors.** Components set `data-ease="<name>"` (and
  `data-state`, `data-variant`, `data-size` where relevant). CSS targets those
  attributes, so a consumer can restyle by overriding tokens or by writing
  targeted selectors — no `!important` needed.
- **Three CSS files + one convenience bundle:**
  - `tokens.css` — `:root { --ease-* }` (light defaults)
  - `themes.css` — `[data-ease-theme="dark"]` + system media query
  - `components.css` — all component styles
  - `ease-ui.css` — `@import` of the above three (one-liner for consumers)
- **Logical properties** for RTL readiness (`margin-inline`, `inset-inline-start`, …).
- **Reduced motion** honored via a global `@media (prefers-reduced-motion: reduce)`.

## Token system

Tokens are grouped into families, all prefixed `--ease-`:

- `--ease-color-*` — surfaces, text, accents, status
- `--ease-font-*` — family, size, weight, leading, tracking
- `--ease-spacing-*` — 4px scale (1 = 4px, 2 = 8px, …)
- `--ease-radius-*` — restrained corner radii (sm/md/lg)
- `--ease-shadow-*` — subtle elevation
- `--ease-duration-*` / `--ease-ease-*` — motion
- `--ease-z-*` — stacking contexts
- `--ease-control-*` — control heights + focus ring (compact by default)

See [design-system.md](design-system.md) for the full token reference and the
visual language rationale.

## Build process

[tsup](https://tsup.eavascript.dev/) drives the build:

- **Format**: ESM only (`.js`).
- **Type declarations**: generated via `dts: true`.
- **Tree-shaking**: `treeshake: true` + `sideEffects: ["**/*.css"]` in
  `package.json` lets bundlers drop unused exports.
- **Granular entry points**: `package.json#exports` maps
  `ease-ui/button` → `dist/components/button/index.js`, so a consumer who only
  imports `Button` pulls only that module (plus its shared chunk).
- **External**: `react` and `react-dom` are `peerDependencies`, never bundled.
- **CSS**: a `onSuccess` hook copies the four style files into `dist/styles/`.

## Export architecture

Two supported import styles:

```tsx
// 1. Root (flat)
import { Button, Card, DataTable } from "ease-ui";

// 2. Granular (smallest bundle)
import { Button } from "ease-ui/button";
import { SearchIcon, Icon } from "ease-ui/icons";
```

The root `index.ts` is an **explicit re-export list** — no wildcard `export *`.
This keeps the public surface auditable and avoids leaking internals.

## Component design philosophy

- **Compound components** over boolean props:
  ```tsx
  <Card>
    <CardHeader>
      <CardTitle>…</CardTitle>
    </CardHeader>
    <CardContent>…</CardContent>
    <CardFooter>…</CardFooter>
  </Card>
  ```
- **One primitive, many variants**: `Button` has six variants — never
  `PrimaryButton` / `DashboardButton` forks.
- **Consistent size scale** (`xs|sm|md|lg`) across all controls.
- **Consistent state naming** (`default|hover|focus|active|disabled|loading|selected|checked|invalid`).
- **forwardRef** on every component.
- **`className`** on every visual component, merged via a tiny internal `cn()`.
- **No `as`/`asChild`** unless it genuinely improves composition.

## Testing architecture

- **Vitest** + **jsdom** + **@testing-library/react** + **@testing-library/user-event**.
- `globals: true` (no per-test imports of `describe`/`it`).
- `tests/setup.ts` extends `expect` with jest-dom matchers and cleans up after each test.
- React 19's `act` requires `globalThis.IS_REACT_ACT_ENVIRONMENT = true` — set in setup.
- Each component ships a colocated `*.test.tsx` covering render, variants, states,
  keyboard, ARIA, and controlled/uncontrolled usage.

## Accessibility architecture

- **Semantic HTML** is the primary a11y strategy (native `button`, `table`, `dialog`, `label`).
- **ARIA** is additive, only where the native element doesn't convey state.
- **Focus management**: overlays use `useFocusTrap` (Tab stays inside, Escape
  closes, focus returns to the trigger).
- **Body scroll lock**: `useBodyScrollLock` is ref-counted so nested overlays
  (a Dialog inside a Drawer) don't fight over `overflow`.
- **Portals**: `Portal` renders into a detached `document.body` node so
  `position: fixed` survives transformed ancestors.
- **Reduced motion**: global media query collapses non-essential transitions.
- **No color-only state**: every status pairs a color with an icon or text.

## Tree-shaking strategy

1. **Per-module output.** tsup emits one ESM file per entry. The root `index.js`
   re-exports from shared chunks; a consumer who imports `Button` pulls only the
   Button module + its shared chunk (icons, utils) — not the whole library.
2. **`sideEffects: ["**/*.css"]`** tells bundlers that JS modules are pure (safe
   to drop) but CSS is a side effect (must be kept).
3. **No barrel side-effects.** The root `index.ts` is explicit re-exports; no
   module has top-level side effects beyond CSS.
4. **Granular entry points** (`ease-ui/button`) let power users skip the root
   entirely for the smallest possible bundle.

## Dependency philosophy

**Zero runtime dependencies.** React and React-DOM are peer dependencies
(`^18 || ^19`) and are never bundled.

Everything else is internal:

| Concern          | Internal implementation                      | Why not a dependency        |
| ---------------- | -------------------------------------------- | --------------------------- |
| Class merging    | `utils/cn` (~15 lines)                       | `clsx` is 1 KB but a dep    |
| Stable ids       | `utils/id` (module counter)                  | `nanoid` is a dep           |
| Portal           | `utils/portal` (createRoot into a body node) | `createPortal` is in React  |
| Focus trap       | `utils/focus-trap` (~60 lines)               | No Radix needed             |
| Body scroll lock | `utils/scroll-lock` (ref-counted)            | `body-scroll-lock` is a dep |
| Click outside    | `utils/click-outside`                        | trivial                     |
| Media query      | `utils/media-query`                          | trivial                     |

Dev dependencies (not shipped): TypeScript, tsup, Vitest, testing-library,
eslint, jsdom, `@types/*`. Each is justified by the build/test/lint pipeline.
