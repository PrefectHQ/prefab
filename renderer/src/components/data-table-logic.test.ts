import { describe, it, expect } from "vitest";
import {
  globalFilter,
  nextSortAction,
  sortableHeaderClass,
  toggleRowSelection,
} from "./data-table-logic";

describe("globalFilter", () => {
  const makeRow = (data: Record<string, unknown>) => ({
    getValue: (id: string) => data[id],
  });

  it("matches case-insensitively", () => {
    const row = makeRow({ name: "Arthur Dent" });
    expect(globalFilter(row, "name", "art")).toBe(true);
    expect(globalFilter(row, "name", "ART")).toBe(true);
  });

  it("rejects non-matching rows", () => {
    const row = makeRow({ name: "Ford Prefect" });
    expect(globalFilter(row, "name", "arthur")).toBe(false);
  });

  it("skips internal columns", () => {
    const row = makeRow({ _expand: true, _detail: "stuff" });
    expect(globalFilter(row, "_expand", "true")).toBe(false);
    expect(globalFilter(row, "_detail", "stuff")).toBe(false);
  });

  it("handles null values", () => {
    const row = makeRow({ name: null });
    expect(globalFilter(row, "name", "test")).toBe(false);
  });

  it("matches numeric values as strings", () => {
    const row = makeRow({ amount: 1200 });
    expect(globalFilter(row, "amount", "12")).toBe(true);
  });
});

describe("nextSortAction", () => {
  it("unsorted -> asc", () => {
    expect(nextSortAction(false)).toBe("asc");
  });

  it("asc -> desc", () => {
    expect(nextSortAction("asc")).toBe("desc");
  });

  it("desc -> clear", () => {
    expect(nextSortAction("desc")).toBe("clear");
  });
});

describe("toggleRowSelection", () => {
  it("selects a new row", () => {
    const result = toggleRowSelection(null, "row-1");
    expect(result.selectedId).toBe("row-1");
    expect(result.shouldFireAction).toBe(true);
  });

  it("selects a different row", () => {
    const result = toggleRowSelection("row-1", "row-2");
    expect(result.selectedId).toBe("row-2");
    expect(result.shouldFireAction).toBe(true);
  });

  it("deselects the same row", () => {
    const result = toggleRowSelection("row-1", "row-1");
    expect(result.selectedId).toBeNull();
    expect(result.shouldFireAction).toBe(false);
  });
});

describe("sortableHeaderClass", () => {
  const base = "flex items-center gap-1 hover:text-foreground";

  it("leaves the header unchanged with no alignment class", () => {
    expect(sortableHeaderClass(undefined)).toBe(base);
    expect(sortableHeaderClass("")).toBe(base);
    expect(sortableHeaderClass("font-bold")).toBe(base);
  });

  it("fills the cell and right-justifies for text-right", () => {
    expect(sortableHeaderClass("text-right")).toBe(
      `${base} w-full justify-end`,
    );
  });

  it("fills the cell and center-justifies for text-center", () => {
    expect(sortableHeaderClass("text-center")).toBe(
      `${base} w-full justify-center`,
    );
  });

  it("left-justifies for an explicit text-left", () => {
    expect(sortableHeaderClass("text-left")).toBe(
      `${base} w-full justify-start`,
    );
  });

  it("finds the alignment token among other classes", () => {
    expect(sortableHeaderClass("font-bold text-right uppercase")).toBe(
      `${base} w-full justify-end`,
    );
  });

  it("matches whole tokens only — not substrings", () => {
    // "text-right-ish" is not a real utility; it must not trigger.
    expect(sortableHeaderClass("text-right-ish")).toBe(base);
    // "text-rightmost" likewise.
    expect(sortableHeaderClass("group-text-right")).toBe(base);
  });

  it("preserves a breakpoint prefix so alignment stays responsive", () => {
    expect(sortableHeaderClass("sm:text-right")).toBe(
      `${base} sm:w-full sm:justify-end`,
    );
  });

  it("preserves a multi-variant prefix chain", () => {
    expect(sortableHeaderClass("lg:dark:text-center")).toBe(
      `${base} lg:dark:w-full lg:dark:justify-center`,
    );
  });

  it("handles a bare token plus a prefixed token together", () => {
    expect(sortableHeaderClass("text-left md:text-right")).toBe(
      `${base} w-full justify-start md:w-full md:justify-end`,
    );
  });
});
