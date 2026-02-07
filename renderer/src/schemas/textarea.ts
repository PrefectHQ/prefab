import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const textareaSchema = componentBase.extend({
  type: z.literal("Textarea"),
  placeholder: z.string().optional(),
  value: z.string().optional(),
  name: z.string().optional(),
  rows: z.number().int().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional(),
  onChange: actionOrList.optional(),
});

export type TextareaWire = z.infer<typeof textareaSchema>;
