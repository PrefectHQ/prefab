import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const comboboxOptionSchema = componentBase.extend({
  type: z.literal("ComboboxOption"),
  value: z.string(),
  label: z.string(),
  disabled: z.boolean().optional(),
});

export const comboboxSchema = containerBase.extend({
  type: z.literal("Combobox"),
  placeholder: z.string().nullable().optional(),
  searchPlaceholder: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  disabled: z.boolean().optional(),
  onChange: actionOrList.optional(),
});

export type ComboboxWire = z.infer<typeof comboboxSchema>;
export type ComboboxOptionWire = z.infer<typeof comboboxOptionSchema>;
