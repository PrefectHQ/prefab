import { z } from "zod";
import { containerBase } from "./base.ts";

export const tooltipSchema = containerBase.extend({
  type: z.literal("Tooltip"),
  content: z.string(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
});

export type TooltipWire = z.infer<typeof tooltipSchema>;
