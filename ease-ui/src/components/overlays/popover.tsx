"use client";

import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Portal, useClickOutside, useFocusTrap } from "../../utils/client";

export interface PopoverProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Relative to the trigger: top | bottom | start | end. */
  side?: "top" | "bottom" | "start" | "end";
  /** Trigger content; the popover attaches to its bounding box. */
  trigger: ReactNode;
  /** Wrap the trigger in this element. */
  as?: "button" | "span";
  children: ReactNode;
}

/**
 * Lightweight anchored panel (menu, small form, preview). Click or focus
 * toggles it; Escape and outside-click close it; focus is trapped while open.
 *
 * For hover-intent previews, drive `open` from the trigger's mouse handlers.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      open: controlled,
      defaultOpen = false,
      onOpenChange,
      side = "bottom",
      trigger,
      as = "button",
      className,
      children,
      ...rest
    },
    _ref,
  ) {
    const [internal, setInternal] = useState(defaultOpen);
    const open = controlled ?? internal;
    const setOpen = (v: boolean) => {
      if (controlled === undefined) setInternal(v);
      onOpenChange?.(v);
    };

    const triggerRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{
      top: number;
      left: number;
    } | null>(null);
    useFocusTrap(panelRef, open);

    useLayoutEffect(() => {
      if (!open || !triggerRef.current || !panelRef.current) {
        setPosition(null);
        return;
      }
      const t = triggerRef.current.getBoundingClientRect();
      const p = panelRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;
      if (side === "bottom") {
        top = t.bottom + 6;
        left = t.left;
      } else if (side === "top") {
        top = t.top - p.height - 6;
        left = t.left;
      } else if (side === "start") {
        top = t.top;
        left = t.left - p.width - 6;
      } else {
        top = t.top;
        left = t.right + 6;
      }
      // Keep on screen.
      left = Math.max(8, Math.min(left, window.innerWidth - p.width - 8));
      top = Math.max(8, Math.min(top, window.innerHeight - p.height - 8));
      setPosition({ top, left });
    }, [open, side]);

    useClickOutside([triggerRef, panelRef], () => setOpen(false), open);

    const Tag: "button" | "span" = as;

    return (
      <>
        <Tag
          ref={triggerRef as never}
          type={as === "button" ? "button" : undefined}
          aria-expanded={open}
          aria-haspopup="dialog"
          data-ease="popover-trigger"
          data-state={open ? "open" : "closed"}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {trigger}
        </Tag>
        {open ? (
          <Portal>
            <div
              ref={panelRef}
              role="dialog"
              data-ease="popover"
              data-side={side}
              className={className}
              style={{
                top: position?.top ?? -9999,
                left: position?.left ?? -9999,
                position: "fixed",
              }}
              {...rest}
            >
              {children}
            </div>
          </Portal>
        ) : null}
      </>
    );
  },
);
