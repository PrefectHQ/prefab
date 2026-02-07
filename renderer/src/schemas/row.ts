import { z } from "zod";
import { containerBase, gapSchema } from "./base.ts";

export const rowSchema = containerBase.extend({
  type: z.literal("Row"),
  gap: gapSchema.optional(),
});
