import { z } from "zod";
import { containerBase } from "./base.ts";

export const fieldSchema = containerBase.extend({
  type: z.literal("Field"),
  title: z.string(),
  description: z.string().nullable().optional(),
  disabled: z.boolean().optional(),
});

export type FieldWire = z.infer<typeof fieldSchema>;
