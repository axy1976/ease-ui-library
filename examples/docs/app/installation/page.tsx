"use client";
import { CodeBlock, Stack, Badge } from "ease-ui";
import { DocPage } from "@/components/demo-section";

const install = `npm install ease-ui
# or
yarn add ease-ui
pnpm add ease-ui`;

const layout = `// app/layout.tsx
import "ease-ui/styles/ease-ui.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

const usage = `import { Button, Card, CardContent } from "ease-ui";

export default function Page() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Save</Button>
      </CardContent>
    </Card>
  );
}`;

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Ease UI is a single npm package with zero runtime dependencies. React and React-DOM are peer dependencies."
    >
      <Stack gap={4}>
        <div>
          <h2>Install</h2>
          <CodeBlock language="bash">{install}</CodeBlock>
        </div>
        <div>
          <h2>Import the stylesheet</h2>
          <p>
            Import the bundled stylesheet once, near the root of your app. This
            pulls in the tokens, both themes, and every component style.
          </p>
          <CodeBlock language="tsx">{layout}</CodeBlock>
        </div>
        <div>
          <h2>Use components</h2>
          <CodeBlock language="tsx">{usage}</CodeBlock>
          <p>
            <Badge status="info">Tree-shaking</Badge> Importing{" "}
            <code>Button</code> bundles only that module — each component maps
            to a single ESM file.
          </p>
        </div>
      </Stack>
    </DocPage>
  );
}
