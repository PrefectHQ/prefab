/**
 * Compound component wrappers — bridge Python's flat API to shadcn's
 * multi-part compound components (Tabs, Accordion, Pages, etc.).
 *
 * These components receive pre-rendered React children and decompose
 * them into the proper shadcn structure. The renderer handles the
 * special-casing: instead of recursively rendering children normally,
 * it passes the raw ComponentNode children as `_childNodes` so the
 * wrapper can extract metadata (title, value, disabled) and render
 * the compound parts (triggers + content panels).
 */

import React, { type ReactNode, useState, useEffect, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/ui/tabs";
import {
  Accordion as ShadcnAccordion,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import {
  Tooltip as ShadcnTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/ui/tooltip";
import {
  Popover as ShadcnPopover,
  PopoverTrigger,
  PopoverContent,
} from "@/ui/popover";
import {
  Dialog as ShadcnDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import { Calendar as ShadcnCalendar } from "@/ui/calendar";
import { Button } from "@/ui/button";
import type { DateRange } from "react-day-picker";

/** Metadata extracted from Tab/AccordionItem/Page child nodes. */
interface ChildPanel {
  title: string;
  value: string;
  disabled?: boolean;
  content: ReactNode;
}

/**
 * Wrapper for overlay triggers (Dialog, Popover, Tooltip).
 *
 * Radix's `asChild` pattern requires the child to be a forwardRef component
 * that accepts a `ref` and forwards arbitrary DOM props (onClick, aria-*, etc.).
 * Our rendered children are `<RenderNode>` elements that don't do either of
 * those things, so Radix's handlers get silently dropped.
 *
 * This thin `<span>` wrapper accepts the ref and props from Radix, and the
 * actual trigger element (Button, etc.) renders inside it. Events bubble up
 * from the inner element to the span, which has the Radix handlers attached.
 */
const TriggerSlot = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function TriggerSlot({ children, ...props }, ref) {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});

// ── Tabs ───────────────────────────────────────────────────────────────

interface PrefabTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabTabs({
  defaultValue,
  value,
  onValueChange,
  className,
  _panels,
}: PrefabTabsProps) {
  // Use first tab as default if none specified
  const resolvedDefault = defaultValue ?? _panels[0]?.value;

  return (
    <ShadcnTabs
      defaultValue={!value ? resolvedDefault : undefined}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList>
        {_panels.map((panel) => (
          <TabsTrigger
            key={panel.value}
            value={panel.value}
            disabled={panel.disabled}
          >
            {panel.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {_panels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value}>
          {panel.content}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
}

// ── Accordion ──────────────────────────────────────────────────────────

interface PrefabAccordionProps {
  accordionType?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabAccordion({
  accordionType = "single",
  collapsible = true,
  defaultValue,
  className,
  _panels,
}: PrefabAccordionProps) {
  if (accordionType === "multiple") {
    return (
      <ShadcnAccordion
        type="multiple"
        defaultValue={
          Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : undefined
        }
        className={className}
      >
        {_panels.map((panel) => (
          <ShadcnAccordionItem key={panel.value} value={panel.value}>
            <AccordionTrigger>{panel.title}</AccordionTrigger>
            <AccordionContent>{panel.content}</AccordionContent>
          </ShadcnAccordionItem>
        ))}
      </ShadcnAccordion>
    );
  }

  return (
    <ShadcnAccordion
      type="single"
      collapsible={collapsible}
      defaultValue={typeof defaultValue === "string" ? defaultValue : defaultValue?.[0]}
      className={className}
    >
      {_panels.map((panel) => (
        <ShadcnAccordionItem key={panel.value} value={panel.value}>
          <AccordionTrigger>{panel.title}</AccordionTrigger>
          <AccordionContent>{panel.content}</AccordionContent>
        </ShadcnAccordionItem>
      ))}
    </ShadcnAccordion>
  );
}

// ── Pages ──────────────────────────────────────────────────────────────

interface PrefabPagesProps {
  defaultValue?: string;
  name?: string;
  value?: string;
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabPages({
  defaultValue,
  value,
  className,
  _panels,
}: PrefabPagesProps) {
  // Active page determined by value prop (from auto-state binding) or defaultValue
  const [active, setActive] = useState(
    value ?? defaultValue ?? _panels[0]?.value,
  );

  // Sync with external value changes (from state store)
  useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  const activePanel = _panels.find((p) => p.value === active);

  return <div className={className}>{activePanel?.content}</div>;
}

// ── Tooltip ────────────────────────────────────────────────────────────

interface PrefabTooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  children?: ReactNode;
}

export function PrefabTooltip({
  content,
  side,
  children,
}: PrefabTooltipProps) {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger asChild>
          <TriggerSlot>{children}</TriggerSlot>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
}

// ── Popover ────────────────────────────────────────────────────────────

interface PrefabPopoverProps {
  title?: string;
  description?: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  children?: ReactNode;
}

export function PrefabPopover({
  title,
  description,
  side,
  children,
}: PrefabPopoverProps) {
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnPopover>
      <PopoverTrigger asChild>
        <TriggerSlot>{trigger}</TriggerSlot>
      </PopoverTrigger>
      <PopoverContent side={side} className="w-80">
        {title && (
          <div className="mb-4 space-y-1">
            <h4 className="font-medium leading-none">{title}</h4>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {content}
      </PopoverContent>
    </ShadcnPopover>
  );
}

// ── Dialog ─────────────────────────────────────────────────────────────

interface PrefabDialogProps {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PrefabDialog({
  title,
  description,
  children,
}: PrefabDialogProps) {
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnDialog>
      <DialogTrigger asChild>
        <TriggerSlot>{trigger}</TriggerSlot>
      </DialogTrigger>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </ShadcnDialog>
  );
}

// ── Calendar ───────────────────────────────────────────────────────────

interface PrefabCalendarProps {
  mode?: "single" | "multiple" | "range";
  value?: string;
  onSelect?: (value: unknown) => void;
  className?: string;
}

export function PrefabCalendar({
  mode = "single",
  value,
  onSelect,
  className,
}: PrefabCalendarProps) {
  // Parse the stored ISO date string(s) into Date objects
  const selected = useMemo(() => {
    if (!value) return undefined;
    if (mode === "range") {
      try {
        const parsed = JSON.parse(value) as { from?: string; to?: string };
        return {
          from: parsed.from ? parseISO(parsed.from) : undefined,
          to: parsed.to ? parseISO(parsed.to) : undefined,
        } as DateRange;
      } catch {
        return undefined;
      }
    }
    if (mode === "multiple") {
      try {
        const dates = JSON.parse(value) as string[];
        return dates.map((d) => parseISO(d));
      } catch {
        return undefined;
      }
    }
    // single
    return parseISO(value);
  }, [value, mode]);

  // Navigate calendar to the month of the initially selected date
  const defaultMonth = useMemo(() => {
    if (!selected) return undefined;
    if (mode === "range") return (selected as DateRange).from;
    if (mode === "multiple") return (selected as Date[])[0];
    return selected as Date;
  }, [selected, mode]);

  // Track whether a complete range was just selected — the next click
  // should start a fresh range instead of adjusting the existing one.
  // react-day-picker v9 always adjusts existing ranges; we override that.
  const [rangeComplete, setRangeComplete] = useState(() => {
    if (mode !== "range" || !selected) return false;
    const range = selected as DateRange;
    return !!range.from && !!range.to;
  });

  const calendarClassName = cn("rounded-lg border", className);

  if (mode === "range") {
    return (
      <ShadcnCalendar
        mode="range"
        defaultMonth={defaultMonth}
        selected={selected as DateRange}
        onSelect={(range: DateRange | undefined, triggerDate: Date) => {
          if (!onSelect) return;
          if (rangeComplete) {
            // Start fresh range from the clicked date
            onSelect(JSON.stringify({ from: triggerDate.toISOString() }));
            setRangeComplete(false);
            return;
          }
          if (range) {
            onSelect(
              JSON.stringify({
                from: range.from?.toISOString(),
                to: range.to?.toISOString(),
              }),
            );
            setRangeComplete(!!range.from && !!range.to);
          }
        }}
        className={calendarClassName}
      />
    );
  }

  if (mode === "multiple") {
    return (
      <ShadcnCalendar
        mode="multiple"
        defaultMonth={defaultMonth}
        selected={selected as Date[]}
        onSelect={(dates: Date[] | undefined) => {
          if (!onSelect) return;
          if (dates) {
            onSelect(JSON.stringify(dates.map((d) => d.toISOString())));
          }
        }}
        className={calendarClassName}
      />
    );
  }

  return (
    <ShadcnCalendar
      mode="single"
      defaultMonth={defaultMonth}
      selected={selected as Date | undefined}
      onSelect={(date: Date | undefined) => {
        if (date && onSelect) onSelect(date.toISOString());
      }}
      className={calendarClassName}
    />
  );
}

// ── DatePicker ─────────────────────────────────────────────────────────

interface PrefabDatePickerProps {
  placeholder?: string;
  value?: string;
  onSelect?: (value: unknown) => void;
  className?: string;
}

export function PrefabDatePicker({
  placeholder = "Pick a date",
  value,
  onSelect,
  className,
}: PrefabDatePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = useMemo(() => {
    if (!value) return undefined;
    return parseISO(value);
  }, [value]);

  const handleSelect = (date: unknown) => {
    const d = date as Date | undefined;
    if (d && onSelect) {
      onSelect(d.toISOString());
    }
    setOpen(false);
  };

  return (
    <ShadcnPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[240px] justify-start text-left font-normal ${
            !selectedDate ? "text-muted-foreground" : ""
          } ${className ?? ""}`}
        >
          {selectedDate ? format(selectedDate, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <ShadcnCalendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </ShadcnPopover>
  );
}
