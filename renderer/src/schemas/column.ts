import { z } from "zod";
import { containerBase } from "./base.ts";

export const columnSchema = containerBase.extend({
  type: z.literal("Column"),
});

export type ColumnWire = z.infer<typeof columnSchema>;
