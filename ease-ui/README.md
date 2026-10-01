# Ease UI

A lightweight, token-driven, accessible React UI library for Next.js.

Ease UI gives you the precision, density, and enterprise-grade restraint of cloud
infrastructure software — inspired by AWS / Amazon lightweight web UI components — without the weight of a heavyweight UI framework.

```tsx
import { Button, Card, Input, DataTable } from "ease-ui";
import "ease-ui/styles/ease-ui.css";
```

## Why Ease UI

| Property             | Value                                                                        |
| -------------------- | ---------------------------------------------------------------------------- |
| Runtime dependencies | **0** (React / React-DOM are peer deps only)                                 |
| Styling              | Static CSS + design tokens (no runtime CSS-in-JS)                            |
| Tree-shaking         | Full (per-component ESM chunks; granular entry points)                       |
| TypeScript           | `strict: true`, no `any` in public API                                       |
| Next.js              | App Router, Server Components, SSR, streaming                                |
| Accessibility        | WCAG-oriented: focus trap, Escape, reduced-motion, semantic HTML             |
| Theming              | Light / dark / system via CSS variables, zero runtime cost                   |
| Bundle (JS, min)     | ~10 KB for the full surface; a single `Button` import pulls only that module |

## Installation

```bash
npm install ease-ui
```

React `^18 || ^19` and `react-dom` are peer dependencies — install them in your
app if you haven't already.

## Quick start

```tsx
// app/layout.tsx
import "ease-ui/styles/ease-ui.css"; // tokens + themes + components, once

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
// app/page.tsx (server component — no "use client" needed for static UI)
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

For interactive components (overlays, toast, theme), the component itself carries
`"use client"` — you don't need to add it at the package root.

## Theming

```tsx
"use client";
import { EaseProvider } from "ease-ui";

export function ThemedApp({ children }: { children: React.ReactNode }) {
  return <EaseProvider theme="dark">{children}</EaseProvider>; // "light" | "dark" | "system"
}
```

### Density mode

Ease UI ships with a compact-by-default scale for dashboards, admin tools, and
cloud consoles. Switch the whole app to a larger or smaller rhythm with a single
class on `<html>` or your app root:

```tsx
<html className="ease-density-compact">   // tighter rows, padding
<html className="ease-density-comfortable"> // more breathing room
```

Both classes are no-ops inside a `prefers-reduced-motion`-aware layout and don't
affect color tokens — only the vertical rhythm of controls and table rows.

Or override any token on `:root` (or a scoped class) to rebrand:

```css
:root {
  --ease-color-primary: #7c3aed; /* your brand blue/violet */
  --ease-radius-md: 6px;
  --ease-control-height-md: 32px;
}
```

## Component list

**Foundations** — Box, Stack, Inline, Grid, Container, Separator, VisuallyHidden,
Text, Heading, Link.

**Actions** — Button (primary / secondary / outline / ghost / destructive / link,
xs / sm / md / lg, loading), IconButton, ButtonGroup.

**Forms** — Field, Input, Textarea, Select, Checkbox, Radio + RadioGroup, Switch,
Slider, NumberInput, SearchInput, PasswordInput.

**Data display** — Card (+ Header / Title / Description / Content / Footer), Badge,
Tag, Avatar + AvatarGroup, Status, Progress, Skeleton, EmptyState, Stat,
KeyValue + DescriptionList, List, Code + CodeBlock + Kbd, Timeline.

**Table** — Table (composable: Header / Body / Footer / Row / HeadCell / Cell /
Scroll), DataTable (data-driven: sorting, selection, loading, empty, pagination),
TableToolbar, TablePagination.

**Navigation** — Breadcrumb, Tabs (line / pills variants), Sidebar, Navbar,
Pagination, Stepper.

**Overlays** — Dialog, Drawer, Popover, Tooltip, DropdownMenu, ContextMenu,
CommandMenu, ConfirmDialog. All handle focus trap, Escape, backdrop, portal, body
scroll lock.

**Layout** — Page, PageHeader, PageTitle, PageActions, PageContent, Section,
SectionHeader, SectionActions, ActionBar, FilterBar, SplitPanel.

**Enterprise** — AppShell, ResourceHeader, PropertyPanel, ActivityLog.

**Feedback** — Spinner, Skeleton, LoadingOverlay, Alert (+ Info/Success/Warning/
Danger states, dismissable), ErrorState, InlineError, Toast + ToastProvider +
useToast, Collapse, Accordion.

**Display** — `Badge` (`variant: "soft" | "solid"`), `Progress`
(`indeterminate`), `Chip` + `ChipGroup` (rounded labels, 3 variants × 5
tones), `KeyValueGrid` (property / metadata list, `grid` | `stack` | `inline`),
`StatTile` + `MetricRow` (KPI cards with delta + caption).

**Layout extras** — `Panel` (titled content panel with optional subtitle, icon,
footer, collapsible body, `elevated` variant), `InspectorPanel` (right-anchored
property inspector; overlay or anchored modes, named widths).

**Feedback extras** — `Toast` (presentational card, `solid` | `tinted`),
`Callout` (quiet inline note, `default` | `subtle`), `Banner` (full-width
strip, 5 tones, optional accent stripe).

**Enterprise extras (v0.3.0)** — `MetadataGrid` (dense `<dl>` for tags / env
vars / properties; `grid` | `list` | `inline`), `ResourceCard` (single-tile
card with icon, status, meta, footer), `FilterBar` `chips` variant (structured
filter toolbar with removable chips + clear-all), `FilterChip`, `FilterBarClear`,
`CommandPalette` (grouped command palette with ⌘K shortcut, sections, roving
highlight), `useCommandPaletteShortcut` (global ⌘K trigger hook).

**Theming** — EaseProvider, useTheme, ThemeToggle.

**Icons** — Icon (name registry) + ~20 individual inline-SVG exports.

## Server / Client architecture

Server-safe (no `"use client"`): all foundations, data display, table, layout,
enterprise components, and `Button` in its static form.

Client-only (carry `"use client"`): overlays (Dialog, Drawer, Popover, Tooltip,
DropdownMenu, CommandMenu, ConfirmDialog), Toast, EaseProvider, and any component
that needs state-driven interaction.

## Accessibility

- Semantic HTML (`button`, `nav`, `main`, `table`, `dialog`, `label`, …).
- Every interactive control supports keyboard operation and visible focus.
- `@media (prefers-reduced-motion: reduce)` respected globally.
- No state is communicated by color alone (icons + text accompany status).
- Dialogs / menus / command palettes trap focus, close on Escape, and restore focus.
- `IconButton` **requires** `aria-label` — a dev warning fires if it's missing.

## Styling & customization

All components read from CSS custom properties (see [tokens.css](src/styles/tokens.css)).
Reasonable customization never requires `!important`:

```css
/* Brand the library without touching its source */
.my-brand {
  --ease-color-primary: #7c3aed;
  --ease-color-primary-hover: #6d28d9;
  --ease-radius-md: 8px;
}
```

## Development

```bash
npm install        # install dev deps
npm run dev        # tsup watch build
npm run build      # tsup → dist/
npm run typecheck  # tsc --noEmit
npm run test       # vitest
npm run lint       # eslint
npm run size       # bundle-size report
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow.

## License

MIT — see [LICENSE](LICENSE.md).
