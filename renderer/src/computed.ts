/**
 * Computed state: named derived values from expressions.
 *
 * Computed keys are declared in the initial state with a `__computed__`
 * marker. Their values are template expressions that the renderer
 * evaluates reactively on every state change.
 *
 * Wire format: `{ "total": { "__computed__": "{{ a + b }}" } }`
 *
 * Computed keys are read-only — SetState targeting a computed key logs
 * a warning and no-ops.
 */

import { interpolateString } from "./interpolation";

/** A single computed state entry extracted from the initial state. */
export interface ComputedEntry {
  key: string;
  expression: string;
}

/**
 * Check whether a state value is a computed marker.
 *
 * Computed markers are objects with a single `__computed__` key whose
 * value is a string (the template expression).
 */
export function isComputedMarker(
  value: unknown,
): value is { __computed__: string } {
  return (
    value != null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "__computed__" in value &&
    typeof (value as Record<string, unknown>).__computed__ === "string"
  );
}

/**
 * Extract computed entries from an initial state object.
 *
 * Removes computed markers from the state (mutates in place) and returns
 * the list of computed entries. The state object is left with only
 * literal values, ready for the state store.
 */
export function extractComputed(
  state: Record<string, unknown>,
): ComputedEntry[] {
  const entries: ComputedEntry[] = [];
  for (const [key, value] of Object.entries(state)) {
    if (isComputedMarker(value)) {
      entries.push({ key, expression: value.__computed__ });
      delete state[key];
    }
  }
  return entries;
}

/**
 * Topologically sort computed entries so dependencies evaluate first.
 *
 * A computed expression can reference other computed keys. This function
 * detects those references (by checking which computed key names appear
 * as identifiers in each expression) and returns a dependency-ordered
 * list. Cycles are detected and break the cycle arbitrarily with a
 * console warning.
 */
export function sortComputed(entries: ComputedEntry[]): ComputedEntry[] {
  if (entries.length <= 1) return entries;

  const byKey = new Map<string, ComputedEntry>();
  for (const e of entries) byKey.set(e.key, e);

  // Build adjacency: for each entry, which other computed keys depend on it.
  // deps.get(A) = set of entries that A depends on (predecessors).
  // dependents.get(A) = set of entries that depend on A (successors).
  const dependents = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();
  for (const entry of entries) {
    dependents.set(entry.key, new Set());
    inDegree.set(entry.key, 0);
  }
  for (const entry of entries) {
    for (const other of entries) {
      if (
        other.key !== entry.key &&
        referencesSym(entry.expression, other.key)
      ) {
        // entry depends on other → other has entry as a dependent
        dependents.get(other.key)!.add(entry.key);
        inDegree.set(entry.key, (inDegree.get(entry.key) ?? 0) + 1);
      }
    }
  }

  // Kahn's algorithm for topological sort
  const queue: string[] = [];
  for (const [key, deg] of inDegree) {
    if (deg === 0) queue.push(key);
  }

  const sorted: ComputedEntry[] = [];
  while (queue.length > 0) {
    const key = queue.shift()!;
    sorted.push(byKey.get(key)!);
    for (const dep of dependents.get(key) ?? []) {
      const newDeg = (inDegree.get(dep) ?? 1) - 1;
      inDegree.set(dep, newDeg);
      if (newDeg === 0) queue.push(dep);
    }
  }

  // If not all entries were sorted, there's a cycle. Append remaining
  // entries in original order with a warning.
  if (sorted.length < entries.length) {
    const sortedKeys = new Set(sorted.map((e) => e.key));
    for (const entry of entries) {
      if (!sortedKeys.has(entry.key)) {
        console.warn(
          `[Prefab] Circular dependency in computed state: "${entry.key}"`,
        );
        sorted.push(entry);
      }
    }
  }

  return sorted;
}

/**
 * Check if an expression string references a given identifier.
 *
 * Uses a word-boundary regex to avoid false positives from partial
 * matches (e.g., "total" matching inside "subtotal").
 */
function referencesSym(expression: string, name: string): boolean {
  // Match the name as a standalone identifier (not preceded/followed by
  // word characters, dots, or $).
  const pattern = new RegExp(`(?<![\\w.$])${escapeRegex(name)}(?![\\w.$])`);
  return pattern.test(expression);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Evaluate all computed entries against the current state and return
 * an object with the computed values.
 *
 * Entries must be in dependency order (see `sortComputed`). Each entry
 * is evaluated with the full state context (including previously
 * evaluated computed values from this pass).
 */
export function evaluateComputed(
  entries: ComputedEntry[],
  state: Record<string, unknown>,
): Record<string, unknown> {
  const ctx = { ...state };
  const result: Record<string, unknown> = {};
  for (const { key, expression } of entries) {
    try {
      const value = interpolateString(expression, ctx);
      // If interpolation returned the original expression unchanged,
      // treat as undefined (dependency not yet available).
      result[key] = value === expression ? undefined : value;
    } catch {
      result[key] = undefined;
    }
    // Make this value available for subsequent computed entries
    ctx[key] = result[key];
  }
  return result;
}
