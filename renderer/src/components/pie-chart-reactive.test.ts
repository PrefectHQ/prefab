// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { RenderNode } from "../renderer";
import { useStateStore, type StateStore } from "../state";

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

it("updates real pie sectors and legend when data and selected labels change", async () => {
  let state!: StateStore;
  const initial = {
    rows: [
      { label: "A", amount: 60 },
      { label: "B", amount: 40 },
    ],
    selected: ["A"],
  };
  function Harness() {
    state = useStateStore(initial);
    return React.createElement(RenderNode, {
      node: {
        type: "PieChart",
        data: "{{ rows }}",
        dataKey: "amount",
        nameKey: "label",
        aggregateExcept: "{{ selected }}",
        animate: false,
        showLegend: true,
      },
      scope: {},
      state,
      app: null,
    });
  }
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const sectors = () =>
    container.querySelectorAll(".recharts-pie-sector").length;
  try {
    await act(async () => root.render(React.createElement(Harness)));
    await act(async () => {
      await vi.dynamicImportSettled();
    });
    expect(sectors()).toBe(2);
    expect(container.textContent).toContain("A");
    expect(container.textContent).toContain("Other");
    expect(container.textContent).not.toContain("B");
    await act(async () => state.set("selected", ["B"]));
    expect(sectors()).toBe(2);
    expect(container.textContent).toContain("B");
    expect(container.textContent).not.toContain("A");
    await act(async () => state.set("rows", [{ label: "B", amount: 100 }]));
    expect(sectors()).toBe(1);
    expect(container.textContent).not.toContain("Other");
    await act(async () => state.set("selected", []));
    expect(sectors()).toBe(1);
    expect(container.textContent).toContain("Other");
    await act(async () => state.set("rows", [{ label: "B", amount: -1 }]));
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "finite non-negative",
    );
    await act(async () => state.set("rows", [{ label: "B", amount: 10 }]));
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(sectors()).toBe(1);
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
});

it("resolves inline reactive row values and labels before aggregation", async () => {
  let state!: StateStore;
  function Harness() {
    state = useStateStore({ amount: 60, label: "A", selected: ["A"] });
    return React.createElement(RenderNode, {
      node: {
        type: "PieChart",
        data: [
          { label: "{{ label }}", amount: "{{ amount }}" },
          { label: "B", amount: 40 },
        ],
        dataKey: "amount",
        nameKey: "label",
        aggregateExcept: "{{ selected }}",
        showLegend: true,
        animate: false,
      },
      scope: {},
      state,
      app: null,
    });
  }
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => root.render(React.createElement(Harness)));
    await act(async () => {
      await vi.dynamicImportSettled();
    });
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.querySelectorAll(".recharts-pie-sector")).toHaveLength(2);
    expect(container.textContent).toContain("A");
    expect(container.textContent).toContain("Other");
    await act(async () =>
      state.merge({ label: "Renamed", amount: 0, selected: ["Renamed", "B"] }),
    );
    expect(container.textContent).toContain("Renamed");
    expect(container.textContent).toContain("B");
    expect(container.textContent).not.toContain("Other");
    expect(container.querySelectorAll(".recharts-pie-sector")).toHaveLength(1);
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
});
