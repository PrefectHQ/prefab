import { useCallback, useState } from "react";

export interface StateStore {
  get(key: string): unknown;
  getAll(): Record<string, unknown>;
  set(key: string, value: unknown): void;
  merge(values: Record<string, unknown>): void;
  reset(initial?: Record<string, unknown>): void;
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
 * Reactive state store backed by React useState.
 * Mutations trigger re-renders of the component tree.
 */
export function useStateStore(initial?: Record<string, unknown>): StateStore {
  const [state, setState] = useState<Record<string, unknown>>(initial ?? {});

  const get = useCallback(
    (key: string): unknown =>
      key.includes(".") ? getByPath(state, key) : state[key],
    [state],
  );

  const getAll = useCallback((): Record<string, unknown> => state, [state]);

  const set = useCallback((key: string, value: unknown) => {
    setState((prev) =>
      key.includes(".")
        ? setByPath(prev, key, value)
        : { ...prev, [key]: value },
    );
  }, []);

  const merge = useCallback((values: Record<string, unknown>) => {
    setState((prev) => ({ ...prev, ...values }));
  }, []);

  const reset = useCallback((initial?: Record<string, unknown>) => {
    setState(initial ?? {});
  }, []);

  return { get, getAll, set, merge, reset };
}
