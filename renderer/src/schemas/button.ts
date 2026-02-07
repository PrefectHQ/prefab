import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const buttonSchema = componentBase.extend({
  type: z.literal("Button"),
  label: z.string(),
  variant: z
    .enum([
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
      "success",
      "warning",
      "info",
    ])
    .optional(),
  size: z
    .enum([
      "default",
      "xs",
      "sm",
      "lg",
      "icon",
      "icon-xs",
      "icon-sm",
      "icon-lg",
    ])
    .optional(),
  disabled: z.boolean().optional(),
  onClick: actionOrList.optional(),
});
