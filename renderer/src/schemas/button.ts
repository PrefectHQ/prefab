import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const buttonSchema = componentBase.extend({
  type: z.literal("Button"),
  label: z.string(),
  icon: z.string().nullable().optional(),
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
    .or(z.string())
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
  buttonType: z.enum(["submit", "button", "reset"]).nullable().optional(),
  disabled: z.union([z.boolean(), z.string()]).optional(),
  onClick: actionOrList.optional(),
});

export type ButtonWire = z.infer<typeof buttonSchema>;
