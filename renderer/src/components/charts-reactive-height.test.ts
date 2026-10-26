// @vitest-environment jsdom
import { act, createElement as h } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { RenderTree } from "../renderer";
import { useStateStore, type StateStore } from "../state";
import { SCHEMA_REGISTRY } from "../schemas";

vi.mock("./registry", async (importOriginal) => {
  const original = await importOriginal<typeof import("./registry")>();
  const { PrefabBarChart } = await import("./charts");
  return {
    ...original,
    REGISTRY: { ...original.REGISTRY, BarChart: PrefabBarChart },
  };
});

const chartTypes = [
  "BarChart",
  "LineChart",
  "AreaChart",
  "ScatterChart",
  "PieChart",
  "RadarChart",
  "RadialChart",
  "WaterfallChart",
  "Sparkline",
];

it.each(chartTypes)(
  "accepts reactive %s height before interpolation",
  (type) => {
    expect(
      SCHEMA_REGISTRY[type].safeParse({
        type,
        data: [],
        series: [],
        xAxis: "x",
        yAxis: "y",
        dataKey: "value",
        nameKey: "name",
        height: "{{ rows.length * 30 }}",
      }).success,
    ).toBe(true);
  },
);

it("updates BarChart height when its ForEach item changes", async () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  const container = document.createElement("div");
  const root = createRoot(container);
  let state: StateStore;
  function Harness() {
    state = useStateStore({ groups: [[{ value: 1 }, { value: 2 }]] });
    return h(RenderTree, {
      tree: {
        type: "ForEach",
        key: "groups",
        children: [
          {
            type: "BarChart",
            data: "{{ $item }}",
            series: [{ dataKey: "value" }],
            height: "{{ $item.length * 30 }}",
            horizontal: true,
            animate: false,
          },
        ],
      },
      state,
      app: null,
    });
  }
  try {
    await act(async () => root.render(h(Harness)));
    expect(
      container.querySelector<HTMLElement>("[data-chart]")?.style.height,
    ).toBe("60px");
    await act(async () =>
      state.set("groups", [[{ value: 1 }, { value: 2 }, { value: 3 }]]),
    );
    expect(
      container.querySelector<HTMLElement>("[data-chart]")?.style.height,
    ).toBe("90px");
  } finally {
    await act(async () => root.unmount());
    vi.unstubAllGlobals();
  }
});
