import { describe, it, expect, vi } from "vitest";
import {
  isComputedMarker,
  extractComputed,
  sortComputed,
  evaluateComputed,
} from "./computed";
import { createStateStore } from "./testing/state-store";

describe("isComputedMarker", () => {
  it("returns true for valid computed marker", () => {
    expect(isComputedMarker({ __computed__: "{{ a + b }}" })).toBe(true);
  });

  it("returns false for null", () => {
    expect(isComputedMarker(null)).toBe(false);
  });

  it("returns false for primitives", () => {
    expect(isComputedMarker(42)).toBe(false);
    expect(isComputedMarker("string")).toBe(false);
    expect(isComputedMarker(true)).toBe(false);
  });

  it("returns false for arrays", () => {
    expect(isComputedMarker([1, 2])).toBe(false);
  });

  it("returns false for objects without __computed__", () => {
    expect(isComputedMarker({ name: "Alice" })).toBe(false);
  });

  it("returns false when __computed__ is not a string", () => {
    expect(isComputedMarker({ __computed__: 42 })).toBe(false);
  });
});

describe("extractComputed", () => {
  it("extracts computed entries and removes them from state", () => {
    const state: Record<string, unknown> = {
      a: 1,
      b: 2,
      total: { __computed__: "{{ a + b }}" },
    };
    const entries = extractComputed(state);

    expect(entries).toEqual([{ key: "total", expression: "{{ a + b }}" }]);
    expect(state).toEqual({ a: 1, b: 2 });
  });

  it("returns empty array when no computed entries", () => {
    const state: Record<string, unknown> = { a: 1, b: 2 };
    const entries = extractComputed(state);

    expect(entries).toEqual([]);
    expect(state).toEqual({ a: 1, b: 2 });
  });

  it("extracts multiple computed entries", () => {
    const state: Record<string, unknown> = {
      x: 10,
      doubled: { __computed__: "{{ x * 2 }}" },
      tripled: { __computed__: "{{ x * 3 }}" },
    };
    const entries = extractComputed(state);

    expect(entries).toHaveLength(2);
    expect(entries.map((e) => e.key).sort()).toEqual(["doubled", "tripled"]);
    expect(state).toEqual({ x: 10 });
  });
});

describe("sortComputed", () => {
  it("returns single entry as-is", () => {
    const entries = [{ key: "total", expression: "{{ a + b }}" }];
    expect(sortComputed(entries)).toEqual(entries);
  });

  it("returns empty array for empty input", () => {
    expect(sortComputed([])).toEqual([]);
  });

  it("orders dependent entry after its dependency", () => {
    const entries = [
      { key: "double_total", expression: "{{ total * 2 }}" },
      { key: "total", expression: "{{ a + b }}" },
    ];
    const sorted = sortComputed(entries);

    expect(sorted[0].key).toBe("total");
    expect(sorted[1].key).toBe("double_total");
  });

  it("handles independent entries (no reordering needed)", () => {
    const entries = [
      { key: "sum", expression: "{{ a + b }}" },
      { key: "product", expression: "{{ a * b }}" },
    ];
    const sorted = sortComputed(entries);

    expect(sorted).toHaveLength(2);
  });

  it("warns on circular dependencies", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const entries = [
      { key: "a", expression: "{{ b + 1 }}" },
      { key: "b", expression: "{{ a + 1 }}" },
    ];
    const sorted = sortComputed(entries);

    expect(sorted).toHaveLength(2);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("handles three-level dependency chain", () => {
    const entries = [
      { key: "c", expression: "{{ b * 2 }}" },
      { key: "a", expression: "{{ x + 1 }}" },
      { key: "b", expression: "{{ a + 1 }}" },
    ];
    const sorted = sortComputed(entries);

    const keys = sorted.map((e) => e.key);
    expect(keys.indexOf("a")).toBeLessThan(keys.indexOf("b"));
    expect(keys.indexOf("b")).toBeLessThan(keys.indexOf("c"));
  });
});

describe("evaluateComputed", () => {
  it("evaluates a simple expression", () => {
    const entries = [{ key: "total", expression: "{{ a + b }}" }];
    const state = { a: 3, b: 7 };
    const result = evaluateComputed(entries, state);

    expect(result).toEqual({ total: 10 });
  });

  it("evaluates chained computed values", () => {
    const entries = [
      { key: "total", expression: "{{ a + b }}" },
      { key: "doubled", expression: "{{ total * 2 }}" },
    ];
    const state = { a: 3, b: 7 };
    const result = evaluateComputed(entries, state);

    expect(result).toEqual({ total: 10, doubled: 20 });
  });

  it("handles expression with pipe", () => {
    const entries = [
      { key: "formatted", expression: "{{ price | currency }}" },
    ];
    const state = { price: 42.5 };
    const result = evaluateComputed(entries, state);

    expect(result.formatted).toBe("$42.50");
  });

  it("returns undefined for invalid expressions", () => {
    const entries = [{ key: "bad", expression: "{{ ??? }}" }];
    const state = {};
    const result = evaluateComputed(entries, state);

    expect(result.bad).toBeUndefined();
  });
});

describe("StateStore with computed state", () => {
  it("evaluates computed values on creation", () => {
    const store = createStateStore({
      a: 3,
      b: 7,
      total: { __computed__: "{{ a + b }}" },
    });

    expect(store.get("a")).toBe(3);
    expect(store.get("b")).toBe(7);
    expect(store.get("total")).toBe(10);
  });

  it("re-evaluates computed values after set", () => {
    const store = createStateStore({
      a: 3,
      b: 7,
      total: { __computed__: "{{ a + b }}" },
    });

    expect(store.get("total")).toBe(10);
    store.set("a", 10);
    expect(store.get("total")).toBe(17);
  });

  it("re-evaluates computed values after merge", () => {
    const store = createStateStore({
      a: 3,
      b: 7,
      total: { __computed__: "{{ a + b }}" },
    });

    store.merge({ a: 100, b: 200 });
    expect(store.get("total")).toBe(300);
  });

  it("guards computed keys from set", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const store = createStateStore({
      a: 3,
      b: 7,
      total: { __computed__: "{{ a + b }}" },
    });

    store.set("total", 999);
    expect(store.get("total")).toBe(10); // unchanged
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Cannot set computed state key"),
    );
    warn.mockRestore();
  });

  it("handles reset with new computed entries", () => {
    const store = createStateStore({ a: 1 });
    store.reset({
      x: 5,
      doubled: { __computed__: "{{ x * 2 }}" },
    });

    expect(store.get("x")).toBe(5);
    expect(store.get("doubled")).toBe(10);
    expect(store.get("a")).toBeUndefined();
  });

  it("reset clears previous computed entries", () => {
    const store = createStateStore({
      a: 1,
      total: { __computed__: "{{ a + 1 }}" },
    });

    expect(store.get("total")).toBe(2);

    store.reset({ b: 10 });
    expect(store.get("total")).toBeUndefined();
    expect(store.get("b")).toBe(10);
  });

  it("computed entries available via computed property", () => {
    const store = createStateStore({
      a: 1,
      total: { __computed__: "{{ a + 1 }}" },
    });

    expect(store.computed).toHaveLength(1);
    expect(store.computed[0].key).toBe("total");
  });

  it("getAll includes computed values", () => {
    const store = createStateStore({
      a: 5,
      doubled: { __computed__: "{{ a * 2 }}" },
    });

    const all = store.getAll();
    expect(all.a).toBe(5);
    expect(all.doubled).toBe(10);
  });

  it("handles computed referencing other computed", () => {
    const store = createStateStore({
      a: 5,
      b: { __computed__: "{{ a * 2 }}" },
      c: { __computed__: "{{ b + 1 }}" },
    });

    expect(store.get("b")).toBe(10);
    expect(store.get("c")).toBe(11);

    store.set("a", 10);
    expect(store.get("b")).toBe(20);
    expect(store.get("c")).toBe(21);
  });

  it("no computed entries means normal behavior", () => {
    const store = createStateStore({ a: 1, b: 2 });
    expect(store.computed).toHaveLength(0);
    store.set("a", 10);
    expect(store.get("a")).toBe(10);
  });
});
