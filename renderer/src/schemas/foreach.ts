import { z } from "zod";
import { containerBase } from "./base.ts";

export const forEachSchema = containerBase.extend({
  type: z.literal("ForEach"),
  key: z.string(),
});

export type ForEachWire = z.infer<typeof forEachSchema>;
