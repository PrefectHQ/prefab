// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Playground } from "./playground";
import { executePython } from "./pyodide";
import counter from "../testing/counter-app.json";

vi.mock("./editor", () => ({
  Editor: ({ onChange }: { onChange: (value: string) => void }) =>
    createElement(
      "button",
      { onClick: () => onChange("replacement") },
      "Change code",
    ),
}));
vi.mock("./example-picker", () => ({ ExamplePicker: () => null }));
vi.mock("./theme-picker", () => ({ ThemePicker: () => null }));
vi.mock("./pyodide", () => ({
  loadPyodideRuntime: async (status: (value: string) => void) =>
    status("ready"),
  executePython: vi.fn(),
}));

let root: Root;
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
  vi.mocked(executePython).mockResolvedValue({
    tree: counter.view,
    state: counter.state,
    tools: counter.tools,
  } as Awaited<ReturnType<typeof executePython>>);
});

afterEach(async () => {
  await act(async () => root?.unmount());
  await vi.runOnlyPendingTimersAsync();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
  document
    .querySelectorAll("#pg-theme, #pg-code-theme")
    .forEach((node) => node.remove());
  window.history.replaceState(null, "", "/");
});

it("runs local app tools and replaces definitions when Python reruns", async () => {
  const container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(createElement(Playground)));
  const preview = container.querySelector("#pg-preview")!;
  await act(async () => preview.querySelector("button")!.click());
  expect(preview.textContent).toContain("1");

  await act(async () =>
    container
      .querySelector<HTMLButtonElement>('[aria-label="Edit JSON"]')!
      .click(),
  );
  await act(async () => vi.advanceTimersByTimeAsync(250));
  await act(async () => preview.querySelector("button")!.click());
  expect(preview.textContent).toContain("2");
  await act(async () =>
    container
      .querySelector<HTMLButtonElement>('[aria-label="Back to Python"]')!
      .click(),
  );

  vi.mocked(executePython).mockResolvedValue({
    tree: {
      type: "Column",
      children: [
        { type: "Text", content: "{{ count }}" },
        {
          type: "Button",
          label: "Reset",
          onClick: { action: "invokeAppTool", tool: "reset" },
        },
      ],
    },
    state: { count: 10 },
    tools: [
      {
        name: "reset",
        inputSchema: { type: "object" },
        actions: { action: "setState", key: "count", value: 0 },
        result: { count: "{{ count }}" },
      },
    ],
  } as Awaited<ReturnType<typeof executePython>>);
  const edit = Array.from(container.querySelectorAll("button")).find(
    (button) => button.textContent === "Change code",
  )!;
  await act(async () => edit.click());
  await act(async () => vi.advanceTimersByTimeAsync(250));
  expect(preview.textContent).toContain("Reset");
  await act(async () => preview.querySelector("button")!.click());
  expect(preview.textContent).toContain("0");
});
