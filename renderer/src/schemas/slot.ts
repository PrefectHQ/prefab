import { z } from "zod";
import { containerBase } from "./base.ts";

export const slotSchema = containerBase.extend({
  type: z.literal("Slot"),
  name: z.string(),
});

export type SlotWire = z.infer<typeof slotSchema>;
