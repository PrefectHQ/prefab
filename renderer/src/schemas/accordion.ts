import { z } from "zod";
import { containerBase } from "./base.ts";

export const accordionItemSchema = containerBase.extend({
  type: z.literal("AccordionItem"),
  title: z.string(),
  value: z.string().optional(),
});

export const accordionSchema = containerBase.extend({
  type: z.literal("Accordion"),
  multiple: z.boolean().optional(),
  collapsible: z.boolean().optional(),
  defaultValues: z.array(z.string()).optional(),
});

export type AccordionWire = z.infer<typeof accordionSchema>;
export type AccordionItemWire = z.infer<typeof accordionItemSchema>;
