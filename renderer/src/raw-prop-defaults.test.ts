import { describe, expect, it } from "vitest";
import { applyRawPropDefaults } from "./raw-prop-defaults";

const chartTypes = [
  "BarChart",
  "LineChart",
  "AreaChart",
  "PieChart",
  "ScatterChart",
  "RadarChart",
  "RadialChart",
];

describe("applyRawPropDefaults", () => {
  it.each(chartTypes)("disables animation for reactive %s data", (type) => {
    expect(applyRawPropDefaults(type, { data: "{{ rows }}" })).toEqual({
      data: "{{ rows }}",
      animate: false,
    });
  });

  it("preserves an explicit animation setting", () => {
    expect(
      applyRawPropDefaults("BarChart", {
        data: "{{ rows }}",
        animate: true,
      }),
    ).toEqual({ data: "{{ rows }}", animate: true });
  });

  it("leaves literal chart data at the component default", () => {
    const props = { data: [{ value: 1 }] };
    expect(applyRawPropDefaults("BarChart", props)).toBe(props);
  });

  it("does not change non-chart reactive data", () => {
    const props = { data: "{{ rows }}" };
    expect(applyRawPropDefaults("DataTable", props)).toBe(props);
  });
});
