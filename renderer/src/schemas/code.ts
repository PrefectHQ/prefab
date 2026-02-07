import { z } from "zod";
import { componentBase } from "./base.ts";

export const codeSchema = componentBase.extend({
  type: z.literal("Code"),
  content: z.string(),
  language: z.string().optional(),
});
