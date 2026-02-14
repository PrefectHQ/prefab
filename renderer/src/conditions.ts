/**
 * Evaluate conditional expressions (Condition `when` clauses).
 *
 * Strips `{{ }}` delimiters if present, then evaluates the inner expression
 * directly. We intentionally avoid interpolateString here — it returns the
 * raw template for undefined values (e.g. "{{ missing }}" stays as the
 * literal string "{{ missing }}"), which is correct for display but wrong
 * for conditions since a non-empty string is truthy.
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
    let inner = trimmed;
    if (inner.startsWith("{{") && inner.endsWith("}}")) {
      inner = inner.slice(2, -2).trim();
    }
    return !!evaluate(inner, ctx);
  } catch {
    console.warn(
      `[Prefab] Failed to parse condition expression: "${expr}". Falling back to key lookup.`,
    );
    return !!ctx[trimmed];
  }
}
