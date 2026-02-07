import { z } from "zod";
import { containerBase } from "./base.ts";

export const pageSchema = containerBase.extend({
  type: z.literal("Page"),
  title: z.string(),
  value: z.string().optional(),
});

export const pagesSchema = containerBase.extend({
  type: z.literal("Pages"),
  defaultValue: z.string().optional(),
  name: z.string().optional(),
});

export type PageWire = z.infer<typeof pageSchema>;
export type PagesWire = z.infer<typeof pagesSchema>;
