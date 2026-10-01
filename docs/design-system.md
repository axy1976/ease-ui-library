# Ease UI — Design System

The visual language of Ease UI, and the rationale behind every token.

## Core principles

1. **Precision over decoration.** Subtle borders, controlled elevation, restrained
   radius, tight spacing, crisp typography, strong interactive states. No
   gradients, glassmorphism, oversized cards, or decorative shadows.
2. **Dense but readable.** Default controls are compact enough for admin
   dashboards and cloud consoles without sacrificing legibility.
3. **Restraint.** A muted, low-chroma palette. Color is reserved for meaning
   (primary action, status) — never for decoration.
4. **Predictability.** One size scale, one state vocabulary, one focus treatment,
   one radius scale — used consistently across every component.
5. **Enterprise calm.** The interface should feel engineered, practical, stable,
   and professional — not flashy, trendy, or consumer-social.

## Color

A restrained, low-chroma palette. The accent is a single desaturated blue; status
colors are muted enough to sit next to text without shouting.

### Surfaces

| Token                          | Light     | Dark      | Purpose             |
| ------------------------------ | --------- | --------- | ------------------- |
| `--ease-color-bg`              | `#f7f8fa` | `#0e1116` | App background      |
| `--ease-color-surface`         | `#ffffff` | `#161b22` | Cards, panels       |
| `--ease-color-surface-subtle`  | `#f1f3f5` | `#1c232d` | Inputs, rows, hover |
| `--ease-color-surface-raised`  | `#ffffff` | `#1c232d` | Popovers, menus     |
| `--ease-color-surface-overlay` | `#ffffff` | `#1c232d` | Dialogs, drawers    |

### Lines

| Token                        | Light     | Dark      |
| ---------------------------- | --------- | --------- |
| `--ease-color-border`        | `#e3e6ea` | `#2a313c` |
| `--ease-color-border-strong` | `#c6ccd3` | `#3a4451` |

### Text

| Token                        | Light     | Dark      |
| ---------------------------- | --------- | --------- |
| `--ease-color-text`          | `#1f2733` | `#e6e9ee` |
| `--ease-color-text-muted`    | `#525b66` | `#9aa4b2` |
| `--ease-color-text-subtle`   | `#8a93a0` | `#6b7684` |
| `--ease-color-text-disabled` | `#a9b0b9` | `#4a5563` |
| `--ease-color-text-inverse`  | `#ffffff` | `#161b22` |

### Accent

| Token                         | Light     | Dark      |
| ----------------------------- | --------- | --------- |
| `--ease-color-primary`        | `#2458c6` | `#4f8ff7` |
| `--ease-color-primary-hover`  | `#1f4cab` | `#6ba3ff` |
| `--ease-color-primary-active` | `#1a3f8f` | `#3b7fe0` |
| `--ease-color-on-primary`     | `#ffffff` | `#0e1116` |
| `--ease-color-secondary`      | `#3f4a58` | `#8b95a3` |

### Status

Each status ships a **strong** value (icon/text) and a **subtle** value
(background tint). State is never communicated by color alone — pair with an icon.

| Token                  | Light strong | Light subtle | Dark strong | Dark subtle |
| ---------------------- | ------------ | ------------ | ----------- | ----------- |
| `--ease-color-success` | `#2e8b57`    | `#e6f4ec`    | `#4ade80`   | `#14321f`   |
| `--ease-color-warning` | `#b45309`    | `#fdf1dd`    | `#fbbf24`   | `#33260e`   |
| `--ease-color-danger`  | `#c73a3a`    | `#fbe9e9`    | `#f87171`   | `#331414`   |
| `--ease-color-info`    | `#2563a6`    | `#e8f1fb`    | `#60a5fa`   | `#12233a`   |
| `--ease-color-neutral` | `#525b66`    | `#eef0f3`    | `#9aa4b2`   | `#1c232d`   |

Each status also ships an **on-** foreground token (text color safe to render
over the strong value) so `Badge variant="solid"`, `Alert`, and `Status` all
derive from one vocabulary:

| Token                     | Light     | Dark      |
| ------------------------- | --------- | --------- |
| `--ease-color-on-success` | `#ffffff` | `#0e1116` |
| `--ease-color-on-warning` | `#ffffff` | `#0e1116` |
| `--ease-color-on-danger`  | `#ffffff` | `#0e1116` |
| `--ease-color-on-info`    | `#ffffff` | `#0e1116` |
| `--ease-color-on-neutral` | `#ffffff` | `#0e1116` |

Plus two additional "selected" tokens used by Table, Tabs, and menu
highlights:

| Token                          | Light     | Dark      |
| ------------------------------ | --------- | --------- |
| `--ease-color-selected`        | `#e8effc` | `#16233a` |
| `--ease-color-selected-strong` | `#dbe6fb` | `#1e2f4c` |
| `--ease-color-active`          | `#e2e6eb` | `#2a313c` |

## Typography

- **Family**: a system UI stack (no web-font download) — `-apple-system,
"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- **Scale** (1rem = 16px default):

| Token                  | Size | Use                         |
| ---------------------- | ---- | --------------------------- |
| `--ease-font-size-xs`  | 11px | meta, badges                |
| `--ease-font-size-sm`  | 13px | table cells, secondary text |
| `--ease-font-size-md`  | 14px | default UI text             |
| `--ease-font-size-lg`  | 16px | emphasized                  |
| `--ease-font-size-xl`  | 20px | section titles              |
| `--ease-font-size-2xl` | 24px | page titles                 |

- **Weights**: `--ease-font-weight-regular` 400, `--ease-font-weight-medium` 500,
  `--ease-font-weight-semibold` 600.
- **Leading / tracking** are tokenized per size for consistent rhythm.

Headings use `font-weight-semibold` and tight leading. Body uses `regular`.
Never use `bold` (700) for body text — it reads as shouty.

## Spacing

A 4px base scale. `--ease-spacing-N = N × 4px`.

| Token              | px  | Typical use                 |
| ------------------ | --- | --------------------------- |
| `--ease-spacing-1` | 4   | tight gaps (icon-to-label)  |
| `--ease-spacing-2` | 8   | control padding, small gaps |
| `--ease-spacing-3` | 12  | card padding (compact)      |
| `--ease-spacing-4` | 16  | card padding, section gaps  |
| `--ease-spacing-6` | 24  | section gaps                |
| `--ease-spacing-8` | 32  | page-level gaps             |

Prefer `inline`/`block` logical variants for RTL.

## Radius

Restrained. Never `rounded-2xl`-style blobs.

| Token                | px   | Use                          |
| -------------------- | ---- | ---------------------------- |
| `--ease-radius-sm`   | 4    | badges, tags, small controls |
| `--ease-radius-md`   | 6    | buttons, inputs, cards       |
| `--ease-radius-lg`   | 8    | dialogs, drawers             |
| `--ease-radius-full` | 9999 | avatars, pills               |

## Elevation

Subtle shadows only where hierarchy requires it (overlays, raised panels).

| Token              | Use                |
| ------------------ | ------------------ |
| `--ease-shadow-sm` | cards, raised rows |
| `--ease-shadow-md` | popovers, menus    |
| `--ease-shadow-lg` | dialogs, drawers   |

Most surfaces are flat (border-only). Shadows are for true elevation, not
decoration.

## Control density

Controls are intentionally compact for information-dense interfaces. Every
height / padding / row token is a `calc(base * var(--ease-density))` so a
single multiplier token re-derives the entire scale without forking
per-component rules.

| Token                              | md default                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `--ease-control-height-xs`         | 22px × density                                                             |
| `--ease-control-height-sm`         | 28px × density                                                             |
| `--ease-control-height-md`         | 34px × density                                                             |
| `--ease-control-height-lg`         | 40px × density                                                             |
| `--ease-control-padding-inline-sm` | 0.625rem × density-pad                                                     |
| `--ease-control-padding-inline-md` | 0.875rem × density-pad                                                     |
| `--ease-row-height`                | 40px × density-row                                                         |
| `--ease-row-height-compact`        | 32px × density-row                                                         |
| `--ease-focus-ring`                | `0 0 0 3px color-mix(in srgb, var(--ease-color-primary) 35%, transparent)` |

### Density modes

Three multipliers drive the whole system:

| Token                | Default |
| -------------------- | ------- |
| `--ease-density`     | 1       |
| `--ease-density-pad` | 1       |
| `--ease-density-row` | 1       |

Pre-defined classes (apply on `<html>` or an app root to restyle the whole
tree):

| Class                       | `--ease-density` | `--ease-density-pad` | `--ease-density-row` |
| --------------------------- | ---------------- | -------------------- | -------------------- |
| _(default)_                 | 1                | 1                    | 1                    |
| `.ease-density-comfortable` | 1.1              | 1.15                 | 1.15                 |
| `.ease-density-compact`     | 0.9              | 0.85                 | 0.85                 |

The same height tokens apply to Button, IconButton, Input, Select, SearchInput,
and Switch track — so a row of mixed controls always aligns. Table row
heights follow `--ease-row-height` (or `--ease-row-height-compact` for the
`variant="compact"` table).

## Focus

A single, high-visibility focus ring derived from the primary color via
`color-mix`. Visible on every interactive control. Never removed — only reshaped
for specific contexts.

## Interactive states

Every interactive component supports the same state vocabulary, expressed via
`data-state` / `data-*` attributes that CSS keys off:

| State    | `data-state`           | Visual                          |
| -------- | ---------------------- | ------------------------------- |
| default  | (none)                 | base                            |
| hover    | `hover`                | surface tint / accent           |
| focus    | (CSS `:focus-visible`) | focus ring                      |
| active   | `active`               | pressed (darker)                |
| disabled | `data-disabled="true"` | muted, `aria-disabled`          |
| loading  | `data-state="loading"` | spinner, inert, label preserved |
| selected | `data-selected="true"` | accent tint                     |
| checked  | `data-state="on"`      | accent fill                     |
| invalid  | `data-invalid="true"`  | danger border                   |

## Motion

Subtle, purposeful. Four durations + easing curves:

| Token                     | Value | Use                            |
| ------------------------- | ----- | ------------------------------ |
| `--ease-duration-instant` | 0ms   | state that must feel immediate |
| `--ease-duration-fast`    | 120ms | hover, press                   |
| `--ease-duration-normal`  | 200ms | open/close                     |
| `--ease-duration-slow`    | 320ms | page-level transitions         |

Animate **opacity / transform / scale** only. Avoid layout-animated properties
(width, height, margin) except where unavoidable (collapse).

**Reduced motion**: a global `@media (prefers-reduced-motion: reduce)` collapses
all durations to `0.01ms` and disables non-essential transitions.

## Dark mode

Designed, not inverted. Dark uses a slightly blue-tinted near-black background,
desaturated surfaces, and **lighter** status colors (so they don't vanish on dark).
Borders are lighter in dark to preserve separation. Muted text stays at a
readable contrast ratio (≥ 4.5:1 for normal text).

Theme is set via `data-ease-theme` on `<html>`:

- `data-ease-theme="light"` — light palette
- `data-ease-theme="dark"` — dark palette
- `data-ease-theme="system"` — follows `prefers-color-scheme`

`EaseProvider` manages the attribute + localStorage persistence.

## Accessibility

- Semantic HTML first; ARIA additive.
- Visible focus on every interactive control.
- No state by color alone (icon + text accompany every status).
- `prefers-reduced-motion` respected.
- Touch targets ≥ 24px (≥ 32px recommended for primary actions).
- Contrast: body text ≥ 4.5:1, large text ≥ 3:1, against surface.

## Responsive behavior

- **Tables** scroll horizontally in `TableScroll`; wide tables can simplify
  columns below a breakpoint (hide low-priority columns).
- **Sidebars** collapse to icons on tablet and become a drawer on mobile.
- **Dialogs / drawers** become near-fullscreen below 480px.
- **Cards** stack (grid → single column) below the smallest breakpoint.
- **Controls** keep their size scale (do not shrink fonts below `sm`).

## Visual QA checklist

Before shipping any component, verify:

- [ ] Spacing is on the 4px scale
- [ ] Alignment matches sibling components
- [ ] Typography uses the token scale (no arbitrary px)
- [ ] Focus state is visible and consistent
- [ ] Hover / active / disabled states are present and restrained
- [ ] Loading / error / empty states are handled
- [ ] Looks correct in light **and** dark
- [ ] Works at 360 / 768 / 1280 / 1920 px widths

## Component spacing rules (0.2.1+)

Every new component in 0.2.1+ follows the same spacing discipline as the
rest of the system. The table below is the canonical reference — new
components should be added here when they ship.

| Component           | Internal padding            | Gap             | Border / radius          | Notes                                                |
| ------------------- | --------------------------- | --------------- | ------------------------ | ---------------------------------------------------- |
| `Toast`             | `sp-2` / `sp-3` per section | `sp-2`          | `border` + `radius-md`   | min 220px, max 360px; `shadow-md`                    |
| `Callout`           | `sp-3`                      | `sp-3`          | `border` + `radius-md`   | tinted bg via `color-mix` 6%                         |
| `Banner`            | `sp-2` / `sp-4`             | `sp-3`          | `border-bottom` only     | full-width; `inset 3px 0 0` accent stripe            |
| `StatTile`          | `sp-4`                      | `sp-2`          | `border` + `radius-lg`   | value uses `font-size-2xl` + `tabular-nums`          |
| `MetricRow`         | —                           | `sp-4`          | —                        | `auto-fit minmax(220px, 1fr)`                        |
| `KeyValueGrid`      | —                           | `sp-2` / `sp-4` | —                        | key column `minmax(120px, 180px)` by default         |
| `Chip`              | `sp-2` inline               | `4px`           | `border` + `radius-full` | height 22px, `font-size-xs`                          |
| `ChipGroup`         | —                           | `sp-2`          | —                        | flex-wrap                                            |
| `Panel`             | `sp-3` / `sp-4` per section | `sp-2`          | `border` + `radius-lg`   | header uses `surface-subtle` bg                      |
| `MetadataGrid`      | —                           | `sp-2` / `sp-4` | —                        | `font-size-xs`; 3 layouts; `mono` + `tone` per entry |
| `ResourceCard`      | `sp-3` / `sp-4`             | `sp-3`          | `border` + `radius-lg`   | icon 32×32; hover border + `shadow-sm`               |
| `InspectorPanel`    | `sp-4` (body)               | `sp-2`          | `border` + `radius-lg`   | named widths 280/360/440/520px; `shadow-lg`          |
| `FilterBar` (chips) | `sp-2` / `sp-3`             | `sp-2`          | `border` + `radius-md`   | `surface-subtle` bg; stacks on mobile                |
| `CommandPalette`    | `sp-3` / `sp-4`             | `sp-2`          | `border` + `radius-lg`   | max 560px; `shadow-lg`; `12vh` top offset            |

All values are token-derived; the table documents the _intent_ (e.g. “tight
inner padding for high-frequency rows, looser for content blocks”) rather
than hardcoding px.

### Tone / status usage

- **`Toast`** — `solid` (default) for high-attention; `tinted` for quiet
  info. Status colors from `--ease-color-{status}` + `-subtle` + `-on-*`.
- **`Callout`** — softer than `Alert`; use for “here’s a note” inside a
  card or section. `subtle` emphasis drops the tint to `surface-subtle`.
- **`Banner`** — full-width strip for page-level announcements. The accent
  stripe is `inset 3px 0 0 var(--ease-color-{tone})` (restrained, not a
  full-color block).
- **`Chip`** — `soft` for filter values, `solid` for selected / active,
  `outline` for removable / low-emphasis. Tone colors follow the same
  `--ease-color-{status}` + `-subtle` vocabulary as `Badge`.
- **`StatTile` delta** — direction (`up` / `down` / `flat`) and tone are
  independent. A memory “up” can still be `warning`; an error-rate “down” is
  `success`. The arrow glyph (↑ / ↓ / →) is decorative; the number carries
  the meaning.
