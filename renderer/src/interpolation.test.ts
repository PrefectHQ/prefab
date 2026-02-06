import { describe, it, expect } from "vitest";
import { interpolateString, interpolateProps } from "./interpolation";

describe("interpolateString", () => {
  // ── Basic substitution ──────────────────────────────────────

  it("replaces simple key", () => {
    expect(interpolateString("{{ name }}", { name: "Alice" })).toBe("Alice");
  });

  it("replaces dot-path key", () => {
    expect(
      interpolateString("{{ user.name }}", { user: { name: "Bob" } }),
    ).toBe("Bob");
  });

  it("handles deeply nested paths", () => {
    expect(
      interpolateString("{{ a.b.c }}", { a: { b: { c: "deep" } } }),
    ).toBe("deep");
  });

  // ── Type preservation ─────────────────────────────────────────

  it("preserves number type for sole template", () => {
    const result = interpolateString("{{ count }}", { count: 42 });
    expect(result).toBe(42);
    expect(typeof result).toBe("number");
  });

  it("preserves boolean type for sole template", () => {
    expect(interpolateString("{{ active }}", { active: true })).toBe(true);
  });

  it("preserves array type for sole template", () => {
    const items = [1, 2, 3];
    expect(interpolateString("{{ items }}", { items })).toBe(items);
  });

  it("preserves object type for sole template", () => {
    const user = { name: "Alice" };
    expect(interpolateString("{{ user }}", { user })).toBe(user);
  });

  // ── Mixed templates ───────────────────────────────────────────

  it("returns string for mixed content", () => {
    const result = interpolateString("Hello {{ name }}, age {{ age }}", {
      name: "Alice",
      age: 30,
    });
    expect(result).toBe("Hello Alice, age 30");
    expect(typeof result).toBe("string");
  });

  it("handles text before and after template", () => {
    expect(interpolateString("Score: {{ score }}!", { score: 95 })).toBe(
      "Score: 95!",
    );
  });

  // ── Undefined keys ────────────────────────────────────────────

  it("returns original template for sole undefined key", () => {
    expect(interpolateString("{{ missing }}", {})).toBe("{{ missing }}");
  });

  it("returns empty string for undefined key in mixed template", () => {
    expect(interpolateString("Hi {{ missing }}!", {})).toBe("Hi !");
  });

  // ── Format specifiers ─────────────────────────────────────────

  it("percent format", () => {
    expect(interpolateString("{{ val | percent }}", { val: 0.75 })).toBe(
      "75%",
    );
  });

  it("percent with decimals", () => {
    expect(interpolateString("{{ val | percent:1 }}", { val: 0.756 })).toBe(
      "75.6%",
    );
  });

  it("upper format", () => {
    expect(interpolateString("{{ name | upper }}", { name: "alice" })).toBe(
      "ALICE",
    );
  });

  it("lower format", () => {
    expect(interpolateString("{{ name | lower }}", { name: "ALICE" })).toBe(
      "alice",
    );
  });

  // ── Whitespace handling ───────────────────────────────────────

  it("handles no spaces in braces", () => {
    expect(interpolateString("{{name}}", { name: "ok" })).toBe("ok");
  });

  it("handles extra spaces in braces", () => {
    expect(interpolateString("{{  name  }}", { name: "ok" })).toBe("ok");
  });
});

describe("interpolateProps", () => {
  it("interpolates string values", () => {
    const result = interpolateProps(
      { label: "Hello {{ name }}", count: 5 },
      { name: "World" },
    );
    expect(result.label).toBe("Hello World");
    expect(result.count).toBe(5);
  });

  it("passes non-string values through", () => {
    const result = interpolateProps(
      { enabled: true, items: [1, 2] },
      {},
    );
    expect(result.enabled).toBe(true);
    expect(result.items).toEqual([1, 2]);
  });

  it("recursively interpolates nested objects", () => {
    const result = interpolateProps(
      { child: { text: "{{ greeting }}" } },
      { greeting: "Hi" },
    );
    expect((result.child as Record<string, unknown>).text).toBe("Hi");
  });

  it("recursively interpolates arrays of objects", () => {
    const result = interpolateProps(
      { items: [{ label: "{{ name }}" }] },
      { name: "Alice" },
    );
    expect((result.items as Record<string, unknown>[])[0].label).toBe("Alice");
  });

  it("interpolates arrays of strings", () => {
    const result = interpolateProps(
      { tags: ["{{ a }}", "{{ b }}"] },
      { a: "x", b: "y" },
    );
    expect(result.tags).toEqual(["x", "y"]);
  });
});
