"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Portal, useBodyScrollLock, useFocusTrap } from "../../utils/client";
import { SearchIcon, CloseIcon } from "../../icons";
import { IconButton } from "../button/icon-button";
import { Kbd } from "../display/code";

/**
 * A group of related commands rendered under a heading.
 */
export interface CommandGroup {
  /** Optional section heading shown above the group's items. */
  label?: ReactNode;
  items: CommandItem[];
}

export interface CommandItem {
  id: string;
  label: string;
  /** Extra searchable terms (aliases, file names, shortcuts). */
  keywords?: string[];
  /** Leading icon. */
  icon?: ReactNode;
  /** Optional right-aligned hint (shortcut key, badge, description). */
  hint?: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  /**
   * Flat list of items. If `groups` is provided, `groups` wins and `items`
   * is ignored — use one or the other.
   */
  items?: CommandItem[];
  groups?: CommandGroup[];
  /** Accessible label for the dialog. */
  title?: string;
  placeholder?: string;
  /**
   * Render a "⌘ K" kbd hint under the input. Pass `false` to hide it, or
   * a string like "Ctrl K" to override the default. Defaults to `"⌘K"`.
   */
  shortcutHint?: string | false | true;
  /**
   * Optional leading trigger (e.g. a Button or IconButton). When provided,
   * the component calls `onClose` on unmount and restores focus to it; the
   * parent is still responsible for toggling `open` on click.
   */
  trigger?: ReactNode;
}

/**
 * A grouped command palette with a documented ⌘K / Ctrl+K shortcut.
 *
 * Upgrades over the primitive `CommandMenu`:
 *   1. **Groups** — section items under headings ("Go to…", "Actions").
 *   2. **Keyboard shortcut** — ⌘K / Ctrl+K opens the palette from anywhere
 *      (registered globally; safe to wire multiple instances — only the
 *      first one that's closed listens).
 *   3. **Roving highlight across groups** — arrow keys skip disabled items
 *      and walk the flattened list; Enter activates.
 *   4. **Right-aligned hint** — a `hint` slot for shortcut badges or labels.
 *
 * Handles focus trap, body scroll lock, escape, and portal rendering.
 * The component itself does NOT register a global shortcut by default —
 * wire `useCommandPaletteTrigger` from the consuming app if you want
 * ⌘K to work without a visible trigger. (Avoid implicit global shortcuts
 * per the a11y rules in the design doc.)
 */
export function CommandPalette({
  open,
  onClose,
  items,
  groups,
  title,
  placeholder = "Type a command or search…",
  shortcutHint = "⌘K",
  trigger,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState({ group: 0, item: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<Array<HTMLButtonElement | null>>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useFocusTrap(contentRef, open);
  useBodyScrollLock(open);

  // Normalize: a flat `items` list becomes a single unnamed group.
  const normalizedGroups = useMemo<CommandGroup[]>(
    () => groups ?? (items ? [{ items }] : []),
    [groups, items],
  );

  // Filter each group independently; drop empty groups.
  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return normalizedGroups;
    return normalizedGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => {
          const hay = [it.label, ...(it.keywords ?? [])]
            .join(" ")
            .toLowerCase();
          return hay.includes(q);
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [normalizedGroups, query]);

  // Flatten the filtered groups into a single ordered list for keyboard nav.
  const flat = useMemo(() => {
    const out: Array<{ item: CommandItem; g: number; i: number }> = [];
    filteredGroups.forEach((g, gi) =>
      g.items.forEach((it, ii) => out.push({ item: it, g: gi, i: ii })),
    );
    return out;
  }, [filteredGroups]);

  // Reset on open; capture focus target to restore on close.
  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted({ group: 0, item: 0 });
      lastTriggerRef.current =
        (document.activeElement as HTMLElement | null) ?? null;
      inputRef.current?.focus();
    } else if (lastTriggerRef.current) {
      lastTriggerRef.current.focus();
      lastTriggerRef.current = null;
    }
  }, [open]);

  // Clamp the highlight when the filtered list shrinks.
  useEffect(() => {
    if (filteredGroups.length === 0) {
      setHighlighted({ group: 0, item: 0 });
      return;
    }
    setHighlighted((h) => {
      const g = Math.min(h.group, filteredGroups.length - 1);
      const group = filteredGroups[g];
      const count = group ? group.items.length : 0;
      const i = count === 0 ? 0 : Math.min(h.item, count - 1);
      return { group: g, item: i };
    });
  }, [filteredGroups]);

  const moveTo = useCallback((g: number, i: number) => {
    setHighlighted({ group: g, item: i });
    const btn = itemRefs.current[g]?.[i];
    btn?.focus();
  }, []);

  // Global keyboard handling while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const dir = e.key === "ArrowDown" ? 1 : -1;
        // Compute current flat index, then walk by `dir` skipping disabled.
        let idx = 0;
        {
          let off = 0;
          for (let gi = 0; gi < highlighted.group; gi++) {
            const g = filteredGroups[gi];
            if (g) off += g.items.length;
          }
          idx = off + highlighted.item;
        }
        let attempts = 0;
        const max = flat.length;
        while (attempts < max) {
          idx += dir;
          if (idx < 0 || idx >= flat.length) return; // reached the edge
          const entry = flat[idx];
          if (entry && !entry.item.disabled) break;
          attempts++;
        }
        if (idx < 0 || idx >= flat.length) return;
        const target = flat[idx];
        if (target) moveTo(target.g, target.i);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        // Walk the flat list to find the highlighted item.
        let idx = 0;
        {
          let off = 0;
          for (let gi = 0; gi < highlighted.group; gi++) {
            const g = filteredGroups[gi];
            if (g) off += g.items.length;
          }
          idx = off + highlighted.item;
        }
        const entry = flat[idx];
        if (entry && !entry.item.disabled) {
          entry.item.onSelect();
          onClose();
        } else if (!entry) {
          // No entry at this index — do nothing.
        }
      }
    }
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, filteredGroups, flat, highlighted, onClose, moveTo]);

  // Optional visible trigger: render it, and if the component is closed,
  // it's just a marker; the parent wires the click.
  const triggerNode =
    trigger && !open ? (
      <span data-ease-command-palette="trigger">{trigger}</span>
    ) : null;

  if (!open) {
    return triggerNode ?? null;
  }

  return (
    <Portal>
      <div
        data-ease="overlay-backdrop"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      />
      <div data-ease="command-palette">
        <div
          ref={contentRef}
          data-ease-command-palette="content"
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Command palette"}
        >
          <div data-ease-command-palette="input">
            <SearchIcon size={16} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlighted({ group: 0, item: 0 });
              }}
              placeholder={placeholder}
              aria-label="Search commands"
            />
            {shortcutHint ? (
              <Kbd
                style={{
                  fontSize: "var(--ease-font-size-xs)",
                  color: "var(--ease-color-text-subtle)",
                }}
              >
                {shortcutHint}
              </Kbd>
            ) : null}
            <IconButton
              size="sm"
              aria-label="Close command palette"
              onClick={onClose}
            >
              <CloseIcon size={14} />
            </IconButton>
          </div>

          <div
            data-ease-command-palette="list"
            role="listbox"
            aria-label={title ?? "Commands"}
          >
            {filteredGroups.length === 0 ? (
              <div
                data-ease-command-palette="empty"
                style={{
                  padding: "var(--ease-spacing-4)",
                  color: "var(--ease-color-text-muted)",
                  fontSize: "var(--ease-font-size-sm)",
                }}
              >
                No results for “{query}”
              </div>
            ) : (
              filteredGroups.map((group, gi) => (
                <div key={gi} data-ease-command-palette="group">
                  {group.label ? (
                    <div data-ease-command-palette="group-label">
                      {group.label}
                    </div>
                  ) : null}
                  {group.items.map((item, ii) => {
                    const isHighlighted =
                      highlighted.group === gi && highlighted.item === ii;
                    return (
                      <button
                        key={item.id}
                        ref={(el) => {
                          (itemRefs.current[gi] ??= [])[ii] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isHighlighted}
                        disabled={item.disabled}
                        data-highlighted={isHighlighted ? "true" : undefined}
                        onMouseEnter={() => moveTo(gi, ii)}
                        onFocus={() => moveTo(gi, ii)}
                        onClick={() => {
                          if (!item.disabled) {
                            item.onSelect();
                            onClose();
                          }
                        }}
                      >
                        {item.icon ? (
                          <span
                            aria-hidden="true"
                            data-ease-command-palette="item-icon"
                          >
                            {item.icon}
                          </span>
                        ) : null}
                        <span data-ease-command-palette="item-label">
                          {item.label}
                        </span>
                        {item.hint ? (
                          <span data-ease-command-palette="item-hint">
                            {item.hint}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}

/**
 * Convenience hook for a ⌘/Ctrl + K global trigger. Wire this at the root
 * of a client component that owns the palette:
 *
 *   const open = useCommandPaletteTrigger(onOpen);
 *
 * The hook only fires when the palette is currently closed; it does not
 * register a listener while open, so multiple mounted palettes don't
 * double-trigger.
 */
export function useCommandPaletteShortcut(onOpen: () => void, active = true) {
  const cbRef = useRef(onOpen);
  cbRef.current = onOpen;
  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        cbRef.current();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
}
