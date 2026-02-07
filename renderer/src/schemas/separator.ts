import { z } from "zod";
import { componentBase } from "./base.ts";

export const separatorSchema = componentBase.extend({
  type: z.literal("Separator"),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
});

export type SeparatorWire = z.infer<typeof separatorSchema>;
