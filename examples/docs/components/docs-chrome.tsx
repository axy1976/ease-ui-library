"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  AppShell,
  Sidebar,
  SidebarItem,
  SidebarSection,
  SearchInput,
  ThemeToggle,
  Badge,
} from "ease-ui";
import { MenuIcon } from "ease-ui/icons";
import { docsSections, searchEntries } from "@/lib/nav";

function matches(entry: (typeof searchEntries)[number], q: string) {
  if (!q) return false;
  const needle = q.toLowerCase();
  return (
    entry.title.toLowerCase().includes(needle) ||
    entry.summary.toLowerCase().includes(needle) ||
    entry.keywords.some((k) => k.toLowerCase().includes(needle))
  );
}

export function DocsChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => (query ? searchEntries.filter((e) => matches(e, query)) : []),
    [query],
  );

  const brand = (
    <Link
      href="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--ease-spacing-2)",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "var(--ease-radius-sm)",
          background: "var(--ease-color-primary)",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
        }}
        aria-hidden="true"
      >
        E
      </span>
      <span
        style={{
          color: "var(--ease-color-text)",
          fontWeight: 600,
          fontSize: "var(--ease-font-size-sm)",
        }}
      >
        Ease UI
      </span>
    </Link>
  );

  const navContent = (
    <>
      <div style={{ position: "relative", maxWidth: 360, flex: 1 }}>
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components… (try “dialog”)"
          aria-label="Search documentation"
        />
        {query ? (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              insetInlineStart: 0,
              insetInlineEnd: 0,
              background: "var(--ease-color-surface)",
              border: "1px solid var(--ease-color-border)",
              borderRadius: "var(--ease-radius-md)",
              boxShadow: "var(--ease-shadow-md)",
              zIndex: 50,
              overflow: "hidden",
              maxHeight: 320,
              overflowY: "auto",
            }}
          >
            {results.length === 0 ? (
              <div
                style={{
                  padding: "var(--ease-spacing-3)",
                  color: "var(--ease-color-text-muted)",
                  fontSize: "var(--ease-font-size-sm)",
                }}
              >
                No matches for “{query}”.
              </div>
            ) : (
              results.map((r) => (
                <Link
                  key={r.id}
                  href={r.href}
                  onClick={() => setQuery("")}
                  style={{
                    display: "block",
                    padding: "var(--ease-spacing-2) var(--ease-spacing-3)",
                    borderBottom: "1px solid var(--ease-color-border)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--ease-spacing-2)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--ease-color-text)",
                        fontWeight: 500,
                        fontSize: "var(--ease-font-size-sm)",
                      }}
                    >
                      {r.title}
                    </span>
                    <Badge status="neutral">{r.category}</Badge>
                  </div>
                  <div
                    style={{
                      color: "var(--ease-color-text-muted)",
                      fontSize: "var(--ease-font-size-xs)",
                      marginTop: 2,
                    }}
                  >
                    {r.summary}
                  </div>
                </Link>
              ))
            )}
          </div>
        ) : null}
      </div>
    </>
  );

  const navActions = <ThemeToggle />;

  const sidebar = (
    <Sidebar aria-label="Documentation">
      {docsSections.map((section) => (
        <SidebarSection key={section.title} label={section.title}>
          {section.items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              active={
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
              }
              icon={
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 9999,
                    display: "inline-block",
                    background: "var(--ease-color-border-strong)",
                  }}
                  aria-hidden="true"
                />
              }
            >
              {item.title}
            </SidebarItem>
          ))}
        </SidebarSection>
      ))}
    </Sidebar>
  );

  return (
    <AppShell
      brand={brand}
      navContent={navContent}
      navActions={navActions}
      sidebar={sidebar}
    >
      {children}
    </AppShell>
  );
}
