"use client";

import {
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import { useMediaQuery, useBodyScrollLock } from "../../utils/client";
import { Navbar } from "../navigation/navbar";
import { Sidebar } from "../navigation/sidebar";
import { IconButton } from "../button/icon-button";
import { MenuIcon } from "../../icons";

export interface AppShellProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  brand?: ReactNode;
  /** Top bar content (search, etc.) between brand and actions. */
  navContent?: ReactNode;
  navActions?: ReactNode;
  /** Sidebar content. */
  sidebar?: ReactNode;
  /** Mobile sidebar behavior. */
  onSidebarToggle?: (open: boolean) => void;
  children: ReactNode;
}

const MOBILE = "(max-width: 767px)";

/**
 * Console frame: compact top nav + structured side nav + content column.
 * On mobile the sidebar becomes an off-canvas drawer with a scrim; desktop
 * keeps it persistent. This is the chrome every Ease UI example page uses.
 */
export function AppShell({
  brand,
  navContent,
  navActions,
  sidebar,
  onSidebarToggle,
  className,
  children,
  ...rest
}: AppShellProps) {
  const isMobile = useMediaQuery(MOBILE, false);
  const [open, setOpen] = useState(false);
  useBodyScrollLock(isMobile && open);

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  function toggle() {
    const next = !open;
    setOpen(next);
    onSidebarToggle?.(next);
  }

  return (
    <div
      className={cn("ease-app-shell", className)}
      data-ease="app-shell"
      data-mobile-sidebar-open={isMobile && open ? "true" : undefined}
      {...rest}
    >
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar
          brand={
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--ease-spacing-2)",
              }}
            >
              {isMobile ? (
                <IconButton
                  aria-label="Toggle navigation"
                  size="sm"
                  onClick={toggle}
                >
                  <MenuIcon size={16} />
                </IconButton>
              ) : null}
              {brand ?? <strong>Console</strong>}
            </span>
          }
          actions={navActions}
        >
          {navContent}
        </Navbar>
        <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
          {sidebar ? (
            <Sidebar data-mobile={isMobile ? "true" : undefined}>
              {sidebar}
            </Sidebar>
          ) : null}
          <div data-ease-app-shell="main" style={{ flex: 1, minWidth: 0 }}>
            {children}
          </div>
          {isMobile && open ? (
            <div
              data-ease-app-shell="backdrop"
              aria-hidden="true"
              onClick={toggle}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
