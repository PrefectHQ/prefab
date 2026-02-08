import { z } from "zod";
import { containerBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const tabSchema = containerBase.extend({
  type: z.literal("Tab"),
  title: z.string(),
  value: z.string().optional(),
  disabled: z.boolean().optional(),
});

export const tabsSchema = containerBase.extend({
  type: z.literal("Tabs"),
  variant: z.enum(["default", "line"]).optional(),
  defaultValue: z.string().optional(),
  name: z.string().optional(),
  onChange: actionOrList.optional(),
});

export type TabsWire = z.infer<typeof tabsSchema>;
export type TabWire = z.infer<typeof tabSchema>;
