/**
 * Calendar and DatePicker — split from compound.tsx because they pull
 * in date-fns (~169 KB). Lazy-loaded via the registry so the cost is
 * only paid when these component types appear in the tree.
 */

import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar as ShadcnCalendar } from "@/ui/calendar";
import {
  Popover as ShadcnPopover,
  PopoverTrigger,
  PopoverContent,
} from "@/ui/popover";
import { Button } from "@/ui/button";
import type { DateRange } from "react-day-picker";

// ── Calendar ────────────────────────────────────────────────────────────

interface PrefabCalendarProps {
  mode?: "single" | "range" | "multiple";
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
    return parseISO(value);
  }, [value, mode]);

  const defaultMonth = useMemo(() => {
    if (!selected) return undefined;
    if (mode === "range") return (selected as DateRange).from;
    if (mode === "multiple") return (selected as Date[])[0];
    return selected as Date;
  }, [selected, mode]);

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
        numberOfMonths={2}
        defaultMonth={defaultMonth}
        selected={selected as DateRange}
        onSelect={(range: DateRange | undefined, triggerDate: Date) => {
          if (!onSelect) return;
          if (rangeComplete) {
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

// ── DatePicker ──────────────────────────────────────────────────────────

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
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="size-4" />
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
