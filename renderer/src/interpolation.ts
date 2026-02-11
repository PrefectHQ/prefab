/**
 * Template interpolation engine.
 *
 * Scans strings for {{ expr }} boundaries and delegates each inner
 * expression to the unified expression engine. Supports arithmetic,
 * comparisons, ternaries, string concatenation, pipe transforms, and
 * default value shorthand — everything the expression grammar provides.
 *
 * Type preservation: when the entire string is a single {{ expr }},
 * the resolved type is preserved (number, boolean, array, object).
 * Mixed templates like "text {{ expr }}" always produce strings.
 */

import { evaluate } from "./expression";

/**
 * If the entire string is a single {{ expr }} template, return the
 * inner expression (trimmed). Otherwise return null.
 */
function extractSoleExpr(template: string): string | null {
  const t = template.trim();
  if (!t.startsWith("{{") || !t.endsWith("}}")) return null;
  const inner = t.slice(2, -2);
  // Nested {{ or }} means it's not a sole template
  if (inner.includes("{{") || inner.includes("}}")) return null;
  return inner.trim();
}

/**
 * Interpolate a single string template.
 *
 * - Sole `{{ expr }}` — evaluates and preserves the result type.
 *   Returns the original template string if the result is undefined
 *   (backward compat: `{{ missing }}` stays as-is).
 *
 * - Mixed `"text {{ expr }} more"` — scans for all `{{ }}` pairs,
 *   evaluates each, and concatenates. Undefined values become empty
 *   strings. Always returns a string.
 */
export function interpolateString(
  template: string,
  data: Record<string, unknown>,
): unknown {
  if (!template.includes("{{")) return template;

  // ── Sole template (type-preserving) ──────────────────────────────
  const soleExpr = extractSoleExpr(template);
  if (soleExpr !== null) {
    try {
      const result = evaluate(soleExpr, data);
      if (result === undefined) return template;
      return result;
    } catch {
      return template;
    }
  }

  // ── Mixed template (string output) ──────────────────────────────
  let result = "";
  let i = 0;

  while (i < template.length) {
    const start = template.indexOf("{{", i);
    if (start === -1) {
      result += template.slice(i);
      break;
    }

    result += template.slice(i, start);

    const end = template.indexOf("}}", start + 2);
    if (end === -1) {
      // Unclosed template — append remainder as-is
      result += template.slice(start);
      break;
    }

    const expr = template.slice(start + 2, end).trim();
    try {
      const value = evaluate(expr, data);
      if (value !== undefined) {
        result += String(value);
      }
    } catch {
      // Parse error in mixed template — treat as empty
    }

    i = end + 2;
  }

  return result;
}

/**
 * Deep-interpolate all string values in a props object.
 * Non-string values pass through unchanged.
 */
export function interpolateProps(
  props: Record<string, unknown>,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === "string") {
      result[key] = interpolateString(value, data);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? interpolateProps(item as Record<string, unknown>, data)
          : typeof item === "string"
            ? interpolateString(item, data)
            : item,
      );
    } else if (typeof value === "object" && value !== null) {
      result[key] = interpolateProps(value as Record<string, unknown>, data);
    } else {
      result[key] = value;
    }
  }
  return result;
}
