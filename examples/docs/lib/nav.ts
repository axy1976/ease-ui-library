export interface DocsSection {
  title: string;
  items: { title: string; href: string }[];
}

export interface SearchEntry {
  id: string;
  title: string;
  href: string;
  category: string;
  keywords: string[];
  /** Plain-text haystack used for in-browser search. */
  summary: string;
}

export const docsSections: DocsSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Overview", href: "/" },
      { title: "Installation", href: "/installation" },
      { title: "Theming & tokens", href: "/theming" },
      { title: "Next.js integration", href: "/nextjs" },
      { title: "Accessibility", href: "/accessibility" },
      { title: "Migration guide", href: "/migration" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Foundations", href: "/components/foundations" },
      { title: "Buttons", href: "/components/buttons" },
      { title: "Forms", href: "/components/forms" },
      { title: "Data display", href: "/components/display" },
      { title: "Tables", href: "/components/tables" },
      { title: "Navigation", href: "/components/navigation" },
      { title: "Overlays", href: "/components/overlays" },
      { title: "Feedback", href: "/components/feedback" },
      { title: "Loading", href: "/components/loading" },
      { title: "Layout", href: "/components/layout" },
      { title: "Enterprise", href: "/components/enterprise" },
      { title: "Icons", href: "/components/icons" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "Resource page", href: "/patterns/resource" },
      { title: "Settings page", href: "/patterns/settings" },
      { title: "Dashboard", href: "/patterns/dashboard" },
    ],
  },
];

export const searchEntries: SearchEntry[] = [
  {
    id: "overview",
    title: "Overview",
    href: "/",
    category: "Getting started",
    keywords: ["intro", "about", "philosophy", "what is ease ui"],
    summary: "What Ease UI is, its design principles, and how it is built.",
  },
  {
    id: "installation",
    title: "Installation",
    href: "/installation",
    category: "Getting started",
    keywords: ["install", "npm", "setup", "css", "import"],
    summary: "Install ease-ui and import the stylesheet.",
  },
  {
    id: "theming",
    title: "Theming & tokens",
    href: "/theming",
    category: "Getting started",
    keywords: ["theme", "dark", "light", "tokens", "css variables", "rebrand"],
    summary:
      "Light/dark themes and design-token customization via CSS variables.",
  },
  {
    id: "nextjs",
    title: "Next.js integration",
    href: "/nextjs",
    category: "Getting started",
    keywords: ["next", "app router", "server components", "use client", "ssr"],
    summary: "Server vs client components, hydration, and App Router usage.",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    href: "/accessibility",
    category: "Getting started",
    keywords: [
      "a11y",
      "wcag",
      "keyboard",
      "screen reader",
      "focus",
      "reduced motion",
    ],
    summary:
      "Keyboard, focus, ARIA, and reduced-motion support across components.",
  },
  {
    id: "migration",
    title: "Migration guide",
    href: "/migration",
    category: "Getting started",
    keywords: ["migrate", "replace", "custom", "button", "modal", "input"],
    summary: "Map your custom components onto Ease UI.",
  },
  {
    id: "foundations",
    title: "Foundations",
    href: "/components/foundations",
    category: "Components",
    keywords: [
      "box",
      "stack",
      "grid",
      "container",
      "text",
      "heading",
      "separator",
    ],
    summary:
      "Box, Stack, Grid, Container, Text, Heading, Separator, VisuallyHidden, Link.",
  },
  {
    id: "buttons",
    title: "Buttons",
    href: "/components/buttons",
    category: "Components",
    keywords: [
      "button",
      "icon button",
      "button group",
      "loading",
      "variant",
      "primary",
      "destructive",
    ],
    summary: "Button variants, sizes, loading, icon and icon-only buttons.",
  },
  {
    id: "forms",
    title: "Forms",
    href: "/components/forms",
    category: "Components",
    keywords: [
      "field",
      "input",
      "textarea",
      "select",
      "checkbox",
      "radio",
      "switch",
      "slider",
      "number",
      "search",
      "password",
    ],
    summary:
      "Field wrapper and all form controls with accessible labels and errors.",
  },
  {
    id: "display",
    title: "Data display",
    href: "/components/display",
    category: "Components",
    keywords: [
      "card",
      "badge",
      "tag",
      "avatar",
      "status",
      "progress",
      "empty state",
      "stat",
      "key value",
      "list",
      "code",
      "kbd",
      "timeline",
    ],
    summary:
      "Card, Badge, Tag, Avatar, Status, Progress, EmptyState, Stat, KeyValue, List, Code, Timeline.",
  },
  {
    id: "tables",
    title: "Tables",
    href: "/components/tables",
    category: "Components",
    keywords: [
      "table",
      "data table",
      "sortable",
      "selectable",
      "pagination",
      "toolbar",
      "dense",
      "sticky",
    ],
    summary: "Composable Table primitives and the data-driven DataTable.",
  },
  {
    id: "navigation",
    title: "Navigation",
    href: "/components/navigation",
    category: "Components",
    keywords: [
      "breadcrumb",
      "tabs",
      "sidebar",
      "navbar",
      "pagination",
      "stepper",
    ],
    summary: "Breadcrumb, Tabs, Sidebar, Navbar, Pagination, Stepper.",
  },
  {
    id: "overlays",
    title: "Overlays",
    href: "/components/overlays",
    category: "Components",
    keywords: [
      "dialog",
      "modal",
      "drawer",
      "popover",
      "tooltip",
      "dropdown menu",
      "command menu",
      "confirm",
    ],
    summary:
      "Dialog, Drawer, Popover, Tooltip, DropdownMenu, CommandMenu, ConfirmDialog with focus trap and Escape.",
  },
  {
    id: "feedback",
    title: "Feedback",
    href: "/components/feedback",
    category: "Components",
    keywords: [
      "alert",
      "toast",
      "error state",
      "success",
      "warning",
      "danger",
      "notification",
    ],
    summary:
      "Alert, Toast, ErrorState and the status-based Info/Success/Warning/Danger states.",
  },
  {
    id: "loading",
    title: "Loading",
    href: "/components/loading",
    category: "Components",
    keywords: ["spinner", "skeleton", "loading overlay", "loading state"],
    summary: "Spinner, Skeleton, and LoadingOverlay for calm loading states.",
  },
  {
    id: "layout",
    title: "Layout",
    href: "/components/layout",
    category: "Components",
    keywords: [
      "page",
      "page header",
      "page title",
      "section",
      "action bar",
      "filter bar",
      "split panel",
    ],
    summary: "Page, PageHeader, Section, ActionBar, FilterBar, SplitPanel.",
  },
  {
    id: "enterprise",
    title: "Enterprise patterns",
    href: "/components/enterprise",
    category: "Components",
    keywords: [
      "app shell",
      "resource header",
      "property panel",
      "activity log",
      "console",
    ],
    summary:
      "AppShell, ResourceHeader, PropertyPanel, ActivityLog for console UIs.",
  },
  {
    id: "icons",
    title: "Icons",
    href: "/components/icons",
    category: "Components",
    keywords: ["icon", "svg", "tree shaking", "search icon", "trash"],
    summary:
      "A small inline-SVG icon set with a name registry; unused icons tree-shake.",
  },
  {
    id: "pattern-resource",
    title: "Resource page pattern",
    href: "/patterns/resource",
    category: "Patterns",
    keywords: ["resource", "detail", "properties", "activity", "page header"],
    summary:
      "A complete resource detail page: header, properties, activity log.",
  },
  {
    id: "pattern-settings",
    title: "Settings page pattern",
    href: "/patterns/settings",
    category: "Patterns",
    keywords: ["settings", "tabs", "form", "danger zone", "save"],
    summary: "A settings page with tabs, forms, save, and a danger zone.",
  },
  {
    id: "pattern-dashboard",
    title: "Dashboard pattern",
    href: "/patterns/dashboard",
    category: "Patterns",
    keywords: ["dashboard", "metrics", "stats", "table", "monitoring"],
    summary:
      "A monitoring dashboard with metric cards, a table, and a progress area.",
  },
];
