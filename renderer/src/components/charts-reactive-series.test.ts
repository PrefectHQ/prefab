// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { interpolateProps } from "../interpolation";
import { lineChartSchema } from "../schemas/chart";
import { PrefabLineChart } from "./charts";

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
  { month: "January", revenue: 10, costs: 8 },
  { month: "February", revenue: 20, costs: 12 },
];

describe("LineChart reactive series", () => {
  it("accepts a series template before interpolation", () => {
    expect(
      lineChartSchema.safeParse({
        type: "LineChart",
        data,
        series: "{{ chart_series }}",
      }).success,
    ).toBe(true);
  });

  it("renders only visible series after state changes", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const series = [
      { dataKey: "revenue", label: "Revenue", visible: true },
      { dataKey: "costs", label: "Costs", visible: false },
    ];
    async function render() {
      const props = interpolateProps(
        {
          data,
          series: "{{ chart_series | selectattr:'visible' }}",
          xAxis: "month",
          animate: false,
          showLegend: true,
        },
        { chart_series: series },
      );
      await act(async () => {
        root.render(
          React.createElement(
            PrefabLineChart,
            props as React.ComponentProps<typeof PrefabLineChart>,
          ),
        );
      });
    }
    try {
      await render();
      expect(container.querySelectorAll(".recharts-line")).toHaveLength(1);
      expect(
        container.querySelector(".recharts-legend-wrapper")?.textContent,
      ).toContain("Revenue");
      expect(
        container.querySelector(".recharts-legend-wrapper")?.textContent,
      ).not.toContain("Costs");
      series[1].visible = true;
      await render();
      expect(container.querySelectorAll(".recharts-line")).toHaveLength(2);
      expect(
        container.querySelector(".recharts-legend-wrapper")?.textContent,
      ).toContain("Costs");
      series[0].visible = false;
      series[1].visible = false;
      await render();
      expect(container.querySelectorAll(".recharts-line")).toHaveLength(0);
    } finally {
      await act(async () => root.unmount());
      container.remove();
    }
  });

  it("preserves explicit series colors when filtering and reordering", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const series = [
      { dataKey: "revenue", color: "var(--chart-1)", visible: true },
      { dataKey: "costs", color: "var(--chart-2)", visible: true },
    ];
    async function render() {
      const props = interpolateProps(
        {
          data,
          series: "{{ chart_series | selectattr:'visible' }}",
          animate: false,
        },
        { chart_series: series },
      );
      await act(async () => {
        root.render(
          React.createElement(
            PrefabLineChart,
            props as React.ComponentProps<typeof PrefabLineChart>,
          ),
        );
      });
      return Array.from(container.querySelectorAll("style"))
        .map((style) => style.textContent)
        .join("\n");
    }
    try {
      const initialCss = await render();
      expect(initialCss).toContain("--color-revenue: var(--chart-1)");
      expect(initialCss).toContain("--color-costs: var(--chart-2)");
      series.reverse();
      const reorderedCss = await render();
      expect(reorderedCss).toContain("--color-revenue: var(--chart-1)");
      expect(reorderedCss).toContain("--color-costs: var(--chart-2)");
      series[1].visible = false;
      const filteredCss = await render();
      expect(container.querySelectorAll(".recharts-line")).toHaveLength(1);
      expect(filteredCss).not.toContain("--color-revenue:");
      expect(filteredCss).toContain("--color-costs: var(--chart-2)");
      expect(
        container.querySelector(".recharts-line path")?.getAttribute("stroke"),
      ).toBe("var(--color-costs)");
    } finally {
      await act(async () => root.unmount());
      container.remove();
    }
  });

  it("waits for an unresolved series template", async () => {
    const container = document.createElement("div");
    const root = createRoot(container);
    try {
      await act(async () => {
        root.render(
          React.createElement(PrefabLineChart, {
            type: "LineChart",
            data,
            series: "{{ chart_series }}",
          }),
        );
      });
      expect(container.innerHTML).toBe("");
    } finally {
      await act(async () => root.unmount());
    }
  });
});
