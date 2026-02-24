import { z } from "zod";
import { componentBase } from "./base.ts";

export const progressSchema = componentBase.extend({
  type: z.literal("Progress"),
  value: z.union([z.number(), z.string()]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  variant: z
    .enum(["default", "success", "warning", "destructive", "info", "muted"])
    .optional(),
  indicatorClass: z.string().optional(),
});

export type ProgressWire = z.infer<typeof progressSchema>;
