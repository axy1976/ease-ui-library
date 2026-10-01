# Migration Guide

How to replace common hand-rolled components with their Ease UI equivalents.
Migrate one at a time, behind the same public props where possible.

## Before you start

1. Confirm `ease-ui` is installed and `ease-ui/styles/ease-ui.css` is imported in
   the root layout.
2. Inventory your duplicated components (grep for `CustomButton`, `Modal`, `Card`,
   `Input`, `Table`, `Toast`, `Tooltip`, `Tabs`, `Sidebar`).
3. Migrate the most-used component first to validate the approach.

## Component mapping

| Your component                                   | Ease UI                                    | Notes                                                                |
| ------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------- |
| `CustomButton` / `PrimaryButton` / `GhostButton` | `Button`                                   | Use `variant="primary"` / `"ghost"`; `size` for scale.               |
| `IconButton` (custom)                            | `IconButton`                               | **Requires** `aria-label`.                                           |
| `CustomModal`                                    | `Dialog`                                   | Controlled: `open` / `onClose`. Focus trap + Escape built in.        |
| `CustomConfirm`                                  | `ConfirmDialog`                            | Destructive confirm with safe cancel.                                |
| `CustomCard`                                     | `Card`                                     | Compound: `CardHeader` / `CardTitle` / `CardContent` / `CardFooter`. |
| `CustomInput`                                    | `Input` in `Field`                         | `Field` wires label/description/error ARIA.                          |
| `CustomTextarea`                                 | `Textarea`                                 |                                                                      |
| `CustomSelect`                                   | `Select`                                   | Pass `options`; `placeholder` for empty state.                       |
| `CustomCheckbox`                                 | `Checkbox`                                 | Supports `indeterminate`.                                            |
| `CustomRadio`                                    | `Radio` in `RadioGroup`                    |                                                                      |
| `CustomToggle`                                   | `Switch`                                   | `onChange(checked: boolean)`.                                        |
| `CustomTable`                                    | `DataTable`                                | Data-driven: `columns` + `rows` + `rowKey`.                          |
| `CustomToast`                                    | `Toast` / `useToast`                       | Wrap in `<ToastProvider>` (client).                                  |
| `CustomTooltip`                                  | `Tooltip`                                  | Keyboard-accessible; supplements, doesn't replace.                   |
| `CustomTabs`                                     | `Tabs`                                     | `defaultValue` (uncontrolled) or `value`/`onValueChange`.            |
| `CustomSidebar`                                  | `Sidebar`                                  | Sections, active state, icons, badges, collapse.                     |
| `CustomBreadcrumb`                               | `Breadcrumb`                               |                                                                      |
| `CustomSpinner`                                  | `Spinner`                                  |                                                                      |
| `CustomAlert`                                    | `Alert` / `InfoState` / `SuccessState` / … |                                                                      |
| `CustomSkeleton`                                 | `Skeleton` / `SkeletonRows`                |                                                                      |
| `CustomPagination`                               | `Pagination` / `TablePagination`           |                                                                      |

## Migration pattern

1. **Replace the import.** Swap the app component for the Ease UI one in each
   file that uses it.
2. **Map the props.** Most map 1:1. Where a prop name differs, adapt at the call
   site or add a thin wrapper temporarily.
3. **Keep the public interface** of any wrapper you retain, so call sites don't
   break during a phased rollout.
4. **Verify visually** in the example console app (light + dark, mobile + desktop).
5. **Delete the old component** once no references remain.

### Example: `CustomButton` → `Button`

```tsx
// before
<CustomButton kind="primary" busy={saving} onClick={save}>Save</CustomButton>

// after
<Button variant="primary" loading={saving} onClick={save}>Save</Button>
```

### Example: `CustomModal` → `Dialog`

```tsx
// before
<CustomModal open={open} title="Delete" onClose={close} onConfirm={del}>…</CustomModal>

// after
<Dialog open={open} onClose={close} aria-label="Delete resource">
  <DialogContent>
    <DialogHeader><DialogTitle>Delete resource</DialogTitle></DialogHeader>
    <DialogBody>…</DialogBody>
    <DialogFooter><DialogCloseButton onClick={del}>Delete</DialogCloseButton></DialogFooter>
  </DialogContent>
</Dialog>
```

## Things to check during migration

- [ ] No `!important` was needed to make the replacement look right.
- [ ] Focus / keyboard behavior is preserved (or improved).
- [ ] Dark mode looks correct.
- [ ] Loading / empty / error states are still handled.
- [ ] No new runtime dependency was introduced.
