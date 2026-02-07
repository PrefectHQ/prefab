import { z } from "zod";
import { componentBase } from "./base.ts";

export const badgeSchema = componentBase.extend({
  type: z.literal("Badge"),
  label: z.string(),
  variant: z
    .enum([
      "default",
      "secondary",
      "destructive",
      "success",
      "warning",
      "info",
      "outline",
      "ghost",
    ])
    .optional(),
});
