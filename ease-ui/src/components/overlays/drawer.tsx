"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react";
import { Portal, useFocusTrap, useBodyScrollLock } from "../../utils/client";
import { IconButton } from "../button/icon-button";
import { CloseIcon } from "../../icons";
import { OverlayBackdrop } from "./overlay-backdrop";

export type DrawerSide = "end" | "start" | "top" | "bottom";

const DrawerContext = createContext<{ close: () => void } | null>(null);

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  /** Accessible name for the panel. */
  "aria-label"?: string;
  children: React.ReactNode;
}

/**
 * Slide-in panel for secondary content (inspectors, filters, mobile nav).
 * Same focus/scroll/escape contract as Dialog, anchored to an edge.
 */
export function Drawer({
  open,
  onClose,
  side = "end",
  closeOnEscape = true,
  closeOnBackdrop = true,
  "aria-label": ariaLabel,
  children,
}: DrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useFocusTrap(contentRef, open);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, closeOnEscape, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <DrawerContext.Provider value={{ close: onClose }}>
        <div data-ease="drawer" data-side={side}>
          {closeOnBackdrop ? (
            <OverlayBackdrop onBackdropClick={onClose} />
          ) : (
            <OverlayBackdrop />
          )}
          <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            data-ease-drawer="content"
            tabIndex={-1}
            aria-label={
              ariaLabel || contentRef.current?.textContent?.trim() || "Panel"
            }
          >
            {children}
          </div>
        </div>
      </DrawerContext.Provider>
    </Portal>
  );
}

export const DrawerHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerHeader({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-drawer="header" {...rest}>
      {children}
    </div>
  );
});

export const DrawerTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function DrawerTitle({ className, children, ...rest }, ref) {
  return (
    <h2 ref={ref} className={className} data-ease-drawer="title" {...rest}>
      {children}
    </h2>
  );
});

export const DrawerBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerBody({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-drawer="body" {...rest}>
      {children}
    </div>
  );
});

export const DrawerFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerFooter({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-drawer="footer" {...rest}>
      {children}
    </div>
  );
});

export function DrawerClose({ children }: { children?: React.ReactNode }) {
  const ctx = useContext(DrawerContext);
  if (!ctx) return null;
  return (
    <IconButton size="sm" aria-label="Close panel" onClick={ctx.close}>
      {children ?? <CloseIcon size={14} />}
    </IconButton>
  );
}
