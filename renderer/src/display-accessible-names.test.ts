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
async function render(node: ComponentNode) {
  await act(async () =>
    root.render(
      createElement(
        Suspense,
        { fallback: null },
        createElement(RenderNode, {
          node,
          state: createStateStore(),
          scope: {},
          app: null,
        }),
      ),
    ),
  );
}
const cases: [ComponentNode, string][] = [
  [{ type: "Text", content: "Visible text" }, "span"],
  ...[
    "Heading",
    "H1",
    "H2",
    "H3",
    "H4",
    "P",
    "Lead",
    "Large",
    "Small",
    "Muted",
    "BlockQuote",
  ].map(
    (type) =>
      [{ type, content: "Visible text" }, "*"] as [ComponentNode, string],
  ),
  [{ type: "Metric", label: "Revenue", value: 42 }, "div"],
  [{ type: "Icon", name: "check" }, "svg"],
  [{ type: "Code", content: "print(1)", language: "python" }, "pre"],
  [{ type: "Markdown", content: "**Visible text**" }, "div"],
  [{ type: "Svg", content: '<svg><path d="M0 0h10" /></svg>' }, "div"],
  [
    { type: "Alert", children: [{ type: "Text", content: "Alert text" }] },
    '[role="alert"]',
  ],
  ...[
    "Field",
    "ChoiceCard",
    "FieldTitle",
    "FieldDescription",
    "FieldContent",
    "FieldError",
  ].map(
    (type) =>
      [
        {
          type,
          content: "Visible text",
          children: [{ type: "Text", content: "Visible text" }],
        },
        "*",
      ] as [ComponentNode, string],
  ),
  ...["spin", "dots", "pulse", "bars", "ios"].map(
    (variant) =>
      [{ type: "Loader", variant }, 'svg[role="status"]'] as [
        ComponentNode,
        string,
      ],
  ),
];
it.each(cases)(
  "forwards naming fields on $type's existing root",
  async (node, selector) => {
    await Promise.all([
      import("./components/content"),
      import("./components/svg"),
    ]);
    await render({
      ...node,
      ariaLabel: "Explicit name",
      ariaLabelledBy: "external-label",
    });
    const element = container.querySelector(selector);
    expect(element).not.toBeNull();
    expect(element?.getAttribute("aria-label")).toBe("Explicit name");
    expect(element?.getAttribute("aria-labelledby")).toBe("external-label");
    expect(element?.getAttribute("aria-hidden")).not.toBe("true");
  },
);
it("keeps unnamed icons decorative and named icons exposed without adding a role", async () => {
  await render({ type: "Icon", name: "check" });
  expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
    "true",
  );
  await render({ type: "Icon", name: "check", ariaLabel: "Complete" });
  const svg = container.querySelector("svg");
  expect(svg?.getAttribute("aria-hidden")).not.toBe("true");
  expect(svg?.getAttribute("role")).toBeNull();
});
it("preserves generic roots and unnamed loader defaults", async () => {
  await render({ type: "Text", content: "Visible", ariaLabel: "Explicit" });
  expect(container.firstElementChild?.getAttribute("role")).toBeNull();
  await render({ type: "Loader" });
  expect(
    container.querySelector('[role="status"]')?.getAttribute("aria-label"),
  ).toBe("Loading");
});
