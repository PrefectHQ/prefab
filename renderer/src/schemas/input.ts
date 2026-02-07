import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const inputSchema = componentBase.extend({
  type: z.literal("Input"),
  inputType: z
    .enum([
      "text",
      "email",
      "password",
      "number",
      "tel",
      "url",
      "search",
      "date",
      "time",
      "datetime-local",
      "file",
    ])
    .optional(),
  placeholder: z.string().optional(),
  value: z.string().optional(),
  name: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  pattern: z.string().optional(),
  onChange: actionOrList.optional(),
});

export type InputWire = z.infer<typeof inputSchema>;
