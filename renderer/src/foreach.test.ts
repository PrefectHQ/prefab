/**
 * Tests for ForEach scope injection: $index and $item.
 *
 * The ForEach handler in renderer.tsx injects these variables into the
 * interpolation scope for each iteration. Since ForEach is a React component
 * and the test suite doesn't have a render harness, these tests verify the
 * behavior through the interpolation and expression layers — confirming that
 * $-prefixed identifiers resolve correctly when present in context.
 */

import { describe, it, expect } from "vitest";
import { interpolateString } from "./interpolation";
import { evaluate } from "./expression";

describe("$index in expressions", () => {
  it("resolves $index as a number", () => {
    expect(evaluate("$index", { $index: 0 })).toBe(0);
    expect(evaluate("$index", { $index: 3 })).toBe(3);
  });

  it("supports arithmetic with $index", () => {
    expect(evaluate("$index + 1", { $index: 0 })).toBe(1);
    expect(evaluate("$index + 1", { $index: 4 })).toBe(5);
  });

  it("supports comparisons with $index", () => {
    expect(evaluate("$index == 0", { $index: 0 })).toBe(true);
    expect(evaluate("$index == 0", { $index: 1 })).toBe(false);
    expect(evaluate("$index > 2", { $index: 5 })).toBe(true);
  });

  it("works in ternary expressions", () => {
    expect(evaluate("$index == 0 ? 'first' : 'other'", { $index: 0 })).toBe(
      "first",
    );
    expect(evaluate("$index == 0 ? 'first' : 'other'", { $index: 3 })).toBe(
      "other",
    );
  });
});

describe("$index in templates", () => {
  it("interpolates $index in a template", () => {
    expect(interpolateString("Item {{ $index }}", { $index: 2 })).toBe(
      "Item 2",
    );
  });

  it("interpolates $index + 1 for 1-based numbering", () => {
    expect(
      interpolateString("{{ $index + 1 }}. {{ $item.name }}", {
        $index: 0,
        $item: { name: "First" },
      }),
    ).toBe("1. First");
    expect(
      interpolateString("{{ $index + 1 }}. {{ $item.name }}", {
        $index: 2,
        $item: { name: "Third" },
      }),
    ).toBe("3. Third");
  });

  it("preserves number type for sole $index template", () => {
    const result = interpolateString("{{ $index }}", { $index: 5 });
    expect(result).toBe(5);
    expect(typeof result).toBe("number");
  });
});

describe("$item in expressions", () => {
  it("resolves $item as an object", () => {
    const item = { name: "Ford", role: "Researcher" };
    expect(evaluate("$item", { $item: item })).toEqual(item);
  });

  it("resolves $item dot paths", () => {
    const item = { name: "Ford", address: { city: "Betelgeuse" } };
    expect(evaluate("$item.name", { $item: item })).toBe("Ford");
    expect(evaluate("$item.address.city", { $item: item })).toBe("Betelgeuse");
  });

  it("resolves $item for scalars", () => {
    expect(evaluate("$item", { $item: "hello" })).toBe("hello");
    expect(evaluate("$item", { $item: 42 })).toBe(42);
  });
});

describe("$item in templates", () => {
  it("interpolates $item fields via dot paths", () => {
    expect(
      interpolateString("{{ $item.name }}", {
        $item: { name: "Arthur" },
      }),
    ).toBe("Arthur");
  });

  it("preserves object type for sole $item template", () => {
    const item = { name: "Arthur" };
    const result = interpolateString("{{ $item }}", { $item: item });
    expect(result).toBe(item);
  });
});

describe("$index coexists with $item", () => {
  it("$index alongside $item object fields", () => {
    const scope = {
      $index: 0,
      $item: { name: "Arthur", role: "Human" },
    };
    expect(interpolateString("{{ $index + 1 }}. {{ $item.name }}", scope)).toBe(
      "1. Arthur",
    );
    expect(evaluate("$item.role", scope)).toBe("Human");
  });

  it("$index alongside $item for scalars", () => {
    const scope = { $index: 2, $item: "earth" };
    expect(interpolateString("{{ $index }}: {{ $item }}", scope)).toBe(
      "2: earth",
    );
    expect(evaluate("$item", scope)).toBe("earth");
  });
});
