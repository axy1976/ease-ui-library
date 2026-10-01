let counter = 0;

/**
 * Generate a unique, DOM-safe id for implicit ARIA wiring
 * (e.g. label<->input, aria-describedby error ids).
 *
 * The id is stable for the lifetime of the element that requested it, so
 * re-renders don't churn ids and break focus/announcements.
 */
export function useIdFork(external?: string): string {
  return external ?? `ease-${(counter++).toString(36)}`;
}

/** Module-scoped generator for ids created outside a hook (rare). */
export function nextEaseId(): string {
  counter += 1;
  return `ease-${counter.toString(36)}`;
}
