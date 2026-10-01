"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Portal, useFocusTrap, useClickOutside } from "../../utils/client";
import { cn } from "../../utils";
import {
  MenuContext,
  type MenuContext as MenuCtx,
  MenuItem,
  MenuSeparator,
  MenuLabel,
} from "./dropdown-menu";

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Trigger wrapper — a plain div that captures contextmenu events. */
  children: ReactNode;
}

/**
 * A right-click / Shift+F10 context menu. The component wraps the target
 * surface, opens on `contextmenu` (or Shift+F10 keyup), closes on Escape and
 * outside click, and traps focus while open.
 *
 * The menu content is composed with the shared `MenuItem`/`MenuSeparator`/
 * `MenuLabel` primitives (re-exported from `dropdown-menu`) so the same
 * markup renders correctly in either surface.
 *
 * The menu itself is portal-rendered at the cursor coordinates and is kept in
 * view by flipping it inward if it would spill past a viewport edge.
 */
export function ContextMenu({
  children,
  className,
  onContextMenu,
  ...rest
}: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [highlighted, setHighlighted] = useState(-1);

  const ctx: MenuCtx = {
    open,
    setOpen,
    highlighted,
    setHighlighted,
    registerItem: (i, el) => {
      itemRefs.current[i] = el;
    },
    openOnTrigger: () => setOpen(true),
  };

  useFocusTrap(menuRef, open);
  useClickOutside([hostRef, menuRef], () => setOpen(false), open);

  function openAt(x: number, y: number) {
    setPos({ top: y, left: x });
    setOpen(true);
    setHighlighted(0);
  }

  // Flip the menu into view if it would spill outside the viewport, then
  // focus the first item so the focus trap has a starting point.
  useLayoutEffect(() => {
    if (!open || !pos || !menuRef.current) return;
    const r = menuRef.current.getBoundingClientRect();
    const nextLeft = Math.max(
      8,
      Math.min(pos.left, window.innerWidth - r.width - 8),
    );
    const nextTop = Math.max(
      8,
      Math.min(pos.top, window.innerHeight - r.height - 8),
    );
    if (nextTop !== pos.top || nextLeft !== pos.left)
      setPos({ top: nextTop, left: nextLeft });
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    items[0]?.focus();
  }, [open, pos]);

  // Escape closes the menu and returns focus to the trigger surface.
  useLayoutEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.preventDefault();
      setOpen(false);
      setHighlighted(-1);
      hostRef.current?.focus?.();
    }
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);

  // Arrow/Home/End movement within the menu.
  useLayoutEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
      if (items.length === 0) return;
      const current = itemRefs.current.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(
          items.length - 1,
          (current < 0 ? 0 : current) + 1,
        );
        setHighlighted(next);
        items[next]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.max(
          0,
          (current < 0 ? items.length - 1 : current) - 1,
        );
        setHighlighted(next);
        items[next]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        setHighlighted(0);
        items[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        setHighlighted(items.length - 1);
        items[items.length - 1]?.focus();
      }
    }
    menuRef.current?.addEventListener("keydown", onKey);
    return () => menuRef.current?.removeEventListener("keydown", onKey);
  }, [open, highlighted]);

  return (
    <div
      ref={hostRef}
      className={cn(className)}
      tabIndex={-1}
      data-ease="context-menu-host"
      {...rest}
      onContextMenu={(e) => {
        e.preventDefault();
        openAt(e.clientX, e.clientY);
        onContextMenu?.(e);
      }}
      onKeyDown={(e) => {
        // Shift+F10 is the keyboard equivalent of a right-click.
        if (e.key === "F10" && e.shiftKey) {
          e.preventDefault();
          const r = e.currentTarget.getBoundingClientRect();
          openAt(r.left + r.width / 2, r.top + r.height / 2);
        }
      }}
    >
      {children}
      {open && pos ? (
        <Portal>
          <MenuContext.Provider value={ctx}>
            <div
              ref={menuRef}
              role="menu"
              data-ease="context-menu"
              style={{ top: pos.top, left: pos.left, position: "fixed" }}
            >
              {children}
            </div>
          </MenuContext.Provider>
        </Portal>
      ) : null}
    </div>
  );
}

// Re-export the shared item primitives so a ContextMenu composes with the
// same <MenuItem> / <MenuSeparator> / <MenuLabel> parts as a DropdownMenu.
export { MenuItem, MenuSeparator, MenuLabel };
export type { MenuItemProps } from "./dropdown-menu";
