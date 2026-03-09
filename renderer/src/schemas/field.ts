import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";

export const fieldSchema = containerBase.extend({
  type: z.literal("Field"),
  invalid: z.boolean().optional(),
  disabled: z.boolean().optional(),
  orientation: z.enum(["vertical", "horizontal"]).optional(),
});

export const fieldTitleSchema = componentBase.extend({
  type: z.literal("FieldTitle"),
  content: z.string(),
});

export const fieldDescriptionSchema = componentBase.extend({
  type: z.literal("FieldDescription"),
  content: z.string(),
});

export const fieldContentSchema = containerBase.extend({
  type: z.literal("FieldContent"),
});

export const fieldErrorSchema = componentBase.extend({
  type: z.literal("FieldError"),
  content: z.string(),
});

export type FieldWire = z.infer<typeof fieldSchema>;
export type FieldTitleWire = z.infer<typeof fieldTitleSchema>;
export type FieldDescriptionWire = z.infer<typeof fieldDescriptionSchema>;
export type FieldContentWire = z.infer<typeof fieldContentSchema>;
export type FieldErrorWire = z.infer<typeof fieldErrorSchema>;
