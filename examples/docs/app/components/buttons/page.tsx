"use client";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  IconButton,
  ButtonGroup,
  Card as CardBox,
  CodeBlock,
  Stack as LibStack,
} from "ease-ui";
import {
  PlusIcon,
  TrashIcon,
  EditIcon,
  CheckIcon,
  SearchIcon,
  CopyIcon,
  RefreshIcon,
} from "ease-ui/icons";
import { DocPage } from "@/components/demo-section";

const usage = `import { Button } from "ease-ui";

<Button variant="primary">Create resource</Button>
<Button variant="secondary" loading>Deploy</Button>
<Button variant="outline" size="sm" icon={<SearchIcon size={14} />}>Filter</Button>`;

export default function ButtonsPage() {
  return (
    <DocPage
      title="Buttons"
      description="One composable Button with six variants and four sizes. No PrimaryButton / DashboardButton forks."
    >
      <Grid gap={3}>
        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
            <CardDescription>Default size md.</CardDescription>
          </CardHeader>
          <CardContent>
            <LibStack gap={3} align="start">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </LibStack>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
            <CardDescription>xs · sm · md · lg</CardDescription>
          </CardHeader>
          <CardContent>
            <LibStack gap={3}>
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </LibStack>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>States</CardTitle>
            <CardDescription>loading, disabled, icon</CardDescription>
          </CardHeader>
          <CardContent>
            <LibStack gap={3}>
              <Button variant="primary" loading>
                Deploying
              </Button>
              <Button disabled>Disabled</Button>
              <Button icon={<CheckIcon size={16} />}>With icon</Button>
              <Button icon={<PlusIcon size={16} />} iconPosition="end">
                Icon end
              </Button>
              <Button variant="outline" icon={<SearchIcon size={14} />}>
                Filter
              </Button>
              <Button variant="ghost" fullWidth>
                Full width
              </Button>
            </LibStack>
          </CardContent>
        </Card>
        <CardBox>
          <CardHeader>
            <CardTitle>IconButton</CardTitle>
            <CardDescription>Requires aria-label.</CardDescription>
          </CardHeader>
          <CardContent>
            <LibStack gap={3} align="start">
              <ButtonGroup>
                <IconButton aria-label="Add">
                  <PlusIcon size={16} />
                </IconButton>
                <IconButton aria-label="Edit">
                  <EditIcon size={16} />
                </IconButton>
                <IconButton aria-label="Copy">
                  <CopyIcon size={16} />
                </IconButton>
                <IconButton aria-label="Refresh">
                  <RefreshIcon size={16} />
                </IconButton>
                <IconButton aria-label="Delete" variant="danger">
                  <TrashIcon size={16} />
                </IconButton>
              </ButtonGroup>
            </LibStack>
          </CardContent>
        </CardBox>
        <CardBox>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock>{usage}</CodeBlock>
          </CardContent>
        </CardBox>
      </Grid>
    </DocPage>
  );
}
