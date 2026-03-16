import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const watchSchema = componentBase.extend({
  type: z.literal("Watch"),
  key: z.string(),
  onChange: actionOrList.optional(),
});

export type WatchWire = z.infer<typeof watchSchema>;
