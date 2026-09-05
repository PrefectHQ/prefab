/** Defaults that depend on the un-interpolated wire representation. */

const CHART_TYPES = new Set([
  "BarChart",
  "LineChart",
  "AreaChart",
  "PieChart",
  "ScatterChart",
  "RadarChart",
  "RadialChart",
]);

/**
 * Disable Recharts animation when protocol JSON binds chart data reactively.
 *
 * Python applies the same default for `Rx` values, but raw protocol JSON can
 * reach the renderer directly. This must run before interpolation so a data
 * template is still distinguishable from a literal array.
 */
export function applyRawPropDefaults(
  type: string,
  props: Record<string, unknown>,
): Record<string, unknown> {
  if (
    CHART_TYPES.has(type) &&
    typeof props.data === "string" &&
    props.animate === undefined
  ) {
    return { ...props, animate: false };
  }

  return props;
}
