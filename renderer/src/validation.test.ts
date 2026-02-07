/**
 * Tests for runtime validation of component nodes and actions.
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import { validateNode, validateAction } from "./validation.ts";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("validateNode", () => {
  test("valid node returns null", () => {
    const node = { type: "Button", label: "Click me" };
    expect(validateNode(node)).toBeNull();
  });

  test("valid container node returns null", () => {
    const node = {
      type: "Column",
      gap: 4,
      children: [{ type: "Text", content: "Hello" }],
    };
    expect(validateNode(node)).toBeNull();
  });

  test("optional fields can be omitted", () => {
    const node = { type: "Button", label: "Click" };
    expect(validateNode(node)).toBeNull();
  });

  test("unknown type returns unknown_type error", () => {
    const node = { type: "Buttton", label: "Typo" }; // codespell:ignore buttton
    const result = validateNode(node);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("unknown_type");
    expect(result!.message).toContain("Buttton"); // codespell:ignore buttton
  });

  test("missing required field returns schema_error", () => {
    const node = { type: "Button" };
    const result = validateNode(node);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("schema_error");
    expect(result!.message).toContain("Button");
    expect(result!.issues.length).toBeGreaterThan(0);
  });

  test("wrong field type returns schema_error", () => {
    const node = { type: "Button", label: 42 };
    const result = validateNode(node);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("schema_error");
  });

  test("issues contain descriptive path info", () => {
    const node = { type: "Input", inputType: 123 };
    const result = validateNode(node);
    expect(result).not.toBeNull();
    expect(result!.issues.some((i) => i.includes("inputType"))).toBe(true);
  });

  test("console.warn is called on failure", () => {
    validateNode({ type: "Nonexistent" });
    expect(console.warn).toHaveBeenCalledWith(
      "[Prefab] Validation error:",
      expect.stringContaining("Nonexistent"),
      expect.any(Object),
    );
  });

  test("console.warn is not called on success", () => {
    validateNode({ type: "Text", content: "hello" });
    expect(console.warn).not.toHaveBeenCalled();
  });
});

describe("validateAction", () => {
  test("valid action returns null", () => {
    const action = { action: "setState", key: "count", value: 1 };
    expect(validateAction(action)).toBeNull();
  });

  test("valid toolCall returns null", () => {
    const action = {
      action: "toolCall",
      tool: "save",
      arguments: { name: "test" },
    };
    expect(validateAction(action)).toBeNull();
  });

  test("unknown action type returns unknown_type error", () => {
    const action = { action: "doMagic" };
    const result = validateAction(action);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("unknown_type");
    expect(result!.message).toContain("doMagic");
  });

  test("missing required field returns schema_error", () => {
    const action = { action: "toolCall" };
    const result = validateAction(action);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("schema_error");
    expect(result!.issues.some((i) => i.includes("tool"))).toBe(true);
  });

  test("valid showToast returns null", () => {
    const action = {
      action: "showToast",
      message: "Saved!",
      variant: "success",
    };
    expect(validateAction(action)).toBeNull();
  });

  test("console.warn is called on failure", () => {
    validateAction({ action: "unknownAction" });
    expect(console.warn).toHaveBeenCalledWith(
      "[Prefab] Action validation error:",
      expect.stringContaining("unknownAction"),
      expect.any(Object),
    );
  });
});
