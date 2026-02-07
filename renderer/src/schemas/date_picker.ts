import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const datePickerSchema = componentBase.extend({
  type: z.literal("DatePicker"),
  placeholder: z.string().optional(),
  name: z.string().optional(),
  onChange: actionOrList.optional(),
});

export type DatePickerWire = z.infer<typeof datePickerSchema>;
