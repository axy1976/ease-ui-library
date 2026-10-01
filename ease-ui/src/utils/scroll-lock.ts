"use client";

import { useEffect } from "react";

let lockCount = 0;

/**
 * Lock body scroll while `active` is true; restore on deactivation.
 *
 * Nested overlays (dialog + drawer open together) share a single lock via a
 * refcount so the last one to unlock actually re-enables scrolling — no
 * flicker, no leaked `overflow: hidden`.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    const body = document.body;
    if (body && body.style.overflow !== "hidden") {
      body.dataset.easeScrollOverflow = body.style.overflow;
      body.style.overflow = "hidden";
    }
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0 && body) {
        const prev = body.dataset.easeScrollOverflow ?? "";
        body.style.overflow = prev;
        delete body.dataset.easeScrollOverflow;
      }
    };
  }, [active]);
}
