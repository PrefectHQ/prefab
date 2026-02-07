import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const radioGroupSchema = containerBase.extend({
  type: z.literal("RadioGroup"),
  name: z.string().optional(),
  onChange: actionOrList.optional(),
});

export const radioSchema = componentBase.extend({
  type: z.literal("Radio"),
  value: z.string(),
  label: z.string().optional(),
  checked: z.boolean().optional(),
  name: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
});
