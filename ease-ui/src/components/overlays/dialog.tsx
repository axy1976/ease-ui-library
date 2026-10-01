"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Portal, useFocusTrap, useBodyScrollLock } from "../../utils/client";
import { IconButton } from "../button/icon-button";
import { Button, type ButtonVariant } from "../button/button";
import { CloseIcon } from "../../icons";
import { OverlayBackdrop } from "./overlay-backdrop";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

const DialogCloseContext = createContext<{ close: () => void }>({
  close: () => {},
});

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** "Esc" closes by default; set false to keep it open. */
  closeOnEscape?: boolean;
  /** Clicking the backdrop closes. Default true. */
  closeOnBackdrop?: boolean;
  /** Accessible name; auto-derives from DialogTitle if omitted. */
  "aria-label"?: string;
  children: ReactNode;
}

/**
 * Modal dialog. Controlled via `open`/`onClose` — the only correct shape for
 * a focus-managed overlay, since the parent must restore state.
 *
 * Accessibility:
 *  - Focus moves into the dialog on open and is trapped until it closes.
 *  - Focus returns to the triggering element on close.
 *  - Escape closes; the backdrop is a click-to-dismiss surface.
 *  - Body scroll is locked while open (refcounted for nested overlays).
 *  - Portal-rendered so fixed positioning survives transformed ancestors.
 *
 * Pass an explicit `aria-label` for a stable accessible name, or include a
 * <DialogTitle> for the common case (the title text is used after mount).
 */
export function Dialog({
  open,
  onClose,
  closeOnEscape = true,
  closeOnBackdrop = true,
  "aria-label": ariaLabel,
  children,
}: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoLabel, setAutoLabel] = useState("");
  useFocusTrap(contentRef, open);
  useBodyScrollLock(open);

  // Derive a stable accessible name from the first DialogTitle once mounted.
  useEffect(() => {
    if (!open || ariaLabel) {
      if (ariaLabel) setAutoLabel("");
      return;
    }
    const title = contentRef.current?.querySelector(
      "[data-ease-dialog='title']",
    );
    const text = title?.textContent?.trim();
    if (text) setAutoLabel(text);
  }, [open, ariaLabel, children]);

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
      <DialogCloseContext.Provider value={{ close: onClose }}>
        <div data-ease="dialog" data-size="md">
          {closeOnBackdrop ? (
            <OverlayBackdrop onBackdropClick={onClose} />
          ) : (
            <OverlayBackdrop />
          )}
          <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel || autoLabel || undefined}
            data-ease="dialog"
            data-size="md"
            tabIndex={-1}
            style={{
              pointerEvents: "auto",
              width: "100%",
              maxWidth: "28rem",
              maxHeight: "calc(100vh - 2 * var(--ease-spacing-4))",
              display: "flex",
              flexDirection: "column",
              background: "var(--ease-color-surface-overlay)",
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-lg)",
              boxShadow: "var(--ease-shadow-lg)",
              outline: "none",
            }}
          >
            {children}
          </div>
        </div>
      </DialogCloseContext.Provider>
    </Portal>
  );
}

export interface DialogContentProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "size"
> {
  size?: DialogSize;
  /** Accessible title; falls back to DialogTitle. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  children: ReactNode;
}

/**
 * Structural wrapper for dialog content. The <Dialog> root already provides
 * the dialog role, so this element is purely presentational there.
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({ size = "md", className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-ease="dialog"
        data-size={size}
        className={className}
        style={{ display: "contents" }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogHeader({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-dialog="header" {...rest}>
      {children}
    </div>
  );
});

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function DialogTitle({ className, children, ...rest }, ref) {
  return (
    <h2 ref={ref} className={className} data-ease-dialog="title" {...rest}>
      {children}
    </h2>
  );
});

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function DialogDescription({ className, children, ...rest }, ref) {
  return (
    <p ref={ref} className={className} data-ease-dialog="description" {...rest}>
      {children}
    </p>
  );
});

export const DialogBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogBody({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-dialog="body" {...rest}>
      {children}
    </div>
  );
});

export const DialogFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DialogFooter({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-dialog="footer" {...rest}>
      {children}
    </div>
  );
});

/** Convenience close (×) for the header. */
export function DialogClose({ children }: { children?: ReactNode }) {
  const { close } = useContext(DialogCloseContext);
  return (
    <IconButton size="sm" aria-label="Close dialog" onClick={close}>
      {children ?? <CloseIcon size={14} />}
    </IconButton>
  );
}

/**
 * A Button that closes the dialog on click — keeps footers terse:
 * <DialogFooter><DialogCloseButton onClick={save}>Save</DialogCloseButton></DialogCloseButton>
 */
export function DialogCloseButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  },
) {
  const { close } = useContext(DialogCloseContext);
  const { onClick, variant = "secondary", ...rest } = props;
  return (
    <Button
      variant={variant}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
    />
  );
}
