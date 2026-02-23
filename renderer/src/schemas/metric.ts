import { z } from "zod";
import { componentBase } from "./base.ts";

export const metricSchema = componentBase.extend({
  type: z.literal("Metric"),
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  description: z.string().optional(),
  delta: z.union([z.string(), z.number()]).optional(),
  trend: z.enum(["up", "down", "neutral"]).optional(),
  trendSentiment: z.enum(["positive", "negative", "neutral"]).optional(),
});

export type MetricWire = z.infer<typeof metricSchema>;
