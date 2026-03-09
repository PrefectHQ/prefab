/**
 * Combobox — searchable select built on Base UI's Combobox primitive.
 *
 * Uses manual filtering (tracking input value + filtering items ourselves)
 * rather than Base UI's data-driven Collection pattern, because Collection
 * doesn't support static separators or manually-structured groups.
 *
 * Shadow DOM note: Base UI's outside-click detection doesn't work inside
 * shadow DOM (event retargeting), so we manage open state ourselves and
 * add a manual backdrop for click-outside dismissal — same pattern as Select.
 */

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Separator } from "@base-ui/react/separator";
import { ChevronsUpDown } from "lucide-react";
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

function ComboboxItemRow({ item }: { item: ComboboxItemData }) {
  return (
    <ComboboxPrimitive.Item
      value={item.value}
      disabled={item.disabled}
      className={cn(
        "cn-combobox-item relative flex cursor-pointer select-none items-center",
        item.disabled && "pointer-events-none opacity-50",
      )}
    >
      {item.label}
    </ComboboxPrimitive.Item>
  );
}

/** Case-insensitive substring match. */
function matchesQuery(label: string, query: string): boolean {
  if (!query) return true;
  return label.toLowerCase().includes(query.toLowerCase());
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

  // Controlled open state for shadow DOM compatibility
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  // In shadow DOM, Base UI fires spurious close events from 'outside-press'
  // and 'focus-out' due to event retargeting. We suppress those and handle
  // outside-click dismissal ourselves via a manual backdrop.
  const SUPPRESSED_CLOSE_REASONS = new Set(["outside-press", "focus-out"]);

  const handleOpenChange = (
    nextOpen: boolean,
    eventDetails: ComboboxPrimitive.Root.ChangeEventDetails,
  ) => {
    if (!nextOpen && SUPPRESSED_CLOSE_REASONS.has(eventDetails.reason)) {
      return;
    }
    setOpen(nextOpen);
    if (!nextOpen) {
      setInputValue("");
    }
  };

  // Collect all items for label lookup
  const allItems = React.useMemo(() => {
    if (hasGroups) {
      return _groups.flatMap((g) => g.items);
    }
    return _items;
  }, [_items, _groups, hasGroups]);

  const selectedLabel = allItems.find((i) => i.value === value)?.label;

  // Filter items based on search input
  const filteredItems = React.useMemo(
    () => _items.filter((item) => matchesQuery(item.label, inputValue)),
    [_items, inputValue],
  );

  const filteredGroups = React.useMemo(
    () =>
      _groups
        .map((g) => ({
          ...g,
          items: g.items.filter((item) => matchesQuery(item.label, inputValue)),
        }))
        .filter((g) => g.items.length > 0),
    [_groups, inputValue],
  );

  const hasResults = hasGroups
    ? filteredGroups.length > 0
    : filteredItems.length > 0;

  // Build separator index set for flat items
  const separatorSet = React.useMemo(
    () => new Set(_separatorIndices),
    [_separatorIndices],
  );

  return (
    <ComboboxPrimitive.Root
      open={open}
      onOpenChange={handleOpenChange}
      value={value ?? null}
      onValueChange={(newValue: string | null) => {
        onValueChange?.(newValue ?? "");
      }}
      onInputValueChange={(val: string) => {
        setInputValue(val);
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
        {/* Manual backdrop for shadow DOM click-outside */}
        {open && (
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
        )}
        <ComboboxPrimitive.Positioner
          side={side}
          sideOffset={4}
          align={align}
          className="isolate z-50"
        >
          <ComboboxPrimitive.Popup className="cn-combobox-content group/combobox-content min-w-(--anchor-width) p-0">
            <ComboboxPrimitive.Input
              placeholder={searchPlaceholder}
              className="cn-input h-8 m-1 mb-0 w-[calc(100%-0.5rem)] border bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="cn-combobox-list">
              {hasGroups
                ? filteredGroups.map((group, gi) => (
                    <React.Fragment key={gi}>
                      {gi > 0 && (
                        <Separator className="cn-combobox-separator" />
                      )}
                      <div>
                        {group.label && (
                          <div className="cn-combobox-label">{group.label}</div>
                        )}
                        {group.items.map((item) => (
                          <ComboboxItemRow key={item.value} item={item} />
                        ))}
                      </div>
                    </React.Fragment>
                  ))
                : filteredItems.map((item) => {
                    // Find original index for separator lookup
                    const origIdx = _items.indexOf(item);
                    return (
                      <React.Fragment key={item.value}>
                        {separatorSet.has(origIdx) && (
                          <Separator className="cn-combobox-separator" />
                        )}
                        <ComboboxItemRow item={item} />
                      </React.Fragment>
                    );
                  })}
              {!hasResults && (
                <div className="w-full py-2 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              )}
            </div>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}
