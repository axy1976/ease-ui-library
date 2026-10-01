"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { Portal, useFocusTrap, useBodyScrollLock } from "../../utils/client";
import { IconButton } from "../button/icon-button";
import { CloseIcon } from "../../icons";
import { Panel } from "./panel";

export type InspectorWidth = "sm" | "md" | "lg" | "xl";

export interface InspectorPanelProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title" | "children"
> {
  /** Accessible title for the inspector. */
  title: ReactNode;
  /** Optional subtitle (helper text under the title). */
  subtitle?: ReactNode;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Fixed width. `md` (320px) is the default inspector width. */
  width?: InspectorWidth;
  /** Fixed pixel width overrides the named width. */
  fixedWidth?: string;
  /**
   * Controls open state. When `open` is true the panel is portaled to
   * `document.body` and rendered as a right-anchored drawer-style aside.
   * When `open` is false nothing is rendered (the trigger stays in place).
   */
  open: boolean;
  onClose: () => void;
  /**
   * ARIA description. Recommended for non-obvious panels.
   */
  description?: string;
  /**
   * Content to render inside the panel body (properties, metadata, actions).
   */
  children?: ReactNode;
  /**
   * Optional footer actions (Save / Apply / Close). Rendered in a
   * right-aligned action bar.
   */
  footer?: ReactNode;
  /**
   * Anchor the panel to the inline flow of the trigger (a sticky right-side
   * aside in the same layout context) instead of a body-portal. This is
   * what most "click a row → properties slide in" patterns want: the panel
   * appears next to the list it belongs to, not over everything.
   *
   * Note: `anchored` still honors `open`/`onClose` and the close button,
   * but does NOT use a body portal or body scroll lock.
   */
  anchored?: boolean;
}

/**
 * A right-anchored property inspector. Two rendering modes:
 *
 *   1. **`anchored` (default `false`)** — portaled to `document.body`,
 *      fixed to the right edge, with body scroll lock + focus trap. Use
 *      when the inspector is a modal-like overlay over the whole app.
 *
 *   2. **`anchored: true`** — stays in the inline flow of the trigger
 *      layout, rendered as a sticky aside. No portal, no body scroll lock.
 *      Use for the "click a row → properties appear next to it" pattern
 *      where the list remains visible.
 *
 * The body content is your responsibility — pair with `KeyValueGrid`,
 * `MetadataGrid`, `Panel`, `PropertyPanel`, `Callout`, etc.
 */
export const InspectorPanel = forwardRef<HTMLElement, InspectorPanelProps>(
  function InspectorPanel(
    {
      title,
      subtitle,
      icon,
      width = "md",
      fixedWidth,
      open,
      onClose,
      description,
      children,
      footer,
      anchored = false,
      className,
      ...rest
    },
    ref,
  ) {
    const [portalMounted, setPortalMounted] = useState(false);
    const contentRef = useRef<HTMLElement | null>(null);
    const lastFocusRef = useRef<HTMLElement | null>(null);

    // Portal rendering must be a client-effect to avoid SSR hydration
    // mismatches. The portal is only mounted on the client.
    useEffect(() => {
      if (!open || anchored) return;
      setPortalMounted(true);
      return () => setPortalMounted(false);
    }, [open, anchored]);

    // Focus trap + body scroll lock only in the portaled (overlay) mode.
    useFocusTrap(contentRef, open && !anchored);
    useBodyScrollLock(open && !anchored);

    // Capture + restore focus when the overlay-mode inspector opens/closes.
    useEffect(() => {
      if (!open || anchored) return;
      lastFocusRef.current =
        (document.activeElement as HTMLElement | null) ?? null;
      const t = window.setTimeout(() => contentRef.current?.focus(), 0);
      return () => {
        window.clearTimeout(t);
        lastFocusRef.current?.focus();
      };
    }, [open, anchored]);

    // Escape closes the panel in overlay mode (focus trap also handles this,
    // but this covers the anchored case where no trap is active).
    useEffect(() => {
      if (!open) return;
      function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    const shell = (
      <section
        ref={(el) => {
          contentRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref && "current" in ref) ref.current = el as HTMLElement;
        }}
        role={anchored ? "complementary" : "dialog"}
        aria-modal={anchored ? undefined : true}
        aria-label={typeof title === "string" ? title : undefined}
        aria-describedby={description ? undefined : undefined}
        tabIndex={anchored ? undefined : -1}
        data-ease="inspector-panel"
        data-anchored={anchored ? "true" : undefined}
        data-width={width}
        className={cn("ease-inspector-panel", className)}
        style={
          fixedWidth
            ? ({
                ["--ease-inspector-width" as string]: fixedWidth,
              } as React.CSSProperties)
            : undefined
        }
        {...(anchored ? rest : {})}
      >
        <Panel
          title={title}
          subtitle={subtitle}
          icon={icon}
          footer={footer}
          className="ease-inspector-panel__inner"
        >
          {children}
        </Panel>
        <IconButton
          size="sm"
          aria-label="Close inspector"
          data-ease-inspector-panel="close"
          onClick={onClose}
        >
          <CloseIcon size={14} />
        </IconButton>
      </section>
    );

    if (anchored) {
      return <>{shell}</>;
    }
    return portalMounted ? <Portal>{shell}</Portal> : null;
  },
);
