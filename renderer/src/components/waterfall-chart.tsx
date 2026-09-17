/**
 * WaterfallChart — floating bars showing sequential increases/decreases
 * building to a total, with optional dashed "bridge" connector lines.
 */

import {
  Bar,
  ComposedChart,
  Customized,
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

interface FormattedBarItem {
  item: { props?: { dataKey?: string } };
  props: {
    data?: { x: number; width: number }[];
  };
}

interface WaterfallConnectorsProps {
  rows: WaterfallRow[];
  yAxisMap?: Record<string | number, { scale: (value: number) => number }>;
  formattedGraphicalItems?: FormattedBarItem[];
}

// Draws dashed bridge lines only across the gap between one bar's edge and
// the next. Reads Recharts' own computed bar rects (formattedGraphicalItems)
// rather than the raw band scale, since Recharts renders bars narrower than
// their category slot (via barCategoryGap) and centers them within it.
function WaterfallConnectors({
  rows,
  yAxisMap,
  formattedGraphicalItems,
}: WaterfallConnectorsProps) {
  const yScale = yAxisMap ? Object.values(yAxisMap)[0]?.scale : undefined;
  const bars = formattedGraphicalItems?.find(
    (entry) => entry.item.props?.dataKey === "__value",
  )?.props.data;
  if (!yScale || !bars) return null;

  return (
    <g className="pf-waterfall-connectors">
      {rows.slice(0, -1).map((row, i) => {
        const bar = bars[i];
        const nextBar = bars[i + 1];
        if (!bar || !nextBar) return null;
        const y = yScale(row.__end);
        return (
          <line
            key={i}
            x1={bar.x + bar.width}
            y1={y}
            x2={nextBar.x}
            y2={y}
            stroke="var(--color-muted-foreground)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        );
      })}
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
}: WaterfallChartWire & { className?: string; id?: string }) {
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
        <ComposedChart data={rows}>
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
              content={<ChartLegendContent />}
              payload={categoriesPresent.map((cat) => ({
                value: cat,
                dataKey: cat,
                color: colors[cat],
                type: "square",
              }))}
            />
          )}
          {showConnectors && (
            <Customized component={<WaterfallConnectors rows={rows} />} />
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
