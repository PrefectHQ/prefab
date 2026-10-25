// @vitest-environment jsdom
import { act, createElement, Suspense } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { RenderNode, type ComponentNode } from "./renderer";
import { createStateStore } from "./testing/state-store";
let root: Root;
let container: HTMLDivElement;
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
async function render(
  node: ComponentNode,
  defs: Record<string, ComponentNode>,
  data: Record<string, unknown> = {},
) {
  const state = createStateStore(data);
  await act(async () =>
    root.render(
      createElement(
        Suspense,
        { fallback: null },
        createElement(RenderNode, {
          node,
          scope: { $defs: defs },
          state,
          app: null,
        }),
      ),
    ),
  );
  return state;
}
const ref = (props: Record<string, unknown> = {}) =>
  ({ $ref: "button", ...props }) as unknown as ComponentNode;
it("names reusable instances independently while retaining template defaults", async () => {
  const node = {
    type: "Column",
    children: [
      ref({ let: { record: "{{ first }}" }, ariaLabel: "Open {{ record }}" }),
      ref({ ariaLabel: "Open second", ariaLabelledBy: "{{ label_id }}" }),
      ref(),
    ],
  };
  const defs = {
    button: { type: "Button", label: "Open", ariaLabel: "Template default" },
  };
  await render(node, defs, { first: 1041, label_id: "external-label" });
  const buttons = [...container.querySelectorAll("button")];
  expect(buttons.map((button) => button.getAttribute("aria-label"))).toEqual([
    "Open 1041",
    "Open second",
    "Template default",
  ]);
  expect(buttons[1].getAttribute("aria-labelledby")).toBe("external-label");
  await render(node, defs, { first: 1042, label_id: "new-label" });
  expect(buttons[0].getAttribute("aria-label")).toBe("Open 1042");
  expect(buttons[1].getAttribute("aria-labelledby")).toBe("new-label");
});
it.each(["Dialog", "Popover"])(
  "composes a referenced Button as one native %s trigger",
  async (type) => {
    const state = await render(
      {
        type,
        title: "Details",
        children: [
          ref({ ariaLabel: "Open record" }),
          { type: "Text", content: "Details" },
        ],
      },
      {
        button: {
          type: "Button",
          label: "Open",
          onClick: { action: "setState", key: "clicked", value: true },
        },
      },
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0].getAttribute("aria-label")).toBe("Open record");
    expect(buttons[0].getAttribute("aria-haspopup")).toBe("dialog");
    await act(async () => buttons[0].click());
    expect(state.get("clicked")).toBe(true);
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    await act(
      async () =>
        document
          .querySelector('[role="dialog"]')
          ?.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
          ),
    );
    expect(buttons[0].getAttribute("aria-expanded")).toBe("false");
  },
);

it("keeps referenced noninteractive trigger content wrapped", async () => {
  await render(
    {
      type: "Dialog",
      title: "Details",
      children: [ref({ ariaLabel: "Trigger text" })],
    },
    {
      button: { type: "Text", content: "Open details" },
    },
  );
  expect(container.querySelectorAll("button")).toHaveLength(1);
  expect(
    container.querySelector("button span")?.getAttribute("aria-label"),
  ).toBe("Trigger text");
  await act(async () => container.querySelector("button")?.click());
  expect(document.querySelector('[role="dialog"]')).not.toBeNull();
});

it("preserves names and trigger composition across nested references", async () => {
  await render(
    {
      type: "Popover",
      title: "Details",
      children: [ref({ ariaLabel: "Open nested" })],
    },
    {
      button: { $ref: "inner" } as unknown as ComponentNode,
      inner: { type: "Button", label: "Open", ariaLabel: "Default nested" },
    },
  );
  expect(container.querySelectorAll("button")).toHaveLength(1);
  expect(container.querySelector("button")?.getAttribute("aria-label")).toBe(
    "Open nested",
  );
  await act(async () => container.querySelector("button")?.click());
  expect(document.querySelector('[role="dialog"]')).not.toBeNull();
});
