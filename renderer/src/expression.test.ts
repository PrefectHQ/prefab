import { describe, it, expect } from "vitest";
import { evaluate } from "./expression";

describe("evaluate", () => {
  // ── Literals ──────────────────────────────────────────────────────

  describe("literals", () => {
    it("integer", () => {
      expect(evaluate("42", {})).toBe(42);
    });

    it("float", () => {
      expect(evaluate("3.14", {})).toBe(3.14);
    });

    it("leading decimal", () => {
      expect(evaluate(".5", {})).toBe(0.5);
    });

    it("single-quoted string", () => {
      expect(evaluate("'hello'", {})).toBe("hello");
    });

    it("empty string", () => {
      expect(evaluate("''", {})).toBe("");
    });

    it("true", () => {
      expect(evaluate("true", {})).toBe(true);
    });

    it("false", () => {
      expect(evaluate("false", {})).toBe(false);
    });

    it("null", () => {
      expect(evaluate("null", {})).toBe(null);
    });
  });

  // ── Identifiers ───────────────────────────────────────────────────

  describe("identifiers", () => {
    it("simple key", () => {
      expect(evaluate("name", { name: "Arthur" })).toBe("Arthur");
    });

    it("dot-path", () => {
      expect(evaluate("user.name", { user: { name: "Ford" } })).toBe("Ford");
    });

    it("deep dot-path", () => {
      expect(evaluate("a.b.c", { a: { b: { c: 42 } } })).toBe(42);
    });

    it("undefined key returns undefined", () => {
      expect(evaluate("missing", {})).toBeUndefined();
    });

    it("path through null returns undefined", () => {
      expect(evaluate("a.b.c", { a: null })).toBeUndefined();
    });

    it("path through undefined returns undefined", () => {
      expect(evaluate("a.b", {})).toBeUndefined();
    });

    it(".length on arrays", () => {
      expect(evaluate("items.length", { items: [1, 2, 3] })).toBe(3);
    });

    it(".length on empty array", () => {
      expect(evaluate("items.length", { items: [] })).toBe(0);
    });

    it(".length on strings", () => {
      expect(evaluate("name.length", { name: "Arthur" })).toBe(6);
    });

    it("identifier with $ prefix", () => {
      expect(evaluate("$event", { $event: "clicked" })).toBe("clicked");
    });

    it("identifier with _ prefix", () => {
      expect(evaluate("_item", { _item: { name: "Ford" } })).toEqual({
        name: "Ford",
      });
    });
  });

  // ── Arithmetic ────────────────────────────────────────────────────

  describe("arithmetic", () => {
    it("addition", () => {
      expect(evaluate("2 + 3", {})).toBe(5);
    });

    it("subtraction", () => {
      expect(evaluate("10 - 4", {})).toBe(6);
    });

    it("multiplication", () => {
      expect(evaluate("3 * 7", {})).toBe(21);
    });

    it("division", () => {
      expect(evaluate("15 / 3", {})).toBe(5);
    });

    it("chained addition", () => {
      expect(evaluate("1 + 2 + 3", {})).toBe(6);
    });

    it("mul binds tighter than add", () => {
      expect(evaluate("2 + 3 * 4", {})).toBe(14);
    });

    it("parentheses override precedence", () => {
      expect(evaluate("(2 + 3) * 4", {})).toBe(20);
    });

    it("variables in arithmetic", () => {
      expect(evaluate("count + 1", { count: 5 })).toBe(6);
    });

    it("division by zero returns Infinity", () => {
      expect(evaluate("1 / 0", {})).toBe(Infinity);
    });

    it("float arithmetic", () => {
      expect(evaluate("0.1 + 0.2", {})).toBeCloseTo(0.3);
    });
  });

  // ── String concatenation ──────────────────────────────────────────

  describe("string concatenation", () => {
    it("string + string", () => {
      expect(evaluate("'hello' + ' ' + 'world'", {})).toBe("hello world");
    });

    it("string + number coerces to string", () => {
      expect(evaluate("'count: ' + 42", {})).toBe("count: 42");
    });

    it("number + string coerces to string", () => {
      expect(evaluate("42 + ' items'", {})).toBe("42 items");
    });

    it("variable concatenation", () => {
      expect(
        evaluate("first + ' ' + last", { first: "Arthur", last: "Dent" }),
      ).toBe("Arthur Dent");
    });
  });

  // ── Unary operators ───────────────────────────────────────────────

  describe("unary", () => {
    it("unary minus", () => {
      expect(evaluate("-5", {})).toBe(-5);
    });

    it("unary minus on variable", () => {
      expect(evaluate("-count", { count: 3 })).toBe(-3);
    });

    it("unary plus", () => {
      expect(evaluate("+5", {})).toBe(5);
    });

    it("double negative", () => {
      expect(evaluate("--5", {})).toBe(5);
    });

    it("negation in expression", () => {
      expect(evaluate("10 + -3", {})).toBe(7);
    });

    it("negate parenthesized expression", () => {
      expect(evaluate("-(2 + 3)", {})).toBe(-5);
    });
  });

  // ── Comparison ────────────────────────────────────────────────────

  describe("comparison", () => {
    it("== with numbers", () => {
      expect(evaluate("5 == 5", {})).toBe(true);
      expect(evaluate("5 == 3", {})).toBe(false);
    });

    it("== with strings", () => {
      expect(evaluate("role == 'admin'", { role: "admin" })).toBe(true);
      expect(evaluate("role == 'admin'", { role: "user" })).toBe(false);
    });

    it("== null for undefined", () => {
      expect(evaluate("value == null", {})).toBe(true);
    });

    it("!= operator", () => {
      expect(evaluate("5 != 3", {})).toBe(true);
      expect(evaluate("5 != 5", {})).toBe(false);
    });

    it("> operator", () => {
      expect(evaluate("5 > 3", {})).toBe(true);
      expect(evaluate("3 > 5", {})).toBe(false);
    });

    it(">= operator", () => {
      expect(evaluate("5 >= 5", {})).toBe(true);
      expect(evaluate("4 >= 5", {})).toBe(false);
    });

    it("< operator", () => {
      expect(evaluate("3 < 5", {})).toBe(true);
      expect(evaluate("5 < 3", {})).toBe(false);
    });

    it("<= operator", () => {
      expect(evaluate("5 <= 5", {})).toBe(true);
      expect(evaluate("6 <= 5", {})).toBe(false);
    });

    it("comparison with arithmetic", () => {
      expect(evaluate("count + 1 > 5", { count: 5 })).toBe(true);
      expect(evaluate("count + 1 > 5", { count: 4 })).toBe(false);
    });
  });

  // ── Logical operators ─────────────────────────────────────────────

  describe("logical", () => {
    it("&& both true", () => {
      expect(evaluate("true && true", {})).toBe(true);
    });

    it("&& one false", () => {
      expect(evaluate("true && false", {})).toBe(false);
    });

    it("|| one true", () => {
      expect(evaluate("false || true", {})).toBe(true);
    });

    it("|| both false", () => {
      expect(evaluate("false || false", {})).toBe(false);
    });

    it("! negation", () => {
      expect(evaluate("!true", {})).toBe(false);
      expect(evaluate("!false", {})).toBe(true);
    });

    it("!! double negation", () => {
      expect(evaluate("!!true", {})).toBe(true);
      expect(evaluate("!!'hello'", {})).toBe(true);
    });

    it("&& short-circuit returns falsy value", () => {
      expect(evaluate("false && true", {})).toBe(false);
    });

    it("|| short-circuit returns truthy value", () => {
      expect(evaluate("'hello' || 'world'", {})).toBe("hello");
    });

    it("&& binds tighter than ||", () => {
      // true || (false && false) = true
      expect(evaluate("true || false && false", {})).toBe(true);
    });

    it("! binds tighter than &&", () => {
      expect(evaluate("!false && true", {})).toBe(true);
    });

    it("variables in logical expressions", () => {
      expect(
        evaluate("loggedIn && isAdmin", { loggedIn: true, isAdmin: true }),
      ).toBe(true);
      expect(
        evaluate("loggedIn && isAdmin", { loggedIn: true, isAdmin: false }),
      ).toBe(false);
    });
  });

  // ── Ternary ───────────────────────────────────────────────────────

  describe("ternary", () => {
    it("true branch", () => {
      expect(evaluate("true ? 'yes' : 'no'", {})).toBe("yes");
    });

    it("false branch", () => {
      expect(evaluate("false ? 'yes' : 'no'", {})).toBe("no");
    });

    it("with comparison condition", () => {
      expect(evaluate("count > 0 ? 'some' : 'none'", { count: 5 })).toBe(
        "some",
      );
      expect(evaluate("count > 0 ? 'some' : 'none'", { count: 0 })).toBe(
        "none",
      );
    });

    it("with expressions in branches", () => {
      expect(
        evaluate("active ? count + 1 : 0", { active: true, count: 5 }),
      ).toBe(6);
      expect(
        evaluate("active ? count + 1 : 0", { active: false, count: 5 }),
      ).toBe(0);
    });

    it("nested ternary", () => {
      expect(
        evaluate("a > 10 ? 'high' : a > 5 ? 'medium' : 'low'", { a: 12 }),
      ).toBe("high");
      expect(
        evaluate("a > 10 ? 'high' : a > 5 ? 'medium' : 'low'", { a: 7 }),
      ).toBe("medium");
      expect(
        evaluate("a > 10 ? 'high' : a > 5 ? 'medium' : 'low'", { a: 2 }),
      ).toBe("low");
    });

    it("pluralization pattern", () => {
      expect(evaluate("n != 1 ? 's' : ''", { n: 0 })).toBe("s");
      expect(evaluate("n != 1 ? 's' : ''", { n: 1 })).toBe("");
      expect(evaluate("n != 1 ? 's' : ''", { n: 5 })).toBe("s");
    });
  });

  // ── Pipe transforms ──────────────────────────────────────────────

  describe("pipes", () => {
    it("percent", () => {
      expect(evaluate("val | percent", { val: 0.75 })).toBe("75%");
    });

    it("percent with decimals", () => {
      expect(evaluate("val | percent:1", { val: 0.756 })).toBe("75.6%");
    });

    it("number formatting", () => {
      expect(evaluate("val | number:2", { val: 1234 })).toBe("1,234.00");
    });

    it("currency default USD", () => {
      expect(evaluate("val | currency", { val: 1234 })).toBe("$1,234.00");
    });

    it("currency with code", () => {
      const result = evaluate("val | currency:EUR", { val: 1234 });
      // EUR formatting varies by platform, just check it's a string containing the amount
      expect(typeof result).toBe("string");
      expect(String(result)).toContain("1,234.00");
    });

    it("upper", () => {
      expect(evaluate("name | upper", { name: "arthur" })).toBe("ARTHUR");
    });

    it("lower", () => {
      expect(evaluate("name | lower", { name: "ARTHUR" })).toBe("arthur");
    });

    it("length of array", () => {
      expect(evaluate("items | length", { items: [1, 2, 3] })).toBe(3);
    });

    it("length of string", () => {
      expect(evaluate("name | length", { name: "Arthur" })).toBe(6);
    });

    it("length of non-array/string returns 0", () => {
      expect(evaluate("val | length", { val: 42 })).toBe(0);
    });

    it("join array", () => {
      expect(evaluate("tags | join", { tags: ["a", "b", "c"] })).toBe(
        "a, b, c",
      );
    });

    it("join with custom separator", () => {
      expect(evaluate("tags | join:-", { tags: ["a", "b", "c"] })).toBe(
        "a-b-c",
      );
    });

    it("join non-array returns string", () => {
      expect(evaluate("val | join", { val: "hello" })).toBe("hello");
    });

    it("truncate", () => {
      expect(evaluate("text | truncate:5", { text: "Hello World" })).toBe(
        "Hello...",
      );
    });

    it("truncate shorter string unchanged", () => {
      expect(evaluate("text | truncate:20", { text: "Hi" })).toBe("Hi");
    });

    it("default pipe with null", () => {
      expect(evaluate("name | default:Anonymous", { name: null })).toBe(
        "Anonymous",
      );
    });

    it("default pipe with undefined", () => {
      expect(evaluate("name | default:Anonymous", {})).toBe("Anonymous");
    });

    it("default pipe with value passes through", () => {
      expect(evaluate("name | default:Anonymous", { name: "Ford" })).toBe(
        "Ford",
      );
    });

    it("first of array", () => {
      expect(evaluate("items | first", { items: [10, 20, 30] })).toBe(10);
    });

    it("first of non-array", () => {
      expect(evaluate("val | first", { val: "hello" })).toBe("hello");
    });

    it("last of array", () => {
      expect(evaluate("items | last", { items: [10, 20, 30] })).toBe(30);
    });

    it("abs of negative", () => {
      expect(evaluate("val | abs", { val: -42 })).toBe(42);
    });

    it("abs of positive", () => {
      expect(evaluate("val | abs", { val: 42 })).toBe(42);
    });

    it("unknown pipe passes through", () => {
      expect(evaluate("val | nonexistent", { val: 42 })).toBe(42);
    });
  });

  // ── Pipe chaining ────────────────────────────────────────────────

  describe("pipe chaining", () => {
    it("two pipes", () => {
      expect(
        evaluate("name | lower | truncate:5", { name: "ARTHUR DENT" }),
      ).toBe("arthu...");
    });

    it("three pipes", () => {
      expect(evaluate("name | upper | truncate:3", { name: "arthur" })).toBe(
        "ART...",
      );
    });
  });

  // ── Pipe with expression ─────────────────────────────────────────

  describe("pipe with expression", () => {
    it("arithmetic then pipe", () => {
      expect(
        evaluate("price * quantity | currency", { price: 10, quantity: 3 }),
      ).toBe("$30.00");
    });

    it("comparison then pipe (pipe is lowest precedence)", () => {
      // count > 0 evaluates to true, then pipe is applied to the boolean
      // This tests that pipe binds after everything else
      const result = evaluate("count > 0 | upper", { count: 5 });
      expect(result).toBe("TRUE");
    });
  });

  // ── Default value shorthand ───────────────────────────────────────

  describe("default value shorthand", () => {
    it("string default when undefined", () => {
      expect(evaluate("name | 'Anonymous'", {})).toBe("Anonymous");
    });

    it("string default when null", () => {
      expect(evaluate("name | 'Anonymous'", { name: null })).toBe("Anonymous");
    });

    it("string default not used when defined", () => {
      expect(evaluate("name | 'Anonymous'", { name: "Ford" })).toBe("Ford");
    });

    it("number default", () => {
      expect(evaluate("count | 0", {})).toBe(0);
    });

    it("number default not used when defined", () => {
      expect(evaluate("count | 0", { count: 42 })).toBe(42);
    });

    it("boolean default", () => {
      expect(evaluate("active | true", {})).toBe(true);
    });

    it("null default", () => {
      expect(evaluate("value | null", {})).toBe(null);
    });
  });

  // ── Precedence ────────────────────────────────────────────────────

  describe("precedence", () => {
    it("mul before add", () => {
      expect(evaluate("2 + 3 * 4", {})).toBe(14);
    });

    it("comparison after arithmetic", () => {
      expect(evaluate("2 + 3 > 4", {})).toBe(true);
    });

    it("logical after comparison", () => {
      expect(evaluate("1 > 0 && 2 > 1", {})).toBe(true);
    });

    it("ternary after logical", () => {
      expect(evaluate("true && false ? 'a' : 'b'", {})).toBe("b");
    });

    it("pipe after everything", () => {
      expect(
        evaluate("price * quantity | currency", { price: 25, quantity: 2 }),
      ).toBe("$50.00");
    });

    it("parentheses override all", () => {
      expect(evaluate("(2 + 3) * 4", {})).toBe(20);
    });

    it("nested parentheses", () => {
      expect(evaluate("((1 + 2) * (3 + 4))", {})).toBe(21);
    });
  });

  // ── Combined expressions ──────────────────────────────────────────

  describe("combined", () => {
    it("counter increment pattern", () => {
      expect(evaluate("count + 1", { count: 0 })).toBe(1);
    });

    it("cart total pattern", () => {
      expect(
        evaluate("price * quantity | currency", { price: 29.99, quantity: 3 }),
      ).toBe("$89.97");
    });

    it("pluralization pattern", () => {
      const expr = "items.length != 1 ? 'items' : 'item'";
      expect(evaluate(expr, { items: [1, 2, 3] })).toBe("items");
      expect(evaluate(expr, { items: [1] })).toBe("item");
    });

    it("conditional with comparison and arithmetic", () => {
      expect(evaluate("count + 1 > 5 ? 'many' : 'few'", { count: 5 })).toBe(
        "many",
      );
      expect(evaluate("count + 1 > 5 ? 'many' : 'few'", { count: 3 })).toBe(
        "few",
      );
    });

    it("status display pattern", () => {
      expect(evaluate("active ? 'Online' : 'Offline'", { active: true })).toBe(
        "Online",
      );
    });

    it("complex boolean with arithmetic", () => {
      expect(evaluate("a > 0 && b > 0 && a + b < 100", { a: 10, b: 20 })).toBe(
        true,
      );
    });

    it("logical or with default", () => {
      expect(evaluate("name || 'Unknown'", {})).toBe("Unknown");
      expect(evaluate("name || 'Unknown'", { name: "Ford" })).toBe("Ford");
    });

    it("string building", () => {
      expect(
        evaluate("first + ' ' + last | upper", {
          first: "Arthur",
          last: "Dent",
        }),
      ).toBe("ARTHUR DENT");
    });

    it("inventory warning condition", () => {
      expect(
        evaluate("inventory > 0 && inventory < 10", { inventory: 5 }),
      ).toBe(true);
      expect(
        evaluate("inventory > 0 && inventory < 10", { inventory: 0 }),
      ).toBe(false);
      expect(
        evaluate("inventory > 0 && inventory < 10", { inventory: 15 }),
      ).toBe(false);
    });
  });

  // ── Date/Time pipes ──────────────────────────────────────────────

  describe("date/time pipes", () => {
    const iso = "2025-01-15T14:30:00Z";

    it("date default (medium)", () => {
      const result = evaluate("d | date", { d: iso });
      expect(typeof result).toBe("string");
      expect(String(result)).toContain("2025");
    });

    it("date short", () => {
      const result = evaluate("d | date:short", { d: iso });
      expect(typeof result).toBe("string");
      expect(String(result)).toContain("2025");
    });

    it("date long", () => {
      const result = evaluate("d | date:long", { d: iso });
      expect(typeof result).toBe("string");
      expect(String(result)).toContain("January");
    });

    it("time", () => {
      const result = evaluate("d | time", { d: iso });
      expect(typeof result).toBe("string");
    });

    it("time from time-only string", () => {
      const result = evaluate("t | time", { t: "14:30" });
      expect(typeof result).toBe("string");
      expect(String(result)).toContain("30");
    });

    it("datetime", () => {
      const result = evaluate("d | datetime", { d: iso });
      expect(typeof result).toBe("string");
      expect(String(result)).toContain("2025");
    });

    it("date pipe with invalid date returns string", () => {
      expect(evaluate("d | date", { d: "not-a-date" })).toBe("not-a-date");
    });
  });

  // ── Edge cases ────────────────────────────────────────────────────

  describe("edge cases", () => {
    it("throws on empty string", () => {
      expect(() => evaluate("", {})).toThrow();
    });

    it("throws on unexpected token", () => {
      expect(() => evaluate("@", {})).toThrow();
    });

    it("throws on trailing operator", () => {
      expect(() => evaluate("5 +", {})).toThrow();
    });

    it("throws on unmatched paren", () => {
      expect(() => evaluate("(5 + 3", {})).toThrow();
    });

    it("throws on extra tokens after expression", () => {
      expect(() => evaluate("5 5", {})).toThrow();
    });

    it("whitespace around expression is fine", () => {
      expect(evaluate("  42  ", {})).toBe(42);
    });

    it("percent pipe with non-number", () => {
      expect(evaluate("val | percent", { val: "hello" })).toBe("hello");
    });

    it("abs pipe with non-number", () => {
      expect(evaluate("val | abs", { val: "hello" })).toBe("hello");
    });

    it("number pipe with non-number", () => {
      expect(evaluate("val | number", { val: "hello" })).toBe("hello");
    });

    it("currency pipe with non-number", () => {
      expect(evaluate("val | currency", { val: "hello" })).toBe("hello");
    });
  });
});
