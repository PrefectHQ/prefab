import { z } from "zod";
import { containerBase } from "./base.ts";

export const containerSchema = containerBase.extend({
  type: z.literal("Container"),
});

export type ContainerWire = z.infer<typeof containerSchema>;
