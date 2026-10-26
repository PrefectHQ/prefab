/**
 * WaterfallChart — floating bars showing sequential increases/decreases
 * building to a total, with optional dashed "bridge" connector lines.
 */

import {
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";
import {
  Bar,
  ComposedChart,
  Rectangle,
  usePlotArea,
  type BarShapeProps,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ui/chart";
import { interpolateString } from "../interpolation";
import type { WaterfallChartWire } from "@/schemas/chart";

function getValueFormatter(format?: string) {
  if (!format || format === "auto") {
    return undefined;
  }
  return (value: unknown) => {
    const formatted = interpolateString(`{{ _v | ${format} }}`, { _v: value });
    return formatted == null ? "" : String(formatted);
  };
}

type WaterfallCategory = "increase" | "decrease" | "total";

const WATERFALL_CATEGORY_LABEL: Record<WaterfallCategory, string> = {
  increase: "Increase",
  decrease: "Decrease",
  total: "Total",
};

interface WaterfallRow extends Record<string, unknown> {
  __base: number;
  __value: number;
  __end: number;
  __category: WaterfallCategory;
}

// Computes each bar's floating base/height from a running total. Total rows
// reset the running total instead of stacking on the previous bar.
function buildWaterfallRows(
  data: Record<string, unknown>[],
  dataKey: string,
  totalKey: string | undefined,
): WaterfallRow[] {
  let running = 0;
  return data.map((row) => {
    const isTotal = totalKey ? Boolean(row[totalKey]) : false;
    const raw = Number(row[dataKey] ?? 0);
    const start = isTotal ? 0 : running;
    const end = isTotal ? raw : running + raw;
    running = end;
    return {
      ...row,
      __base: Math.min(start, end),
      __value: Math.abs(end - start),
      __end: end,
      __category: isTotal ? "total" : raw >= 0 ? "increase" : "decrease",
    };
  });
}

// Use the bar's public shape geometry so connector edges match the rendered
// rectangles. Category slots are uniformly spaced across the plot area.
function WaterfallBar({
  rows,
  showConnectors,
  ...bar
}: Partial<BarShapeProps> & { rows: WaterfallRow[]; showConnectors: boolean }) {
  const plot = usePlotArea();
  if (
    bar.x == null ||
    bar.y == null ||
    bar.width == null ||
    bar.height == null ||
    bar.index == null
  )
    return null;
  const row = rows[bar.index];
  if (!row) return null;
  const endsAtBottom =
    row.__category === "decrease" ||
    (row.__category === "total" && row.__end < 0);
  const endY = bar.y + (endsAtBottom ? bar.height : 0);
  return (
    <g>
      <Rectangle {...bar} />
      {showConnectors && plot && bar.index < rows.length - 1 && (
        <g className="pf-waterfall-connectors">
          <line
            x1={bar.x + bar.width}
            y1={endY}
            x2={bar.x + plot.width / rows.length}
            y2={endY}
            stroke="var(--color-muted-foreground)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        </g>
      )}
    </g>
  );
}

export function PrefabWaterfallChart({
  data = [],
  dataKey,
  nameKey,
  totalKey,
  height = 300,
  increaseColor,
  decreaseColor,
  totalColor,
  barRadius = 4,
  showConnectors = true,
  showLegend = true,
  showTooltip = true,
  animate = true,
  showGrid = true,
  showYAxis = true,
  valueFormat = "auto",
  className,
  id,
  ...accessibleName
}: WaterfallChartWire &
  AccessibleNameProps & { className?: string; id?: string }) {
  if (typeof data === "string") return null;

  const rows = buildWaterfallRows(data, dataKey, totalKey);
  const colors: Record<WaterfallCategory, string> = {
    increase: increaseColor ?? "var(--color-success)",
    decrease: decreaseColor ?? "var(--color-destructive)",
    total: totalColor ?? "var(--color-info)",
  };
  const categoriesPresent = Array.from(new Set(rows.map((r) => r.__category)));

  const config: ChartConfig = {};
  for (const cat of categoriesPresent) {
    config[cat] = { label: WATERFALL_CATEGORY_LABEL[cat], color: colors[cat] };
  }

  const valueFormatter = getValueFormatter(valueFormat);

  return (
    <div id={id} className={className}>
      <ChartContainer config={config} style={{ height, aspectRatio: "auto" }}>
        <ComposedChart {...getAccessibleNameProps(accessibleName)} data={rows}>
          {showGrid && <CartesianGrid vertical={false} />}
          <XAxis
            dataKey={nameKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          {showYAxis && (
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={valueFormatter}
            />
          )}
          {showTooltip && (
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideIndicator
                  formatter={(_value, _name, item) => {
                    const row = item.payload as WaterfallRow;
                    const isTotal = row.__category === "total";
                    const delta = isTotal ? row.__end : Number(row[dataKey]);
                    const sign = row.__category === "increase" ? "+" : "";
                    const display = valueFormatter
                      ? valueFormatter(delta)
                      : delta.toLocaleString();
                    return (
                      <div className="pf-waterfall-tooltip-row">
                        <span className="pf-waterfall-tooltip-label">
                          {WATERFALL_CATEGORY_LABEL[row.__category]}
                        </span>
                        <span className="pf-waterfall-tooltip-value">
                          {sign}
                          {display}
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />
          )}
          {showLegend && (
            <ChartLegend
              content={() => (
                <ChartLegendContent
                  payload={categoriesPresent.map((cat) => ({
                    value: cat,
                    dataKey: cat,
                    color: colors[cat],
                    type: "square" as const,
                  }))}
                />
              )}
            />
          )}
          <Bar
            dataKey="__base"
            stackId="wf"
            fill="transparent"
            isAnimationActive={false}
            legendType="none"
            tooltipType="none"
          />
          <Bar
            dataKey="__value"
            stackId="wf"
            radius={barRadius}
            shape={<WaterfallBar rows={rows} showConnectors={showConnectors} />}
            isAnimationActive={animate}
          >
            {rows.map((row, i) => (
              <Cell key={i} fill={colors[row.__category]} />
            ))}
          </Bar>
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
