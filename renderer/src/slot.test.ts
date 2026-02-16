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
import { evaluate } from "./expression";
import { interpolateString } from "./interpolation";

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

describe("Slot expression + state flow", () => {
  const cardTree = {
    type: "Card",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", content: "Heart of Gold" },
          { type: "CardDescription", content: "Infinite Improbability Drive" },
        ],
      },
    ],
  };

  it("ternary expression returns object from context", () => {
    const ctx = { $event: true, detail_card: cardTree };
    const result = evaluate("$event ? detail_card : null", ctx);
    expect(result).toEqual(cardTree);
    expect(typeof result).toBe("object");
    expect((result as Record<string, unknown>).type).toBe("Card");
  });

  it("ternary expression returns null when condition is false", () => {
    const ctx = { $event: false, detail_card: cardTree };
    const result = evaluate("$event ? detail_card : null", ctx);
    expect(result).toBeNull();
  });

  it("interpolateString returns object for sole ternary expression", () => {
    const ctx = { $event: true, detail_card: cardTree };
    const result = interpolateString("{{ $event ? detail_card : null }}", ctx);
    expect(result).toEqual(cardTree);
    expect(typeof result).toBe("object");
  });

  it("full setState flow: expression resolves to object, state stores it", () => {
    const state = createStateStore({ detail_card: cardTree });
    const ctx = { ...state.getAll(), $event: true };
    const value = interpolateString("{{ $event ? detail_card : null }}", ctx);
    state.set("selected_item", value);
    const stored = state.get("selected_item") as Record<string, unknown>;
    expect(stored).toEqual(cardTree);
    expect(stored.type).toBe("Card");
  });

  it("Slot detection: stored object passes type check", () => {
    const state = createStateStore({ detail_card: cardTree });
    const ctx = { ...state.getAll(), $event: true };
    const value = interpolateString("{{ $event ? detail_card : null }}", ctx);
    state.set("selected_item", value);
    const slotContent = state.get("selected_item");
    // This is the exact check RenderNode uses for Slot
    const isComponentTree =
      slotContent != null &&
      typeof slotContent === "object" &&
      "type" in slotContent;
    expect(isComponentTree).toBe(true);
  });
});
