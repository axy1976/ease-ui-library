"use client";

import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { ChevronDownIcon } from "../../icons";

export type PanelPosition = "top" | "bottom" | "start" | "end";

export interface PanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> {
  title: ReactNode;
  /** Optional subtitle / helper line under the title. */
  subtitle?: ReactNode;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Content rendered in the footer (actions, links, etc.). */
  footer?: ReactNode;
  /** Collapsible panel body; `false` hides the disclosure affordance. */
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: PanelPosition;
  /** Optional "aside" variant — the panel renders with a subtle raised bg. */
  elevated?: boolean;
  children?: ReactNode;
}

/**
 * A titled content panel. Use for sidebar property panels, inspector
 * drawers, settings sections, and any titled block that needs a header +
 * optional footer + optional collapsible body.
 *
 * The panel is intentionally composable: pass a `footer` node for a
 * right-aligned action row, or a `subtitle` for a helper line. The body
 * itself is your `children` — the panel does not impose a grid or stack.
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  {
    title,
    subtitle,
    icon,
    footer,
    collapsible = false,
    open: controlled,
    defaultOpen = true,
    onOpenChange,
    position,
    elevated,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlled ?? internalOpen;
  function toggle() {
    if (!collapsible) return;
    const next = !open;
    if (controlled === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  return (
    <section
      ref={ref}
      data-ease="panel"
      data-position={position}
      data-elevated={elevated ? "true" : undefined}
      data-open={open ? "true" : undefined}
      className={cn("ease-panel", className)}
      {...rest}
    >
      <header data-ease-panel="header">
        {icon ? <span data-ease-panel="icon">{icon}</span> : null}
        <div data-ease-panel="heading">
          <div data-ease-panel="title">{title}</div>
          {subtitle ? <div data-ease-panel="subtitle">{subtitle}</div> : null}
        </div>
        {collapsible ? (
          <button
            type="button"
            data-ease-panel="toggle"
            aria-expanded={open}
            aria-label={open ? "Collapse panel" : "Expand panel"}
            onClick={toggle}
          >
            <ChevronDownIcon size={14} />
          </button>
        ) : null}
      </header>
      {open ? <div data-ease-panel="body">{children}</div> : null}
      {footer ? <footer data-ease-panel="footer">{footer}</footer> : null}
    </section>
  );
});
