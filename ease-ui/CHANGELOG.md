# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.3.0 — 2026-09-30

### Added

- **MetadataGrid** — a dense, responsive description list for tags, env vars,
  and properties. Three layouts (`grid` / `list` / `inline`); real `<dl>` /
  `<dt>` / `<dd>` semantics; per-entry `mono` and `tone` for values. Server-safe.
- **ResourceCard** — a single-tile card for one resource: icon + name +
  status, a small metadata block, and optional footer actions. Pairs with
  `ResourceHeader`, `MetricRow`, and `StatTile`. Server-safe.
- **InspectorPanel** — a right-anchored property inspector. Two modes:
  - **Overlay** (default): portaled to `document.body`, fixed to the right
    edge, with body scroll lock + focus trap.
  - **Anchored** (`anchored: true`): stays in the inline flow as a sticky
    aside — for the “click a row → properties slide in” pattern.
    Named widths (`sm` / `md` / `lg` / `xl`) or a custom `fixedWidth`.
- **FilterBar `chips` variant** — a structured filter toolbar with a leading
  label, search input, removable filter chips, and a “Clear all” button.
  Also exports `FilterChip` and `FilterBarClear` for use outside `FilterBar`.
- **CommandPalette** — a grouped command palette with a documented ⌘K /
  Ctrl+K shortcut. Sections, roving highlight across groups, right-aligned
  hint slot, focus trap + body scroll lock. Also exports
  `useCommandPaletteShortcut` for a global ⌘K trigger.
- **Bundle-size CI gate** — `scripts/bundle-size.mjs` with realistic budgets
  (160 KB JS total, 145 KB largest file, 120 KB CSS total). Fails the build
  when a budget is exceeded without justification.

### Changed

- `FilterBar` now accepts `variant="chips"` (new) or `variant="plain"`
  (default, same as before). The `chips` variant renders a structured bar
  with label, search, active-filter chips, and a clear button.
- Bundle-size budget for the largest JS file raised from 120 KB → 145 KB to
  accommodate the new components. The root barrel is now 136 KB unminified.
  Consumers importing individual components from granular entries (e.g.
  `ease-ui/button`) are unaffected.

## 0.2.1 — 2026-09-30

### Added

- **Toast** — a presentational toast / notification card (pair with the
  existing `ToastProvider` for the imperative API, or render directly in a
  container). Variants: `solid` (default) and `tinted`.
- **Callout** — a quiet inline note. Visually softer than `Alert` for
  section-level info that doesn't need to shout. Supports `default` and
  `subtle` emphasis, optional action + dismissable.
- **Banner** — a full-width horizontal strip for page-level announcements
  (maintenance windows, quota warnings, feature flags). Five tones, optional
  accent stripe, optional action + dismissable.
- **StatTile** — a single metric card with label, value, optional delta
  (direction + tone independent of up/down), optional suffix, caption, and
  icon. Use inside a `MetricRow` for a KPI strip.
- **MetricRow** — a responsive auto-fit grid of `StatTile` cards (reflows
  naturally from mobile to 4K).
- **KeyValueGrid** — a description list for properties / metadata / settings.
  Real `<dl>` / `<dt>` / `<dd>` semantics, three layouts (grid / stack /
  inline), configurable key column width, per-row copy + hint.
- **Chip** — a small rounded label. Three variants (`soft` / `solid` /
  `outline`) × five tones; optional remove button. Distinct from `Badge`
  (square) and `Tag` (rectangular).
- **ChipGroup** — a wrapping flex row of chips for multi-select filter
  values.
- **Panel** — a titled content panel with optional subtitle, icon, footer,
  collapsible body, and `elevated` variant. Use for property panels,
  inspectors, and settings sections.

### Changed

- **Resource detail page** in `examples/console` now showcases the full new
  surface: a `Banner` for maintenance, a `MetricRow` of four `StatTile` KPIs,
  a `Panel` with `KeyValueGrid` for properties, a `Panel` with `ChipGroup`
  for tags, a `Callout` for auto-scaling info, and a `Toast` preview.

## 0.2.0 — 2026-07-09

### Added

- **Collapse + Accordion** — accessible expandable regions. `Accordion`
  supports single-open and `multiple` modes with controlled / uncontrolled
  values. (`feedback/collapse`)
- **ContextMenu** — right-click / Shift+F10 context menu with focus trap,
  Escape, portal at cursor coords, viewport flip, and arrow-key navigation.
  Reuses `MenuItem` / `MenuSeparator` / `MenuLabel` from `DropdownMenu`.
  (`overlays/context-menu`)
- **Density-mode tokens** — `--ease-density`, `--ease-density-pad`,
  `--ease-density-row` plus `.ease-density-compact` and
  `.ease-density-comfortable` classes for whole-app rhythm changes.
- **Status tint tokens** — `--ease-color-neutral`,
  `--ease-color-neutral-subtle`, `--ease-color-on-{success,warning,danger,info,neutral}`.
- **Selected / active tokens** — `--ease-color-selected-strong`,
  `--ease-color-active` for table row and menu highlight states.

### Changed

- **Badge** — now accepts `variant: "soft" | "solid"`; `data-status` is always
  emitted (was omitted for `neutral`). New exported type `BadgeVariant`.
- **Progress** — new `indeterminate` prop; sets `aria-busy`, omits
  `aria-valuenow` and the `width` inline style. CSS ships an animated
  indeterminate bar with a `prefers-reduced-motion` guard.
- **Table** — row heights now read from `--ease-row-height` (or
  `--ease-row-height-compact` for `variant="compact"`) so density tokens drive
  the table directly. Selected row uses the stronger
  `--ease-color-selected-strong` on hover.
- **Status** — status dot now carries a soft `box-shadow` halo tinted to the
  status color; explicit `neutral` state added.

## 0.1.0 — 2026-07-09

Initial release of the Ease UI component system.

### Added

- **Foundations** — Box, Stack, Inline, Grid, Container, Separator,
  VisuallyHidden, Text, Heading, Link.
- **Actions** — Button (6 variants × 4 sizes, loading without layout jump,
  dev warning for icon-only without a name), IconButton (requires aria-label),
  ButtonGroup.
- **Forms** — Field (label / description / error wiring via FieldContext),
  Input, Textarea, Select, Checkbox (indeterminate), Radio + RadioGroup,
  Switch, Slider, NumberInput, SearchInput, PasswordInput.
- **Data display** — Card (compound), Badge, Tag, Avatar + AvatarGroup,
  Status, Progress, Skeleton, EmptyState, Stat, KeyValue + DescriptionList,
  List, Code + CodeBlock + Kbd, Timeline.
- **Table** — composable Table (Header / Body / Footer / Row / HeadCell / Cell /
  Scroll), data-driven DataTable (sorting, selection, loading skeletons, empty
  state), TableToolbar, TablePagination.
- **Navigation** — Breadcrumb, Tabs (roving focus), Sidebar (sections, active
  state), Navbar, Pagination, Stepper.
- **Overlays** — Dialog, Drawer, Popover, Tooltip, DropdownMenu, CommandMenu,
  ConfirmDialog. All with focus trap, Escape, backdrop, portal, body scroll
  lock, reduced-motion.
- **Layout** — Page, PageHeader, PageTitle, PageActions, PageContent, Section,
  SectionHeader, SectionActions, ActionBar, FilterBar, SplitPanel.
- **Enterprise** — AppShell, ResourceHeader, PropertyPanel, ActivityLog.
- **Feedback** — Spinner, Skeleton, LoadingOverlay, Alert (+ Info / Success /
  Warning / Danger states), ErrorState, InlineError, Toast + ToastProvider +
  useToast.
- **Theming** — EaseProvider (light / dark / system, localStorage persistence),
  useTheme, ThemeToggle.
- **Icons** — Icon name registry + ~20 individual inline-SVG exports.
- **Styling** — tokens.css, themes.css, components.css, ease-ui.css.
- **Build** — tsup (ESM, dts, treeshake) with granular entry points.
- **Tests** — 42 unit / integration tests across 8 files.
