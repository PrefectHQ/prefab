import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const selectSchema = containerBase.extend({
  type: z.literal("Select"),
  placeholder: z.string().optional(),
  name: z.string().optional(),
  size: z.enum(["sm", "default"]).optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  onChange: actionOrList.optional(),
});

export const selectOptionSchema = componentBase.extend({
  type: z.literal("SelectOption"),
  value: z.string(),
  label: z.string(),
  selected: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export type SelectWire = z.infer<typeof selectSchema>;
export type SelectOptionWire = z.infer<typeof selectOptionSchema>;
