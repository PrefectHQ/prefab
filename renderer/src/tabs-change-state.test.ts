// @vitest-environment jsdom
import { act, createElement as h } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore, type StateStore } from "./state";
import envelope from "./testing/tabs-change-app.json";
let root: Root;
let container: HTMLDivElement;
let state: StateStore;
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
async function render(actions?: unknown) {
  const payload = structuredClone(envelope);
  const tabs = payload.view.children[0] as Record<string, unknown>;
  if (actions === null) delete tabs.onChange;
  else if (actions !== undefined) Object.assign(tabs, { onChange: actions });
  function Harness() {
    state = useStateStore(payload.state);
    return h(RenderTree, {
      tree: payload.view as ComponentNode,
      state,
      app: null,
    });
  }
  await act(async () => root.render(h(Harness)));
}
async function chooseBeta() {
  const beta = container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[1];
  await act(async () => {
    beta.dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, button: 0 }),
    );
    beta.focus();
    beta.click();
  });
}
it("dispatches the public Python Tabs callback once after named state is updated", async () => {
  await render();
  await chooseBeta();
  expect(state.get("active")).toBe("b");
  expect(state.get("calls")).toBe(1);
  expect(state.get("seen")).toBe("b");
  expect(state.get("event")).toBe("b");
  expect(
    container.querySelectorAll('[role="tab"]')[1].getAttribute("aria-selected"),
  ).toBe("true");
  expect(container.querySelector('[role="tabpanel"]')?.textContent).toBe(
    "Beta panel",
  );
});
it("honors an explicit handler override back to the previous selection", async () => {
  await render({ action: "setState", key: "active", value: "a" });
  await chooseBeta();
  expect(state.get("active")).toBe("a");
  expect(
    container.querySelectorAll('[role="tab"]')[0].getAttribute("aria-selected"),
  ).toBe("true");
});
it("preserves named selection when no callback is supplied", async () => {
  await render(null);
  await chooseBeta();
  expect(state.get("active")).toBe("b");
});

it("keeps named selection with an empty change-action list", async () => {
  await render([]);
  await chooseBeta();
  expect(state.get("active")).toBe("b");
});
