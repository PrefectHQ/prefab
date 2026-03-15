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
import { cn } from "@/lib/utils";
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
  SparklineWire,
} from "@/schemas/chart";

const compactFormatter = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

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
  showYAxis = true,
  yAxisFormat = "auto",
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
        {!horizontal && showYAxis && (
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={
              yAxisFormat === "compact" ? compactFormatter : undefined
            }
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
  showYAxis = true,
  yAxisFormat = "auto",
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
        {showYAxis && (
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={
              yAxisFormat === "compact" ? compactFormatter : undefined
            }
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
  showYAxis = true,
  yAxisFormat = "auto",
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
        {showYAxis && (
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={
              yAxisFormat === "compact" ? compactFormatter : undefined
            }
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

  // Use percentage-based outer radius so the chart adapts to container size.
  // When labels are shown, shrink further to leave room for label text.
  const outerPct = showLabel ? "60%" : "80%";
  // Preserve the visual ratio between inner and outer radius.
  // Default outer is ~100px at 300px height, so scale innerRadius relative to that.
  const innerPct =
    innerRadius > 0
      ? `${Math.round((innerRadius / 100) * (showLabel ? 60 : 80))}%`
      : 0;

  // Reduce chart height to leave room for external legend
  const chartHeight = showLegend ? height - 36 : height;

  return (
    <div className={className}>
      <ChartContainer
        config={config}
        style={{ height: chartHeight, aspectRatio: "auto" }}
      >
        <PieChart>
          {showTooltip && (
            <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
          )}
          <Pie
            data={coloredData}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={innerPct}
            outerRadius={outerPct}
            label={showLabel}
            paddingAngle={paddingAngle}
          />
        </PieChart>
      </ChartContainer>
      {showLegend && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            paddingTop: "8px",
            fontSize: "12px",
          }}
        >
          {coloredData.map((d, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "2px",
                  backgroundColor: d.fill,
                  flexShrink: 0,
                }}
              />
              {String(d[nameKey as keyof typeof d] ?? "")}
            </div>
          ))}
        </div>
      )}
    </div>
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

// -- Sparkline --

const SPARKLINE_VARIANT_CLASS: Record<string, string> = {
  default: "cn-sparkline-variant-default",
  success: "cn-sparkline-variant-success",
  warning: "cn-sparkline-variant-warning",
  destructive: "cn-sparkline-variant-destructive",
  info: "cn-sparkline-variant-info",
  muted: "cn-sparkline-variant-muted",
};

function sparkPoints(
  data: number[],
  w: number,
  h: number,
  strokeWidth: number,
): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth / 2;
  // Reserve 30% of height so the minimum value still has visible fill beneath it
  const usableH = h * 0.7 - pad;
  const topPad = pad;
  return data
    .map((v, i) => {
      const x = data.length === 1 ? w / 2 : (i / (data.length - 1)) * w;
      const y = topPad + usableH * (1 - (v - min) / range);
      return `${x},${y}`;
    })
    .join(" ");
}

function stepPoints(
  data: number[],
  w: number,
  h: number,
  strokeWidth: number,
): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth / 2;
  const usableH = h * 0.7 - pad;
  const topPad = pad;
  const pts: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const x = data.length === 1 ? w / 2 : (i / (data.length - 1)) * w;
    const y = topPad + usableH * (1 - (data[i] - min) / range);
    if (i > 0) {
      const prevY = topPad + usableH * (1 - (data[i - 1] - min) / range);
      pts.push(`${x},${prevY}`);
    }
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

// Unique ID counter for gradient defs
let sparkId = 0;

export function PrefabSparkline({
  data = [],
  height,
  variant = "default",
  indicatorClass,
  fill = false,
  curve = "linear",
  strokeWidth = 1.5,
  mode = "line",
  className,
  cssClass,
}: SparklineWire & { className?: string }) {
  if (typeof data === "string" || data.length === 0) return null;

  const variantClass =
    SPARKLINE_VARIANT_CLASS[variant ?? "default"] ??
    SPARKLINE_VARIANT_CLASS.default;

  // Stable gradient ID per instance
  const gradientId = `spark-${++sparkId}`;

  // Use a fixed viewBox — the SVG scales to fill its container via CSS
  const vw = 100;
  const vh = 40;

  if (mode === "bar") {
    const min = Math.min(0, ...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const gap = 1;
    const barW = (vw - gap * (data.length - 1)) / data.length;
    return (
      <svg
        className={cn(
          "cn-sparkline w-full",
          height == null && "h-6",
          variantClass,
          className,
          cssClass,
        )}
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="none"
        style={height != null ? { height } : undefined}
      >
        {data.map((v, i) => {
          const barH = ((v - min) / range) * (vh - 1);
          return (
            <rect
              key={i}
              x={i * (barW + gap)}
              y={vh - barH}
              width={barW}
              height={barH}
              fill="currentColor"
              opacity={0.7}
              rx={0.5}
              className={indicatorClass}
            />
          );
        })}
      </svg>
    );
  }

  // Line / area mode
  const useStep = curve === "step";
  const pts = useStep
    ? stepPoints(data, vw, vh, strokeWidth)
    : sparkPoints(data, vw, vh, strokeWidth);

  // Build fill polygon (line points + bottom-right + bottom-left)
  const fillPts = fill ? `${pts} ${vw},${vh} 0,${vh}` : "";

  return (
    <svg
      className={cn("cn-sparkline w-full", variantClass, className, cssClass)}
      viewBox={`0 0 ${vw} ${vh}`}
      preserveAspectRatio="none"
      style={{ height }}
    >
      {fill && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className="cn-sparkline-fill-stop-start" />
              <stop offset="100%" className="cn-sparkline-fill-stop-end" />
            </linearGradient>
          </defs>
          <polygon points={fillPts} fill={`url(#${gradientId})`} />
        </>
      )}
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={cn("cn-sparkline-line", indicatorClass)}
      />
    </svg>
  );
}
