import { describe, it, expect, vi } from "vitest";
import { createStateStore } from "./testing/state-store";
import { getByPath, setByPath } from "./state";

describe("createStateStore", () => {
  it("starts empty by default", () => {
    const store = createStateStore();
    expect(store.getAll()).toEqual({});
  });

  it("accepts initial state", () => {
    const store = createStateStore({ name: "Alice", count: 0 });
    expect(store.get("name")).toBe("Alice");
    expect(store.get("count")).toBe(0);
  });

  it("set updates a key", () => {
    const store = createStateStore();
    store.set("key", "value");
    expect(store.get("key")).toBe("value");
  });

  it("set overwrites existing key", () => {
    const store = createStateStore({ key: "old" });
    store.set("key", "new");
    expect(store.get("key")).toBe("new");
  });

  it("get returns undefined for missing key", () => {
    const store = createStateStore();
    expect(store.get("missing")).toBeUndefined();
  });

  it("getAll returns all state", () => {
    const store = createStateStore({ a: 1, b: 2 });
    expect(store.getAll()).toEqual({ a: 1, b: 2 });
  });

  it("merge combines with existing state", () => {
    const store = createStateStore({ a: 1 });
    store.merge({ b: 2, c: 3 });
    expect(store.getAll()).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("merge overwrites conflicting keys", () => {
    const store = createStateStore({ a: 1 });
    store.merge({ a: 99 });
    expect(store.get("a")).toBe(99);
  });

  it("reset clears all state", () => {
    const store = createStateStore({ a: 1, b: 2 });
    store.reset();
    expect(store.getAll()).toEqual({});
  });

  it("reset with initial sets new baseline", () => {
    const store = createStateStore({ old: true });
    store.reset({ fresh: true });
    expect(store.get("old")).toBeUndefined();
    expect(store.get("fresh")).toBe(true);
  });

  // ── Dot-path get ───────────────────────────────────────────────

  it("get resolves dot-path into nested object", () => {
    const store = createStateStore({ user: { name: "Alice", age: 30 } });
    expect(store.get("user.name")).toBe("Alice");
    expect(store.get("user.age")).toBe(30);
  });

  it("get resolves integer path segments as array indices", () => {
    const store = createStateStore({ items: ["a", "b", "c"] });
    expect(store.get("items.0")).toBe("a");
    expect(store.get("items.2")).toBe("c");
  });

  it("get resolves mixed object/array paths", () => {
    const store = createStateStore({
      todos: [
        { text: "Buy milk", done: false },
        { text: "Walk dog", done: true },
      ],
    });
    expect(store.get("todos.0.text")).toBe("Buy milk");
    expect(store.get("todos.1.done")).toBe(true);
  });

  it("get returns undefined for missing intermediate", () => {
    const store = createStateStore({});
    expect(store.get("missing.path")).toBeUndefined();
  });

  it("get returns undefined when integer indexes non-array", () => {
    const store = createStateStore({ obj: { name: "Alice" } });
    expect(store.get("obj.0")).toBeUndefined();
  });

  it("get returns undefined when key indexes array", () => {
    const store = createStateStore({ items: [1, 2, 3] });
    expect(store.get("items.name")).toBeUndefined();
  });

  // ── Dot-path set ───────────────────────────────────────────────

  it("set updates nested object property", () => {
    const store = createStateStore({ user: { name: "Alice", age: 30 } });
    store.set("user.name", "Bob");
    expect(store.get("user.name")).toBe("Bob");
    expect(store.get("user.age")).toBe(30);
  });

  it("set updates array element", () => {
    const store = createStateStore({ items: ["a", "b", "c"] });
    store.set("items.1", "B");
    expect(store.get("items")).toEqual(["a", "B", "c"]);
  });

  it("set updates property on array element", () => {
    const store = createStateStore({
      todos: [
        { text: "Buy milk", done: false },
        { text: "Walk dog", done: false },
      ],
    });
    store.set("todos.1.done", true);
    expect(store.get("todos.1.done")).toBe(true);
    expect(store.get("todos.0.done")).toBe(false);
  });

  it("set creates immutable copies at each level", () => {
    const original = {
      todos: [{ text: "Buy milk", done: false }],
    };
    const store = createStateStore(original);
    store.set("todos.0.done", true);
    // Original should be unchanged
    expect(original.todos[0].done).toBe(false);
  });

  it("set warns and no-ops on missing intermediate", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const store = createStateStore({});
    store.set("missing.key", "value");
    expect(store.getAll()).toEqual({});
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("set warns when integer segment hits non-array", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const store = createStateStore({ obj: { name: "Alice" } });
    store.set("obj.0.key", "value");
    expect(store.get("obj")).toEqual({ name: "Alice" });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("set warns when key segment hits array", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const store = createStateStore({ items: [1, 2, 3] });
    store.set("items.name", "value");
    expect(store.get("items")).toEqual([1, 2, 3]);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

// ── Pure path utility tests ────────────────────────────────────────

describe("getByPath", () => {
  it("resolves flat key", () => {
    expect(getByPath({ name: "Alice" }, "name")).toBe("Alice");
  });

  it("resolves deeply nested path", () => {
    const root = { a: { b: { c: { d: 42 } } } };
    expect(getByPath(root, "a.b.c.d")).toBe(42);
  });

  it("returns undefined for out-of-bounds array index", () => {
    expect(getByPath({ items: [1, 2] }, "items.5")).toBeUndefined();
  });
});

describe("setByPath", () => {
  it("sets flat key", () => {
    expect(setByPath({ a: 1 }, "a", 2)).toEqual({ a: 2 });
  });

  it("sets deeply nested path", () => {
    const root = { a: { b: { c: 1 } } };
    const result = setByPath(root, "a.b.c", 2);
    expect(result).toEqual({ a: { b: { c: 2 } } });
    // Original unchanged
    expect(root.a.b.c).toBe(1);
  });

  it("handles array index out of bounds", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const root = { items: [1, 2] };
    const result = setByPath(root, "items.5", 99);
    expect(result).toBe(root); // unchanged
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
