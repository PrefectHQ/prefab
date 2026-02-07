import { z } from "zod";
import { componentBase } from "./base.ts";

export const headingSchema = componentBase.extend({
  type: z.literal("Heading"),
  content: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
});
