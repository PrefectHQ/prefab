/**
 * Tests for selectattr/rejectattr pipes.
 *
 * Split from expression.test.ts to stay under loq line limits.
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
