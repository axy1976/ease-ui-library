import type { Metadata } from "next";
import "ease-ui/styles/ease-ui.css";
import { EaseProvider } from "@/providers/ease-provider";
import { ConsoleChrome } from "@/components/console-chrome";

export const metadata: Metadata = {
  title: { default: "Ease Console", template: "%s · Ease Console" },
  description: "A cloud-infrastructure console built with Ease UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <EaseProvider theme="system">
          <ConsoleChrome>{children}</ConsoleChrome>
        </EaseProvider>
      </body>
    </html>
  );
}
