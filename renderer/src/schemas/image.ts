import { z } from "zod";
import { componentBase } from "./base.ts";

export const imageSchema = componentBase.extend({
  type: z.literal("Image"),
  src: z.string(),
  alt: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
});
