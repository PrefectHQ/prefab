import { z } from "zod";
import { containerBase } from "./base.ts";

export const badgeSchema = containerBase.extend({
  type: z.literal("Badge"),
  label: z.string().optional(),
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

export type BadgeWire = z.infer<typeof badgeSchema>;
