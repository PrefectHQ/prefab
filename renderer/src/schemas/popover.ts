import { z } from "zod";
import { containerBase } from "./base.ts";

export const popoverSchema = containerBase.extend({
  type: z.literal("Popover"),
  title: z.string().optional(),
  description: z.string().optional(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
});
