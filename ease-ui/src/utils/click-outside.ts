"use client";

import { type RefObject, useEffect } from "react";

/**
 * Invoke `handler` on the first pointerdown/click that lands outside every
 * ref. Used by popover and dropdown menus. Listens in the capture phase so a
 * click that closes the trigger also doesn't immediately re-open.
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    function onPointerDown(event: PointerEvent | MouseEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      const inside = refs.some((r) => r.current?.contains(target));
      if (!inside) handler();
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [refs, handler, enabled]);
}
