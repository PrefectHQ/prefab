import { describe, it, expect, vi } from "vitest";
import { evaluateCondition } from "./conditions";

describe("evaluateCondition", () => {
  // ── Literals ──────────────────────────────────────────────────

  it("evaluates true literal", () => {
    expect(evaluateCondition("true", {})).toBe(true);
  });

  it("evaluates false literal", () => {
    expect(evaluateCondition("false", {})).toBe(false);
  });

  it("evaluates null literal as falsy", () => {
    expect(evaluateCondition("null", {})).toBe(false);
  });

  it("evaluates number literal as truthy", () => {
    expect(evaluateCondition("42", {})).toBe(true);
  });

  it("evaluates zero as falsy", () => {
    expect(evaluateCondition("0", {})).toBe(false);
  });

  it("evaluates string literal as truthy", () => {
    expect(evaluateCondition("'hello'", {})).toBe(true);
  });

  it("evaluates empty string literal as falsy", () => {
    expect(evaluateCondition("''", {})).toBe(false);
  });

  // ── Identifiers ───────────────────────────────────────────────

  it("resolves simple identifier from context", () => {
    expect(evaluateCondition("show", { show: true })).toBe(true);
    expect(evaluateCondition("show", { show: false })).toBe(false);
  });

  it("resolves dot-path identifier", () => {
    expect(evaluateCondition("user.active", { user: { active: true } })).toBe(
      true,
    );
    expect(evaluateCondition("user.active", { user: { active: false } })).toBe(
      false,
    );
  });

  it("resolves .length on arrays", () => {
    expect(evaluateCondition("items.length", { items: [1, 2, 3] })).toBe(true);
    expect(evaluateCondition("items.length", { items: [] })).toBe(false);
  });

  it("resolves .length on strings", () => {
    expect(evaluateCondition("name.length", { name: "Alice" })).toBe(true);
    expect(evaluateCondition("name.length", { name: "" })).toBe(false);
  });

  it("returns false for undefined identifier", () => {
    expect(evaluateCondition("missing", {})).toBe(false);
  });

  it("returns false for nested path through null", () => {
    expect(evaluateCondition("a.b.c", { a: null })).toBe(false);
  });

  // ── Comparison operators ──────────────────────────────────────

  it("== with numbers", () => {
    expect(evaluateCondition("count == 5", { count: 5 })).toBe(true);
    expect(evaluateCondition("count == 5", { count: 3 })).toBe(false);
  });

  it("== with strings", () => {
    expect(evaluateCondition("role == 'admin'", { role: "admin" })).toBe(true);
    expect(evaluateCondition("role == 'admin'", { role: "user" })).toBe(false);
  });

  it("!= operator", () => {
    expect(evaluateCondition("status != 'active'", { status: "pending" })).toBe(
      true,
    );
    expect(evaluateCondition("status != 'active'", { status: "active" })).toBe(
      false,
    );
  });

  it("> operator", () => {
    expect(evaluateCondition("score > 50", { score: 75 })).toBe(true);
    expect(evaluateCondition("score > 50", { score: 50 })).toBe(false);
  });

  it(">= operator", () => {
    expect(evaluateCondition("score >= 50", { score: 50 })).toBe(true);
    expect(evaluateCondition("score >= 50", { score: 49 })).toBe(false);
  });

  it("< operator", () => {
    expect(evaluateCondition("count < 10", { count: 5 })).toBe(true);
    expect(evaluateCondition("count < 10", { count: 10 })).toBe(false);
  });

  it("<= operator", () => {
    expect(evaluateCondition("count <= 10", { count: 10 })).toBe(true);
    expect(evaluateCondition("count <= 10", { count: 11 })).toBe(false);
  });

  // ── Logical operators ─────────────────────────────────────────

  it("&& with both true", () => {
    expect(evaluateCondition("a && b", { a: true, b: true })).toBe(true);
  });

  it("&& with one false", () => {
    expect(evaluateCondition("a && b", { a: true, b: false })).toBe(false);
  });

  it("|| with one true", () => {
    expect(evaluateCondition("a || b", { a: false, b: true })).toBe(true);
  });

  it("|| with both false", () => {
    expect(evaluateCondition("a || b", { a: false, b: false })).toBe(false);
  });

  it("! negation", () => {
    expect(evaluateCondition("!hidden", { hidden: false })).toBe(true);
    expect(evaluateCondition("!hidden", { hidden: true })).toBe(false);
  });

  it("double negation", () => {
    expect(evaluateCondition("!!value", { value: "yes" })).toBe(true);
  });

  // ── Precedence ────────────────────────────────────────────────

  it("&& binds tighter than ||", () => {
    // a || (b && c) = false || (true && false) = false
    expect(
      evaluateCondition("a || b && c", { a: false, b: true, c: false }),
    ).toBe(false);
    // (a || b) && c would be true && false = false — same result, try another combo
    // a || (b && c) = true || (anything) = true
    expect(
      evaluateCondition("a || b && c", { a: true, b: false, c: false }),
    ).toBe(true);
  });

  it("parentheses override precedence", () => {
    // (a || b) && c = (false || true) && true = true
    expect(
      evaluateCondition("(a || b) && c", { a: false, b: true, c: true }),
    ).toBe(true);
    // Without parens: a || (b && c) = false || (true && true) = true — same, different combo:
    // (a || b) && c = (true || false) && false = false
    expect(
      evaluateCondition("(a || b) && c", { a: true, b: false, c: false }),
    ).toBe(false);
  });

  // ── Complex expressions ───────────────────────────────────────

  it("compound expression with comparison and logic", () => {
    expect(
      evaluateCondition("role == 'admin' && !suspended", {
        role: "admin",
        suspended: false,
      }),
    ).toBe(true);
  });

  it("array length comparison", () => {
    expect(evaluateCondition("results.length > 0", { results: [1, 2] })).toBe(
      true,
    );
    expect(evaluateCondition("results.length > 0", { results: [] })).toBe(
      false,
    );
  });

  // ── Edge cases ────────────────────────────────────────────────

  it("empty string returns false", () => {
    expect(evaluateCondition("", {})).toBe(false);
  });

  it("whitespace-only returns false", () => {
    expect(evaluateCondition("   ", {})).toBe(false);
  });

  it("falls back to key lookup on parse error", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    // Invalid syntax like "a +" should fall back to !!ctx["a +"]
    expect(evaluateCondition("a +", { "a +": true })).toBe(true);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it("falls back to falsy for invalid expression with no matching key", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(evaluateCondition("a +", {})).toBe(false);
    warn.mockRestore();
  });

  // ── Null comparisons ─────────────────────────────────────────

  it("== null for undefined value", () => {
    expect(evaluateCondition("value == null", {})).toBe(true);
  });

  it("!= null for defined value", () => {
    expect(evaluateCondition("value != null", { value: "something" })).toBe(
      true,
    );
  });

  // ── Arithmetic in conditions ────────────────────────────────────

  it("arithmetic comparison: count + 1 > 5", () => {
    expect(evaluateCondition("count + 1 > 5", { count: 5 })).toBe(true);
    expect(evaluateCondition("count + 1 > 5", { count: 4 })).toBe(false);
  });

  it("subtraction in condition", () => {
    expect(
      evaluateCondition("total - discount > 0", { total: 100, discount: 30 }),
    ).toBe(true);
  });

  it("multiplication in condition", () => {
    expect(
      evaluateCondition("price * quantity > 100", { price: 25, quantity: 5 }),
    ).toBe(true);
  });

  // ── Ternary in conditions ──────────────────────────────────────

  it("ternary evaluates to truthy branch", () => {
    expect(evaluateCondition("active ? true : false", { active: true })).toBe(
      true,
    );
  });

  it("ternary evaluates to falsy branch", () => {
    expect(evaluateCondition("active ? true : false", { active: false })).toBe(
      false,
    );
  });

  // ── String concat in conditions ────────────────────────────────

  it("concatenated string comparison", () => {
    expect(
      evaluateCondition("first + ' ' + last != ''", {
        first: "Arthur",
        last: "Dent",
      }),
    ).toBe(true);
  });

  // ── Unary minus in conditions ──────────────────────────────────

  it("unary minus comparison", () => {
    expect(evaluateCondition("-score < 0", { score: 5 })).toBe(true);
    expect(evaluateCondition("-score < 0", { score: -5 })).toBe(false);
  });

  // ── Pipe in conditions ─────────────────────────────────────────

  it("pipe result used in condition (truthy)", () => {
    expect(evaluateCondition("items | length", { items: [1, 2, 3] })).toBe(
      true,
    );
  });

  it("pipe result used in condition (falsy)", () => {
    expect(evaluateCondition("items | length", { items: [] })).toBe(false);
  });

  it("default value shorthand in condition", () => {
    expect(evaluateCondition("name | 'fallback'", {})).toBe(true);
    expect(evaluateCondition("name | ''", {})).toBe(false);
  });
});
