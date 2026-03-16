import { useCallback, useRef, useState } from "react";
import {
  type ComputedEntry,
  extractComputed,
  sortComputed,
  evaluateComputed,
} from "./computed";

export interface StateStore {
  get(key: string): unknown;
  getAll(): Record<string, unknown>;
  set(key: string, value: unknown): void;
  merge(values: Record<string, unknown>): void;
  reset(initial?: Record<string, unknown>): void;
  /** The sorted list of computed entries (empty if none). */
  readonly computed: ComputedEntry[];
}

// ── Path utilities ───────────────────────────────────────────────────

function isIndex(segment: string): boolean {
  return /^\d+$/.test(segment);
}

/** Resolve a dot-path to a value in a nested structure. */
export function getByPath(
  root: Record<string, unknown>,
  path: string,
): unknown {
  const parts = path.split(".");
  let current: unknown = root;
  for (const part of parts) {
    if (current == null) return undefined;
    if (isIndex(part)) {
      if (!Array.isArray(current)) return undefined;
      current = (current as unknown[])[Number(part)];
    } else {
      if (typeof current !== "object" || Array.isArray(current))
        return undefined;
      current = (current as Record<string, unknown>)[part];
    }
  }
  return current;
}

/** Immutable deep-set by dot-path. Returns a new root object. */
export function setByPath(
  root: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> {
  const parts = path.split(".");
  if (parts.length === 1) {
    return { ...root, [parts[0]]: value };
  }

  const [head, ...rest] = parts;
  const child = root[head];

  if (child == null) {
    console.warn(
      `[Prefab] setByPath: "${head}" is ${child}, cannot set "${path}"`,
    );
    return root;
  }

  const restPath = rest.join(".");
  const nextSegment = rest[0];

  if (isIndex(nextSegment)) {
    // Next segment is an array index — child must be an array
    if (!Array.isArray(child)) {
      console.warn(
        `[Prefab] setByPath: "${head}" is not an array, cannot index with "${nextSegment}" in "${path}"`,
      );
      return root;
    }
    const idx = Number(nextSegment);
    if (idx < 0 || idx >= child.length) {
      console.warn(
        `[Prefab] setByPath: index ${idx} out of bounds for "${head}" (length ${child.length}) in "${path}"`,
      );
      return root;
    }
    if (rest.length === 1) {
      const newArr = [...child];
      newArr[idx] = value;
      return { ...root, [head]: newArr };
    }
    // Recurse into the array element
    const element = child[idx];
    if (typeof element !== "object" || element == null) {
      console.warn(
        `[Prefab] setByPath: element at "${head}.${idx}" is not an object, cannot traverse further in "${path}"`,
      );
      return root;
    }
    const newElement = setByPath(
      element as Record<string, unknown>,
      rest.slice(1).join("."),
      value,
    );
    const newArr = [...child];
    newArr[idx] = newElement;
    return { ...root, [head]: newArr };
  }

  // Next segment is a key — child must be an object
  if (typeof child !== "object" || Array.isArray(child)) {
    console.warn(
      `[Prefab] setByPath: "${head}" is not an object, cannot traverse "${path}"`,
    );
    return root;
  }

  return {
    ...root,
    [head]: setByPath(child as Record<string, unknown>, restPath, value),
  };
}

// ── React state store ────────────────────────────────────────────────

/**
 * Reactive state store backed by React useState + a mutable ref.
 *
 * The ref (`stateRef`) is the source of truth for reads (`get`, `getAll`).
 * Mutations update the ref immediately and then call React's setState to
 * trigger re-renders. This ensures that sequential actions in the same
 * event handler see each other's writes without waiting for a React
 * render cycle — critical for patterns like:
 *
 *   [SetState("seconds", 10), SetInterval(while_="{{ seconds > 0 }}", ...)]
 *
 * Without the ref, the setInterval action would read stale state and see
 * `seconds` as undefined.
 */
export function useStateStore(initial?: Record<string, unknown>): StateStore {
  // Process initial state for computed markers on first call.
  const [processedInitial] = useState(() => {
    if (!initial) return { state: {}, entries: [] as ComputedEntry[] };
    const raw = { ...initial };
    const entries = sortComputed(extractComputed(raw));
    const state =
      entries.length > 0 ? { ...raw, ...evaluateComputed(entries, raw) } : raw;
    return { state, entries };
  });

  const [state, setState] = useState<Record<string, unknown>>(
    processedInitial.state,
  );
  const stateRef = useRef(state);
  stateRef.current = state;
  const computedRef = useRef<ComputedEntry[]>(processedInitial.entries);
  const computedKeysRef = useRef<Set<string>>(
    new Set(processedInitial.entries.map((e) => e.key)),
  );

  /** Re-evaluate computed entries and merge into state. */
  const recompute = useCallback(
    (base: Record<string, unknown>): Record<string, unknown> => {
      const entries = computedRef.current;
      if (entries.length === 0) return base;
      const values = evaluateComputed(entries, base);
      return { ...base, ...values };
    },
    [],
  );

  /** Commit state: apply computed values, update ref + React state. */
  const commit = useCallback(
    (base: Record<string, unknown>) => {
      const next = recompute(base);
      stateRef.current = next;
      setState(next);
    },
    [recompute],
  );

  const get = useCallback(
    (key: string): unknown =>
      key.includes(".")
        ? getByPath(stateRef.current, key)
        : stateRef.current[key],
    [],
  );

  const getAll = useCallback(
    (): Record<string, unknown> => stateRef.current,
    [],
  );

  const set = useCallback(
    (key: string, value: unknown) => {
      // Guard computed keys from direct writes
      const topKey = key.includes(".") ? key.split(".")[0] : key;
      if (computedKeysRef.current.has(topKey)) {
        console.warn(
          `[Prefab] Cannot set computed state key "${topKey}" — computed values are read-only`,
        );
        return;
      }
      const next = key.includes(".")
        ? setByPath(stateRef.current, key, value)
        : { ...stateRef.current, [key]: value };
      commit(next);
    },
    [commit],
  );

  const merge = useCallback(
    (values: Record<string, unknown>) => {
      const next = { ...stateRef.current, ...values };
      commit(next);
    },
    [commit],
  );

  const reset = useCallback((init?: Record<string, unknown>) => {
    const raw = init ? { ...init } : {};
    const entries = sortComputed(extractComputed(raw));
    computedRef.current = entries;
    computedKeysRef.current = new Set(entries.map((e) => e.key));
    // raw now has computed markers removed — start with literal values
    // then evaluate computed entries on top
    const next =
      entries.length > 0 ? { ...raw, ...evaluateComputed(entries, raw) } : raw;
    stateRef.current = next;
    setState(next);
  }, []);

  return {
    get,
    getAll,
    set,
    merge,
    reset,
    get computed() {
      return computedRef.current;
    },
  };
}
