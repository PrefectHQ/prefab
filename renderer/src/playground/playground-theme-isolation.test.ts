// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { Playground } from "./playground";
vi.mock("./editor", () => ({ Editor: () => null }));
vi.mock("./example-picker", () => ({ ExamplePicker: () => null }));
vi.mock("./pyodide", () => ({
  loadPyodideRuntime: async (status: (s: string) => void) => status("ready"),
  executePython: async () => ({
    tree: { type: "Button", label: "Preview" },
    state: {},
    css: [".pf-popover-content { border: 7px solid rgb(201, 42, 63); }"],
  }),
}));
vi.mock("../index.css?inline", () => ({ default: "" }));
vi.mock("sonner/dist/styles.css?inline", () => ({ default: "" }));
it("keeps preview CSS away from the real toolbar ThemePicker popover", async () => {
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
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => root.render(createElement(Playground)));
    await act(async () =>
      container
        .querySelector<HTMLButtonElement>('[aria-label="Theme"]')!
        .click(),
    );
    const popup = document.querySelector<HTMLElement>(".pf-popover-content")!;
    expect(popup).not.toBeNull();
    // JSDOM adds shadow sheets to document.styleSheets, so computed isolation
    // is verified in the browser fixture. Here enforce actual DOM ownership.
    expect(popup.getRootNode()).toBe(document);
    expect(
      Array.from(document.head.querySelectorAll("style")).some((style) =>
        style.textContent?.includes("border: 7px solid rgb(201, 42, 63)"),
      ),
    ).toBe(false);
    const preview = container.querySelector("#pg-preview")!.shadowRoot!;
    expect(
      preview.querySelector("[data-prefab-shadow-css]")?.textContent,
    ).toContain(".pf-popover-content { border: 7px solid rgb(201, 42, 63); }");
    const overlay = document.querySelector(
      "[data-prefab-shadow-portal-host]",
    )!.shadowRoot!;
    expect(
      overlay.querySelector("[data-prefab-shadow-css]")?.textContent,
    ).toContain(".pf-popover-content");
  } finally {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  }
});

vi.mock("../shadow-utilities", () => ({
  startShadowUtilities: () => ({ dispose() {} }),
}));
