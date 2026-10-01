"use client";
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
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
  Section,
  SectionHeader,
  SectionActions,
  ActionBar,
  FilterBar,
  SplitPanel,
  SearchInput,
  Select,
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

export default function LayoutPage() {
  return (
    <DocPage
      title="Layout"
      description="Structural scaffolding for pages and regions. Compose a page from a header, content sections, and contextual action/filter bars."
    >
      <Stack gap={3}>
        <DemoCard
          title="Page"
          description="Top-level column with header + content."
        >
          <div
            style={{
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-md)",
              background: "var(--ease-color-surface)",
              padding: "var(--ease-spacing-4)",
            }}
          >
            <Page>
              <PageHeader
                title="Resources"
                description="Everything in this account."
                actions={
                  <Button size="sm" variant="primary">
                    Create
                  </Button>
                }
              />
              <Card>
                <CardContent>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "var(--ease-font-size-sm)",
                      color: "var(--ease-color-text-muted)",
                    }}
                  >
                    Page content goes here.
                  </p>
                </CardContent>
              </Card>
            </Page>
          </div>
        </DemoCard>
        <DemoCard title="Section" description="A titled region with actions.">
          <div
            style={{
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-md)",
              padding: "var(--ease-spacing-4)",
            }}
          >
            <Section
              title="Recent"
              description="Last 7 days"
              actions={
                <Button size="sm" variant="ghost">
                  View all
                </Button>
              }
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--ease-font-size-sm)",
                  color: "var(--ease-color-text-muted)",
                }}
              >
                Section content.
              </p>
            </Section>
          </div>
        </DemoCard>
        <Grid gap={3}>
          <DemoCard
            title="Action bar"
            description="Contextual actions over a list."
          >
            <ActionBar info="3 selected">
              <Button size="sm" variant="ghost">
                Edit
              </Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </ActionBar>
          </DemoCard>
          <DemoCard
            title="Filter bar"
            description="Search + filters above a table."
          >
            <FilterBar>
              <div style={{ flex: 1, maxWidth: 220 }}>
                <SearchInput
                  placeholder="Filter…"
                  size="sm"
                  aria-label="Filter"
                />
              </div>
              <Select
                size="sm"
                aria-label="Status"
                options={[
                  { value: "all", label: "All" },
                  { value: "running", label: "Running" },
                  { value: "error", label: "Error" },
                ]}
                style={{ width: 120 }}
              />
            </FilterBar>
          </DemoCard>
        </Grid>
        <DemoCard
          title="Split panel"
          description="Two panes (list + detail); stacks below the breakpoint."
        >
          <div
            style={{
              height: 160,
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-md)",
              overflow: "hidden",
            }}
          >
            <SplitPanel primary={0.4}>
              <Card style={{ margin: "var(--ease-spacing-2)" }}>
                <CardContent>
                  <p
                    style={{ margin: 0, fontSize: "var(--ease-font-size-sm)" }}
                  >
                    List pane
                  </p>
                </CardContent>
              </Card>
              <Card style={{ margin: "var(--ease-spacing-2)" }}>
                <CardContent>
                  <p
                    style={{ margin: 0, fontSize: "var(--ease-font-size-sm)" }}
                  >
                    Detail pane
                  </p>
                </CardContent>
              </Card>
            </SplitPanel>
          </div>
        </DemoCard>
      </Stack>
    </DocPage>
  );
}
