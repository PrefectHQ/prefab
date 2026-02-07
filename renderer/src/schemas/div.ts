import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";

export const divSchema = containerBase.extend({
  type: z.literal("Div"),
});

export const spanSchema = componentBase.extend({
  type: z.literal("Span"),
  content: z.string(),
});

export type DivWire = z.infer<typeof divSchema>;
export type SpanWire = z.infer<typeof spanSchema>;
