import { type ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into document.body.
 *
 * Overlays (dialog, dropdown, popover, tooltip, toast) must portal out of the
 * consuming app's layout to avoid overflow: hidden / transform ancestors
 * breaking fixed positioning. We intentionally do NOT render a portal during
 * SSR: the overlay itself is client-gated, so there is no hydration output to
 * match on the server.
 */
export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
