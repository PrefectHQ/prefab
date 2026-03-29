import { z } from "zod";
import { componentBase } from "./base.ts";

export const mermaidSchema = componentBase.extend({
  type: z.literal("Mermaid"),
  chart: z.string(),
});

export type MermaidWire = z.infer<typeof mermaidSchema>;
