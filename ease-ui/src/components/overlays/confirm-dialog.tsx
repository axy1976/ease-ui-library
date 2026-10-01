"use client";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "../button/button";
import type { ButtonVariant } from "../button/button";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  /** Confirming fires this. */
  onConfirm: () => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Visual weight of the confirm button. Default destructive. */
  confirmVariant?: ButtonVariant;
  /** Extra body content (e.g. a list of what will happen). */
  children?: React.ReactNode;
  /** Disable confirm while an action is in flight. */
  loading?: boolean;
}

/**
 * Pre-wired confirmation modal — the "are you sure" pattern with a safe
 * default (destructive confirm, safe cancel).
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "destructive",
  children,
  loading,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} aria-label={title}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <DialogBody>
          {children ?? (
            <p
              style={{
                margin: 0,
                fontSize: "var(--ease-font-size-sm)",
                color: "var(--ease-color-text-muted)",
              }}
            >
              {description ?? "This action cannot be undone."}
            </p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            loading={loading}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
