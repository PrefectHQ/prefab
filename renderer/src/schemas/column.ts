import { z } from "zod";
import { containerBase, gapSchema } from "./base.ts";

export const columnSchema = containerBase.extend({
  type: z.literal("Column"),
  gap: gapSchema.optional(),
});

export type ColumnWire = z.infer<typeof columnSchema>;
