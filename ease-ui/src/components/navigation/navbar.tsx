import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Brand / product identity, shown at the start. */
  brand?: ReactNode;
  /** Fills the space between brand and actions. */
  children?: ReactNode;
  /** Right-hand controls (search, theme toggle, account). */
  actions?: ReactNode;
}

/**
 * Compact top bar. Sticky by default so global actions remain reachable on
 * long pages. On narrow widths the AppShell overlays it with a menu button.
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { brand, actions, className, children, ...rest },
  ref,
) {
  return (
    <header
      ref={ref as never}
      className={cn("ease-navbar", className)}
      data-ease="navbar"
      {...rest}
    >
      {brand ? <span data-ease-navbar="brand">{brand}</span> : null}
      {children ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ease-spacing-3)",
            minWidth: 0,
          }}
        >
          {children}
        </div>
      ) : null}
      <span data-ease-navbar="spacer" />
      {actions ? <span data-ease-navbar="actions">{actions}</span> : null}
    </header>
  );
});
