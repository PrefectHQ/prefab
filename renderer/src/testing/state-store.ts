/**
 * Plain (non-React) StateStore for use in tests.
 *
 * Same interface as the React-backed `useStateStore`, but operates on
 * a plain object. Mutations create new references (matching React's
 * immutability semantics) but don't trigger re-renders.
 */

import type { StateStore } from "../state";
import { getByPath, setByPath } from "../state";

export function createStateStore(
  initial?: Record<string, unknown>,
): StateStore {
  let state: Record<string, unknown> = { ...(initial ?? {}) };

  return {
    get(key: string): unknown {
      return key.includes(".") ? getByPath(state, key) : state[key];
    },
    getAll(): Record<string, unknown> {
      return state;
    },
    set(key: string, value: unknown): void {
      state = key.includes(".")
        ? setByPath(state, key, value)
        : { ...state, [key]: value };
    },
    merge(values: Record<string, unknown>): void {
      state = { ...state, ...values };
    },
    reset(initial?: Record<string, unknown>): void {
      state = initial ? { ...initial } : {};
    },
  };
}
