import { z } from "zod";
import { anyComponentSchema } from "./base.ts";

/** A single case branch: evaluates `when` and renders `children` if truthy. */
const conditionCase = z.object({
  when: z.string(),
  children: z.array(anyComponentSchema).optional(),
});

/**
 * Condition node — produced by grouping consecutive If/Elif/Else siblings
 * in the Python DSL. Evaluates cases in order, renders the first match.
 */
export const conditionSchema = z.object({
  type: z.literal("Condition"),
  cases: z.array(conditionCase).min(1),
  else: z.array(anyComponentSchema).optional(),
});

export type ConditionWire = z.infer<typeof conditionSchema>;
