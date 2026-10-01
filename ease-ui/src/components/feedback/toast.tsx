"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Portal } from "../../utils/client";
import type { StatusKind } from "../display/badge";
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  CloseIcon,
} from "../../icons";
import { IconButton } from "../button/icon-button";

export interface ToastOptions {
  status?: StatusKind;
  title?: string;
  description?: string;
  /** ms before auto-dismiss. 0 = sticky (must be closed manually). */
  duration?: number;
  action?: ReactNode;
}

export interface ToastApi {
  show: (options: ToastOptions) => string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

interface ToastItem {
  id: string;
  status: StatusKind;
  title?: string;
  description?: string;
  action?: ReactNode;
  leaving?: boolean;
}

const STATUS_ICON: Record<StatusKind, typeof InfoIcon> = {
  neutral: InfoIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
};

/**
 * Mount once near the app root. It renders an empty region and a live region
 * for announcements; toasts stack in the bottom corner and auto-dismiss.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
    );
    // Wait for the exit animation, then remove.
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 220);
  }, []);

  const show = useCallback(
    (options: ToastOptions) => {
      const id = `toast-${idRef.current++}`;
      const item: ToastItem = {
        id,
        status: options.status ?? "info",
        title: options.title,
        description: options.description,
        action: options.action,
      };
      setItems((prev) => [...prev, item]);
      const duration = options.duration ?? 5000;
      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const api: ToastApi = {
    show,
    success: (title, description) =>
      show({ status: "success", title, description }),
    error: (title, description) =>
      show({ status: "danger", title, description }),
    warning: (title, description) =>
      show({ status: "warning", title, description }),
    info: (title, description) => show({ status: "info", title, description }),
    dismiss,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Portal>
        <div data-ease="toast-region" aria-live="polite" aria-atomic="false">
          {items.map((item) => {
            const Icon = STATUS_ICON[item.status];
            return (
              <div
                key={item.id}
                data-ease="toast"
                data-status={item.status}
                data-state={item.leaving ? "leaving" : undefined}
                role={item.status === "danger" ? "alert" : "status"}
              >
                <span data-ease-toast="icon">
                  <Icon size={16} />
                </span>
                <div data-ease-toast="content">
                  {item.title ? (
                    <div data-ease-toast="title">{item.title}</div>
                  ) : null}
                  {item.description ? (
                    <div data-ease-toast="description">{item.description}</div>
                  ) : null}
                  {item.action}
                </div>
                <IconButton
                  size="xs"
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(item.id)}
                >
                  <CloseIcon size={12} />
                </IconButton>
              </div>
            );
          })}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

/**
 * Imperative handle for firing toasts from anywhere under the provider:
 *
 *   const toast = useToast();
 *   toast.success("Deployment completed");
 */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx && process.env.NODE_ENV !== "production") {
    console.warn("[ease-ui] useToast must be used inside a <ToastProvider>.");
  }
  return (
    ctx ?? {
      show: () => "",
      success: () => "",
      error: () => "",
      warning: () => "",
      info: () => "",
      dismiss: () => {},
    }
  );
}
