"use client";

import {
  Page,
  PageHeader,
  PageContent,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Field,
  Input,
  Select,
  Switch,
  Slider,
  Button,
  ConfirmDialog,
  Alert,
  Stack,
  Grid,
} from "ease-ui";
import { useState } from "react";
import { useToast } from "ease-ui";

export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const toast = useToast();

  return (
    <Page
      breadcrumb={[
        { label: "Console", href: "/dashboard" },
        { label: "Settings" },
      ]}
    >
      <PageHeader
        title="Settings"
        description="Manage your account and workspace preferences."
      />

      <PageContent>
        <Tabs value={tab} onValueChange={setTab}>
          <TabList aria-label="Settings sections">
            <Tab value="general">General</Tab>
            <Tab value="notifications">Notifications</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="danger">Danger zone</Tab>
          </TabList>

          <TabPanel value="general">
            <Card>
              <CardHeader>
                <CardTitle>Workspace</CardTitle>
                <CardDescription>
                  Basic details for this workspace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <Field
                    label="Workspace name"
                    description="A short internal identifier."
                  >
                    <Input defaultValue="Ease Production" />
                  </Field>
                  <Field
                    label="Default region"
                    description="Where new resources are created."
                  >
                    <Select
                      defaultValue="us-east-1"
                      options={[
                        { value: "us-east-1", label: "US East (N. Virginia)" },
                        { value: "us-west-2", label: "US West (Oregon)" },
                        { value: "eu-west-1", label: "EU (Ireland)" },
                      ]}
                    />
                  </Field>
                  <Field label="Default instance size">
                    <Select
                      defaultValue="medium"
                      options={[
                        { value: "small", label: "Small" },
                        { value: "medium", label: "Medium" },
                        { value: "large", label: "Large" },
                      ]}
                    />
                  </Field>
                </Stack>
              </CardContent>
              <CardFooter>
                <Button
                  variant="primary"
                  onClick={() => toast.success("Settings saved")}
                >
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>

          <TabPanel value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose what you want to be told about.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={3}>
                  <Switch
                    checked
                    defaultChecked
                    onChange={() => {}}
                    label="Email me on deployment failures"
                  />
                  <Switch
                    onChange={() => {}}
                    label="Daily digest of resource usage"
                  />
                  <Switch onChange={() => {}} label="Weekly spend summary" />
                </Stack>
              </CardContent>
              <CardFooter>
                <Button
                  variant="primary"
                  onClick={() => toast.success("Preferences saved")}
                >
                  Save preferences
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>

          <TabPanel value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Budget</CardTitle>
                <CardDescription>
                  Set a monthly cap to avoid surprise spend.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Field
                  label="Monthly budget cap"
                  description="We'll alert you at 80% and block at 100%."
                >
                  <Input type="number" defaultValue={5000} min={0} step={100} />
                </Field>
                <Field
                  label="Alert threshold"
                  description="Percentage of the cap that triggers a warning."
                >
                  <Slider
                    defaultValue={80}
                    min={50}
                    max={100}
                    step={5}
                    aria-label="Alert threshold percent"
                  />
                </Field>
              </CardContent>
              <CardFooter>
                <Button
                  variant="primary"
                  onClick={() => toast.success("Budget updated")}
                >
                  Save budget
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>

          <TabPanel value="danger">
            <Alert
              status="danger"
              title="Danger zone"
              description="These actions are irreversible. Proceed carefully."
            />
            <Card>
              <CardHeader>
                <CardTitle>Delete workspace</CardTitle>
                <CardDescription>
                  Permanently remove this workspace and all of its resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Field label="Confirm by typing the workspace name">
                  <Input placeholder="Ease Production" />
                </Field>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={() => setConfirmOpen(true)}
                >
                  Delete workspace
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
        </Tabs>
      </PageContent>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete workspace?"
        description="This permanently deletes the workspace and every resource in it. This cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmOpen(false);
          toast.error("Workspace deleted");
        }}
      />
    </Page>
  );
}
