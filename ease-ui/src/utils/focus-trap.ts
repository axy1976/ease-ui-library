"use client";

import { useEffect, type RefObject } from "react";
import { focusableIn } from "./aria";

/**
 * Trap keyboard focus inside `ref` while `active` is true.
 *
 * - On activation, moves focus to the first focusable (or the container itself
 *   if it has a tabindex, or the previously-focused element if that is inside).
 * - Cycles Tab / Shift+Tab at the boundaries.
 * - On deactivation, restores focus to the element that had focus before
 *   activation (the documented "focus returns correctly" requirement).
 *
 * Only one trap should be active per container at a time; nested dialogs
 * each trap independently (the inner one receives keys first).
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // If the caller focused something inside already, keep it; otherwise
    // prefer a sensible first focusable.
    const current = document.activeElement as HTMLElement | null;
    if (current && container.contains(current)) {
      current.focus();
    } else {
      const first = focusableIn(container)[0];
      (first ?? (container as HTMLElement)).focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const focusables = focusableIn(container);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) {
        event.preventDefault();
        (container as HTMLElement).focus();
        return;
      }
      const activeEl = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (activeEl === first || !container?.contains(activeEl)) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeEl === last || !container?.contains(activeEl)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      previouslyFocused?.focus?.();
    };
  }, [ref, active]);
}
