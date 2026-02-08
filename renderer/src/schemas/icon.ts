import { z } from "zod";
import { componentBase } from "./base.ts";

export const iconSchema = componentBase.extend({
  type: z.literal("Icon"),
  name: z.string(),
  size: z.enum(["sm", "default", "lg"]).optional(),
});

export type IconWire = z.infer<typeof iconSchema>;
