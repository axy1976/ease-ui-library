import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";

export interface SidebarItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** When set, renders a link; otherwise a button. */
  href?: string;
  /** Active route highlight. */
  active?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  /** Visible label (the row text). Use this, not children, for the label. */
  children?: ReactNode;
  /** Optional nested items rendered below the row when `expanded`. */
  nested?: ReactNode;
  /** Whether nested items are visible. */
  expanded?: boolean;
}

/**
 * One row in the side navigation. Renders an <a> when `href` is present, a
 * <button> otherwise. `active` is the visual + aria-current state.
 */
export const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(
  function SidebarItem(
    {
      active,
      icon,
      badge,
      children,
      nested,
      expanded = true,
      href,
      className,
      ...rest
    },
    ref,
  ) {
    const shared = {
      className: cn("ease-sidebar-item", className),
      "data-ease-sidebar": "item" as const,
      "data-active": active ? ("true" as const) : undefined,
      "data-expanded": expanded ? ("true" as const) : ("false" as const),
      "aria-current": active ? ("page" as const) : undefined,
      ...rest,
    };
    const row = (
      <>
        {icon ? <span data-ease-sidebar="item-icon">{icon}</span> : null}
        <span data-ease-sidebar="item-label">{children}</span>
        {badge ? <span data-ease-sidebar="badge">{badge}</span> : null}
      </>
    );
    return (
      <>
        {href ? (
          <a
            ref={ref as never}
            href={href}
            {...(shared as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {row}
          </a>
        ) : (
          <button ref={ref as never} type="button" {...shared}>
            {row}
          </button>
        )}
        {nested && expanded ? (
          <div data-ease-sidebar="children">{nested}</div>
        ) : null}
      </>
    );
  },
);

export interface SidebarProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /** Icon-only mode; hides labels and badges. */
  collapsed?: boolean;
  /** Label rendered at the top. */
  title?: ReactNode;
}

/**
 * Structured side navigation. The consuming app decides width/collapse; on
 * small screens the AppShell (layout) turns this into a drawer automatically.
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { collapsed, title, className, children, ...rest },
  ref,
) {
  return (
    <aside
      ref={ref as never}
      className={cn("ease-sidebar", className)}
      data-ease="sidebar"
      data-collapsed={collapsed ? "true" : undefined}
      {...rest}
    >
      {title ? (
        <div
          style={{
            padding: "var(--ease-spacing-3) var(--ease-spacing-2)",
            fontSize: "var(--ease-font-size-xs)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "var(--ease-color-text-subtle)",
          }}
        >
          {title}
        </div>
      ) : null}
      {children}
    </aside>
  );
});

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  function SidebarSection({ label, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={className}
        data-ease-sidebar="section"
        {...rest}
      >
        {label ? <div data-ease-sidebar="section-label">{label}</div> : null}
        {children}
      </div>
    );
  },
);
