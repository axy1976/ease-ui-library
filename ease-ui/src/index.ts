/**
 * Ease UI — public API.
 *
 * One flat, explicit re-export surface. Importing a component pulls only that
 * component's module (tree-shaking is preserved because each export maps to a
 * single ESM file). For the smallest possible bundle, import from the granular
 * entry points instead (e.g. `ease-ui/button`).
 */

// ---------------------------------------------------------------------------
// Foundations
// ---------------------------------------------------------------------------
export { Box } from "./components/foundations/box";
export type { BoxProps } from "./components/foundations/box";
export { Stack } from "./components/foundations/stack";
export type { StackProps } from "./components/foundations/stack";
export { Inline } from "./components/foundations/inline";
export type { InlineProps } from "./components/foundations/inline";
export { Grid } from "./components/foundations/grid";
export type { GridProps } from "./components/foundations/grid";
export { Container } from "./components/foundations/container";
export type { ContainerProps } from "./components/foundations/container";
export { Separator } from "./components/foundations/separator";
export type { SeparatorProps } from "./components/foundations/separator";
export { VisuallyHidden } from "./components/foundations/visually-hidden";
export { Text } from "./components/foundations/text";
export type { TextProps } from "./components/foundations/text";
export { Heading } from "./components/foundations/heading";
export type { HeadingProps } from "./components/foundations/heading";
export { Link } from "./components/foundations/link";
export type { LinkProps } from "./components/foundations/link";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export { Button } from "./components/button/button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/button/button";
export { IconButton } from "./components/button/icon-button";
export type {
  IconButtonProps,
  IconButtonSize,
} from "./components/button/icon-button";
export { ButtonGroup } from "./components/button/button-group";
export type { ButtonGroupProps } from "./components/button/button-group";

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------
export { Field } from "./components/forms/field";
export type { FieldProps } from "./components/forms/field";
export { Input } from "./components/forms/input";
export type { InputProps, InputSize } from "./components/forms/input";
export { Textarea } from "./components/forms/textarea";
export type { TextareaProps } from "./components/forms/textarea";
export { Select } from "./components/forms/select";
export type { SelectProps, SelectOption } from "./components/forms/select";
export { Checkbox } from "./components/forms/checkbox";
export type { CheckboxProps } from "./components/forms/checkbox";
export { Radio, RadioGroup } from "./components/forms/radio";
export type { RadioProps, RadioGroupProps } from "./components/forms/radio";
export { Switch } from "./components/forms/switch";
export type { SwitchProps } from "./components/forms/switch";
export { Slider } from "./components/forms/slider";
export type { SliderProps } from "./components/forms/slider";
export { NumberInput } from "./components/forms/number-input";
export type { NumberInputProps } from "./components/forms/number-input";
export { SearchInput } from "./components/forms/search-input";
export type { SearchInputProps } from "./components/forms/search-input";
export { PasswordInput } from "./components/forms/password-input";
export type { PasswordInputProps } from "./components/forms/password-input";

// ---------------------------------------------------------------------------
// Data display
// ---------------------------------------------------------------------------
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/display/card";
export type { CardProps } from "./components/display/card";
export { Badge } from "./components/display/badge";
export type {
  BadgeProps,
  BadgeVariant,
  StatusKind,
} from "./components/display/badge";
export { Tag } from "./components/display/tag";
export type { TagProps } from "./components/display/tag";
export { Avatar, AvatarGroup } from "./components/display/avatar";
export type {
  AvatarProps,
  AvatarGroupProps,
  AvatarSize,
} from "./components/display/avatar";
export { Status } from "./components/display/status";
export type { StatusProps } from "./components/display/status";
export { Progress } from "./components/display/progress";
export type { ProgressProps } from "./components/display/progress";
export { EmptyState } from "./components/display/empty-state";
export type { EmptyStateProps } from "./components/display/empty-state";
export { Stat } from "./components/display/stat";
export type { StatProps } from "./components/display/stat";
export { KeyValue, DescriptionList } from "./components/display/key-value";
export type { KeyValueProps } from "./components/display/key-value";
export { KeyValue as KeyValueGrid } from "./components/display/key-value-grid";
export type {
  KeyValueProps as KeyValueGridProps,
  KeyValueRow,
  KeyValLayout,
  KeyValAlign,
} from "./components/display/key-value-grid";
export { Chip, ChipGroup } from "./components/display/chip";
export type {
  ChipProps,
  ChipVariant,
  ChipTone,
} from "./components/display/chip";
export { MetadataGrid } from "./components/display/metadata-grid";
export type {
  MetadataGridProps,
  MetadataEntry,
  MetadataLayout,
} from "./components/display/metadata-grid";
export { ResourceCard } from "./components/display/resource-card";
export type { ResourceCardProps } from "./components/display/resource-card";
export { Stat as StatTile, MetricRow } from "./components/display/stat-tile";
export type { StatTileProps, TileLayout } from "./components/display/stat-tile";
export { List, ListItem } from "./components/display/list";
export type { ListProps } from "./components/display/list";
export { Code, CodeBlock, Kbd } from "./components/display/code";
export type { CodeBlockProps } from "./components/display/code";
export { Timeline, TimelineItem } from "./components/display/timeline";
export type {
  TimelineProps,
  TimelineItemProps,
} from "./components/display/timeline";

// ---------------------------------------------------------------------------
// Loading / feedback
// ---------------------------------------------------------------------------
export { Spinner } from "./components/feedback/spinner";
export type { SpinnerProps, SpinnerSize } from "./components/feedback/spinner";
export { Skeleton, SkeletonRows } from "./components/feedback/skeleton";
export type { SkeletonProps } from "./components/feedback/skeleton";
export { LoadingOverlay } from "./components/feedback/loading-overlay";
export type { LoadingOverlayProps } from "./components/feedback/loading-overlay";
export {
  Alert,
  InfoState,
  SuccessState,
  WarningState,
  DangerState,
} from "./components/feedback/alert";
export type { AlertProps } from "./components/feedback/alert";
export { ErrorState, InlineError } from "./components/feedback/error-state";
export type {
  ErrorStateProps,
  InlineErrorProps,
} from "./components/feedback/error-state";
export { ToastProvider, useToast } from "./components/feedback/toast";
export type { ToastApi, ToastOptions } from "./components/feedback/toast";
export { Toast } from "./components/feedback/toast-card";
export type {
  ToastProps,
  ToastVariant,
} from "./components/feedback/toast-card";
export { Callout } from "./components/feedback/callout";
export type { CalloutProps } from "./components/feedback/callout";
export { Banner } from "./components/feedback/banner";
export type { BannerProps, BannerTone } from "./components/feedback/banner";
export { Collapse, Accordion } from "./components/feedback/collapse";
export type {
  CollapseProps,
  AccordionProps,
  AccordionItem,
} from "./components/feedback/collapse";

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeadCell,
  TableCell,
  TableScroll,
  DataTable,
} from "./components/table/table";
export type {
  TableProps,
  TableVariant,
  TableRowProps,
  TableHeadCellProps,
  TableCellProps,
  DataTableColumn,
  DataTableProps,
} from "./components/table/table";
export { TableToolbar } from "./components/table/table-toolbar";
export type { TableToolbarProps } from "./components/table/table-toolbar";
export { TablePagination } from "./components/table/table-pagination";
export type { TablePaginationProps } from "./components/table/table-pagination";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export { Breadcrumb } from "./components/navigation/breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbItem,
} from "./components/navigation/breadcrumb";
export { Tabs, Tab, TabList, TabPanel } from "./components/navigation/tabs";
export type {
  TabsProps,
  TabProps,
  TabPanelProps,
  TabsVariant,
} from "./components/navigation/tabs";
export {
  Sidebar,
  SidebarItem,
  SidebarSection,
} from "./components/navigation/sidebar";
export type {
  SidebarProps,
  SidebarItemProps,
  SidebarSectionProps,
} from "./components/navigation/sidebar";
export { Navbar } from "./components/navigation/navbar";
export type { NavbarProps } from "./components/navigation/navbar";
export { Pagination } from "./components/navigation/pagination";
export type { PaginationProps } from "./components/navigation/pagination";
export { Stepper } from "./components/navigation/stepper";
export type {
  StepperProps,
  StepperStep,
} from "./components/navigation/stepper";

// ---------------------------------------------------------------------------
// Overlays
// ---------------------------------------------------------------------------
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogCloseButton,
} from "./components/overlays/dialog";
export type {
  DialogProps,
  DialogContentProps,
  DialogSize,
} from "./components/overlays/dialog";
export {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "./components/overlays/drawer";
export type { DrawerProps, DrawerSide } from "./components/overlays/drawer";
export { Popover } from "./components/overlays/popover";
export type { PopoverProps } from "./components/overlays/popover";
export { Tooltip } from "./components/overlays/tooltip";
export type { TooltipProps } from "./components/overlays/tooltip";
export {
  DropdownMenu,
  MenuItem,
  MenuSeparator,
  MenuLabel,
} from "./components/overlays/dropdown-menu";
export type {
  DropdownMenuProps,
  MenuItemProps,
} from "./components/overlays/dropdown-menu";
export { ContextMenu } from "./components/overlays/context-menu";
export type { ContextMenuProps } from "./components/overlays/context-menu";
export { CommandMenu } from "./components/overlays/command-menu";
export type {
  CommandMenuProps,
  CommandItem,
} from "./components/overlays/command-menu";
export {
  CommandPalette,
  useCommandPaletteShortcut,
} from "./components/overlays/command-palette";
export type {
  CommandPaletteProps,
  CommandGroup,
} from "./components/overlays/command-palette";
export { ConfirmDialog } from "./components/overlays/confirm-dialog";
export type { ConfirmDialogProps } from "./components/overlays/confirm-dialog";

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export {
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
} from "./components/layout/page";
export type { PageProps, PageHeaderProps } from "./components/layout/page";
export {
  Section,
  SectionHeader,
  SectionActions,
} from "./components/layout/section";
export type { SectionProps } from "./components/layout/section";
export {
  ActionBar,
  FilterBar,
  FilterChip,
  FilterBarClear,
} from "./components/layout/action-bar";
export type {
  ActionBarProps,
  FilterBarProps,
  FilterChipProps,
  FilterBarClearProps,
} from "./components/layout/action-bar";
export { Panel } from "./components/layout/panel";
export type { PanelProps, PanelPosition } from "./components/layout/panel";
export { InspectorPanel } from "./components/layout/inspector-panel";
export type {
  InspectorPanelProps,
  InspectorWidth,
} from "./components/layout/inspector-panel";

// ---------------------------------------------------------------------------
// Enterprise patterns
// ---------------------------------------------------------------------------
export { AppShell } from "./components/enterprise/app-shell";
export type { AppShellProps } from "./components/enterprise/app-shell";
export { ResourceHeader } from "./components/enterprise/resource-header";
export type { ResourceHeaderProps } from "./components/enterprise/resource-header";
export {
  PropertyPanel,
  PropertyPanelList,
} from "./components/enterprise/property-panel";
export type { PropertyPanelProps } from "./components/enterprise/property-panel";
export { ActivityLog } from "./components/enterprise/activity-log";
export type {
  ActivityLogProps,
  ActivityEntry,
} from "./components/enterprise/activity-log";
export { SplitPanel } from "./components/enterprise/split-panel";
export type { SplitPanelProps } from "./components/enterprise/split-panel";

// ---------------------------------------------------------------------------
// Theming
// ---------------------------------------------------------------------------
export { EaseProvider, useTheme, ThemeToggle } from "./providers/ease-provider";
export type { ThemePreference } from "./providers/ease-provider";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
export {
  Icon,
  SearchIcon,
  PlusIcon,
  CloseIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  EditIcon,
  CopyIcon,
  RefreshIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
  SuccessIcon,
  MenuIcon,
  SettingsIcon,
  FilterIcon,
  DownloadIcon,
  UploadIcon,
} from "./icons/icons";
export type { IconProps, IconPropsWithName, EaseIconName } from "./icons/icons";
