/**
 * Searchable grouped-examples dropdown rendered in the playground
 * toolbar.  Extracted from `playground.tsx` to keep that file under
 * its line limit.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { EXAMPLES, type Example } from "./examples";

export function ExamplePicker({
  onSelect,
}: {
  onSelect: (ex: Example) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!filter) return EXAMPLES;
    const q = filter.toLowerCase();
    return EXAMPLES.filter(
      (ex) =>
        ex.title.toLowerCase().includes(q) ||
        ex.category.toLowerCase().includes(q),
    );
  }, [filter]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Example[]>();
    for (const ex of filtered) {
      const list = groups.get(ex.category) ?? [];
      list.push(ex);
      groups.set(ex.category, list);
    }
    return groups;
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setFilter("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
        <Search className="h-4 w-4" />
        Examples...
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[320px] p-0">
        <div className="border-b border-border px-3 py-2">
          <input
            ref={inputRef}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter examples..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No matching examples.
            </div>
          )}
          {[...grouped.entries()].map(([category, items]) => (
            <div key={category}>
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {category}
              </div>
              {items.map((ex) => (
                <button
                  key={ex.title}
                  className="flex w-full items-center px-3 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    onSelect(ex);
                    setOpen(false);
                  }}
                >
                  {ex.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
