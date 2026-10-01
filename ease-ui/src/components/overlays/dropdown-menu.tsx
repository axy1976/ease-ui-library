"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { Portal, useClickOutside, useFocusTrap } from "../../utils/client";
import { ChevronDownIcon } from "../../icons";

export interface MenuContext {
  open: boolean;
  setOpen: (v: boolean) => void;
  highlighted: number;
  setHighlighted: (i: number) => void;
  registerItem: (i: number, el: HTMLButtonElement | null) => void;
  openOnTrigger: () => void;
}

export const MenuContext = createContext<MenuContext | null>(null);

export interface DropdownMenuProps {
  /** Trigger content (usually a Button label + caret). */
  trigger: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end";
  children: ReactNode;
}

/**
 * Trigger + menu with full roving-focus keyboard support:
 *  Enter/Space/ArrowDown opens, arrows move, Home/End jump, Escape closes and
 *  returns focus to the trigger.
 */
export function DropdownMenu({
  trigger,
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  align = "start",
  children,
}: DropdownMenuProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = controlled ?? internal;
  const setOpen = (v: boolean) => {
    if (controlled === undefined) setInternal(v);
    onOpenChange?.(v);
  };

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // Use a ref (not state) for the item registry: updating it must never
  // trigger a re-render, or registration on every commit loops forever.
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useFocusTrap(menuRef, open);
  useClickOutside([triggerRef, menuRef], () => setOpen(false), open);

  const updateItemRefs = (i: number, el: HTMLButtonElement | null) => {
    itemRefs.current[i] = el;
  };

  const openOnTrigger = useCallback(() => {
    setOpen(true);
    setHighlighted(0);
  }, [setOpen]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const m = menuRef.current.getBoundingClientRect();
    const left = align === "end" ? t.right - m.width : t.left;
    setPosition({
      top: t.bottom + 4,
      left: Math.max(8, Math.min(left, window.innerWidth - m.width - 8)),
    });
    // Focus the highlighted item so the trap keeps Tab inside.
    itemRefs.current[highlighted >= 0 ? highlighted : 0]?.focus();
  }, [open]);

  // Escape is wired at the document level (capture phase) so it closes the
  // menu regardless of which element holds focus — the menu is portal-rendered
  // into a detached <body>, so a listener on the menu node would miss keydown
  // events delivered to document/body.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, setOpen]);

  // Arrow/Home/End navigation is local to the menu (only while the menu owns
  // focus). We keep it on the menu node so it never hijacks other keydowns.
  useEffect(() => {
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
  }, [open, itemRefs, highlighted]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        data-ease="button"
        data-variant="outline"
        data-size="md"
        className="ease-button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--ease-spacing-2)",
        }}
        onClick={() => (open ? setOpen(false) : openOnTrigger())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            openOnTrigger();
          }
        }}
      >
        {trigger}
        <ChevronDownIcon size={14} />
      </button>
      {open ? (
        <Portal>
          <div
            ref={menuRef}
            role="menu"
            data-ease="dropdown-menu"
            className={cn()}
            style={{
              top: position?.top ?? -9999,
              left: position?.left ?? -9999,
              position: "fixed",
            }}
          >
            <MenuContext.Provider
              value={{
                open,
                setOpen,
                highlighted,
                setHighlighted,
                registerItem: updateItemRefs,
                openOnTrigger,
              }}
            >
              {children}
            </MenuContext.Provider>
          </div>
        </Portal>
      ) : null}
    </>
  );
}

export interface MenuItemProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "ref"
> {
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}

let menuIndex = 0;

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(
    { danger, disabled, onSelect, children, className, ...rest },
    ref,
  ) {
    const ctx = useContext(MenuContext);

    // Stable per-mount registration index (computed once, outside any hook).
    const indexRef = useRef(menuIndex++);
    const setRef = (el: HTMLButtonElement | null) => {
      if (typeof ref === "function") ref(el);
      else if (ref && typeof ref === "object") ref.current = el;
      if (ctx) ctx.registerItem(indexRef.current, el);
    };

    return (
      <button
        ref={setRef as never}
        type="button"
        role="menuitem"
        disabled={disabled}
        data-ease-menu="item"
        data-danger={danger ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-highlighted={
          ctx && ctx.highlighted === indexRef.current ? "true" : undefined
        }
        className={className}
        onClick={() => {
          if (disabled) return;
          onSelect?.();
          ctx?.setOpen(false);
          (document.activeElement as HTMLElement | null)?.blur?.();
        }}
        {...(rest as object)}
      >
        {children}
      </button>
    );
  },
);

export function MenuSeparator() {
  return <div role="separator" data-ease-menu="separator" />;
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <div data-ease-menu="label" role="presentation">
      {children}
    </div>
  );
}
