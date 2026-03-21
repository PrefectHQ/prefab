import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const comboboxOptionSchema = componentBase.extend({
  type: z.literal("ComboboxOption"),
  value: z.string(),
  label: z.string(),
  disabled: z.boolean().optional(),
});

export const comboboxGroupSchema = containerBase.extend({
  type: z.literal("ComboboxGroup"),
});

export const comboboxLabelSchema = componentBase.extend({
  type: z.literal("ComboboxLabel"),
  label: z.string(),
});

export const comboboxSeparatorSchema = componentBase.extend({
  type: z.literal("ComboboxSeparator"),
});

export const comboboxSchema = containerBase.extend({
  type: z.literal("Combobox"),
  placeholder: z.string().nullable().optional(),
  value: z.string().optional(),
  searchPlaceholder: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  disabled: z.boolean().optional(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  invalid: z.boolean().optional(),
  onChange: actionOrList.optional(),
});

export type ComboboxWire = z.infer<typeof comboboxSchema>;
export type ComboboxOptionWire = z.infer<typeof comboboxOptionSchema>;
export type ComboboxGroupWire = z.infer<typeof comboboxGroupSchema>;
export type ComboboxLabelWire = z.infer<typeof comboboxLabelSchema>;
export type ComboboxSeparatorWire = z.infer<typeof comboboxSeparatorSchema>;
