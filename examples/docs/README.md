# Ease UI — Documentation & Showcase

The documentation and component-showcase site for [Ease UI](../../ease-ui/README.md).
It is itself built **with** Ease UI, so the pages double as living examples of the
library, its theming, and its dark mode.

It is deliberately a **separate** Next.js app so that documentation, search, and
example code never leak into the published `ease-ui` package or the console example.

## Pages

- **Getting started** — overview, installation, theming & tokens, Next.js integration,
  accessibility, migration guide.
- **Components** — live, interactive references: foundations, buttons, forms, data
  display, tables, navigation, overlays, feedback, loading, layout, enterprise patterns,
  icons.
- **Patterns** — composable reference pages: resource detail, settings (tabs + danger
  zone), monitoring dashboard.

## Running it

```bash
cd examples/docs
npm install   # links the library via file:../../ease-ui
npm run dev   # http://localhost:3000
```

The build resolves the library from its **TypeScript source** (via the webpack alias in
`next.config.ts` + `transpilePackages`) so each component's `"use client"` directive is
honored — same approach as the console example.

## Architecture notes

- Content pages are **Server Components**. Interactive (client-only) components —
  Dialog, Drawer, Toast, Tooltip, DataTable, Tabs, form controls — are rendered through
  a single client leaf, [`components/demo.tsx`](components/demo.tsx), because a server
  page cannot instantiate a client component inline.
- The site chrome ([`components/docs-chrome.tsx`](components/docs-chrome.tsx)) uses
  `AppShell`, `Sidebar`, and a client-side search over the component index
  ([`lib/nav.ts`](lib/nav.ts)) — no external search dependency.
- Dark mode comes from the library's `EaseProvider` + `ThemeToggle`.
