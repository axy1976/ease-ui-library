"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../utils";

export type TabsVariant = "line" | "pills";

interface TabsContextValue {
  value: string | null;
  setValue: (v: string) => void;
  baseId: string;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  className?: string;
  children: ReactNode;
}

/**
 * Accessible tab pattern. Controlled when `value` is passed, uncontrolled
 * otherwise. Handles roving tabindex and full keyboard navigation:
 *  ←/→ move, Home/End jump, and the active tab is the only one in the tab order.
 */
export function Tabs({
  value,
  defaultValue = null,
  onValueChange,
  variant = "line",
  children,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const baseId = useId();

  function setValue(v: string) {
    setInternal(v);
    onValueChange?.(v);
  }

  return (
    <TabsContext.Provider value={{ value: current, setValue, baseId, variant }}>
      {children}
    </TabsContext.Provider>
  );
}

export interface TabProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled, className, children, ...rest },
  ref,
) {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!ctx) return;
    const tabList = e.currentTarget.closest('[role="tablist"]');
    if (!tabList) return;
    const tabs = Array.from(
      tabList.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ),
    );
    const index = tabs.indexOf(e.currentTarget);
    const wrap = (n: number) => (n + tabs.length) % tabs.length;
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      nextIndex = wrap(index + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      nextIndex = wrap(index - 1);
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = tabs.length - 1;
    else return;
    e.preventDefault();
    const next = tabs[nextIndex];
    if (!next) return;
    next.focus();
    const nextValue = next.dataset.tabValue ?? value;
    ctx.setValue(nextValue);
  }

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      data-tab-value={value}
      id={ctx ? `${ctx.baseId}-tab-${value}` : undefined}
      aria-selected={active}
      aria-controls={ctx ? `${ctx.baseId}-panel-${value}` : undefined}
      tabIndex={active ? 0 : -1}
      disabled={disabled}
      data-ease="tab"
      data-state={active ? "active" : undefined}
      data-disabled={disabled ? "true" : undefined}
      className={className}
      onClick={() => ctx?.setValue(value)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </button>
  );
});

export const TabList = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string }
>(function TabList({ children, className }, ref) {
  const ctx = useContext(TabsContext);
  return (
    <div
      ref={ref}
      role="tablist"
      className={cn("ease-tabs", className)}
      data-ease="tabs"
      data-variant={ctx?.variant === "pills" ? "pills" : undefined}
      // Arrow-key handling is delegated to the individual tabs (see
      // handleTabKey) so focus lands on the newly activated tab.
    >
      {children}
    </div>
  );
});

export interface TabPanelProps {
  value: string;
  className?: string;
  children?: ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel({ value, className, children }, ref) {
    const ctx = useContext(TabsContext);
    const active = ctx?.value === value;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={ctx ? `${ctx.baseId}-panel-${value}` : undefined}
        aria-labelledby={ctx ? `${ctx.baseId}-tab-${value}` : undefined}
        tabIndex={0}
        data-ease="tab-panel"
        data-state={active ? "active" : "inactive"}
        className={className}
      >
        {children}
      </div>
    );
  },
);
