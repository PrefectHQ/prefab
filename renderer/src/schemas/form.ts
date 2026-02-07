import { z } from "zod";
import { containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const formSchema = containerBase.extend({
  type: z.literal("Form"),
  gap: z.number().int().optional(),
  onSubmit: actionOrList.optional(),
});
