// @vitest-environment jsdom

import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Mermaid } from "./mermaid";

const { renderDiagram } = vi.hoisted(() => ({ renderDiagram: vi.fn() }));

vi.mock("mermaid", () => ({
  default: { initialize: vi.fn(), render: renderDiagram },
}));

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  renderDiagram.mockReset();
  renderDiagram.mockResolvedValue({ svg: '<svg data-diagram="ready"></svg>' });
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function updateChart(chart: string) {
  await act(async () => root.render(createElement(Mermaid, { chart })));
}

describe("clearing Mermaid diagrams", () => {
  it.each(["", " \n\t "])(
    "removes a rendered diagram for %j",
    async (empty) => {
      await updateChart("graph TD; A-->B");
      expect(container.querySelector("svg")).not.toBeNull();

      await updateChart(empty);

      expect(container.querySelector("svg")).toBeNull();
      expect(container.textContent).toBe("");
      expect(renderDiagram).toHaveBeenCalledTimes(1);
    },
  );

  it("does not restore an in-flight diagram after clearing", async () => {
    let finish!: (result: { svg: string }) => void;
    renderDiagram.mockReturnValueOnce(
      new Promise<{ svg: string }>((resolve) => {
        finish = resolve;
      }),
    );
    await updateChart("graph TD; A-->B");
    expect(renderDiagram).toHaveBeenCalledTimes(1);

    await updateChart("");
    await act(async () => finish({ svg: "<svg></svg>" }));

    expect(container.querySelector("svg")).toBeNull();
    expect(container.textContent).toBe("");
  });
});
