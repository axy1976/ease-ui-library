import type { SVGProps } from "react";

/**
 * Ease UI icon set.
 *
 * ~20 deliberately small, 24×24 stroke icons in a single module. Each is a
 * standalone component so bundlers tree-shake unused ones; the `Icon` registry
 * adds name-based lookup without pulling the whole set into a bundle when a
 * consumer imports one directly.
 *
 * All icons inherit `currentColor` and honor the `size` prop (default 16px,
 * matching the library's dense control sizing).
 */

export type EaseIconName =
  | "search"
  | "plus"
  | "minus"
  | "close"
  | "check"
  | "chevron-down"
  | "chevron-up"
  | "chevron-left"
  | "chevron-right"
  | "arrow-up"
  | "arrow-down"
  | "trash"
  | "edit"
  | "copy"
  | "refresh"
  | "info"
  | "warning"
  | "error"
  | "success"
  | "menu"
  | "external"
  | "settings"
  | "filter"
  | "download"
  | "upload"
  | "dot"
  | "eye"
  | "eye-off";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  /** Pixel size for width and height. Defaults to 16 to match dense controls. */
  size?: number;
  title?: string;
}

function base(props: IconProps, children: React.ReactNode, decorative = true) {
  const { size = 16, title, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative && !title ? "true" : undefined}
      role={title ? "img" : undefined}
      data-ease="icon"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) =>
  base(
    p,
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>,
  );
export const PlusIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>,
  );
export const MinusIcon = (p: IconProps) => base(p, <path d="M5 12h14" />);
export const CloseIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>,
  );
export const CheckIcon = (p: IconProps) => base(p, <path d="m5 12 5 5 9-10" />);
export const ChevronDownIcon = (p: IconProps) =>
  base(p, <path d="m6 9 6 6 6-6" />);
export const ChevronUpIcon = (p: IconProps) =>
  base(p, <path d="m6 15 6-6 6 6" />);
export const ChevronLeftIcon = (p: IconProps) =>
  base(p, <path d="m15 6-6 6 6 6" />);
export const ChevronRightIcon = (p: IconProps) =>
  base(p, <path d="m9 6 6 6-6 6" />);
export const ArrowUpIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </>,
  );
export const ArrowDownIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>,
  );
export const TrashIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </>,
  );
export const EditIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M4 20h4L20 8l-4-4L4 16v4z" />
      <path d="m14 6 4 4" />
    </>,
  );
export const CopyIcon = (p: IconProps) =>
  base(
    p,
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>,
  );
export const RefreshIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 4v5h-5" />
    </>,
  );
export const InfoIcon = (p: IconProps) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </>,
  );
export const WarningIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 10v5" />
      <path d="M12 18h.01" />
    </>,
  );
export const ErrorIcon = (p: IconProps) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </>,
  );
export const SuccessIcon = (p: IconProps) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>,
  );
export const MenuIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>,
  );
export const ExternalIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </>,
  );
export const SettingsIcon = (p: IconProps) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14.2 3H9.8L9.4 5.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2l.4 2.6h4.4l.4-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.06-.4.1-.8.1-1.2z" />
    </>,
  );
export const FilterIcon = (p: IconProps) =>
  base(p, <path d="M3 5h18l-7 8v6l-4 2v-8L3 5z" />);
export const DownloadIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M12 4v12" />
      <path d="m6 12 6 6 6-6" />
      <path d="M4 20h16" />
    </>,
  );
export const EyeOpenIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="3" />
    </>,
  );
export const EyeClosedIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      <path d="m4 4 16 16" />
    </>,
  );
export const UploadIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M12 16V4" />
      <path d="m6 8 6-6 6 6" />
      <path d="M4 20h16" />
    </>,
  );
export const DotIcon = (p: IconProps) =>
  base(p, <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />);

/**
 * Name-based registry. Importing `Icon` pulls in the set above, but using the
 * individual `XIcon` components directly is preferable in app code so the
 * bundler drops every unused glyph.
 */
const REGISTRY: Record<EaseIconName, (p: IconProps) => React.JSX.Element> = {
  search: SearchIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  close: CloseIcon,
  check: CheckIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "arrow-up": ArrowUpIcon,
  "arrow-down": ArrowDownIcon,
  trash: TrashIcon,
  edit: EditIcon,
  copy: CopyIcon,
  refresh: RefreshIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  success: SuccessIcon,
  menu: MenuIcon,
  external: ExternalIcon,
  settings: SettingsIcon,
  filter: FilterIcon,
  download: DownloadIcon,
  upload: UploadIcon,
  dot: DotIcon,
  eye: EyeOpenIcon,
  "eye-off": EyeClosedIcon,
};

export interface IconPropsWithName extends IconProps {
  name: EaseIconName;
}

export function Icon({ name, ...props }: IconPropsWithName) {
  const Cmp = REGISTRY[name];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}
