import { z } from "zod";
import { componentBase } from "./base.ts";

export const textSchema = componentBase.extend({
  type: z.literal("Text"),
  content: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
});
