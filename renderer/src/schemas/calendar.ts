import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const calendarSchema = componentBase.extend({
  type: z.literal("Calendar"),
  mode: z.enum(["single", "multiple", "range"]).optional(),
  name: z.string().optional(),
  onChange: actionOrList.optional(),
});
