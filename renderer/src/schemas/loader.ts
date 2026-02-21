import { z } from "zod";
import { componentBase } from "./base.ts";

export const loaderSchema = componentBase.extend({
  type: z.literal("Loader"),
  variant: z.enum(["spin", "dots", "pulse", "bars", "ios"]).optional(),
  size: z.enum(["sm", "default", "lg"]).optional(),
});

export type LoaderWire = z.infer<typeof loaderSchema>;
