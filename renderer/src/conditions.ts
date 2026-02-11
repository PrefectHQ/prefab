/**
 * Evaluate conditional expressions (Condition `when` clauses).
 *
 * Delegates to the unified expression engine. The result is coerced to
 * boolean. On parse error, falls back to simple `!!ctx[expr]` with a
 * console.warn.
 */

import { evaluate } from "./expression";

/** Evaluate a condition expression against a context object. */
export function evaluateCondition(
  expr: string,
  ctx: Record<string, unknown>,
): boolean {
  const trimmed = expr.trim();
  if (!trimmed) return false;

  try {
    return !!evaluate(trimmed, ctx);
  } catch {
    console.warn(
      `[Prefab] Failed to parse condition expression: "${expr}". Falling back to key lookup.`,
    );
    return !!ctx[trimmed];
  }
}
