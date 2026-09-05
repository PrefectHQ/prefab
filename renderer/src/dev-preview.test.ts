// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { DevPreview } from "./dev-preview";
import counter from "./testing/counter-app.json";

vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);

let root: Root;

afterEach(async () => {
  await act(async () => root?.unmount());
  document.body.innerHTML = "";
  window.location.hash = "";
});

it("runs app-provided tools in development previews", async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);

  await act(async () =>
    root.render(
      createElement(DevPreview, {
        injected: {
          tree: counter.view,
          data: {},
          state: counter.state,
          tools: counter.tools,
        },
      }),
    ),
  );

  expect(container.querySelector("span")?.textContent).toBe("0");
  await act(async () => container.querySelector("button")!.click());
  expect(container.querySelector("span")?.textContent).toBe("1");
});
