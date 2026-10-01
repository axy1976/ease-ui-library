# Contributing to Ease UI

Thanks for contributing! Ease UI is an intentionally small, precise, accessible
design system. Read this before opening a PR.

## Setup

```bash
git clone https://github.com/ease-ui/ease-ui
cd ease-ui
npm install
```

Requires Node 18+ and npm (or pnpm).

## Development loop

```bash
npm run dev        # watch build (tsup)
npm run test       # vitest (single run)
npm run test:watch # vitest watch
npm run typecheck  # tsc --noEmit (strict)
npm run lint       # eslint
npm run build      # production build to dist/
npm run size       # bundle-size report
```

All commands must pass before a PR is reviewable.

## Component creation standard

Every new component must answer:

1. **What problem does it solve?** (one sentence)
2. **Is it reusable?** (not application-specific)
3. **Is its API composable?** (compound components over boolean props)
4. **Does it have a semantic HTML foundation?** (`button`, not `div`)
5. **Does it work without JavaScript where possible?**
6. **Is it accessible?** (keyboard, focus, ARIA, reduced-motion)
7. **Is it responsive?** (mobile behavior defined)
8. **Does it support dark mode?** (reads tokens, no hardcoded colors)
9. **Is it tree-shakable?** (own module, no barrel side-effects)
10. **Does it require a dependency?** (almost always: no)

Use the template at [`scripts/templates/component/`](scripts/templates/component/):

```
scripts/templates/component/
├── component.tsx        # forwardRef component, data-ease attribute
├── component.types.ts   # exported Props type
├── component.css        # styles scoped to [data-ease="component"]
├── component.test.tsx   # render + a11y + interaction
└── index.ts             # re-export
```

## API consistency rules

- **Size scale**: `xs | sm | md | lg` — same across Button, IconButton, Input, Select, etc.
- **State naming**: `default`, `hover`, `focus`, `active`, `disabled`, `loading`, `selected`, `checked`, `invalid`. Do not invent per-component state names.
- **Data attributes**: `data-state`, `data-disabled`, `data-variant`, `data-size`, `data-invalid` — used by CSS, predictable.
- **className**: every visual component accepts `className` and merges it with `cn()`.
- **forwardRef**: every component forwards its ref.

## Accessibility requirements (non-negotiable)

- Semantic HTML elements (never `div` where `button`/`nav`/`table`/`dialog` applies).
- Visible focus ring on every interactive control.
- Keyboard operable (Enter/Space/Arrows/Escape as appropriate).
- `aria-*` only where the native element doesn't already convey the state.
- No state communicated by color alone (pair with icon or text).
- `@media (prefers-reduced-motion: reduce)` respected — collapse non-essential motion.
- Logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline-start`) for RTL readiness.

## Testing

- Every component ships a `component.test.tsx` covering:
  - rendering with default props
  - each variant/size
  - disabled / loading states
  - keyboard behavior
  - ARIA attributes
  - controlled + uncontrolled usage (where applicable)
- Use `@testing-library/react` + `@testing-library/user-event`.
- Do **not** add snapshot tests for visual layout — use the visual QA page instead.

## Visual review

Before merging, open the [example console app](../examples/console) and check the
new component against the existing design language:

- [ ] Consistent height with other controls (same `--ease-control-height-*`)
- [ ] Consistent radius (`--ease-radius-*`)
- [ ] Consistent border treatment (`--ease-color-border`)
- [ ] Consistent typography (same font-size tokens)
- [ ] Consistent focus state (same `--ease-focus-ring`)
- [ ] Consistent disabled behavior
- [ ] Consistent spacing (4px scale)
- [ ] Looks right in dark mode
- [ ] Looks right at 360px / 768px / 1280px / 1920px widths

If the answer to any of these is "no," don't merge — fix the inconsistency first.

## Commit guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(table): add sticky header option
fix(dialog): restore focus to trigger on close
docs(button): clarify loading behavior
chore(deps): bump typescript to 5.9
```

## Pull request expectations

- One logical change per PR.
- All CI gates green (typecheck, lint, tests, build, size).
- New components: include a docs example in the example app.
- Behavior changes: update the relevant doc section.
- Accessibility changes: include a note about keyboard / SR behavior.
- No new runtime dependencies without an explicit justification in the PR description
  (see the dependency policy below).

## Dependency policy

Before adding a dependency, answer:

- Can browser APIs replace it?
- Can 30–100 lines of internal code replace it?
- Does it significantly increase bundle size?
- Does it create a browser/server compatibility issue?
- Does it create a long-term maintenance dependency?
- Does it reduce accessibility quality?
- Is it required for only one component?

If the answer to any is "yes," don't add it.
