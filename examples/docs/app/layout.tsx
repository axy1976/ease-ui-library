import type { Metadata, Viewport } from "next";
import "ease-ui/styles/ease-ui.css";
import { DocsThemeProvider } from "@/providers/ease-provider";
import { DocsChrome } from "@/components/docs-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ease UI", template: "%s · Ease UI" },
  description:
    "Documentation and component showcase for Ease UI — a lightweight, token-driven, accessible React UI library for Next.js.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DocsThemeProvider>
          <DocsChrome>{children}</DocsChrome>
        </DocsThemeProvider>
      </body>
    </html>
  );
}
