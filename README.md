# Ease UI

A lightweight, token-driven, accessible **React UI library for Next.js**.

Ease UI gives you the precision, density, and enterprise-grade restraint of cloud-infrastructure software — inspired by AWS / Amazon lightweight web UI components — without the weight of a heavyweight UI framework.
It is a design system you compose, not a theme you clone: a small, predictable
set of tokens plus composable components that read from them.

```tsx
import { Button, Card, CardContent, Table } from "ease-ui";
import "ease-ui/styles/ease-ui.css";
```

|                          |                                                                  |
| ------------------------ | ---------------------------------------------------------------- |
| **Runtime dependencies** | **0** — React / React-DOM are peer deps only                     |
| **Styling**              | Static CSS + design tokens (no runtime CSS-in-JS)                |
| **Tree-shaking**         | Full — per-component ESM chunks + granular entry points          |
| **TypeScript**           | `strict: true`, no `any` in the public API                       |
| **Next.js**              | App Router, Server Components, SSR, streaming, static generation |
| **Accessibility**        | WCAG-oriented: focus trap, Escape, reduced-motion, semantic HTML |
| **Theming**              | Light / dark / system via CSS variables, zero runtime cost       |

---

## Repository layout

```
ease-ui/            The library (source, build, tests, docs, packaging)
examples/console/   A working Next.js App Router app — a generic cloud console
                    (dashboard, resources, resource detail, deployments, settings)
examples/docs/      Planned documentation / component-showcase site (see below)
docs/               Architecture, design-system, and migration documentation
skills/ease-ui/     Agent skill (SKILL.md) for AI coding agents
```

The package is published from `ease-ui/` as **`ease-ui`** (`npm install ease-ui`).
All package metadata, exports, the LICENSE, CHANGELOG, and CONTRIBUTING guide live
there — read [ease-ui/README.md](ease-ui/README.md) for the authoritative package
documentation.

## Quick start

```bash
npm install ease-ui
```

```tsx
// app/layout.tsx
import "ease-ui/styles/ease-ui.css"; // tokens + themes + components, import once

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx — a Server Component; no "use client" needed
import { Button, Card, CardContent } from "ease-ui";

export default function Page() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Save</Button>
      </CardContent>
    </Card>
  );
}
```

Interactive components (Dialog, Dropdown, Toast, theme toggle, …) carry their own
`"use client"` directive, so importing them never silently makes a whole file a
Client Component in a way that breaks other code.

## Repository quick commands

Each area builds on its own node_modules:

```bash
# Library
cd ease-ui && npm install && npm run dev   # or: build · typecheck · test · lint · size

# Example console app
cd examples/console && npm install && npm run dev   # builds against the library source
```

See [ease-ui/CONTRIBUTING.md](ease-ui/CONTRIBUTING.md) for the full contributor
workflow and [docs/architecture.md](docs/architecture.md) for how the pieces fit.

## Documentation

- [Architecture](docs/architecture.md) — package, server/client, styling, build, tree-shaking, testing.
- [Design system](docs/design-system.md) — tokens, color, typography, spacing, density, dark mode, accessibility.
- [Migration guide](docs/migration.md) — mapping your custom components onto Ease UI.
- [Agent skill](skills/ease-ui/SKILL.md) — how AI coding agents should use Ease UI.

## Documentation site

A full component-showcase documentation site (live examples, per-component API
references, in-browser search, theme switcher, built with Ease UI itself) is the
next major deliverable and is planned under `examples/docs/`. It is deliberately a
separate Next.js app so it does not affect the published package or the console
example. See [examples/docs/README.md](examples/docs/README.md).

## License

MIT — see [ease-ui/LICENSE](ease-ui/LICENSE).
