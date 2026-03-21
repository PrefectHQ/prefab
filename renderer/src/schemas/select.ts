import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const selectSchema = containerBase.extend({
  type: z.literal("Select"),
  placeholder: z.string().optional(),
  value: z.string().optional(),
  name: z.string().optional(),
  size: z.enum(["sm", "default"]).optional(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  invalid: z.boolean().optional(),
  onChange: actionOrList.optional(),
});

export const selectGroupSchema = containerBase.extend({
  type: z.literal("SelectGroup"),
});

export const selectLabelSchema = componentBase.extend({
  type: z.literal("SelectLabel"),
  label: z.string(),
});

export const selectSeparatorSchema = componentBase.extend({
  type: z.literal("SelectSeparator"),
});

export const selectOptionSchema = componentBase.extend({
  type: z.literal("SelectOption"),
  value: z.string(),
  label: z.string(),
  selected: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export type SelectWire = z.infer<typeof selectSchema>;
export type SelectGroupWire = z.infer<typeof selectGroupSchema>;
export type SelectLabelWire = z.infer<typeof selectLabelSchema>;
export type SelectSeparatorWire = z.infer<typeof selectSeparatorSchema>;
export type SelectOptionWire = z.infer<typeof selectOptionSchema>;
