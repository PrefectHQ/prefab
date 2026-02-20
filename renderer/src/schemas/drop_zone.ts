import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const dropZoneSchema = componentBase.extend({
  type: z.literal("DropZone"),
  icon: z.string().nullable().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  accept: z.string().optional(),
  multiple: z.boolean().optional(),
  maxSize: z.number().int().optional(),
  disabled: z.boolean().optional(),
  name: z.string().optional(),
  onChange: actionOrList.optional(),
});

export type DropZoneWire = z.infer<typeof dropZoneSchema>;
