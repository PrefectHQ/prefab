// @vitest-environment jsdom
import {
  act,
  createElement as h,
  StrictMode,
  useEffect,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { ShadowPreview } from "./shadow-preview";
vi.mock("./index.css?inline", () => ({ default: "" }));
vi.mock("sonner/dist/styles.css?inline", () => ({ default: "" }));

it("preserves mounted React state and deferred work while styles and mode change", async () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.useFakeTimers();
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  let mounts = 0;
  function Counter() {
    const [value, setValue] = useState(0);
    useEffect(() => {
      mounts++;
      const timer = setInterval(() => setValue((n) => n + 1), 100);
      return () => clearInterval(timer);
    }, []);
    return h(
      "button",
      { onClick: () => setValue((n) => n + 1) },
      String(value),
    );
  }
  const render = (css: string, dark: boolean) =>
    act(async () =>
      root.render(
        h(
          ShadowPreview,
          { css: [css], dark, stylesheets: ["https://example.com/font.css"] },
          h(Counter),
        ),
      ),
    );
  try {
    await render(".pf-button{color:red}", false);
    const host = container.querySelector<HTMLElement>("#pg-preview")!;
    const mount = host.shadowRoot!.querySelector("[data-prefab-mount]");
    await act(async () => host.shadowRoot!.querySelector("button")!.click());
    expect(host.shadowRoot!.querySelector("button")!.textContent).toBe("1");
    await render(".pf-button{color:blue}", true);
    expect(host.shadowRoot!.querySelector("[data-prefab-mount]")).toBe(mount);
    expect(host.shadowRoot!.querySelector("button")!.textContent).toBe("1");
    await act(async () => vi.advanceTimersByTimeAsync(100));
    expect(host.shadowRoot!.querySelector("button")!.textContent).toBe("2");
    expect(mounts).toBe(1);
    expect(
      document.querySelectorAll("[data-prefab-shadow-portal-host]"),
    ).toHaveLength(1);
  } finally {
    await act(async () => root.unmount());
    expect(vi.getTimerCount()).toBe(0);
    expect(
      document.querySelector("[data-prefab-shadow-portal-host]"),
    ).toBeNull();
    container.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  }
});

it("cleans up replayed StrictMode surfaces without duplicate portal hosts", async () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () =>
      root.render(
        h(StrictMode, null, h(ShadowPreview, { dark: false }, "Preview")),
      ),
    );
    expect(
      document.querySelectorAll("[data-prefab-shadow-portal-host]"),
    ).toHaveLength(1);
    expect(
      container.querySelector("#pg-preview")!.shadowRoot!.textContent,
    ).toContain("Preview");
  } finally {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  }
  expect(document.querySelector("[data-prefab-shadow-portal-host]")).toBeNull();
});

vi.mock("./shadow-utilities", () => ({
  startShadowUtilities: () => ({ dispose() {} }),
}));
