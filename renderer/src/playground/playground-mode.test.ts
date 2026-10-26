// @vitest-environment jsdom
import { act, createElement as h } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Playground } from "./playground";
import presets from "./themes.json";

const { executePython } = vi.hoisted(() => ({ executePython: vi.fn() }));
vi.mock("./pyodide", () => ({
  loadPyodideRuntime: (status: (value: string) => void) => status("ready"),
  executePython,
}));
vi.mock("./editor", () => ({
  Editor: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) =>
    h("button", { onClick: () => onChange(`${value}\n# edit`) }, "Edit code"),
}));
vi.mock("../renderer", () => ({ RenderTree: () => h("div", null, "Preview") }));
vi.mock("./example-picker", () => ({ ExamplePicker: () => null }));
vi.mock("../index.css?inline", () => ({ default: "" }));
vi.mock("sonner/dist/styles.css?inline", () => ({ default: "" }));
vi.mock("../shadow-utilities", () => ({
  startShadowUtilities: () => ({ dispose() {} }),
}));

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.useFakeTimers();
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
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  executePython.mockReset();
  executePython.mockResolvedValue({
    tree: { type: "Text", content: "Preview" },
    mode: "light",
  });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  document.getElementById("pg-theme")?.remove();
  document.getElementById("pg-code-theme")?.remove();
  document.documentElement.classList.remove("dark");
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function render() {
  await act(async () => root.render(h(Playground)));
}

async function click(text: string) {
  const button = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent?.trim() === text,
  );
  expect(button).toBeDefined();
  await act(async () => button!.click());
}

async function choosePreset(name: string) {
  await act(async () =>
    (document.querySelector('[aria-label="Theme"]') as HTMLElement).click(),
  );
  await click(name);
}

async function rerunCode() {
  await click("Edit code");
  await act(async () => vi.advanceTimersByTimeAsync(250));
}

function isDark() {
  return document
    .getElementById("pg-preview")!
    .hasAttribute("data-prefab-dark");
}

it("keeps a dark preset when light-mode code reruns", async () => {
  await render();
  await choosePreset("MySpace");
  expect(isDark()).toBe(true);
  await rerunCode();
  expect(isDark()).toBe(true);
});

it("keeps a light preset when dark-mode code reruns", async () => {
  executePython.mockResolvedValue({ tree: { type: "Text" }, mode: "dark" });
  await render();
  await choosePreset("Windows 2000");
  expect(isDark()).toBe(false);
  await rerunCode();
  expect(isDark()).toBe(false);
});

it("returns to the code mode after choosing Code", async () => {
  await render();
  await choosePreset("MySpace");
  await click("Code");
  expect(isDark()).toBe(false);
  await rerunCode();
  expect(isDark()).toBe(false);
});

it("keeps an explicit manual toggle while a preset is active", async () => {
  await render();
  await choosePreset("MySpace");
  await act(async () =>
    (
      document.querySelector('[aria-label="Toggle dark mode"]') as HTMLElement
    ).click(),
  );
  expect(isDark()).toBe(false);
  executePython.mockResolvedValue({ tree: { type: "Text" }, mode: "dark" });
  await rerunCode();
  expect(isDark()).toBe(false);
});

it("releases the preset mode when entering custom CSS", async () => {
  await render();
  await choosePreset("MySpace");
  const input = document.querySelector("textarea")!;
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )!.set!.call(input, ":root { --primary: red; }");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await rerunCode();
  expect(isDark()).toBe(false);
});

it("restores a shared preset's mode before code executes", async () => {
  const css = presets.find((preset) => preset.name === "MySpace")!.css;
  window.history.replaceState(
    null,
    "",
    `/#theme=${encodeURIComponent(Buffer.from(css).toString("base64"))}`,
  );
  await render();
  expect(isDark()).toBe(true);
  await rerunCode();
  expect(isDark()).toBe(true);
});

it("keeps code-mode behavior when no preset is selected", async () => {
  await render();
  await act(async () =>
    (
      document.querySelector('[aria-label="Toggle dark mode"]') as HTMLElement
    ).click(),
  );
  expect(isDark()).toBe(true);
  await rerunCode();
  expect(isDark()).toBe(false);
});

it("uses the latest preset when an earlier code execution completes", async () => {
  let finish!: (result: { tree: { type: string }; mode: string }) => void;
  executePython.mockReturnValueOnce(
    new Promise((resolve) => {
      finish = resolve;
    }),
  );
  await render();
  await choosePreset("MySpace");
  await act(async () => finish({ tree: { type: "Text" }, mode: "light" }));
  expect(isDark()).toBe(true);
});

it("keeps manual toggles for mode-neutral presets across code reruns", async () => {
  executePython.mockResolvedValue({ tree: { type: "Text" }, mode: "dark" });
  await render();
  await choosePreset("Blue");
  await act(async () =>
    (
      document.querySelector('[aria-label="Toggle dark mode"]') as HTMLElement
    ).click(),
  );
  expect(isDark()).toBe(false);
  await rerunCode();
  expect(isDark()).toBe(false);
});

it("restores explicit shared mode when preset CSS no longer matches", async () => {
  const oldCss = ":root { --background: #123456; } /* old preset */";
  window.history.replaceState(
    null,
    "",
    `/#theme=${encodeURIComponent(
      Buffer.from(oldCss).toString("base64"),
    )}&themeMode=dark`,
  );
  await render();
  expect(isDark()).toBe(true);
  await rerunCode();
  expect(isDark()).toBe(true);
});

it("stores the effective preset mode in shared links including manual toggles", async () => {
  await render();
  await choosePreset("MySpace");
  expect(
    new URLSearchParams(window.location.hash.slice(1)).get("themeMode"),
  ).toBe("dark");
  await act(async () =>
    (
      document.querySelector('[aria-label="Toggle dark mode"]') as HTMLElement
    ).click(),
  );
  expect(
    new URLSearchParams(window.location.hash.slice(1)).get("themeMode"),
  ).toBe("light");
  await choosePreset("Code");
  expect(
    new URLSearchParams(window.location.hash.slice(1)).has("themeMode"),
  ).toBe(false);
});
