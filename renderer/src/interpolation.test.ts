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
    expect(interpolateString("{{ a.b.c }}", { a: { b: { c: "deep" } } })).toBe(
      "deep",
    );
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
    expect(interpolateString("{{ val | percent }}", { val: 0.75 })).toBe("75%");
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

  // ── Arithmetic templates ──────────────────────────────────────

  it("addition in template", () => {
    expect(interpolateString("{{ count + 1 }}", { count: 5 })).toBe(6);
  });

  it("multiplication in template", () => {
    expect(
      interpolateString("{{ price * quantity }}", { price: 10, quantity: 3 }),
    ).toBe(30);
  });

  it("arithmetic in mixed template", () => {
    expect(
      interpolateString("Total: {{ price * quantity }}", {
        price: 10,
        quantity: 3,
      }),
    ).toBe("Total: 30");
  });

  // ── Ternary templates ─────────────────────────────────────────

  it("ternary in sole template", () => {
    expect(
      interpolateString("{{ active ? 'Yes' : 'No' }}", { active: true }),
    ).toBe("Yes");
    expect(
      interpolateString("{{ active ? 'Yes' : 'No' }}", { active: false }),
    ).toBe("No");
  });

  it("ternary in mixed template", () => {
    expect(
      interpolateString("Status: {{ online ? 'Online' : 'Offline' }}", {
        online: true,
      }),
    ).toBe("Status: Online");
  });

  // ── String concatenation templates ────────────────────────────

  it("string concat in template", () => {
    expect(
      interpolateString("{{ first + ' ' + last }}", {
        first: "Arthur",
        last: "Dent",
      }),
    ).toBe("Arthur Dent");
  });

  // ── Default value shorthand ───────────────────────────────────

  it("default shorthand when undefined", () => {
    expect(interpolateString("{{ name | 'World' }}", {})).toBe("World");
  });

  it("default shorthand when defined", () => {
    expect(interpolateString("{{ name | 'World' }}", { name: "Ford" })).toBe(
      "Ford",
    );
  });

  // ── New pipe transforms ───────────────────────────────────────

  it("length pipe", () => {
    expect(
      interpolateString("{{ items | length }}", { items: [1, 2, 3] }),
    ).toBe(3);
  });

  it("join pipe", () => {
    expect(interpolateString("{{ tags | join }}", { tags: ["a", "b"] })).toBe(
      "a, b",
    );
  });

  it("truncate pipe", () => {
    expect(
      interpolateString("{{ bio | truncate:5 }}", { bio: "Hello World" }),
    ).toBe("Hello...");
  });

  it("default pipe", () => {
    expect(interpolateString("{{ name | default:Anonymous }}", {})).toBe(
      "Anonymous",
    );
  });

  it("first pipe", () => {
    expect(interpolateString("{{ items | first }}", { items: [10, 20] })).toBe(
      10,
    );
  });

  it("last pipe", () => {
    expect(interpolateString("{{ items | last }}", { items: [10, 20] })).toBe(
      20,
    );
  });

  it("abs pipe", () => {
    expect(interpolateString("{{ delta | abs }}", { delta: -7 })).toBe(7);
  });

  // ── Pipe chaining ─────────────────────────────────────────────

  it("chained pipes in template", () => {
    expect(
      interpolateString("{{ name | lower | truncate:5 }}", {
        name: "ARTHUR DENT",
      }),
    ).toBe("arthu...");
  });

  // ── Type preservation with expressions ────────────────────────

  it("preserves number from arithmetic", () => {
    const result = interpolateString("{{ count + 0 }}", { count: 42 });
    expect(result).toBe(42);
    expect(typeof result).toBe("number");
  });

  it("preserves boolean from comparison", () => {
    const result = interpolateString("{{ count > 0 }}", { count: 5 });
    expect(result).toBe(true);
    expect(typeof result).toBe("boolean");
  });

  it("mixed template with expressions returns string", () => {
    const result = interpolateString("{{ count + 1 }} items", { count: 4 });
    expect(result).toBe("5 items");
    expect(typeof result).toBe("string");
  });

  // ── Backward compatibility ────────────────────────────────────

  it("sole undefined still returns original template", () => {
    expect(interpolateString("{{ missing }}", {})).toBe("{{ missing }}");
  });

  it("mixed undefined still returns empty", () => {
    expect(interpolateString("Hi {{ missing }}!", {})).toBe("Hi !");
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
    const result = interpolateProps({ enabled: true, items: [1, 2] }, {});
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
