import { z } from "zod";
import { containerBase } from "./base.ts";

export const buttonGroupSchema = containerBase.extend({
  type: z.literal("ButtonGroup"),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
});
