/**
 * Chart wrapper components — bridge Prefab's flat chart API to Recharts
 * primitives wrapped in shadcn's ChartContainer for theme integration.
 */

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/ui/chart";
import type {
  BarChartWire,
  LineChartWire,
  AreaChartWire,
  PieChartWire,
  RadarChartWire,
  RadialChartWire,
  ScatterChartWire,
} from "@/schemas/chart";

// Auto-assign chart CSS variable colors to series by index
const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

interface SeriesSpec {
  dataKey: string;
  label?: string;
  color?: string;
}

function buildConfig(series: SeriesSpec[]): ChartConfig {
  const config: ChartConfig = {};
  for (let i = 0; i < series.length; i++) {
    const s = series[i];
    config[s.dataKey] = {
      label: s.label ?? s.dataKey,
      color: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
    };
  }
  return config;
}

function buildPieConfig(
  data: Record<string, unknown>[],
  nameKey: string,
): ChartConfig {
  const config: ChartConfig = {};
  for (let i = 0; i < data.length; i++) {
    const name = String(data[i][nameKey] ?? `item-${i}`);
    config[name] = {
      label: name,
      color: CHART_COLORS[i % CHART_COLORS.length],
    };
  }
  return config;
}

// -- BarChart --

export function PrefabBarChart({
  data = [],
  series,
  xAxis,
  height = 300,
  stacked = false,
  horizontal = false,
  barRadius = 4,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: BarChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer
      config={config}
      className={className}
      style={{ height, aspectRatio: "auto" }}
    >
      <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"}>
        {showGrid && (
          <CartesianGrid vertical={horizontal} horizontal={!horizontal} />
        )}
        {horizontal && xAxis && (
          <YAxis
            dataKey={xAxis}
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {horizontal && <XAxis type="number" hide />}
        {!horizontal && xAxis && (
          <XAxis
            dataKey={xAxis}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            fill={`var(--color-${s.dataKey})`}
            radius={barRadius}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

// Map user-facing curve names to Recharts curve types
const CURVE_MAP: Record<string, string> = {
  linear: "linear",
  smooth: "monotone",
  step: "step",
};

// -- LineChart --

export function PrefabLineChart({
  data = [],
  series,
  xAxis,
  height = 300,
  curve = "linear",
  showDots = false,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: LineChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer
      config={config}
      className={className}
      style={{ height, aspectRatio: "auto" }}
    >
      <LineChart data={data}>
        {showGrid && <CartesianGrid vertical={false} />}
        {xAxis && (
          <XAxis
            dataKey={xAxis}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Line
            key={s.dataKey}
            dataKey={s.dataKey}
            type={(CURVE_MAP[curve] ?? curve) as "linear" | "monotone" | "step"}
            stroke={`var(--color-${s.dataKey})`}
            strokeWidth={2}
            dot={showDots}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

// -- AreaChart --

export function PrefabAreaChart({
  data = [],
  series,
  xAxis,
  height = 300,
  stacked = false,
  curve = "linear",
  showDots = false,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: AreaChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer
      config={config}
      className={className}
      style={{ height, aspectRatio: "auto" }}
    >
      <AreaChart data={data}>
        {showGrid && <CartesianGrid vertical={false} />}
        {xAxis && (
          <XAxis
            dataKey={xAxis}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Area
            key={s.dataKey}
            dataKey={s.dataKey}
            type={(CURVE_MAP[curve] ?? curve) as "linear" | "monotone" | "step"}
            fill={`var(--color-${s.dataKey})`}
            stroke={`var(--color-${s.dataKey})`}
            fillOpacity={0.4}
            dot={showDots}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

// -- PieChart --

export function PrefabPieChart({
  data = [],
  dataKey,
  nameKey,
  height = 300,
  innerRadius = 0,
  showLabel = false,
  paddingAngle = 0,
  showLegend = false,
  showTooltip = true,
  className,
}: PieChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildPieConfig(data, nameKey);

  // Inject fill colors into data so Recharts renders them
  const coloredData = data.map((d, i) => ({
    ...d,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <ChartContainer
      config={config}
      className={className}
      style={{ height, aspectRatio: "auto" }}
    >
      <PieChart>
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        )}
        <Pie
          data={coloredData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          label={showLabel}
          paddingAngle={paddingAngle}
        />
      </PieChart>
    </ChartContainer>
  );
}

// -- RadarChart --

export function PrefabRadarChart({
  data = [],
  series,
  axisKey,
  height = 300,
  filled = true,
  showDots = false,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: RadarChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer
      config={config}
      className={className}
      style={{ height, aspectRatio: "auto" }}
    >
      <RadarChart data={data}>
        {showGrid && <PolarGrid />}
        {axisKey && <PolarAngleAxis dataKey={axisKey} />}
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Radar
            key={s.dataKey}
            dataKey={s.dataKey}
            fill={`var(--color-${s.dataKey})`}
            fillOpacity={filled ? 0.3 : 0}
            stroke={`var(--color-${s.dataKey})`}
            strokeWidth={2}
            dot={showDots}
          />
        ))}
      </RadarChart>
    </ChartContainer>
  );
}

// -- RadialChart --

export function PrefabRadialChart({
  data = [],
  dataKey,
  nameKey,
  height = 300,
  innerRadius = 30,
  startAngle = 180,
  endAngle = 0,
  showLegend = false,
  showTooltip = true,
  className,
}: RadialChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildPieConfig(data, nameKey);

  const coloredData = data.map((d, i) => ({
    ...d,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <ChartContainer
      config={config}
      className={className}
      style={{ height, aspectRatio: "auto" }}
    >
      <RadialBarChart
        data={coloredData}
        innerRadius={innerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
      >
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        )}
        <RadialBar dataKey={dataKey} />
      </RadialBarChart>
    </ChartContainer>
  );
}

// -- ScatterChart --

export function PrefabScatterChart({
  data = [],
  series,
  xAxis,
  yAxis,
  zAxis,
  height = 300,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: ScatterChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer
      config={config}
      className={className}
      style={{ height, aspectRatio: "auto" }}
    >
      <ScatterChart>
        {showGrid && <CartesianGrid />}
        <XAxis
          dataKey={xAxis}
          type="number"
          name={xAxis}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          dataKey={yAxis}
          type="number"
          name={yAxis}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        {zAxis && (
          <ZAxis dataKey={zAxis} type="number" name={zAxis} range={[40, 400]} />
        )}
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => {
          // Filter data for this series: include points where the
          // series dataKey field is truthy, or all data when there's
          // only one series (single-series mode).
          const seriesData =
            series.length === 1
              ? data
              : data.filter(
                  (d) => (d as Record<string, unknown>)._series === s.dataKey,
                );
          return (
            <Scatter
              key={s.dataKey}
              name={s.label ?? s.dataKey}
              data={seriesData}
              fill={`var(--color-${s.dataKey})`}
            />
          );
        })}
      </ScatterChart>
    </ChartContainer>
  );
}
