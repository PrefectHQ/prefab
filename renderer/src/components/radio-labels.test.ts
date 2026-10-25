// @vitest-environment jsdom
import { act, createElement, Suspense } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { RenderNode, type ComponentNode } from "../renderer";
import { createStateStore } from "../testing/state-store";

let root: Root;
let container: HTMLDivElement;
let state = createStateStore();

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  state = createStateStore();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
async function render(node: ComponentNode) {
  await act(async () =>
    root.render(
      createElement(
        Suspense,
        { fallback: null },
        createElement(RenderNode, { node, state, scope: {}, app: null }),
      ),
    ),
  );
}
const plan: ComponentNode = {
  type: "Column",
  children: [
    { type: "Label", text: "Plan", id: "plan-label", forId: "plan" },
    {
      type: "RadioGroup",
      name: "plan",
      id: "plan",
      ariaLabelledBy: "plan-label",
      children: [
        { type: "Radio", option: "basic", label: "Basic", id: "basic-option" },
        { type: "Radio", option: "pro", label: "Pro", id: "pro-option" },
      ],
    },
  ],
};

it("preserves explicit option IDs on the labelled semantic radios", async () => {
  await render(plan);
  const group = container.querySelector('[role="radiogroup"]');
  expect(group?.getAttribute("id")).toBe("plan");
  expect(group?.getAttribute("aria-labelledby")).toBe("plan-label");
  for (const id of ["basic-option", "pro-option"]) {
    const radio = document.getElementById(id);
    expect(radio?.getAttribute("type")).toBe("radio");
    expect(container.querySelector(`label[for="${id}"]`)?.textContent).toBe(
      id === "basic-option" ? "Basic" : "Pro",
    );
  }
});

it("uses unique stable IDs for repeated unnamed groups with the same option", async () => {
  const node: ComponentNode = {
    type: "Column",
    children: [
      {
        type: "RadioGroup",
        children: [{ type: "Radio", option: "basic", label: "Basic" }],
      },
      {
        type: "RadioGroup",
        children: [{ type: "Radio", option: "basic", label: "Basic" }],
      },
    ],
  };
  await render(node);
  const ids = [...container.querySelectorAll("label")].map(
    (label) => label.htmlFor,
  );
  expect(new Set(ids).size).toBe(2);
  await render(node);
  expect(
    [...container.querySelectorAll("label")].map((label) => label.htmlFor),
  ).toEqual(ids);
});

it("preserves the standalone native input and its explicit label target", async () => {
  await render({
    type: "Radio",
    option: "basic",
    label: "Basic",
    id: "standalone-basic",
  });
  const radio = container.querySelector('input[type="radio"]');
  expect(radio?.id).toBe("standalone-basic");
  expect(container.querySelector("label")?.htmlFor).toBe("standalone-basic");
});

it("retains selected values and disabled option behavior through label clicks", async () => {
  await render({
    type: "RadioGroup",
    name: "plan",
    value: "basic",
    children: [
      { type: "Radio", option: "basic", label: "Basic", id: "basic" },
      { type: "Radio", option: "pro", label: "Pro", id: "pro" },
      {
        type: "Radio",
        option: "unavailable",
        label: "Unavailable",
        id: "disabled",
        disabled: true,
      },
    ],
  });
  const radios = container.querySelectorAll('[role="radio"]');
  expect(radios[0].getAttribute("aria-checked")).toBe("true");
  await act(
    async () =>
      container.querySelector<HTMLLabelElement>('label[for="pro"]')?.click(),
  );
  expect(state.get("plan")).toBe("pro");
  await act(
    async () =>
      container
        .querySelector<HTMLLabelElement>('label[for="disabled"]')
        ?.click(),
  );
  expect(state.get("plan")).toBe("pro");
  expect(radios[2].getAttribute("aria-disabled")).toBe("true");
});

it("keeps standalone label clicks and disabled behavior native", async () => {
  await render({
    type: "Radio",
    option: "basic",
    label: "Basic",
    id: "standalone-basic",
  });
  await act(async () => container.querySelector("label")?.click());
  expect(container.querySelector("input")?.checked).toBe(true);
  await render({
    type: "Radio",
    option: "basic",
    label: "Basic",
    id: "standalone-basic",
    disabled: true,
  });
  expect(container.querySelector("input")?.disabled).toBe(true);
});

it("does not derive DOM IDs from shared state names and repeated options", async () => {
  await render({
    type: "Column",
    children: [
      {
        type: "RadioGroup",
        name: "plan",
        children: [{ type: "Radio", option: "basic", label: "Basic" }],
      },
      {
        type: "RadioGroup",
        name: "plan",
        children: [{ type: "Radio", option: "basic", label: "Basic" }],
      },
      {
        type: "Radio",
        name: "choice",
        option: "basic",
        label: "Standalone Basic",
      },
      {
        type: "Radio",
        name: "choice",
        option: "basic",
        label: "Standalone Basic",
      },
    ],
  });
  const targets = [...container.querySelectorAll("label")].map(
    (label) => label.htmlFor,
  );
  expect(new Set(targets).size).toBe(4);
});

it("keeps arrow-key selection and skips disabled options", async () => {
  await render({
    type: "RadioGroup",
    name: "keyboard-plan",
    value: "basic",
    children: [
      { type: "Radio", option: "basic", label: "Basic" },
      {
        type: "Radio",
        option: "unavailable",
        label: "Unavailable",
        disabled: true,
      },
      { type: "Radio", option: "pro", label: "Pro" },
    ],
  });
  const radios = container.querySelectorAll<HTMLElement>('[role="radio"]');
  await act(async () => {
    radios[0].focus();
    radios[0].dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
  });
  expect(state.get("keyboard-plan")).toBe("pro");
  expect(document.activeElement).toBe(radios[2]);
});
