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
  onChange: actionOrList.optional(),
});

export type SliderWire = z.infer<typeof sliderSchema>;
