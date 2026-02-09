import { z } from "zod";
import { containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const formSchema = containerBase.extend({
  type: z.literal("Form"),
  onSubmit: actionOrList.optional(),
});

export type FormWire = z.infer<typeof formSchema>;
