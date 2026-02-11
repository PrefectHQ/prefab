/**
 * Evaluate `visibleWhen` conditions.
 *
 * Delegates to the unified expression engine. The result is coerced to
 * boolean. On parse error, falls back to simple `!!ctx[expr]` with a
 * console.warn (legacy behavior).
 */

import { evaluate } from "./expression";

/** Evaluate a visibility expression against a context object. */
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
      `[Prefab] Failed to parse visibleWhen expression: "${expr}". Falling back to key lookup.`,
    );
    return !!ctx[trimmed];
  }
}
