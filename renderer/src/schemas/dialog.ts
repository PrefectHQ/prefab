import { z } from "zod";
import { containerBase } from "./base.ts";

export const dialogSchema = containerBase.extend({
  type: z.literal("Dialog"),
  title: z.string().optional(),
  description: z.string().optional(),
});

export type DialogWire = z.infer<typeof dialogSchema>;
