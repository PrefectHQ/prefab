/**
 * Combobox — searchable select built on Base UI's Combobox primitive.
 *
 * Uses `cn-combobox-*` classes from the v4 stylesheet.
 * Supports groups, labels, separators, side/align positioning, and invalid state.
 */

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "../portal-container";

interface ComboboxItemData {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboboxGroupData {
  label?: string;
  items: ComboboxItemData[];
}

interface PrefabComboboxProps {
  placeholder?: string;
  searchPlaceholder?: string;
  name?: string;
  disabled?: boolean;
  value?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  invalid?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
  _items?: ComboboxItemData[];
  _groups?: ComboboxGroupData[];
  _separatorIndices?: number[];
}

function ComboboxItem({ item }: { item: ComboboxItemData }) {
  return (
    <ComboboxPrimitive.Item
      value={item.value}
      disabled={item.disabled}
      className={cn(
        "cn-combobox-item relative flex cursor-pointer select-none items-center",
        item.disabled && "pointer-events-none opacity-50",
      )}
    >
      <span className="cn-combobox-item-text">{item.label}</span>
      <ComboboxPrimitive.ItemIndicator className="cn-combobox-item-indicator">
        <Check className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

export function PrefabCombobox({
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  disabled,
  value,
  side = "bottom",
  align = "start",
  invalid = false,
  onValueChange,
  className,
  _items = [],
  _groups = [],
  _separatorIndices = [],
}: PrefabComboboxProps) {
  const container = usePortalContainer();
  const hasGroups = _groups.length > 0;

  // Collect all items (flat + from groups) for finding selected label
  const allItems = React.useMemo(() => {
    if (hasGroups) {
      return _groups.flatMap((g) => g.items);
    }
    return _items;
  }, [_items, _groups, hasGroups]);

  const selectedLabel = allItems.find((i) => i.value === value)?.label;

  // Build the separator index set for flat items
  const separatorSet = React.useMemo(
    () => new Set(_separatorIndices),
    [_separatorIndices],
  );

  return (
    <ComboboxPrimitive.Root
      value={value ?? null}
      onValueChange={(newValue: string | null) => {
        onValueChange?.(newValue ?? "");
      }}
      disabled={disabled}
    >
      <ComboboxPrimitive.Trigger
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className={cn(
          "cn-button cn-button-variant-outline cn-button-size-default cn-combobox-trigger w-full justify-between font-normal",
          !value && "text-muted-foreground",
          invalid &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className,
        )}
      >
        {selectedLabel ?? placeholder}
        <ChevronsUpDown className="cn-combobox-trigger-icon" />
      </ComboboxPrimitive.Trigger>

      <ComboboxPrimitive.Portal container={container}>
        <ComboboxPrimitive.Positioner
          side={side}
          sideOffset={4}
          align={align}
          className="isolate z-50"
        >
          <ComboboxPrimitive.Popup className="cn-combobox-content group/combobox-content p-0">
            <ComboboxPrimitive.Input
              placeholder={searchPlaceholder}
              className="cn-input h-8 m-1 mb-0 w-[calc(100%-0.5rem)] border bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <ComboboxPrimitive.List className="cn-combobox-list">
              {hasGroups
                ? _groups.map((group, gi) => (
                    <React.Fragment key={gi}>
                      {gi > 0 && (
                        <ComboboxPrimitive.Separator className="cn-combobox-separator" />
                      )}
                      <ComboboxPrimitive.Group>
                        {group.label && (
                          <ComboboxPrimitive.GroupLabel className="cn-combobox-label">
                            {group.label}
                          </ComboboxPrimitive.GroupLabel>
                        )}
                        {group.items.map((item) => (
                          <ComboboxItem key={item.value} item={item} />
                        ))}
                      </ComboboxPrimitive.Group>
                    </React.Fragment>
                  ))
                : _items.map((item, idx) => (
                    <React.Fragment key={item.value}>
                      {separatorSet.has(idx) && (
                        <ComboboxPrimitive.Separator className="cn-combobox-separator" />
                      )}
                      <ComboboxItem item={item} />
                    </React.Fragment>
                  ))}
            </ComboboxPrimitive.List>
            <ComboboxPrimitive.Empty className="cn-combobox-empty">
              No results found.
            </ComboboxPrimitive.Empty>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}
