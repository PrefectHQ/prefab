// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrefabBarChart, PrefabLineChart } from "./charts";

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("requestAnimationFrame", () => 1);
  vi.stubGlobal("cancelAnimationFrame", () => {});
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(private callback: ResizeObserverCallback) {}
      observe(target: Element) {
        this.callback(
          [
            {
              target,
              contentRect: { width: 600, height: 300 },
            } as ResizeObserverEntry,
          ],
          this as unknown as ResizeObserver,
        );
      }
      unobserve() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      return {
        width: 600,
        height: this.classList.contains("recharts-legend-wrapper") ? 20 : 300,
        top: 0,
        left: 0,
        right: 600,
        bottom: 300,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      };
    },
  );
});

afterEach(async () => {
  // Recharts' Redux store batches with a fallback timeout even when RAF is
  // stubbed. Drain it after unmount while its cancellation globals still exist.
  await act(async () => {
    await vi.runAllTimersAsync();
  });
  expect(vi.getTimerCount()).toBe(0);
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const data = [
  { month: "January", users: 10 },
  { month: "February", users: 20 },
];
const common = {
  data,
  series: [{ dataKey: "users" }],
  xAxis: "month",
  animate: false,
};

async function withChart(
  element: React.ReactElement,
  check: (container: HTMLDivElement) => void,
) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => root.render(element));
    check(container);
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
}

function label(container: HTMLElement, text: string) {
  return Array.from(container.querySelectorAll("text")).find(
    (node) => node.textContent === text,
  );
}

describe("Chart axis titles", () => {
  it("places vertical bar titles on their category and value axes", async () => {
    await withChart(
      React.createElement(PrefabBarChart, {
        type: "BarChart",
        ...common,
        xAxisLabel: "Month",
        yAxisLabel: "Users",
      }),
      (container) => {
        expect(label(container, "Month")).toBeTruthy();
        expect(label(container, "Users")).toBeTruthy();
        expect(
          label(container, "Users")?.classList.contains("pf-chart-axis-title"),
        ).toBe(true);
        expect(label(container, "Users")?.getAttribute("transform")).toContain(
          "rotate(-90",
        );
        expect(
          label(container, "Month")?.getAttribute("transform") ?? "",
        ).not.toContain("rotate");
      },
    );
  });

  it("places horizontal bar category title left and value title below", async () => {
    await withChart(
      React.createElement(PrefabBarChart, {
        type: "BarChart",
        ...common,
        horizontal: true,
        xAxisLabel: "Month",
        yAxisLabel: "Users",
      }),
      (container) => {
        expect(label(container, "Month")?.getAttribute("transform")).toContain(
          "rotate(-90",
        );
        expect(label(container, "Users")).toBeTruthy();
        expect(
          label(container, "Users")?.classList.contains("pf-chart-axis-title"),
        ).toBe(true);
        expect(
          label(container, "Users")?.getAttribute("transform") ?? "",
        ).not.toContain("rotate");
        const monthX = Number(label(container, "Month")?.getAttribute("x"));
        const usersX = Number(label(container, "Users")?.getAttribute("x"));
        const monthY = Number(label(container, "Month")?.getAttribute("y"));
        const usersY = Number(label(container, "Users")?.getAttribute("y"));
        expect(monthX).toBeLessThan(usersX);
        expect(usersY).toBeGreaterThan(monthY);
        expect(usersY).toBeLessThanOrEqual(300);
      },
    );
  });

  it("renders line-chart axis titles", async () => {
    await withChart(
      React.createElement(PrefabLineChart, {
        type: "LineChart",
        ...common,
        xAxisLabel: "Month",
        yAxisLabel: "Users",
      }),
      (container) => {
        expect(label(container, "Month")).toBeTruthy();
        expect(label(container, "Users")).toBeTruthy();
        expect(
          label(container, "Users")?.classList.contains("pf-chart-axis-title"),
        ).toBe(true);
      },
    );
  });

  it.each([false, true])(
    "keeps the value title hidden when showYAxis is false (horizontal=%s)",
    async (horizontal) => {
      await withChart(
        React.createElement(PrefabBarChart, {
          type: "BarChart",
          ...common,
          horizontal,
          showYAxis: false,
          yAxisLabel: "Users",
        }),
        (container) => expect(label(container, "Users")).toBeUndefined(),
      );
    },
  );

  it.each([
    {
      title: "category",
      xAxisLabel: "Month",
      yAxisLabel: undefined,
      left: "116",
      height: "290",
    },
    {
      title: "value",
      xAxisLabel: undefined,
      yAxisLabel: "Users",
      left: "65",
      height: "225",
    },
  ])(
    "reserves horizontal $title title space on the correct side",
    async ({ xAxisLabel, yAxisLabel, left, height }) => {
      await withChart(
        React.createElement(PrefabBarChart, {
          type: "BarChart",
          ...common,
          horizontal: true,
          xAxisLabel,
          yAxisLabel,
        }),
        (container) => {
          const plot = container.querySelector("clipPath rect");
          expect(plot?.getAttribute("x")).toBe(left);
          expect(plot?.getAttribute("height")).toBe(height);
        },
      );
    },
  );

  it("preserves existing margins and legend spacing without axis titles", async () => {
    await withChart(
      React.createElement(PrefabBarChart, {
        type: "BarChart",
        ...common,
        showLegend: true,
      }),
      (container) => {
        const plot = container.querySelector("clipPath rect");
        expect(plot?.getAttribute("x")).toBe("65");
        expect(plot?.getAttribute("y")).toBe("5");
        expect(
          (container.querySelector(".recharts-legend-wrapper") as HTMLElement)
            .style.paddingTop,
        ).toBe("");
        expect(
          container.querySelector(".recharts-legend-wrapper .pt-3"),
        ).toBeTruthy();
      },
    );
  });
});
