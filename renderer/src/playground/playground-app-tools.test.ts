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
vi.mock("./theme-picker", () => ({
  ThemePicker: ({ onChange }: { onChange: (css: string) => void }) =>
    createElement(
      "button",
      { onClick: () => onChange(".pf-button { color: red; }") },
      "Change theme",
    ),
}));
vi.mock("../index.css?inline", () => ({ default: "" }));
vi.mock("sonner/dist/styles.css?inline", () => ({ default: "" }));
vi.mock("../shadow-utilities", () => ({
  startShadowUtilities: () => ({ dispose() {} }),
}));
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
  const preview = container.querySelector("#pg-preview")!.shadowRoot!;
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

it.each([false, true])(
  "keeps a live interval across CSS and dark changes and disposes it on unmount (app tool: %s)",
  async (appTool) => {
    vi.useFakeTimers();
    const interval = {
      action: "setInterval",
      duration: 100,
      onTick: { action: "setState", key: "count", value: "{{ count + 1 }}" },
    };
    vi.mocked(executePython).mockResolvedValue({
      tree: {
        type: "Column",
        children: [
          { type: "Text", content: "{{ count }}" },
          {
            type: "Button",
            label: "Start",
            onClick: appTool
              ? { action: "invokeAppTool", tool: "start" }
              : interval,
          },
        ],
      },
      state: { count: 0 },
      tools: [
        {
          name: "start",
          inputSchema: { type: "object" },
          result: {},
          actions: interval,
        },
      ],
    } as Awaited<ReturnType<typeof executePython>>);
    const container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    await act(async () => root.render(createElement(Playground)));
    await act(async () => vi.advanceTimersByTimeAsync(250));
    const host = container.querySelector("#pg-preview")!;
    const preview = host.shadowRoot!;
    const mount = preview.querySelector("[data-prefab-mount]");
    await act(async () => preview.querySelector("button")!.click());
    await act(async () => vi.advanceTimersByTimeAsync(100));
    expect(preview.querySelector("span")?.textContent).toBe("1");
    const theme = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "Change theme",
    )!;
    await act(async () => theme.click());
    expect(preview.querySelector("[data-prefab-mount]")).toBe(mount);
    await act(async () => vi.advanceTimersByTimeAsync(100));
    expect(preview.querySelector("span")?.textContent).toBe("2");
    await act(async () =>
      container
        .querySelector<HTMLButtonElement>('[aria-label="Toggle dark mode"]')!
        .click(),
    );
    await act(async () => vi.advanceTimersByTimeAsync(100));
    expect(preview.querySelector("span")?.textContent).toBe("3");
    await act(async () => root.unmount());
    expect(vi.getTimerCount()).toBe(0);
  },
);

it("keeps an in-flight app-tool Fetch attached to the same store when CSS changes", async () => {
  let finish!: (response: Response) => void;
  let signal: AbortSignal | undefined;
  const fetcher = vi
    .spyOn(globalThis, "fetch")
    .mockImplementation((_url, init) => {
      signal = init?.signal ?? undefined;
      return new Promise((resolve) => {
        finish = resolve;
      });
    });
  vi.mocked(executePython).mockResolvedValue({
    tree: {
      type: "Column",
      children: [
        { type: "Text", content: "{{ count }}" },
        {
          type: "Button",
          label: "Load",
          onClick: { action: "invokeAppTool", tool: "load" },
        },
      ],
    },
    state: { count: 0 },
    tools: [
      {
        name: "load",
        inputSchema: { type: "object" },
        result: {},
        actions: {
          action: "fetch",
          url: "https://example.com/data",
          onSuccess: {
            action: "setState",
            key: "count",
            value: "{{ $result.count }}",
          },
        },
      },
    ],
  } as Awaited<ReturnType<typeof executePython>>);
  const container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  try {
    await act(async () => root.render(createElement(Playground)));
    await act(async () => vi.advanceTimersByTimeAsync(250));
    const preview = container.querySelector("#pg-preview")!.shadowRoot!;
    await act(async () => preview.querySelector("button")!.click());
    expect(signal?.aborted).toBe(false);
    await act(async () =>
      Array.from(container.querySelectorAll("button"))
        .find((button) => button.textContent === "Change theme")!
        .click(),
    );
    expect(signal?.aborted).toBe(false);
    await act(async () =>
      finish(
        new Response('{"count":7}', {
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    expect(preview.querySelector("span")?.textContent).toBe("7");
  } finally {
    fetcher.mockRestore();
  }
});
