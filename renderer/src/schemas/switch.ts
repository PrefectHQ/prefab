import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const switchSchema = componentBase.extend({
  type: z.literal("Switch"),
  label: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  checked: z.boolean().optional(),
  size: z.enum(["sm", "default"]).optional(),
  name: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  onChange: actionOrList.optional(),
});

export type SwitchWire = z.infer<typeof switchSchema>;
