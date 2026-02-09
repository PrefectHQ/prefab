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
  XAxis,
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
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: BarChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer config={config} className={className} style={{ height }}>
      <BarChart data={data}>
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
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            fill={`var(--color-${s.dataKey})`}
            radius={4}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

// -- LineChart --

export function PrefabLineChart({
  data = [],
  series,
  xAxis,
  height = 300,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: LineChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer config={config} className={className} style={{ height }}>
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
            type="natural"
            stroke={`var(--color-${s.dataKey})`}
            strokeWidth={2}
            dot={false}
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
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: AreaChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer config={config} className={className} style={{ height }}>
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
            type="natural"
            fill={`var(--color-${s.dataKey})`}
            stroke={`var(--color-${s.dataKey})`}
            fillOpacity={0.4}
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
    <ChartContainer config={config} className={className} style={{ height }}>
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
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  className,
}: RadarChartWire & { className?: string }) {
  if (typeof data === "string") return null;
  const config = buildConfig(series);

  return (
    <ChartContainer config={config} className={className} style={{ height }}>
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
            fillOpacity={0.3}
            stroke={`var(--color-${s.dataKey})`}
            strokeWidth={2}
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
    <ChartContainer config={config} className={className} style={{ height }}>
      <RadialBarChart data={coloredData} innerRadius={innerRadius}>
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
