import { z } from "zod";
import { componentBase } from "./base.ts";

export const progressSchema = componentBase.extend({
  type: z.literal("Progress"),
  value: z.union([z.number(), z.string()]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  target: z.union([z.number(), z.string()]).optional(),
  variant: z
    .enum(["default", "success", "warning", "destructive", "info", "muted"])
    .or(z.string())
    .optional(),
  size: z.enum(["sm", "default", "lg"]).optional(),
  indicatorClass: z.string().optional(),
  targetClass: z.string().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
});

export type ProgressWire = z.infer<typeof progressSchema>;
