/**
 * Tests for the Slot component contract.
 *
 * Slot renders a component tree stored in client state. The actual rendering
 * is handled by the recursive renderer (RenderNode intercepts type="Slot"),
 * but we can verify the schema validation and state interaction patterns.
 */

import { describe, it, expect } from "vitest";
import { slotSchema } from "./schemas/slot";
import { createStateStore } from "./testing/state-store";

describe("Slot schema validation", () => {
  it("accepts valid slot with name", () => {
    const result = slotSchema.safeParse({
      type: "Slot",
      name: "detail_view",
    });
    expect(result.success).toBe(true);
  });

  it("accepts slot with children (fallback content)", () => {
    const result = slotSchema.safeParse({
      type: "Slot",
      name: "chart",
      children: [{ type: "Text", content: "No chart loaded" }],
    });
    expect(result.success).toBe(true);
  });

  it("accepts slot with cssClass", () => {
    const result = slotSchema.safeParse({
      type: "Slot",
      name: "content",
      cssClass: "min-h-40",
    });
    expect(result.success).toBe(true);
  });

  it("rejects slot without name", () => {
    const result = slotSchema.safeParse({
      type: "Slot",
    });
    expect(result.success).toBe(false);
  });
});

describe("Slot state interaction", () => {
  it("state stores a component tree that Slot would read", () => {
    const state = createStateStore();
    const tree = {
      type: "Column",
      children: [{ type: "Text", content: "Hello from slot" }],
    };
    state.set("detail_view", tree);
    const stored = state.get("detail_view") as Record<string, unknown>;
    expect(stored).toEqual(tree);
    expect(stored.type).toBe("Column");
  });

  it("state returns undefined for empty slot", () => {
    const state = createStateStore();
    expect(state.get("empty_slot")).toBeUndefined();
  });

  it("state can be updated to replace slot content", () => {
    const state = createStateStore({
      view: { type: "Text", content: "first" },
    });
    expect((state.get("view") as Record<string, unknown>).content).toBe(
      "first",
    );

    state.set("view", { type: "Text", content: "second" });
    expect((state.get("view") as Record<string, unknown>).content).toBe(
      "second",
    );
  });

  it("state can be cleared to empty a slot", () => {
    const state = createStateStore({
      view: { type: "Text", content: "hello" },
    });
    state.set("view", null);
    expect(state.get("view")).toBeNull();
  });
});
