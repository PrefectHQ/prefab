import { z } from "zod";
import { componentBase } from "./base.ts";

export const spinnerSchema = componentBase.extend({
  type: z.literal("Spinner"),
  size: z.enum(["sm", "default", "lg"]).optional(),
});

export type SpinnerWire = z.infer<typeof spinnerSchema>;
