import { z } from "zod";
import { containerBase } from "./base.ts";

export const gridSchema = containerBase.extend({
  type: z.literal("Grid"),
});

export type GridWire = z.infer<typeof gridSchema>;
