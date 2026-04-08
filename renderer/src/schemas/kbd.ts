import { z } from "zod";
import { componentBase } from "./base";

export const KbdSchema = componentBase.extend({
  type: z.literal("Kbd"),
  label: z.string().optional(),
});
