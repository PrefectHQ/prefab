import { z } from "zod";
import { componentBase } from "./base.ts";

export const dotSchema = componentBase.extend({
  type: z.literal("Dot"),
  variant: z
    .enum([
      "default",
      "secondary",
      "success",
      "warning",
      "destructive",
      "info",
      "muted",
    ])
    .or(z.string())
    .optional(),
  size: z.enum(["sm", "default", "lg"]).optional(),
  shape: z.enum(["circle", "square", "rounded"]).optional(),
});

export type DotWire = z.infer<typeof dotSchema>;
