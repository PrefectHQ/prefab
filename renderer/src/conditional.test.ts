/**
 * Tests for the Condition wire format schema and validation.
 *
 * The Condition node is the wire representation of If/Elif/Else chains
 * from the Python DSL. These tests verify schema validation — the actual
 * expression evaluation is covered in conditions.test.ts, and the Python
 * serialization transform is covered in test_components.py.
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import { SCHEMA_REGISTRY } from "./schemas/index.ts";
import { validateNode } from "./validation.ts";

const conditionSchema = SCHEMA_REGISTRY["Condition"];

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Condition schema validation", () => {
  test("single case (no else) is valid", () => {
    const node = {
      type: "Condition",
      cases: [
        { when: "count > 0", children: [{ type: "Text", content: "yes" }] },
      ],
    };
    expect(conditionSchema.safeParse(node).success).toBe(true);
  });

  test("single case with else is valid", () => {
    const node = {
      type: "Condition",
      cases: [{ when: "active" }],
      else: [{ type: "Text", content: "inactive" }],
    };
    expect(conditionSchema.safeParse(node).success).toBe(true);
  });

  test("multiple cases with else is valid", () => {
    const node = {
      type: "Condition",
      cases: [
        {
          when: "status == 'error'",
          children: [{ type: "Badge", label: "Error" }],
        },
        {
          when: "status == 'warning'",
          children: [{ type: "Badge", label: "Warning" }],
        },
      ],
      else: [{ type: "Badge", label: "OK" }],
    };
    expect(conditionSchema.safeParse(node).success).toBe(true);
  });

  test("empty cases array is invalid", () => {
    const node = {
      type: "Condition",
      cases: [],
    };
    expect(conditionSchema.safeParse(node).success).toBe(false);
  });

  test("missing cases is invalid", () => {
    const node = { type: "Condition" };
    expect(conditionSchema.safeParse(node).success).toBe(false);
  });

  test("case without when is invalid", () => {
    const node = {
      type: "Condition",
      cases: [{ children: [{ type: "Text", content: "no when" }] }],
    };
    expect(conditionSchema.safeParse(node).success).toBe(false);
  });

  test("case with empty children is valid", () => {
    const node = {
      type: "Condition",
      cases: [{ when: "true", children: [] }],
    };
    expect(conditionSchema.safeParse(node).success).toBe(true);
  });

  test("case without children key is valid", () => {
    const node = {
      type: "Condition",
      cases: [{ when: "true" }],
    };
    expect(conditionSchema.safeParse(node).success).toBe(true);
  });
});

describe("Condition node validation", () => {
  test("valid Condition passes validateNode", () => {
    const node = {
      type: "Condition",
      cases: [{ when: "active", children: [{ type: "Text", content: "yes" }] }],
    };
    expect(validateNode(node)).toBeNull();
  });

  test("invalid Condition fails validateNode", () => {
    const node = {
      type: "Condition",
      cases: [],
    };
    const result = validateNode(node);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("schema_error");
  });
});
