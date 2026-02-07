import { z } from "zod";
import { containerBase } from "./base.ts";

export const stateSchema = containerBase.extend({
  type: z.literal("State"),
  state: z.record(z.string(), z.unknown()),
});

export type StateWire = z.infer<typeof stateSchema>;
