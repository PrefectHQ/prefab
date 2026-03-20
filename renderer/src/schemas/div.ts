import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";

export const divSchema = containerBase.extend({
  type: z.literal("Div"),
  style: z.record(z.string(), z.string()).optional(),
});

export const spanSchema = componentBase.extend({
  type: z.literal("Span"),
  content: z.string(),
  style: z.record(z.string(), z.string()).optional(),
  code: z.boolean().optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
});

export const linkSchema = componentBase.extend({
  type: z.literal("Link"),
  content: z.string(),
  href: z.string(),
  target: z.string().optional(),
  style: z.record(z.string(), z.string()).optional(),
  code: z.boolean().optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
});

export type DivWire = z.infer<typeof divSchema>;
export type SpanWire = z.infer<typeof spanSchema>;
export type LinkWire = z.infer<typeof linkSchema>;
