"use client";

import { type RefObject, useEffect } from "react";

/**
 * Call `dispose` with the element when the element unmounts.
 *
 * Used by focus/scroll/pointer listeners that attach in useEffect — a single
 * place to express the common "clean up on unmount" pattern.
 */
export function useDisposeOnUnmount(
  dispose: (el: Element | null) => void,
  ref: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    return () => dispose(ref.current);
  }, [dispose, ref]);
}
