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
