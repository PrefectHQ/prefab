import { z } from "zod";
import { containerBase, gapSchema } from "./base.ts";

export const gridSchema = containerBase.extend({
  type: z.literal("Grid"),
  columns: z.number().int().optional(),
  gap: gapSchema.optional(),
});
