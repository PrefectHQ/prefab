// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Mermaid } from "./mermaid";

const mocks = vi.hoisted(() => ({ render: vi.fn(), initialize: vi.fn() }));
vi.mock("mermaid", () => ({ default: mocks }));

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  mocks.render.mockReset();
  mocks.render.mockResolvedValue({ svg: '<svg data-testid="diagram"></svg>' });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function show(chart: string) {
  await act(async () => root.render(createElement(Mermaid, { chart })));
}

describe("Mermaid updates", () => {
  it.each(["", "  \n ", " \n\t "])(
    "clears an existing diagram for %j",
    async (chart) => {
      await show("graph TD; A-->B");
      expect(container.querySelector("svg")).not.toBeNull();
      await show(chart);
      expect(container.querySelector("svg")).toBeNull();
      expect(container.textContent).toBe("");
      expect(mocks.render).toHaveBeenCalledTimes(1);
    },
  );

  it("recovers from invalid source when a valid diagram arrives", async () => {
    mocks.render.mockRejectedValueOnce(new Error("invalid diagram"));
    await show("invalid");
    expect(container.querySelector("pre")?.textContent).toBe("invalid");
    await show("graph TD; A-->B");
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("pre")).toBeNull();
  });

  it("clears the fallback when invalid source becomes empty", async () => {
    mocks.render.mockRejectedValueOnce(new Error("invalid diagram"));
    await show("invalid");
    await show("");
    expect(container.querySelector("pre")).toBeNull();
    expect(container.textContent).toBe("");
  });

  it("does not restore an in-flight diagram after clearing", async () => {
    let finish!: (result: { svg: string }) => void;
    mocks.render.mockReturnValueOnce(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    await show("graph TD; A-->B");
    expect(mocks.render).toHaveBeenCalledTimes(1);
    await show("");
    await act(async () => finish({ svg: "<svg></svg>" }));
    expect(container.querySelector("svg")).toBeNull();
    expect(container.textContent).toBe("");
  });
});

it("keeps names on the existing diagram root and error fallback", async () => {
  await act(async () =>
    root.render(
      createElement(Mermaid, {
        chart: "graph TD; A-->B",
        "aria-label": "Order flow",
      }),
    ),
  );
  expect(
    container.querySelector('div[aria-label="Order flow"] svg'),
  ).not.toBeNull();
  expect(
    container
      .querySelector('div[aria-label="Order flow"]')
      ?.getAttribute("role"),
  ).toBeNull();
  mocks.render.mockRejectedValueOnce(new Error("invalid diagram"));
  await act(async () =>
    root.render(
      createElement(Mermaid, { chart: "invalid", "aria-label": "Order flow" }),
    ),
  );
  expect(container.querySelector("pre")?.getAttribute("aria-label")).toBe(
    "Order flow",
  );
});
