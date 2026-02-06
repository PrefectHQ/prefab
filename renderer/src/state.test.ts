import { describe, it, expect } from "vitest";
import { createStateStore } from "./testing/state-store";

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
});
