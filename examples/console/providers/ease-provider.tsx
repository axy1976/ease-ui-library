"use client";

import { EaseProvider as BaseProvider, type ThemePreference } from "ease-ui";
import type { ReactNode } from "react";

/**
 * Thin wrapper so the app's layout (a Server Component) can place the client
 * theme provider in the tree without importing the client module directly.
 */
export function EaseProvider({
  theme = "system",
  children,
}: {
  theme?: ThemePreference;
  children: ReactNode;
}) {
  return <BaseProvider theme={theme}>{children}</BaseProvider>;
}
