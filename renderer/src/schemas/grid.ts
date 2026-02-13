import { z } from "zod";
import { containerBase } from "./base.ts";

export const gridSchema = containerBase.extend({
  type: z.literal("Grid"),
  minColumnWidth: z.string().optional(),
});

export type GridWire = z.infer<typeof gridSchema>;
