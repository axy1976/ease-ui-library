"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "light" | "dark" | "system";

interface ThemeContextValue {
  /** The user's stored preference. */
  preference: ThemePreference;
  /** The resolved theme actually applied to the document. */
  resolved: "light" | "dark";
  setTheme: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ease-ui-theme";

function resolve(preference: ThemePreference): "light" | "dark" {
  if (preference === "system") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }
  return preference;
}

/**
 * Optional theming helper. It sets `data-ease-theme` on <html> and persists
 * the choice to localStorage. The CSS in themes.css does all of the actual
 * work, so the library is fully themeable without this provider — use it only
 * when you want a programmatic switch (e.g. a navbar toggle).
 */
export function EaseProvider({
  theme = "system",
  children,
}: {
  theme?: ThemePreference;
  children: ReactNode;
}) {
  const [preference, setPreference] = useState<ThemePreference>(theme);
  const [resolved, setResolved] = useState<"light" | "dark">(() =>
    typeof window !== "undefined" ? resolve(theme) : "light",
  );

  // Read any persisted preference once, before first paint of the switch.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        STORAGE_KEY,
      ) as ThemePreference | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        setPreference(stored);
      }
    } catch {
      /* storage unavailable (SSR/privacy mode) — fall back to the prop */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (preference === "system") {
      root.removeAttribute("data-ease-theme");
    } else {
      root.setAttribute("data-ease-theme", preference);
    }
    setResolved(resolve(preference));
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      /* ignore */
    }
  }, [preference]);

  // Follow OS changes while in system mode.
  useEffect(() => {
    if (preference !== "system" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setResolved(mql.matches ? "dark" : "light");
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [preference]);

  const setTheme = useCallback(
    (next: ThemePreference) => setPreference(next),
    [],
  );

  return (
    <ThemeContext.Provider value={{ preference, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  return (
    ctx ?? {
      preference: "system" as ThemePreference,
      resolved: "light" as const,
      setTheme: () => {},
    }
  );
}

/** Small ready-made light/dark/system toggle for the navbar. */
export function ThemeToggle() {
  const { preference, setTheme } = useTheme();
  const options: ThemePreference[] = ["light", "system", "dark"];
  const next =
    options[(options.indexOf(preference) + 1) % options.length] ?? "system";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch theme (currently ${preference})`}
      data-ease="icon-button"
      data-size="sm"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--ease-control-height-sm)",
        height: "var(--ease-control-height-sm)",
        border: "1px solid var(--ease-color-border)",
        borderRadius: "var(--ease-radius-md)",
        background: "var(--ease-color-surface)",
        color: "var(--ease-color-text-muted)",
        cursor: "pointer",
        fontSize: 12,
      }}
    >
      {preference === "light" ? "☀" : preference === "dark" ? "☾" : "◐"}
    </button>
  );
}
