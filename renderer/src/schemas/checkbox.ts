import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const checkboxSchema = componentBase.extend({
  type: z.literal("Checkbox"),
  label: z.string().optional(),
  checked: z.boolean().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  onChange: actionOrList.optional(),
});

export type CheckboxWire = z.infer<typeof checkboxSchema>;
