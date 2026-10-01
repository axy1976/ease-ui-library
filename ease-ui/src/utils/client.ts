/**
 * Client-only utility barrel. Every re-export here relies on React hooks or
 * DOM access and MUST be imported from a "use client" module.
 *
 * Do NOT import from this file in a server-safe component. Server-safe code
 * should import the pure utilities from `./index` instead.
 */
export { Portal } from "./portal";
export { useDisposeOnUnmount } from "./dispose";
export { useFocusTrap } from "./focus-trap";
export { useBodyScrollLock } from "./scroll-lock";
export { useClickOutside } from "./click-outside";
export { useMediaQuery } from "./media-query";
