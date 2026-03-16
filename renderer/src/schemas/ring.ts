import { z } from "zod";
import { containerBase } from "./base.ts";

export const ringSchema = containerBase.extend({
  type: z.literal("Ring"),
  value: z.union([z.number(), z.string()]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  label: z.string().optional(),
  variant: z
    .enum(["default", "success", "warning", "destructive", "info", "muted"])
    .or(z.string())
    .optional(),
  size: z.enum(["sm", "default", "lg"]).optional(),
  thickness: z.number().optional(),
  target: z.union([z.number(), z.string()]).optional(),
  indicatorClass: z.string().optional(),
  targetClass: z.string().optional(),
});

export type RingWire = z.infer<typeof ringSchema>;
