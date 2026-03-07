/**
 * Tests for renderer auto-naming of stateful components.
 *
 * Verifies that stateful components without a `name` prop get
 * deterministic auto-generated names, while non-stateful components
 * and components with explicit names are left untouched.
 */

import { describe, test, expect, beforeEach } from "vitest";
import {
  STATEFUL_TYPES,
  autoAssignName,
  collectComponentState,
  resetAutoNameCounter,
} from "./auto-name.ts";

beforeEach(() => {
  resetAutoNameCounter();
});

describe("autoAssignName", () => {
  test("assigns name to stateful component without name", () => {
    const props: Record<string, unknown> = { value: 50, min: 0, max: 100 };
    const name = autoAssignName("Slider", props);
    expect(name).toBe("slider_1");
    expect(props.name).toBe("slider_1");
  });

  test("preserves explicit name on stateful component", () => {
    const props: Record<string, unknown> = { name: "my-slider", value: 50 };
    const name = autoAssignName("Slider", props);
    expect(name).toBeUndefined();
    expect(props.name).toBe("my-slider");
  });

  test("does not assign name to non-stateful component", () => {
    const props: Record<string, unknown> = { cssClass: "text-lg" };
    const name = autoAssignName("Text", props);
    expect(name).toBeUndefined();
    expect("name" in props).toBe(false);
  });

  test("generates unique names across calls", () => {
    const p1: Record<string, unknown> = {};
    const p2: Record<string, unknown> = {};
    autoAssignName("Input", p1);
    autoAssignName("Input", p2);
    expect(p1.name).toBe("input_1");
    expect(p2.name).toBe("input_2");
  });

  test("different types get independent naming", () => {
    const slider: Record<string, unknown> = {};
    const input: Record<string, unknown> = {};
    autoAssignName("Slider", slider);
    autoAssignName("Input", input);
    expect(slider.name).toBe("slider_1");
    expect(input.name).toBe("input_2");
  });

  test("counter resets between render passes", () => {
    const p1: Record<string, unknown> = {};
    autoAssignName("Slider", p1);
    expect(p1.name).toBe("slider_1");

    resetAutoNameCounter();

    const p2: Record<string, unknown> = {};
    autoAssignName("Slider", p2);
    expect(p2.name).toBe("slider_1");
  });
});

describe("STATEFUL_TYPES", () => {
  test("contains all expected stateful component types", () => {
    const expected = [
      "Input",
      "Textarea",
      "Checkbox",
      "Switch",
      "Slider",
      "Calendar",
      "DatePicker",
      "DropZone",
      "Select",
      "RadioGroup",
      "Combobox",
      "Tabs",
      "Pages",
    ];
    for (const type of expected) {
      expect(STATEFUL_TYPES.has(type), `Missing: ${type}`).toBe(true);
    }
    expect(STATEFUL_TYPES.size).toBe(expected.length);
  });

  test("does not include non-stateful types", () => {
    const nonStateful = [
      "Text",
      "Button",
      "Column",
      "Row",
      "Card",
      "ForEach",
      "Condition",
    ];
    for (const type of nonStateful) {
      expect(STATEFUL_TYPES.has(type), `Should not include: ${type}`).toBe(
        false,
      );
    }
  });
});

describe("collectComponentState", () => {
  test("seeds value from Input with value prop", () => {
    const tree = {
      type: "Column",
      children: [{ type: "Input", name: "email", value: "a@b.com" }],
    };
    expect(collectComponentState(tree, {})).toEqual({ email: "a@b.com" });
  });

  test("seeds checked from Checkbox", () => {
    const tree = {
      type: "Column",
      children: [{ type: "Checkbox", name: "agree", checked: true }],
    };
    expect(collectComponentState(tree, {})).toEqual({ agree: true });
  });

  test("skips keys already in existing state", () => {
    const tree = {
      type: "Column",
      children: [{ type: "Slider", name: "vol", value: 50 }],
    };
    expect(collectComponentState(tree, { vol: 80 })).toEqual({});
  });

  test("skips template values", () => {
    const tree = {
      type: "Column",
      children: [{ type: "Input", name: "x", value: "{{ something }}" }],
    };
    expect(collectComponentState(tree, {})).toEqual({});
  });

  test("seeds Select from selected child option", () => {
    const tree = {
      type: "Select",
      name: "color",
      children: [
        { type: "SelectOption", value: "red", label: "Red", selected: false },
        { type: "SelectOption", value: "blue", label: "Blue", selected: true },
      ],
    };
    expect(collectComponentState(tree, {})).toEqual({ color: "blue" });
  });

  test("seeds RadioGroup from checked child option", () => {
    const tree = {
      type: "RadioGroup",
      name: "size",
      children: [
        { type: "Radio", value: "sm", label: "Small" },
        { type: "Radio", value: "md", label: "Medium", checked: true },
        { type: "Radio", value: "lg", label: "Large" },
      ],
    };
    expect(collectComponentState(tree, {})).toEqual({ size: "md" });
  });

  test("Select with no selected child seeds nothing", () => {
    const tree = {
      type: "Select",
      name: "color",
      children: [
        { type: "SelectOption", value: "red", label: "Red" },
        { type: "SelectOption", value: "blue", label: "Blue" },
      ],
    };
    expect(collectComponentState(tree, {})).toEqual({});
  });

  test("seeds DropZone with empty array", () => {
    const tree = {
      type: "Column",
      children: [{ type: "DropZone", name: "files" }],
    };
    expect(collectComponentState(tree, {})).toEqual({ files: [] });
  });
});
