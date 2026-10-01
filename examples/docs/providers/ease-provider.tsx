"use client";

import { EaseProvider, type ThemePreference } from "ease-ui";

export function DocsThemeProvider({ children }: { children: React.ReactNode }) {
  return <EaseProvider theme="system">{children}</EaseProvider>;
}
