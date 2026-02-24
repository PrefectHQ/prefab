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
    .optional(),
  size: z.enum(["sm", "default", "lg"]).optional(),
  thickness: z.number().optional(),
});

export type RingWire = z.infer<typeof ringSchema>;
