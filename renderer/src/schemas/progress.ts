import { z } from "zod";
import { componentBase } from "./base.ts";

export const progressSchema = componentBase.extend({
  type: z.literal("Progress"),
  value: z.union([z.number(), z.string()]).optional(),
  max: z.number().optional(),
  indicatorClass: z.string().optional(),
});
