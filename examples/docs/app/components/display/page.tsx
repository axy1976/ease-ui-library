"use client";
import {
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Stack,
  Badge,
  Tag,
  Avatar,
  AvatarGroup,
  Status,
  Progress,
  EmptyState,
  Stat,
  KeyValue,
  DescriptionList,
  List,
  Code,
  Kbd,
  Timeline,
  TimelineItem,
  Separator,
} from "ease-ui";
import { Button } from "ease-ui";
import { PlusIcon } from "ease-ui/icons";
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

export default function DisplayPage() {
  return (
    <DocPage
      title="Data display"
      description="The visual vocabulary for reading data. A shared status vocabulary keeps the same state looking identical in a Badge, a Status, a Table row, and a card."
    >
      <Grid gap={3}>
        <DemoCard title="Card" description="Header, body, footer.">
          <Card>
            <CardHeader>
              <CardTitle>Resource</CardTitle>
              <CardDescription>api-gateway</CardDescription>
            </CardHeader>
            <CardContent>
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--ease-font-size-sm)",
                  color: "var(--ease-color-text-muted)",
                }}
              >
                Content area.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Manage</Button>
            </CardFooter>
          </Card>
        </DemoCard>
        <DemoCard title="Badge" description="Same status everywhere.">
          <Stack gap={2} align="start">
            <Badge status="neutral">Neutral</Badge>
            <Badge status="info">Info</Badge>
            <Badge status="success">Success</Badge>
            <Badge status="warning">Warning</Badge>
            <Badge status="danger">Danger</Badge>
          </Stack>
        </DemoCard>
        <DemoCard title="Status" description="Dot + label, pulsing for live.">
          <Stack gap={2} align="start">
            <Status status="success" pulse>
              Running
            </Status>
            <Status status="warning">Degraded</Status>
            <Status status="danger" pulse>
              Failed
            </Status>
            <Status status="neutral">Stopped</Status>
          </Stack>
        </DemoCard>
        <DemoCard title="Tag" description="Compact, removable metadata.">
          <Stack gap={2} align="start">
            <Tag>us-east-1</Tag>
            <Tag>prod</Tag>
            <Tag>v2.18.0</Tag>
          </Stack>
        </DemoCard>
        <DemoCard
          title="Avatar"
          description="Initials fallback, accessible name."
        >
          <Stack gap={2}>
            <Avatar name="Ada Lovelace" size="lg" />
            <AvatarGroup>
              <Avatar name="Grace Hopper" />
              <Avatar name="Katherine Johnson" />
              <Avatar name="Margaret Hamilton" />
            </AvatarGroup>
          </Stack>
        </DemoCard>
        <DemoCard title="Progress" description="Always label a meaningful bar.">
          <Stack gap={3}>
            <Progress value={72} label="Build progress" />
            <Progress value={38} status="warning" label="Storage used" />
            <Progress value={100} status="success" label="Upload complete" />
          </Stack>
        </DemoCard>
        <DemoCard title="Stat" description="Dashboard metric tile.">
          <Grid gap={3} columns={2}>
            <Stat
              label="Requests / min"
              value="12,480"
              trend="+4.2%"
              trendDirection="up"
            />
            <Stat
              label="Error rate"
              value="0.42%"
              trend="+0.1%"
              trendDirection="up"
              status="danger"
            />
          </Grid>
        </DemoCard>
      </Grid>

      <div style={{ marginBlock: "var(--ease-spacing-6)" }}>
        <Separator />
      </div>

      <Grid gap={3}>
        <DemoCard
          title="Empty state"
          description="Explain what, why, and the next action."
        >
          <EmptyState
            title="No deployments"
            description="Deploy your first application to get started."
            action={
              <Button variant="primary" icon={<PlusIcon size={16} />}>
                New deployment
              </Button>
            }
          />
        </DemoCard>
        <DemoCard title="Key / value" description="Properties and metadata.">
          <Stack gap={2}>
            <KeyValue key-content="Type" value="api-gateway" />
            <KeyValue key-content="ARN" value="arn:ease:gw:api-gateway" mono />
            <KeyValue key-content="Created" value="2026-07-08" />
          </Stack>
        </DemoCard>
        <DemoCard
          title="Description list"
          description="Semantic dl for documents."
        >
          <DescriptionList
            items={[
              { term: "Environment", detail: "Production" },
              { term: "Owner", detail: "platform-team" },
              { term: "Region", detail: "us-east-1" },
            ]}
          />
        </DemoCard>
        <DemoCard title="List" description="Plain or divided.">
          <List divided>
            <div>
              api-gateway <Tag>prod</Tag>
            </div>
            <div>
              worker-queue <Tag>us-east-1</Tag>
            </div>
          </List>
        </DemoCard>
        <DemoCard title="Code / Kbd" description="Monospace snippets and keys.">
          <Stack gap={2} align="start">
            <Code>ease-ui</Code>
            <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          </Stack>
        </DemoCard>
        <DemoCard title="Timeline" description="Ordered events.">
          <Timeline>
            <TimelineItem title="Created" time="2m ago" />
            <TimelineItem
              title="Deployed v2.18.0"
              status="success"
              time="5m ago"
            />
            <TimelineItem
              title="Scaled to 8 GiB"
              status="info"
              time="just now"
            />
          </Timeline>
        </DemoCard>
      </Grid>
    </DocPage>
  );
}
