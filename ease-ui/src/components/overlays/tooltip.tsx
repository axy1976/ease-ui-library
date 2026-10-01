"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Portal } from "../../utils/client";

export interface TooltipProps {
  /** The text shown. Keep it a supplement — never the only channel for
   * essential information (keyboard users must also have a text path). */
  content: ReactNode;
  side?: "top" | "bottom" | "start" | "end";
  /** ms between hover and show. Default 300. */
  delay?: number;
  /** The element to attach to. Must accept ref + mouse/focus props. */
  children: ReactElement;
}

/**
 * Hover/focus tooltip. Shown on mouseenter and on keyboard focus, hidden on
 * leave/blur/Escape. It is purely informational — do not put actions or
 * required information in a tooltip.
 */
export function Tooltip({
  content,
  side = "top",
  delay = 300,
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const childRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const panelRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const el = childRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = panelRef.current?.getBoundingClientRect();
      const h = p?.height ?? 28;
      const w = p?.width ?? 80;
      let top = 0;
      let left = 0;
      if (side === "top") {
        top = r.top - h - 6;
        left = r.left + r.width / 2 - w / 2;
      } else if (side === "bottom") {
        top = r.bottom + 6;
        left = r.left + r.width / 2 - w / 2;
      } else if (side === "start") {
        top = r.top + r.height / 2 - h / 2;
        left = r.left - w - 6;
      } else {
        top = r.top + r.height / 2 - h / 2;
        left = r.right + 6;
      }
      setPos({ top: Math.max(8, top), left: Math.max(8, left) });
      setOpen(true);
    }, delay);
  }, [side, delay]);

  const hide = useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") hide();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  const existing = children.props as Record<string, unknown>;
  const extra = {
    ref: (node: HTMLElement | null) => {
      childRef.current = node;
      const original = existing.ref;
      if (typeof original === "function") original(node);
      else if (original && typeof original === "object")
        (original as { current: unknown }).current = node;
    },
    onMouseEnter: (e: React.MouseEvent) => {
      (existing.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(
        e,
      );
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      (existing.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(
        e,
      );
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      (existing.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent) => {
      (existing.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
      hide();
    },
  };

  const child = isValidElement(children)
    ? cloneElement(children, extra as never)
    : children;

  return (
    <>
      {child}
      {open ? (
        <Portal>
          <div
            ref={panelRef}
            role="tooltip"
            data-ease="tooltip"
            data-side={side}
            style={{
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              position: "fixed",
            }}
          >
            {content}
          </div>
        </Portal>
      ) : null}
    </>
  );
}
