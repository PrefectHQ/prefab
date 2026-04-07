import { describe, it, expect } from "vitest";
import {
  globalFilter,
  nextSortAction,
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
