/**
 * Additional pipe tests split from expression.test.ts to stay under loq line limits.
 */

import { describe, expect, it } from "vitest";
import { evaluate } from "./expression.ts";

describe("selectattr / rejectattr pipes", () => {
  it("selectattr keeps items where attr is truthy", () => {
    const items = [
      { name: "a", done: true },
      { name: "b", done: false },
      { name: "c", done: true },
    ];
    const result = evaluate("items | selectattr:'done'", { items });
    expect(result).toEqual([
      { name: "a", done: true },
      { name: "c", done: true },
    ]);
  });

  it("rejectattr removes items where attr is truthy", () => {
    const items = [
      { name: "a", done: true },
      { name: "b", done: false },
      { name: "c", done: true },
    ];
    const result = evaluate("items | rejectattr:'done'", { items });
    expect(result).toEqual([{ name: "b", done: false }]);
  });

  it("rejectattr | length for counting", () => {
    const todos = [
      { text: "x", done: true },
      { text: "y", done: false },
      { text: "z", done: false },
    ];
    expect(evaluate("todos | rejectattr:'done' | length", { todos })).toBe(2);
  });

  it("selectattr on non-array passes through", () => {
    expect(evaluate("val | selectattr:'x'", { val: 42 })).toBe(42);
  });
});

describe("pluralize pipe", () => {
  it("returns singular for count of 1", () => {
    expect(evaluate("count | pluralize:'file'", { count: 1 })).toBe("file");
  });

  it("returns plural for count of 0", () => {
    expect(evaluate("count | pluralize:'file'", { count: 0 })).toBe("files");
  });

  it("returns plural for count > 1", () => {
    expect(evaluate("count | pluralize:'item'", { count: 5 })).toBe("items");
  });

  it("defaults to 'item' when no arg given", () => {
    expect(evaluate("count | pluralize", { count: 1 })).toBe("item");
    expect(evaluate("count | pluralize", { count: 3 })).toBe("items");
  });

  it("works chained after length", () => {
    const files = [{ name: "a.txt" }, { name: "b.txt" }];
    expect(evaluate("files | length | pluralize:'file'", { files })).toBe(
      "files",
    );
  });

  it("works with single-element array chained after length", () => {
    const files = [{ name: "a.txt" }];
    expect(evaluate("files | length | pluralize:'file'", { files })).toBe(
      "file",
    );
  });
});

describe("round pipe", () => {
  it("default (0 decimals)", () => {
    expect(evaluate("val | round", { val: 3.7 })).toBe(4);
  });

  it("with decimals", () => {
    expect(evaluate("val | round:2", { val: 3.14159 })).toBe(3.14);
  });

  it("integer unchanged", () => {
    expect(evaluate("val | round", { val: 42 })).toBe(42);
  });

  it("non-number passes through", () => {
    expect(evaluate("val | round", { val: "hello" })).toBe("hello");
  });
});

describe("date/time pipes", () => {
  const iso = "2025-01-15T14:30:00Z";

  it("date default (medium)", () => {
    const result = evaluate("d | date", { d: iso });
    expect(typeof result).toBe("string");
    expect(String(result)).toContain("2025");
  });

  it("date short", () => {
    const result = evaluate("d | date:short", { d: iso });
    expect(typeof result).toBe("string");
    expect(String(result)).toContain("2025");
  });

  it("date long", () => {
    const result = evaluate("d | date:long", { d: iso });
    expect(typeof result).toBe("string");
    expect(String(result)).toContain("January");
  });

  it("time", () => {
    const result = evaluate("d | time", { d: iso });
    expect(typeof result).toBe("string");
  });

  it("time from time-only string", () => {
    const result = evaluate("t | time", { t: "14:30" });
    expect(typeof result).toBe("string");
    expect(String(result)).toContain("30");
  });

  it("datetime", () => {
    const result = evaluate("d | datetime", { d: iso });
    expect(typeof result).toBe("string");
    expect(String(result)).toContain("2025");
  });

  it("date pipe with invalid date returns string", () => {
    expect(evaluate("d | date", { d: "not-a-date" })).toBe("not-a-date");
  });
});
