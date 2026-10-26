import { z } from "zod";
import { componentBase } from "./base.ts";

const chartSeriesSchema = z.object({
  dataKey: z.string(),
  label: z.string().optional(),
  color: z.string().optional(),
});

const valueFormatSchema = z.string();

const cartesianBase = componentBase.extend({
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  series: z.array(chartSeriesSchema),
  xAxis: z.string().optional(),
  height: z.number().int().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  animate: z.boolean().optional(),
  showGrid: z.boolean().optional(),
  showYAxis: z.boolean().optional(),
  valueFormat: valueFormatSchema.optional(),
});

export const barChartSchema = cartesianBase.extend({
  type: z.literal("BarChart"),
  stacked: z.boolean().optional(),
  horizontal: z.boolean().optional(),
  barRadius: z.number().int().optional(),
  xAxisLabel: z.string().optional(),
  yAxisLabel: z.string().optional(),
});

export const lineChartSchema = cartesianBase.extend({
  type: z.literal("LineChart"),
  series: z.union([z.array(chartSeriesSchema), z.string()]),
  curve: z.enum(["linear", "smooth", "step"]).optional(),
  showDots: z.boolean().optional(),
  xAxisLabel: z.string().optional(),
  yAxisLabel: z.string().optional(),
});

export const areaChartSchema = cartesianBase.extend({
  type: z.literal("AreaChart"),
  stacked: z.boolean().optional(),
  curve: z.enum(["linear", "smooth", "step"]).optional(),
  showDots: z.boolean().optional(),
});

export const pieChartSchema = componentBase
  .extend({
    type: z.literal("PieChart"),
    data: z
      .union([z.array(z.record(z.string(), z.unknown())), z.string()])
      .optional(),
    dataKey: z.string(),
    nameKey: z.string(),
    aggregateBelow: z.number().min(0).max(1).nullable().optional(),
    aggregateExcept: z
      .union([z.array(z.string()), z.string()])
      .nullable()
      .optional(),
    height: z.number().int().optional(),
    innerRadius: z.number().int().optional(),
    showLabel: z.boolean().optional(),
    paddingAngle: z.number().int().optional(),
    showLegend: z.boolean().optional(),
    showTooltip: z.boolean().optional(),
    animate: z.boolean().optional(),
    valueFormat: valueFormatSchema.optional(),
  })
  .superRefine((chart, ctx) => {
    if (chart.aggregateBelow == null && chart.aggregateExcept == null) return;
    if (chart.aggregateBelow != null && chart.aggregateExcept != null)
      ctx.addIssue({
        code: "custom",
        message: "Pie aggregation options are mutually exclusive",
      });
    if (chart.dataKey === chart.nameKey)
      ctx.addIssue({
        code: "custom",
        message: "Pie aggregation requires different dataKey and nameKey",
      });
    if (Array.isArray(chart.data)) {
      let total = 0;
      let reactive = false;
      for (const row of chart.data) {
        const value = row[chart.dataKey];
        if (
          typeof value === "string" &&
          value.includes("{{") &&
          value.includes("}}")
        ) {
          reactive = true;
          continue;
        }
        if (typeof value !== "number" || !Number.isFinite(value) || value < 0)
          ctx.addIssue({
            code: "custom",
            message:
              "Pie aggregation requires finite non-negative numeric values",
          });
        else total += value;
      }
      if (!reactive && !Number.isFinite(total))
        ctx.addIssue({
          code: "custom",
          message: "Pie aggregation requires a finite total",
        });
    }
  });

export const radarChartSchema = componentBase.extend({
  type: z.literal("RadarChart"),
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  series: z.array(chartSeriesSchema),
  axisKey: z.string().optional(),
  height: z.number().int().optional(),
  filled: z.boolean().optional(),
  showDots: z.boolean().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  animate: z.boolean().optional(),
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
  startAngle: z.number().int().optional(),
  endAngle: z.number().int().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  animate: z.boolean().optional(),
  valueFormat: valueFormatSchema.optional(),
});

export const scatterChartSchema = componentBase.extend({
  type: z.literal("ScatterChart"),
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  series: z.array(chartSeriesSchema),
  xAxis: z.string(),
  yAxis: z.string(),
  zAxis: z.string().optional(),
  height: z.number().int().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  animate: z.boolean().optional(),
  showGrid: z.boolean().optional(),
});

export const waterfallChartSchema = componentBase.extend({
  type: z.literal("WaterfallChart"),
  data: z
    .union([z.array(z.record(z.string(), z.unknown())), z.string()])
    .optional(),
  dataKey: z.string(),
  nameKey: z.string(),
  totalKey: z.string().optional(),
  height: z.number().int().optional(),
  increaseColor: z.string().optional(),
  decreaseColor: z.string().optional(),
  totalColor: z.string().optional(),
  barRadius: z.number().int().optional(),
  showConnectors: z.boolean().optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  animate: z.boolean().optional(),
  showGrid: z.boolean().optional(),
  showYAxis: z.boolean().optional(),
  valueFormat: valueFormatSchema.optional(),
});

export const sparklineSchema = componentBase.extend({
  type: z.literal("Sparkline"),
  data: z.union([z.array(z.number()), z.string()]).optional(),
  height: z.number().int().optional(),
  variant: z
    .enum(["default", "success", "warning", "destructive", "info", "muted"])
    .or(z.string())
    .optional(),
  indicatorClass: z.string().optional(),
  fill: z.boolean().optional(),
  curve: z.enum(["linear", "smooth", "step"]).optional(),
  strokeWidth: z.number().optional(),
  mode: z.enum(["line", "bar"]).optional(),
});

export type BarChartWire = z.infer<typeof barChartSchema>;
export type LineChartWire = z.infer<typeof lineChartSchema>;
export type AreaChartWire = z.infer<typeof areaChartSchema>;
export type PieChartWire = z.infer<typeof pieChartSchema>;
export type RadarChartWire = z.infer<typeof radarChartSchema>;
export type RadialChartWire = z.infer<typeof radialChartSchema>;
export type ScatterChartWire = z.infer<typeof scatterChartSchema>;
export type WaterfallChartWire = z.infer<typeof waterfallChartSchema>;
export type SparklineWire = z.infer<typeof sparklineSchema>;
