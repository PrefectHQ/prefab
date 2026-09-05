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

function containsBinding(value: unknown): boolean {
  if (typeof value === "string") {
    return value.includes("{{") && value.includes("}}");
  }
  if (Array.isArray(value)) {
    return value.some(containsBinding);
  }
  if (value !== null && typeof value === "object") {
    return Object.values(value).some(containsBinding);
  }
  return false;
}

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
    (typeof props.data === "string" || containsBinding(props.data)) &&
    props.animate === undefined
  ) {
    return { ...props, animate: false };
  }

  return props;
}
