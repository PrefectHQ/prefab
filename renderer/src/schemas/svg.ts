import { z } from "zod";
import { componentBase } from "./base.ts";

export const svgSchema = componentBase.extend({
  type: z.literal("Svg"),
  content: z.string(),
  width: z.string().optional(),
  height: z.string().optional(),
});

export type SvgWire = z.infer<typeof svgSchema>;
