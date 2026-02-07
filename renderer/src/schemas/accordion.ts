import { z } from "zod";
import { containerBase } from "./base.ts";

export const accordionItemSchema = containerBase.extend({
  type: z.literal("AccordionItem"),
  title: z.string(),
  value: z.string().optional(),
});

export const accordionSchema = containerBase.extend({
  type: z.literal("Accordion"),
  accordionType: z.enum(["single", "multiple"]).optional(),
  collapsible: z.boolean().optional(),
  defaultValue: z.union([z.string(), z.array(z.string())]).optional(),
});
