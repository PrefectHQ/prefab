import { useCallback, useState } from "react";

export interface StateStore {
  get(key: string): unknown;
  getAll(): Record<string, unknown>;
  set(key: string, value: unknown): void;
  merge(values: Record<string, unknown>): void;
  reset(initial?: Record<string, unknown>): void;
}

/**
 * Reactive state store backed by React useState.
 * Mutations trigger re-renders of the component tree.
 */
export function useStateStore(
  initial?: Record<string, unknown>,
): StateStore {
  const [state, setState] = useState<Record<string, unknown>>(initial ?? {});

  const get = useCallback(
    (key: string): unknown => state[key],
    [state],
  );

  const getAll = useCallback(
    (): Record<string, unknown> => state,
    [state],
  );

  const set = useCallback(
    (key: string, value: unknown) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const merge = useCallback(
    (values: Record<string, unknown>) => {
      setState((prev) => ({ ...prev, ...values }));
    },
    [],
  );

  const reset = useCallback(
    (initial?: Record<string, unknown>) => {
      setState(initial ?? {});
    },
    [],
  );

  return { get, getAll, set, merge, reset };
}
