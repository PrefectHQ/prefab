/**
 * Combobox — searchable select built on Popover + filtered list.
 *
 * Uses `cn-combobox-*` classes from the v4 stylesheet. No cmdk dependency —
 * filtering is done in-component via simple string matching.
 */

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/ui/popover";
import { Input } from "@/ui/input";

interface ComboboxItemData {
  value: string;
  label: string;
  disabled?: boolean;
}

interface PrefabComboboxProps {
  placeholder?: string;
  searchPlaceholder?: string;
  name?: string;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  _items?: ComboboxItemData[];
}

export function PrefabCombobox({
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  disabled,
  value,
  onValueChange,
  className,
  _items = [],
}: PrefabComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!search) return _items;
    const lower = search.toLowerCase();
    return _items.filter((item) => item.label.toLowerCase().includes(lower));
  }, [_items, search]);

  const selectedLabel = _items.find((i) => i.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "cn-combobox-trigger w-[240px] justify-between font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          {selectedLabel ?? placeholder}
          <ChevronsUpDown className="cn-combobox-trigger-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="cn-combobox-content w-[240px] p-0"
        align="start"
      >
        <div className="p-2">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
        </div>
        <div
          className="cn-combobox-list"
          data-empty={filtered.length === 0 ? "" : undefined}
          role="listbox"
        >
          {filtered.map((item) => (
            <div
              key={item.value}
              role="option"
              aria-selected={value === item.value}
              aria-disabled={item.disabled}
              data-highlighted={undefined}
              className={cn(
                "cn-combobox-item relative flex cursor-pointer select-none items-center",
                item.disabled && "pointer-events-none opacity-50",
              )}
              onMouseEnter={(e) =>
                e.currentTarget.setAttribute("data-highlighted", "")
              }
              onMouseLeave={(e) =>
                e.currentTarget.removeAttribute("data-highlighted")
              }
              onClick={() => {
                if (item.disabled) return;
                onValueChange?.(item.value === value ? "" : item.value);
                setOpen(false);
                setSearch("");
              }}
            >
              <span className="cn-combobox-item-text">{item.label}</span>
              {value === item.value && (
                <span className="cn-combobox-item-indicator">
                  <Check className="size-4" />
                </span>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
