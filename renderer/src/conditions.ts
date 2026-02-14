/**
 * Evaluate conditional expressions (Condition `when` clauses).
 *
 * Supports both template-wrapped expressions `{{ expr }}` and bare
 * expressions for backward compatibility. Uses `interpolateString` for
 * `{{ }}` templates (type-preserving) and falls back to `evaluate` for
 * bare expressions.
 */

import { evaluate } from "./expression";
import { interpolateString } from "./interpolation";

/** Evaluate a condition expression against a context object. */
export function evaluateCondition(
  expr: string,
  ctx: Record<string, unknown>,
): boolean {
  const trimmed = expr.trim();
  if (!trimmed) return false;

  try {
    // Template-wrapped expressions: {{ expr }}
    if (trimmed.startsWith("{{") && trimmed.endsWith("}}")) {
      return !!interpolateString(trimmed, ctx);
    }
    // Bare expressions (backward compat)
    return !!evaluate(trimmed, ctx);
  } catch {
    console.warn(
      `[Prefab] Failed to parse condition expression: "${expr}". Falling back to key lookup.`,
    );
    return !!ctx[trimmed];
  }
}
