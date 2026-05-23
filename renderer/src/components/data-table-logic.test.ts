import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect } from "vitest";
import { PrefabDataTable } from "./data-display";
import {
  globalFilter,
  nextSortAction,
  sortableHeaderButtonClass,
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

describe("sortableHeaderButtonClass", () => {
  it("matches whole alignment class tokens", () => {
    expect(sortableHeaderButtonClass("text-right-ish")).toBe("");
    expect(sortableHeaderButtonClass("font-medium text-right")).toBe(
      "w-full justify-start flex-row-reverse",
    );
  });

  it("preserves responsive variant prefixes", () => {
    expect(sortableHeaderButtonClass("text-left sm:text-right")).toBe(
      "w-full justify-start flex-row sm:w-full sm:justify-start sm:flex-row-reverse",
    );
  });

  it("resets reversed row direction for later non-right alignments", () => {
    expect(sortableHeaderButtonClass("text-right sm:text-left")).toBe(
      "w-full justify-start flex-row-reverse sm:w-full sm:justify-start sm:flex-row",
    );
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

describe("PrefabDataTable", () => {
  it("aligns a sortable right-aligned header label with its cell values", () => {
    const markup = renderToStaticMarkup(
      React.createElement(PrefabDataTable, {
        columns: [
          { key: "fund", header: "Fund", sortable: true },
          {
            key: "ytd_expense",
            header: "YTD Expense",
            headerClass: "text-right",
            cellClass: "text-right",
            sortable: true,
          },
        ],
        rows: [{ fund: "Reserve Pool", ytd_expense: 97336.1 }],
      }),
    );

    const header = markup.match(
      /<th[^>]*text-right[^>]*>.*?YTD Expense.*?<\/th>/,
    )?.[0];

    expect(header).toContain("w-full");
    expect(header).toContain("justify-start");
    expect(header).toContain("flex-row-reverse");
  });
});
