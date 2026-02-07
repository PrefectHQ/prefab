import { z } from "zod";
import { componentBase } from "./base.ts";

export const markdownSchema = componentBase.extend({
  type: z.literal("Markdown"),
  content: z.string(),
});

export type MarkdownWire = z.infer<typeof markdownSchema>;
