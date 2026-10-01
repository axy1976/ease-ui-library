/**
 * Server-safe utility barrel. Re-exports ONLY utilities that are safe to use
 * in a Server Component (no React hooks, no DOM access).
 *
 * The hook-based / client-only utilities (focus trap, scroll lock, media query,
 * click-outside, portal, dispose) live in `./client` so that a server-safe
 * component that imports `cn` from this barrel does NOT transitively pull a
 * client module into the server bundle. See `client.ts` for those.
 */
export { cn } from "./cn";
export { useIdFork, nextEaseId } from "./id";
export { ariaLabel, FOCUSABLE_SELECTOR, focusableIn } from "./aria";
