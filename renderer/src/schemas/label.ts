import { z } from "zod";
import { containerBase } from "./base.ts";

export const labelSchema = containerBase.extend({
  type: z.literal("Label"),
  text: z.string().optional(),
  forId: z.string().optional(),
  optional: z.boolean().optional(),
});

export type LabelWire = z.infer<typeof labelSchema>;
