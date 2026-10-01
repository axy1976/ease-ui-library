# Ease UI Agent Skill

## Purpose

Teach an AI coding agent how to **use, extend, customize, and debug** Ease UI
inside a Next.js project. Ease UI is a lightweight, token-driven, accessible
React UI library for building precise, dense, enterprise-grade interfaces (the
kind of UI you find in cloud administration consoles) **without** a heavyweight
UI framework.

If you are generating or modifying UI in a Next.js app that uses Ease UI, follow
this document. It is the single source of truth for "how to do UI correctly
with Ease UI."

## When to use Ease UI

Use Ease UI when the task involves building or modifying **user interfaces** in a
Next.js (App Router) project that already depends on `ease-ui` — forms, tables,
navigation, overlays, dashboards, admin panels, settings pages, resource views,
feedback, and layout.

Do **not** use Ease UI for non-UI work (data fetching, business logic, server
actions, APIs) or for projects that don't use it.

## Installation

```bash
npm install ease-ui
```

Then import the stylesheet **once** in the root layout:

```tsx
// app/layout.tsx
import "ease-ui/styles/ease-ui.css";

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

React `^18 || ^19` and `react-dom` must be present (they are peer dependencies).

## Detection

Before adding any Ease UI code, detect whether it's already installed:

1. Check `package.json` for a dependency on `ease-ui`.
2. Check for an existing `import "ease-ui/styles/ease-ui.css"` in the root layout.
3. Check for an `EaseProvider` wrapper already in the tree.

If all three are present, Ease UI is set up — just import components.
If the stylesheet import is missing, add it to the root layout first.
If there is no `ease-ui` dependency, run the installation step above.

## Core principles

These are non-negotiable. Every UI you generate must honor them:

1. **Precision over decoration.** No gradients, glassmorphism, oversized rounded
   cards, decorative shadows, giant typography, or ornamental backgrounds.
2. **Dense but readable.** Compact controls, tight spacing, clear hierarchy.
3. **Restraint.** Muted palette; color is reserved for meaning.
4. **Predictability.** Reuse the library's size scale, state vocabulary, focus
   treatment, and radius scale. Don't invent your own.
5. **Composability.** Compose compound components; never fork them.
6. **Accessibility by default.** Semantic HTML, keyboard, visible focus, reduced
   motion, no color-only state.
7. **Enterprise calm.** Engineered, practical, stable, professional. Not flashy.

## Component catalog

Everything is importable from the root `"ease-ui"` (or a granular entry).

**Foundations** — `Box`, `Stack`, `Inline`, `Grid`, `Container`, `Separator`,
`VisuallyHidden`, `Text`, `Heading`, `Link`

**Actions** — `Button`, `IconButton`, `ButtonGroup`

**Forms** — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`,
`RadioGroup`, `Switch`, `Slider`, `NumberInput`, `SearchInput`, `PasswordInput`

**Data display** — `Card` (+`CardHeader`/`CardTitle`/`CardDescription`/
`CardContent`/`CardFooter`), `Badge`, `Tag`, `Avatar`, `AvatarGroup`, `Status`,
`Progress`, `Skeleton`, `EmptyState`, `Stat`, `KeyValue`, `DescriptionList`,
`List`, `ListItem`, `Code`, `CodeBlock`, `Kbd`, `Timeline`, `TimelineItem`

**Table** — `Table` (+`TableHeader`/`TableBody`/`TableFooter`/`TableRow`/
`TableHeadCell`/`TableCell`/`TableScroll`), `DataTable`, `TableToolbar`,
`TablePagination`

**Navigation** — `Breadcrumb`, `Tabs` (variant `"line"` | `"pills"`, +
`TabList`/`Tab`/`TabPanel`), `Sidebar` (+`SidebarItem`/`SidebarSection`),
`Navbar`, `Pagination`, `Stepper`

**Overlays** — `Dialog` (+parts), `Drawer` (+parts), `Popover`, `Tooltip`,
`DropdownMenu` (+`MenuItem`/`MenuSeparator`/`MenuLabel`), `ContextMenu`
(right-click / Shift+F10; reuses the same menu items), `CommandMenu`,
`ConfirmDialog`

**Layout** — `Page`, `PageHeader`, `PageTitle`, `PageActions`, `PageContent`,
`Section`, `SectionHeader`, `SectionActions`, `ActionBar`, `FilterBar`,
`SplitPanel`

**Enterprise** — `AppShell`, `ResourceHeader`, `PropertyPanel`,
`PropertyPanelList`, `ActivityLog`

**Feedback** — `Spinner`, `Skeleton`, `SkeletonRows`, `LoadingOverlay`,
`Alert` (dismissable), `InfoState`, `SuccessState`, `WarningState`,
`DangerState`, `ErrorState`, `InlineError`, `ToastProvider`, `useToast`,
`Toast` (presentational card, `solid` | `tinted`), `Callout` (quiet inline
note, `default` | `subtle` emphasis), `Banner` (full-width strip, 5 tones),
`Collapse`, `Accordion` (single or multiple-open, controlled/uncontrolled)

**Display extras** — `Badge` takes `variant: "soft" | "solid"`; `Progress`
takes `indeterminate: true`; `Chip` + `ChipGroup` (rounded labels, 3 variants
× 5 tones); `KeyValueGrid` (property / metadata list, grid | stack | inline);
`StatTile` + `MetricRow` (KPI cards with delta + caption); `MetadataGrid`
(dense `<dl>` for tags / env vars / properties; grid | list | inline);
`ResourceCard` (single-tile card with icon, status, meta, footer).

**Layout extras** — `Panel` (titled content panel with optional subtitle,
icon, footer, collapsible body, `elevated` variant); `InspectorPanel`
(right-anchored property inspector; overlay or anchored modes, named widths);
`FilterBar` `chips` variant (structured filter toolbar with removable chips +
clear-all); `FilterChip`, `FilterBarClear`.

**Command palette** — `CommandPalette` (grouped command palette with ⌘K /
Ctrl+K shortcut, sections, roving highlight, right-aligned hint slot);
`useCommandPaletteShortcut` (global ⌘K trigger hook).

**Theming** — `EaseProvider`, `useTheme`, `ThemeToggle`

**Icons** — `Icon` (name registry) + `SearchIcon`, `PlusIcon`, `CloseIcon`,
`CheckIcon`, `ChevronDownIcon`, `ChevronUpIcon`, `ChevronLeftIcon`,
`ChevronRightIcon`, `TrashIcon`, `EditIcon`, `CopyIcon`, `RefreshIcon`,
`InfoIcon`, `WarningIcon`, `ErrorIcon`, `SuccessIcon`, `MenuIcon`,
`SettingsIcon`, `FilterIcon`, `DownloadIcon`, `UploadIcon`

## Component selection rules

When you need a UI element, ask in this order:

1. **Does Ease UI already provide it?** → Use it.
2. **Can it be composed from Ease UI parts?** → Compose it (see "Composition").
3. **Is it reusable enough to belong in Ease UI?** → Add it to the library
   (see "Creating missing components").
4. **Otherwise** → Write a small local component in the app, styled with Ease UI
   tokens so it matches.

Never create `PrimaryButton`, `DashboardButton`, `FormButton`, `ModalButton`,
`TableButton` — use one `Button` with the right `variant`/`size`.

## Composition

Prefer compound components. Examples:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Active resources</CardTitle>
    <CardDescription>Running in us-east-1</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```

```tsx
<Field
  label="Project name"
  description="Short internal identifier."
  error={err}
>
  <Input />
</Field>
```

```tsx
<Dialog open={open} onClose={close} aria-label="Delete resource">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete resource</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogBody>…</DialogBody>
    <DialogFooter>
      <DialogCloseButton>Delete</DialogCloseButton>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Forms

- Use `Field` to wire `label` / `description` / `error` to any control — it
  provides the ARIA relationships automatically via context.
- Controls support controlled **and** uncontrolled usage where relevant.
- Don't couple to a form library; Ease UI works with native forms and server
  actions. Optional React Hook Form integration is allowed but not required.

```tsx
<Field label="Region" required error={errors.region}>
  <Select placeholder="Choose…" options={regions} />
</Field>
```

## Tables

- For a **data-driven** table (columns + rows), use `DataTable`:

```tsx
<DataTable
  columns={[
    {
      id: "name",
      header: "Name",
      cell: (r) => r.name,
      sortAccessor: (r) => r.name,
    },
    {
      id: "status",
      header: "Status",
      cell: (r) => <Status kind={r.status}>{r.status}</Status>,
    },
  ]}
  rows={rows}
  rowKey={(r) => r.id}
  selectable
  loading={isLoading}
  empty={
    <EmptyState
      title="No resources"
      description="Create your first resource."
    />
  }
/>
```

- For a **hand-built** table with full control, use the composable `Table` parts.
- Wrap wide tables in `TableScroll` for horizontal scrolling + sticky header.
- Pair with `TableToolbar` (filters/actions) and `TablePagination`.

## Navigation

- `Sidebar` for primary app navigation (supports sections, active state, icons,
  badges; collapses on small screens).
- `Navbar` for the top bar; `Breadcrumb` for context; `Tabs` for in-page views;
  `Pagination` for paged data; `Stepper` for multi-step flows.

## Modals and overlays

All overlays are **controlled** (`open` / `onClose`) and handle focus trap,
Escape, backdrop, portal, and body scroll lock for you. They are `"use client"`.

```tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseButton,
} from "ease-ui";

export function DeleteButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-label="Delete resource"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete resource</DialogTitle>
          </DialogHeader>
          <DialogBody>…</DialogBody>
          <DialogFooter>
            <DialogCloseButton>Delete</DialogCloseButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

- `Tooltip` supplements (never the only way to convey essential info) and is
  keyboard-accessible.
- `DropdownMenu` / `CommandMenu` handle roving-focus arrow-key navigation.
- `CommandPalette` adds **groups** (sections), a right-aligned **hint** slot,
  and a documented **⌘K / Ctrl+K** shortcut. Use it for app-wide command
  navigation ("Go to…", "Actions"). Pair with `useCommandPaletteShortcut`
  for a global trigger.
- `ConfirmDialog` for destructive confirmations.

## Feedback

```tsx
"use client";
import { useToast } from "ease-ui";
const toast = useToast();
toast.success("Deployment completed");
toast.error("Deployment failed");
```

- `Alert` + `InfoState`/`SuccessState`/`WarningState`/`DangerState` for inline
  notices.
- `ErrorState` for page/section failure (title + description + retry action).
- `Spinner` / `Skeleton` / `LoadingOverlay` for loading. Prefer **skeletons**
  when the content layout is known; use a spinner only for genuinely unknown
  durations.
- Wrap the app in `<ToastProvider>` once (client) to enable `useToast`.

## Layout

```tsx
<Page>
  <PageHeader>
    <PageTitle>Resources</PageTitle>
    <PageActions>
      <Button variant="primary">Create resource</Button>
    </PageActions>
  </PageHeader>
  <PageContent>…</PageContent>
</Page>
```

- `AppShell` composes `Navbar` + `Sidebar` + a content region for full app frames.
- `Section` / `SectionHeader` / `SectionActions` for grouping within a page.
- `ActionBar` / `FilterBar` for table-adjacent controls. `FilterBar` with
  `variant="chips"` shows a structured bar with label, search, removable
  filter chips, and a clear-all button — the AWS-style filter toolbar.
- `InspectorPanel` for the "click a row → properties slide in" pattern.
  Use `anchored: true` to keep it next to the list; omit it for a
  right-anchored overlay.
- `SplitPanel` for resizable two-pane layouts.

## Responsive behavior

- Don't shrink desktop layouts; define sensible per-breakpoint behavior.
- Tables → horizontal scroll (`TableScroll`) or hide low-priority columns.
- Sidebars → collapse to icons, then a drawer, on small screens.
- Dialogs/drawers → near-fullscreen below ~480px.
- Cards → single column on mobile.
- Keep touch targets ≥ 24px (≥ 32px for primary actions).
- Use logical CSS (`margin-inline`, `inset-inline-start`) — Ease UI already does
  this internally; do the same in app-level CSS.

## Accessibility

Every UI you generate must:

- Use semantic HTML (`button`, `nav`, `main`, `table`, `dialog`, `label`).
- Be keyboard-operable with visible focus.
- Not rely on color alone for state (pair with an icon or text).
- Respect `prefers-reduced-motion` (Ease UI does this globally).
- Provide an accessible name for icon-only controls:
  ```tsx
  <IconButton aria-label="Delete resource">
    <TrashIcon />
  </IconButton>
  ```
- Keep ARIA additive (only where the native element doesn't convey the state).

## Server Components

These stay server-safe (no `"use client"`): all foundations, data display,
table, layout, enterprise components, and static `Button`. You can render them
in a Server Component with zero client cost.

```tsx
// app/page.tsx — server component
import { Card, CardContent, Button } from "ease-ui";
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

## Client Components

These carry `"use client"` internally and must be mounted inside a client
boundary: all overlays (Dialog, Drawer, Popover, Tooltip, DropdownMenu,
CommandMenu, ConfirmDialog), Toast/ToastProvider/useToast, EaseProvider/
ThemeToggle/useTheme, and any component needing interactive state.

You generally **do not** need to add `"use client"` yourself — the component
carries it. Only add `"use client"` at your own component boundary when that
component uses hooks or event handlers.

## Styling

- Components accept `className`; merge with the internal `cn()`.
- Don't reach for `!important` to customize — override tokens instead.
- Scope app-level brand overrides to a container, not `:root`, if you only want
  part of the app rebranded.

## Theming

```tsx
"use client";
import { EaseProvider } from "ease-ui";
export function App({ children }: { children: React.ReactNode }) {
  return <EaseProvider theme="system">{children}</EaseProvider>; // "light"|"dark"|"system"
}
```

Or let CSS drive it (no provider needed): set `data-ease-theme="dark"` on
`<html>` and import the stylesheet.

### Density mode

For a whole-app rhythm change, apply one class to `<html>` or an app root:

```html
<html class="ease-density-compact">
  <!-- tighter rows/padding, for dense dashboards -->
  <html class="ease-density-comfortable">
    <!-- roomier, for executive / marketing pages -->
  </html>
</html>
```

These classes only touch the `--ease-density*` multipliers — color tokens are
unaffected. Don't mix both classes on the same node; pick one.

## Design tokens

All values are CSS custom properties (`--ease-*`). The public families:
`--ease-color-*`, `--ease-font-*`, `--ease-spacing-*`, `--ease-radius-*`,
`--ease-shadow-*`, `--ease-duration-*`/`--ease-ease-*`, `--ease-z-*`,
`--ease-control-*`. Override them to rebrand. See `docs/design-system.md` for
the full reference.

## Customization

Brand through tokens, not by rewriting component internals:

```css
:root {
  --ease-color-primary: #7c3aed;
  --ease-color-primary-hover: #6d28d9;
  --ease-radius-md: 8px;
  --ease-control-height-md: 34px;
}
```

## Anti-patterns

**Do NOT:**

- Create `PrimaryButton` / `DashboardButton` / `ModalButton` forks.
- Add gradients, glassmorphism, giant rounded cards, or decorative shadows.
- Use `!important` to restyle components.
- Hardcode colors/sizes in app CSS when a token exists.
- Use a `Tooltip` as the only channel for essential information.
- Ship an icon-only `Button`/`IconButton` without `aria-label`.
- Force a static component into a client bundle unnecessarily.
- Put `"use client"` at the package root or on every file.
- Reach for a UI framework (MUI/Ant/Chakra/Radix) to solve a problem Ease UI
  already covers.
- Use `dangerouslySetInnerHTML` with user-provided content.
- Invent new size/state/variant names that don't match the library's vocabulary.

## Debugging

Common problems and fixes:

- **Styles not applying** → the stylesheet isn't imported. Add
  `import "ease-ui/styles/ease-ui.css"` to the root layout.
- **Dark mode not switching** → no `EaseProvider` and no `data-ease-theme`
  attribute on `<html>`. Add one of the two.
- **`useToast` throws "must be used inside ToastProvider"** → wrap the client
  tree in `<ToastProvider>`.
- **Hydration mismatch on theme** → add `suppressHydrationWarning` to `<html>`
  (the provider reads a persisted preference on mount).
- **Dialog/menu Escape not working** → ensure the overlay is mounted (open) and
  not blocked by a parent `keydown` handler that calls `stopPropagation`.
- **Bundle unexpectedly large** → import from granular entries
  (`ease-ui/button`) instead of the root if you use only a few components.
- **Focus not returning after close** → the overlay must be controlled
  (`open`/`onClose`); an uncontrolled use won't restore focus correctly.

## Creating missing components

If you need a component Ease UI doesn't have and it's reusable:

1. Copy `scripts/templates/component/` to `src/components/<area>/<name>/`.
2. Implement with `forwardRef`, a `data-ease="<name>"` attribute, token-driven
   CSS in `<name>.css`, a `forwardRef` types file, and a test.
3. Add it to the relevant `index.ts` and the root `src/index.ts`.
4. Add CSS to `src/styles/components.css`.
5. Follow the component-creation standard in `CONTRIBUTING.md` (semantic HTML,
   a11y, dark mode, tree-shaking, no new dependency).
6. Add a docs example in the example app.

If it's **not** reusable, write a small local component in the app, styled with
Ease UI tokens.

## Migration strategy

Replace duplicated app-level components with their Ease UI equivalents:

| App component                               | Ease UI                             |
| ------------------------------------------- | ----------------------------------- |
| `CustomButton`                              | `Button` (with `variant`)           |
| `CustomModal`                               | `Dialog`                            |
| `CustomCard`                                | `Card` (+parts)                     |
| `CustomInput`                               | `Input` (in a `Field`)              |
| `CustomTable`                               | `DataTable` (or composable `Table`) |
| `CustomToast`                               | `Toast` / `useToast`                |
| `CustomTooltip`                             | `Tooltip`                           |
| `CustomTabs`                                | `Tabs`                              |
| `CustomSidebar`                             | `Sidebar`                           |
| `CustomFilterBar`                           | `FilterBar` with `variant="chips"`  |
| `CustomInspector` / `CustomPropertiesPanel` | `InspectorPanel`                    |
| `CustomMetadata` / `CustomTags`             | `MetadataGrid`                      |
| `CustomResourceCard`                        | `ResourceCard`                      |
| `CustomCommandPalette`                      | `CommandPalette`                    |

Migrate one component at a time, behind the same public props where possible, so
call sites keep working. Remove the old component once no references remain.

## Example implementation

```tsx
// app/resources/page.tsx — server component
import {
  PageHeader,
  PageTitle,
  PageActions,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
} from "ease-ui";
import type { Resource } from "@/lib/types";

export default async function ResourcesPage() {
  const resources = await fetchResources(); // your data source
  return (
    <div>
      <PageHeader>
        <PageTitle>Resources</PageTitle>
        <PageActions>
          <Button variant="primary">Create resource</Button>
        </PageActions>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Active resources</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { id: "name", header: "Name", cell: (r: Resource) => r.name },
              {
                id: "region",
                header: "Region",
                cell: (r: Resource) => r.region,
              },
              {
                id: "status",
                header: "Status",
                cell: (r: Resource) => r.status,
              },
            ]}
            rows={resources}
            rowKey={(r: Resource) => r.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

## Agent checklist

Before writing or modifying UI with Ease UI, confirm:

- [ ] Ease UI is installed and the stylesheet is imported in the root layout.
- [ ] I checked the catalog — the component I need already exists or is composable.
- [ ] I'm composing, not forking, existing components.
- [ ] I'm reusing the library's variants / sizes / states (not inventing new ones).
- [ ] I'm using design tokens for any custom styling (no `!important`, no hardcoded values).
- [ ] Spacing and typography match the library scale.
- [ ] The UI is keyboard-accessible with visible focus.
- [ ] No state is conveyed by color alone.
- [ ] `prefers-reduced-motion` is respected (Ease UI handles this globally).
- [ ] Server components stay server-safe; client components are only where needed.
- [ ] Icon-only controls have `aria-label`.
- [ ] The layout works at mobile / tablet / desktop widths.
- [ ] Dark mode looks correct.
