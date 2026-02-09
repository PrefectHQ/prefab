import { z } from "zod";
import { componentBase } from "./base.ts";

const chartSeriesSchema = z.object({
  dataKey: z.string(),
  label: z.string().optional(),
  color: z.string().optional(),
});

const cartesianBase = componentBase.extend({
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  series: z.array(chartSeriesSchema),
  xAxis: z.string().optional(),
  height: z.number().int().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  showGrid: z.boolean().optional(),
});

export const barChartSchema = cartesianBase.extend({
  type: z.literal("BarChart"),
  stacked: z.boolean().optional(),
});

export const lineChartSchema = cartesianBase.extend({
  type: z.literal("LineChart"),
});

export const areaChartSchema = cartesianBase.extend({
  type: z.literal("AreaChart"),
  stacked: z.boolean().optional(),
});

export const pieChartSchema = componentBase.extend({
  type: z.literal("PieChart"),
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  dataKey: z.string(),
  nameKey: z.string(),
  height: z.number().int().optional(),
  innerRadius: z.number().int().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
});

export const radarChartSchema = componentBase.extend({
  type: z.literal("RadarChart"),
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  series: z.array(chartSeriesSchema),
  axisKey: z.string().optional(),
  height: z.number().int().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  showGrid: z.boolean().optional(),
});

export const radialChartSchema = componentBase.extend({
  type: z.literal("RadialChart"),
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  dataKey: z.string(),
  nameKey: z.string(),
  height: z.number().int().optional(),
  innerRadius: z.number().int().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
});

export type BarChartWire = z.infer<typeof barChartSchema>;
export type LineChartWire = z.infer<typeof lineChartSchema>;
export type AreaChartWire = z.infer<typeof areaChartSchema>;
export type PieChartWire = z.infer<typeof pieChartSchema>;
export type RadarChartWire = z.infer<typeof radarChartSchema>;
export type RadialChartWire = z.infer<typeof radialChartSchema>;
