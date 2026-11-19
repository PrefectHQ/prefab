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

it("resolves the expand label against the row, not state, and tracks expansion", async () => {
  const node: ComponentNode = {
    type: "DataTable",
    columns: [{ key: "name", header: "Name" }],
    rows: [
      {
        name: "Arthur Dent",
        _detail: { type: "Text", content: "Towel owner" },
      },
    ],
    expandLabel: "crew member {{ name }}",
  };
  await act(async () =>
    root.render(
      createElement(
        Suspense,
        { fallback: null },
        createElement(RenderNode, {
          node,
          state: createStateStore({ name: "Zaphod" }),
          scope: {},
          app: null,
        }),
      ),
    ),
  );
  const toggle = container.querySelector("button[aria-expanded]");
  expect(toggle?.getAttribute("aria-label")).toBe(
    "Expand crew member Arthur Dent",
  );
  expect(toggle?.getAttribute("aria-expanded")).toBe("false");

  await act(async () => (toggle as HTMLButtonElement).click());

  expect(toggle?.getAttribute("aria-label")).toBe(
    "Collapse crew member Arthur Dent",
  );
  expect(toggle?.getAttribute("aria-expanded")).toBe("true");
});
