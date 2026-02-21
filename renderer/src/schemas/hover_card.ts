import { z } from "zod";
import { containerBase } from "./base.ts";

export const hoverCardSchema = containerBase.extend({
  type: z.literal("HoverCard"),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  openDelay: z.number().optional(),
  closeDelay: z.number().optional(),
});

export type HoverCardWire = z.infer<typeof hoverCardSchema>;
