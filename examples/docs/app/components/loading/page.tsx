"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Grid,
  Badge,
  Button,
  Spinner,
  Skeleton,
  SkeletonRows,
  LoadingOverlay,
} from "ease-ui";
import { DocPage } from "@/components/demo-section";

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function OverlayDemo() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setShow(true)}>
        Show overlay
      </Button>
      <Card>
        <CardContent style={{ position: "relative", minHeight: 80 }}>
          <p
            style={{
              margin: 0,
              fontSize: "var(--ease-font-size-sm)",
              color: "var(--ease-color-text-muted)",
            }}
          >
            Content beneath an overlay.
          </p>
          {show ? (
            <LoadingOverlay
              label="Working…"
              style={{ position: "absolute", inset: 0 }}
            />
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}

export default function LoadingPage() {
  return (
    <DocPage
      title="Loading"
      description="Loading is first-class. Prefer a Skeleton when the final layout is known; reserve the Spinner for genuinely unknown waits."
    >
      <Grid gap={3}>
        <DemoCard title="Spinner" description="Indeterminate wait.">
          <Stack gap={2}>
            <Spinner size="sm" />
            <Spinner />
          </Stack>
        </DemoCard>
        <DemoCard
          title="Skeleton"
          description="Placeholder with a known shape."
        >
          <Stack gap={3}>
            <Skeleton height={16} />
            <Skeleton height={12} width="80%" />
            <Skeleton height={12} width="60%" />
          </Stack>
        </DemoCard>
        <DemoCard
          title="Skeleton rows"
          description="For list and table bodies."
        >
          <SkeletonRows rows={5} />
        </DemoCard>
        <DemoCard
          title="Button loading"
          description="Label is kept, so layout never jumps."
        >
          <Button variant="primary" loading>
            Deploying…
          </Button>
        </DemoCard>
        <DemoCard
          title="Loading overlay"
          description="Covers a known region while it refreshes."
        >
          <OverlayDemo />
        </DemoCard>
      </Grid>
    </DocPage>
  );
}
