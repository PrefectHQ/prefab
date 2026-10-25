// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

const h = React.createElement;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("requestAnimationFrame", () => 1);
  vi.stubGlobal("cancelAnimationFrame", () => {});
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    width: 600,
    height: 300,
    top: 0,
    left: 0,
    right: 600,
    bottom: 300,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Recharts content integration", () => {
  it("preserves dimensions, theme colors, and injected legend/tooltip content", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    try {
      await act(async () => {
        root.render(
          h(ChartContainer, {
            config: { revenue: { label: "Revenue", color: "#123456" } },
            children: h(
              BarChart,
              { data: [{ month: "January", revenue: 1234 }] },
              h(XAxis, { dataKey: "month" }),
              h(YAxis),
              h(Bar, {
                dataKey: "revenue",
                fill: "var(--color-revenue)",
                isAnimationActive: false,
              }),
              h(ChartLegend, { content: h(ChartLegendContent) }),
              h(ChartTooltip, {
                active: true,
                defaultIndex: 0,
                content: h(ChartTooltipContent, {
                  valueFormatter: (value: unknown) => `$${value}`,
                }),
              }),
            ),
          }),
        );
      });
      const svg = container.querySelector("svg.recharts-surface");
      expect(svg?.getAttribute("width")).toBe("600");
      expect(svg?.getAttribute("height")).toBe("300");
      expect(
        container.querySelector("style")?.parentElement?.textContent,
      ).toContain("--color-revenue: #123456");
      expect(
        container.querySelector(".recharts-legend-wrapper")?.textContent,
      ).toContain("Revenue");
      expect(
        container.querySelector(".recharts-tooltip-wrapper")?.textContent,
      ).toContain("$1234");
    } finally {
      await act(async () => root.unmount());
      container.remove();
    }
  });
});
