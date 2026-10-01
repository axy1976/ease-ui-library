"use client";

import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { ChevronDownIcon } from "../../icons";

/**
 * An expandable region. `Collapse` is the single-item primitive; `Accordion`
 * composes several with a controlled "which is open" model. Uses the native
 * disclosure pattern (a button + aria-expanded + a content region) so it is
 * keyboard- and screen-reader-operable without any motion magic.
 */

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial state. */
  defaultOpen?: boolean;
  /**
   * Fires with the requested next state. When you drive `open`, handle this
   * to update your source of truth.
   */
  onOpenChange?: (open: boolean) => void;
  /** Heading content. A disclosure button is always rendered. */
  header: ReactNode;
  children: ReactNode;
  /** Show the chevron affordance. Default true. */
  showIcon?: boolean;
  disabled?: boolean;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  function Collapse(
    {
      open: controlled,
      defaultOpen = false,
      onOpenChange,
      header,
      showIcon = true,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const [internal, setInternal] = useState(defaultOpen);
    const open = controlled ?? internal;
    const headerId = useId();
    const panelId = useId();

    function toggle() {
      if (disabled) return;
      const next = !open;
      if (controlled === undefined) setInternal(next);
      onOpenChange?.(next);
    }

    return (
      <div
        ref={ref}
        className={cn("ease-collapse", className)}
        data-ease="collapse"
        data-open={open ? "true" : undefined}
        {...rest}
      >
        <button
          type="button"
          id={headerId}
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          data-ease-collapse="header"
          onClick={toggle}
        >
          <span data-ease-collapse="header-label">{header}</span>
          {showIcon ? (
            <span data-ease-collapse="chevron" aria-hidden="true">
              <ChevronDownIcon size={14} />
            </span>
          ) : null}
        </button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          hidden={!open}
          data-ease-collapse="panel"
        >
          <div data-ease-collapse="panel-inner">{children}</div>
        </div>
      </div>
    );
  },
);

export interface AccordionItem {
  /** Stable key for the item. */
  id: string;
  header: ReactNode;
  content: ReactNode;
}

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue" | "value"
> {
  /** Controlled: the open item id (single) or ids (multiple). */
  value?: string | string[] | null;
  /** Uncontrolled initial open item. */
  defaultValue?: string | string[] | null;
  onValueChange?: (value: string | string[] | null) => void;
  /** Allow several items open at once. */
  multiple?: boolean;
  items: AccordionItem[];
  showIcon?: boolean;
}

/**
 * A column of `Collapse` regions sharing one open-state. Single-open by
 * default (opening one closes the others); `multiple` keeps them independent.
 */
export function Accordion({
  value: controlled,
  defaultValue,
  onValueChange,
  multiple,
  items,
  showIcon = true,
  className,
  ...rest
}: AccordionProps) {
  const toMulti = (v: string | string[] | null | undefined): string[] =>
    v == null ? [] : Array.isArray(v) ? v : [v];

  const [internal, setInternal] = useState<string[]>(toMulti(defaultValue));
  const current = toMulti(controlled ?? internal);

  // The next resolved set of open items if `id` is toggled.
  function nextIf(id: string): string[] {
    const opening = !current.includes(id);
    if (multiple) {
      return opening ? [...current, id] : current.filter((c) => c !== id);
    }
    return opening ? [id] : [];
  }

  function toggle(id: string) {
    const next = nextIf(id);
    if (controlled === undefined) setInternal(next);
    onValueChange?.(multiple ? next : (next[0] ?? null));
  }

  return (
    <div
      className={cn("ease-accordion", className)}
      data-ease="accordion"
      {...rest}
    >
      {items.map((item) => (
        <Collapse
          key={item.id}
          open={current.includes(item.id)}
          onOpenChange={() => toggle(item.id)}
          header={item.header}
          showIcon={showIcon}
        >
          {item.content}
        </Collapse>
      ))}
    </div>
  );
}
