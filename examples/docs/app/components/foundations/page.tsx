"use client";
import {
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Box,
  Text,
  Heading,
  Separator,
  VisuallyHidden,
  Inline,
  Code,
  Kbd,
  Badge,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

export default function FoundationsPage() {
  return (
    <DocPage
      title="Foundations"
      description="The minimal composable primitives every layout is built from. No visual opinions beyond what they must do."
    >
      <Grid gap={3}>
        <Card>
          <CardHeader>
            <CardTitle>Box</CardTitle>
            <CardDescription>
              Block container, any element via `as`.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Box
              style={{
                border: "1px dashed var(--ease-color-border-strong)",
                borderRadius: "var(--ease-radius-md)",
                padding: "var(--ease-spacing-3)",
              }}
            >
              <Text tone="muted">I am a Box.</Text>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stack</CardTitle>
            <CardDescription>Tokenized vertical gap.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap={3}>
              <Box
                style={{
                  background: "var(--ease-color-surface-subtle)",
                  borderRadius: 4,
                  height: 24,
                }}
              />
              <Box
                style={{
                  background: "var(--ease-color-surface-subtle)",
                  borderRadius: 4,
                  height: 24,
                }}
              />
              <Box
                style={{
                  background: "var(--ease-color-surface-subtle)",
                  borderRadius: 4,
                  height: 24,
                }}
              />
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Grid</CardTitle>
            <CardDescription>Auto-fit or fixed columns.</CardDescription>
          </CardHeader>
          <CardContent>
            <Grid columns={3} gap={2}>
              <Box
                style={{
                  background: "var(--ease-color-surface-subtle)",
                  borderRadius: 4,
                  height: 24,
                }}
              />
              <Box
                style={{
                  background: "var(--ease-color-surface-subtle)",
                  borderRadius: 4,
                  height: 24,
                }}
              />
              <Box
                style={{
                  background: "var(--ease-color-surface-subtle)",
                  borderRadius: 4,
                  height: 24,
                }}
              />
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Heading + Text + inline.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap={2}>
              <Heading level={3}>A heading</Heading>
              <Text tone="muted">
                A paragraph of <Inline>inline</Inline> text with a{" "}
                <Code>code</Code> span and a <Kbd>⌘K</Kbd> shortcut.
              </Text>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>Horizontal or vertical.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap={2}>
              <Text tone="muted">Above</Text>
              <Separator />
              <Text tone="muted">Below</Text>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>VisuallyHidden</CardTitle>
            <CardDescription>Screen-reader-only content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap={2}>
              <Text tone="muted">
                Visible text with a{" "}
                <VisuallyHidden>
                  visually hidden annotation for screen readers.
                </VisuallyHidden>
              </Text>
              <Badge status="neutral">
                Use for a11y labels that must not take space.
              </Badge>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </DocPage>
  );
}
