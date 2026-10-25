// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrefabWaterfallChart } from "./waterfall-chart";

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(performance.now()), 16),
  );
  vi.stubGlobal("cancelAnimationFrame", (id: number) =>
    window.clearTimeout(id),
  );
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
  { label: "Start", value: 10, total: true },
  { label: "Sales", value: 5 },
  { label: "Costs", value: -8 },
  { label: "Reset", value: 4, total: true },
  { label: "Loss", value: -6 },
  { label: "Recovery", value: 3 },
  { label: "End", value: 1, total: true },
];
const common = {
  type: "WaterfallChart" as const,
  data,
  dataKey: "value",
  nameKey: "label",
  totalKey: "total",
  animate: false,
  increaseColor: "#111111",
  decreaseColor: "#222222",
  totalColor: "#333333",
};

async function withChart(
  props: Partial<React.ComponentProps<typeof PrefabWaterfallChart>>,
  check: (container: HTMLDivElement) => void | Promise<void>,
) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () =>
      root.render(
        React.createElement(PrefabWaterfallChart, { ...common, ...props }),
      ),
    );
    await check(container);
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
}

function bars(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll(".recharts-bar-rectangle path"),
  ).filter((bar) =>
    ["#111111", "#222222", "#333333"].includes(bar.getAttribute("fill") ?? ""),
  );
}
function numberAttr(node: Element, attr: string) {
  return Number(node.getAttribute(attr));
}

describe("WaterfallChart", () => {
  it("renders positive and negative deltas, zero crossings, and total resets", async () => {
    await withChart({}, (container) => {
      const rectangles = bars(container);
      expect(rectangles).toHaveLength(7);
      const first = rectangles[0];
      const zeroY = numberAttr(first, "y") + numberAttr(first, "height");
      const unit = numberAttr(first, "height") / 10;
      const spans = [
        [0, 10],
        [10, 15],
        [15, 7],
        [0, 4],
        [4, -2],
        [-2, 1],
        [0, 1],
      ];
      for (const [index, [start, end]] of spans.entries()) {
        expect(numberAttr(rectangles[index], "y")).toBeCloseTo(
          zeroY - Math.max(start, end) * unit,
        );
        expect(numberAttr(rectangles[index], "height")).toBeCloseTo(
          Math.abs(end - start) * unit,
        );
      }
      expect(rectangles.map((bar) => bar.getAttribute("fill"))).toEqual([
        "#333333",
        "#111111",
        "#222222",
        "#333333",
        "#222222",
        "#111111",
        "#333333",
      ]);
    });
  });

  it("connects adjacent bar edges at the previous running total", async () => {
    await withChart({}, (container) => {
      const rectangles = bars(container);
      const lines = Array.from(
        container.querySelectorAll(".pf-waterfall-connectors line"),
      );
      expect(lines).toHaveLength(data.length - 1);
      const endsAtBottom = [false, false, true, false, true, false];
      for (const [index, line] of lines.entries()) {
        expect(numberAttr(line, "x1")).toBeCloseTo(
          numberAttr(rectangles[index], "x") +
            numberAttr(rectangles[index], "width"),
        );
        expect(numberAttr(line, "x2")).toBeCloseTo(
          numberAttr(rectangles[index + 1], "x"),
        );
        const expectedY =
          numberAttr(rectangles[index], "y") +
          (endsAtBottom[index] ? numberAttr(rectangles[index], "height") : 0);
        expect(numberAttr(line, "y1")).toBeCloseTo(expectedY);
        expect(numberAttr(line, "y2")).toBeCloseTo(expectedY);
      }
    });
  });

  it("shows meaningful category names in the legend", async () => {
    await withChart({}, (container) => {
      const legend = container.querySelector(
        ".recharts-legend-wrapper",
      )?.textContent;
      expect(legend).toContain("Increase");
      expect(legend).toContain("Decrease");
      expect(legend).toContain("Total");
      expect(legend).not.toContain("__value");
      expect(
        (container.querySelector("[data-chart]") as HTMLElement).style.height,
      ).toBe("300px");
    });
  });

  it.each([
    [1, "+$5.00"],
    [2, "-$8.00"],
    [3, "$4.00"],
  ] as const)("formats the tooltip for row %s", async (index, expected) => {
    await withChart({ valueFormat: "currency" }, async (container) => {
      const rectangle = bars(container)[index];
      const wrapper = container.querySelector(".recharts-wrapper")!;
      await act(async () => {
        wrapper.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            clientX:
              numberAttr(rectangle, "x") + numberAttr(rectangle, "width") / 2,
            clientY:
              numberAttr(rectangle, "y") + numberAttr(rectangle, "height") / 2,
          }),
        );
        await vi.runAllTimersAsync();
      });
      expect(
        container.querySelector(".pf-waterfall-tooltip-value")?.textContent,
      ).toBe(expected);
    });
  });

  it("keeps connector edges correct without a visible value axis or unique labels", async () => {
    await withChart(
      {
        showYAxis: false,
        data: data.map((row) => ({ ...row, label: "Repeated" })),
      },
      (container) => {
        const rectangles = bars(container);
        const lines = Array.from(
          container.querySelectorAll(".pf-waterfall-connectors line"),
        );
        expect(lines).toHaveLength(data.length - 1);
        for (const [index, line] of lines.entries()) {
          expect(numberAttr(line, "x1")).toBeCloseTo(
            numberAttr(rectangles[index], "x") +
              numberAttr(rectangles[index], "width"),
          );
          expect(numberAttr(line, "x2")).toBeCloseTo(
            numberAttr(rectangles[index + 1], "x"),
          );
        }
      },
    );
  });

  it("connects negative totals at their ending value", async () => {
    await withChart(
      {
        data: [
          { label: "Total", value: -5, total: true },
          { label: "Loss", value: -2 },
        ],
      },
      (container) => {
        const first = bars(container)[0];
        const line = container.querySelector(".pf-waterfall-connectors line")!;
        expect(numberAttr(line, "y1")).toBeCloseTo(
          numberAttr(first, "y") + numberAttr(first, "height"),
        );
      },
    );
  });

  it("omits connectors when disabled and handles empty data", async () => {
    await withChart({ showConnectors: false }, (container) => {
      expect(
        container.querySelectorAll(".pf-waterfall-connectors line"),
      ).toHaveLength(0);
    });
    await withChart({ data: [] }, (container) => {
      expect(bars(container)).toHaveLength(0);
      expect(
        container.querySelectorAll(".pf-waterfall-connectors line"),
      ).toHaveLength(0);
    });
  });
});
