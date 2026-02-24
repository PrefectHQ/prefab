import { z } from "zod";
import { componentBase } from "./base.ts";
import { actionOrList } from "./actions.ts";

export const sliderSchema = componentBase.extend({
  type: z.literal("Slider"),
  min: z.number().optional(),
  max: z.number().optional(),
  value: z.union([z.number(), z.array(z.number())]).optional(),
  step: z.number().optional(),
  range: z.boolean().optional(),
  name: z.string().optional(),
  disabled: z.boolean().optional(),
  variant: z
    .enum(["default", "success", "warning", "destructive", "info", "muted"])
    .optional(),
  indicatorClass: z.string().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  handleStyle: z.enum(["circle", "bar"]).optional(),
  onChange: actionOrList.optional(),
});

export type SliderWire = z.infer<typeof sliderSchema>;
