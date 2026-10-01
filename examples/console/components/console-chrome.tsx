"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  AppShell,
  Sidebar,
  SidebarItem,
  SidebarSection,
  SearchInput,
  Avatar,
  ThemeToggle,
} from "ease-ui";
import { SettingsIcon, MenuIcon } from "ease-ui/icons";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: <GridIcon /> },
  { href: "/resources", label: "Resources", icon: <SettingsIcon size={16} /> },
  {
    href: "/deployments",
    label: "Deployments",
    icon: <SettingsIcon size={16} />,
  },
  { href: "/settings", label: "Settings", icon: <SettingsIcon size={16} /> },
];

function GridIcon() {
  return <MenuIcon size={16} />;
}

function SidebarNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  return (
    <Sidebar title="Console">
      <SidebarSection label="Main">
        {NAV.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            active={isActive(item.href)}
            icon={item.icon}
          >
            {item.label}
          </SidebarItem>
        ))}
      </SidebarSection>
    </Sidebar>
  );
}

export function ConsoleChrome({ children }: { children: ReactNode }) {
  return (
    <AppShell
      brand={
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--ease-spacing-2)",
            color: "var(--ease-color-text)",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: "var(--ease-radius-sm)",
              background: "var(--ease-color-primary)",
              color: "var(--ease-color-on-primary)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            E
          </span>
          <strong style={{ fontSize: "var(--ease-font-size-md)" }}>
            Ease Console
          </strong>
        </Link>
      }
      navContent={
        <SearchInput
          placeholder="Search resources…"
          aria-label="Search resources"
          style={{ maxWidth: 320 }}
        />
      }
      navActions={
        <>
          <ThemeToggle />
          <Avatar name="Ada Lovelace" />
        </>
      }
      sidebar={<SidebarNav />}
    >
      {children}
    </AppShell>
  );
}
