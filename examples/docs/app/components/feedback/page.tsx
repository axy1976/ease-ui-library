"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stack,
  Badge,
  Grid,
} from "ease-ui";
import { Demo } from "@/components/demo";
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

export default function FeedbackPage() {
  return (
    <DocPage
      title="Feedback"
      description="Communicating results and errors. The same status vocabulary tints every feedback surface consistently."
    >
      <Stack gap={3}>
        <Grid gap={3}>
          <DemoCard
            title="Alert"
            description="Status callouts with icons. Color is never the only channel."
          >
            <Stack gap={2}>
              <Demo
                kind="alert"
                status="info"
                title="Heads up"
                description="A new region is available."
              />
              <Demo
                kind="alert"
                status="success"
                title="Deployed"
                description="v2.18.0 is live."
              />
              <Demo
                kind="alert"
                status="warning"
                description="Approaching the 80% quota."
              />
              <Demo
                kind="alert"
                status="danger"
                title="Failed"
                description="The build could not complete."
                dismissable
              />
            </Stack>
          </DemoCard>
          <DemoCard
            title="Toast"
            description="transient, auto-dismissing, stacked."
          >
            <Demo kind="toast" />
          </DemoCard>
        </Grid>
        <DemoCard
          title="Error state"
          description="Page or panel failure with a recovery action."
        >
          <Demo
            kind="error-state"
            title="Unable to load deployments"
            description="The service could not be reached. Check your network and try again."
            action={
              <span style={{ display: "inline-flex" }}>
                <Demo kind="button" variant="primary">
                  Retry
                </Demo>
              </span>
            }
          />
        </DemoCard>
        <DemoCard
          title="Inline error"
          description="Compact message for tight slots (not inside a Field)."
        >
          <Demo kind="inline-error">This value is required.</Demo>
        </DemoCard>
      </Stack>
    </DocPage>
  );
}
