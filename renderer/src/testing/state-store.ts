/**
 * Plain (non-React) StateStore for use in tests.
 *
 * Same interface as the React-backed `useStateStore`, but operates on
 * a plain object. Mutations create new references (matching React's
 * immutability semantics) but don't trigger re-renders.
 */

import type { StateStore } from "../state";
import { getByPath, setByPath } from "../state";
import {
  type ComputedEntry,
  extractComputed,
  sortComputed,
  evaluateComputed,
} from "../computed";

export function createStateStore(
  initial?: Record<string, unknown>,
): StateStore {
  let state: Record<string, unknown> = { ...(initial ?? {}) };
  let computedEntries: ComputedEntry[] = [];
  let computedKeys = new Set<string>();

  // Extract computed entries from initial state (if any)
  const entries = sortComputed(extractComputed(state));
  if (entries.length > 0) {
    computedEntries = entries;
    computedKeys = new Set(entries.map((e) => e.key));
    state = { ...state, ...evaluateComputed(entries, state) };
  }

  function recompute(base: Record<string, unknown>): Record<string, unknown> {
    if (computedEntries.length === 0) return base;
    return { ...base, ...evaluateComputed(computedEntries, base) };
  }

  return {
    get(key: string): unknown {
      return key.includes(".") ? getByPath(state, key) : state[key];
    },
    getAll(): Record<string, unknown> {
      return state;
    },
    set(key: string, value: unknown): void {
      const topKey = key.includes(".") ? key.split(".")[0] : key;
      if (computedKeys.has(topKey)) {
        console.warn(
          `[Prefab] Cannot set computed state key "${topKey}" — computed values are read-only`,
        );
        return;
      }
      const next = key.includes(".")
        ? setByPath(state, key, value)
        : { ...state, [key]: value };
      state = recompute(next);
    },
    merge(values: Record<string, unknown>): void {
      state = recompute({ ...state, ...values });
    },
    reset(initial?: Record<string, unknown>): void {
      const raw = initial ? { ...initial } : {};
      const entries = sortComputed(extractComputed(raw));
      computedEntries = entries;
      computedKeys = new Set(entries.map((e) => e.key));
      state =
        entries.length > 0
          ? { ...raw, ...evaluateComputed(entries, raw) }
          : raw;
    },
    get computed() {
      return computedEntries;
    },
  };
}
