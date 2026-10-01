"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Portal, useFocusTrap, useBodyScrollLock } from "../../utils/client";
import { SearchIcon, CloseIcon } from "../../icons";
import { IconButton } from "../button/icon-button";

interface CommandContext {
  close: () => void;
  highlighted: number;
  setHighlighted: (i: number) => void;
  itemRefs: React.RefObject<(HTMLButtonElement | null)[]>;
}

const CommandContext = createContext<CommandContext | null>(null);

export interface CommandItem {
  id: string;
  label: string;
  keywords?: string[];
  icon?: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  title?: string;
}

/**
 * Modal command palette: search input + filtered list, navigable with
 * ↑/↓, activatable with Enter, closable with Esc. Open it with Ctrl/⌘+K from
 * the consuming app; the component itself only handles the open state.
 */
export function CommandMenu({
  open,
  onClose,
  items,
  placeholder = "Type a command…",
  title,
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useFocusTrap(contentRef, open);
  useBodyScrollLock(open);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
      inputRef.current?.focus();
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const haystack = [item.label, ...(item.keywords ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query]);

  useEffect(() => {
    if (highlighted >= filtered.length)
      setHighlighted(Math.max(0, filtered.length - 1));
  }, [filtered.length, highlighted]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const target = Math.min(filtered.length - 1, highlighted + 1);
        setHighlighted(target);
        itemRefs.current[target]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const target = Math.max(0, highlighted - 1);
        setHighlighted(target);
        itemRefs.current[target]?.focus();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[highlighted];
        if (item && !item.disabled) {
          item.onSelect();
          onClose();
        }
      }
    }
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, filtered, highlighted, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <CommandContext.Provider
        value={{ close: onClose, highlighted, setHighlighted, itemRefs }}
      >
        <div
          data-ease="overlay-backdrop"
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        />
        <div data-ease="command-menu">
          <div
            ref={contentRef}
            data-ease-command="content"
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Command menu"}
          >
            <div data-ease-command="input">
              <SearchIcon size={16} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlighted(0);
                }}
                placeholder={placeholder}
                aria-label="Search commands"
              />
              <IconButton
                size="sm"
                aria-label="Close command menu"
                onClick={onClose}
              >
                <CloseIcon size={14} />
              </IconButton>
            </div>
            <div data-ease-command="list" role="listbox" aria-label="Commands">
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: "var(--ease-spacing-4)",
                    color: "var(--ease-color-text-muted)",
                    fontSize: "var(--ease-font-size-sm)",
                  }}
                >
                  No results for “{query}”
                </div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={i === highlighted}
                    data-ease-command="item"
                    data-highlighted={i === highlighted ? "true" : undefined}
                    data-index={i}
                    disabled={item.disabled}
                    onMouseEnter={() => setHighlighted(i)}
                    onFocus={() => setHighlighted(i)}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onSelect();
                        onClose();
                      }
                    }}
                  >
                    {item.icon ? (
                      <span aria-hidden="true">{item.icon}</span>
                    ) : null}
                    {item.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </CommandContext.Provider>
    </Portal>
  );
}
