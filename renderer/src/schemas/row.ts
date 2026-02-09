import { z } from "zod";
import { containerBase } from "./base.ts";

export const rowSchema = containerBase.extend({
  type: z.literal("Row"),
});

export type RowWire = z.infer<typeof rowSchema>;
