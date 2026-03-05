import { z } from "zod";
import { containerBase } from "./base.ts";

export const gridItemSchema = containerBase.extend({
  type: z.literal("GridItem"),
  colSpan: z.number().optional(),
  rowSpan: z.number().optional(),
});
