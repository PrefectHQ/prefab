import type { StateStore } from "./state";

/** Keep automatic state synchronization independent of user change actions. */
export function withStateUpdate<T>(
  handler: unknown,
  update: (value: T) => void,
) {
  const userHandler = handler as
    ((value: T, ...args: unknown[]) => unknown) | undefined;
  return (value: T, ...args: unknown[]) => {
    update(value);
    return userHandler?.(value, ...args);
  };
}

/** Install the existing string-value state binding on a named control. */
export function bindNamedValueChange(
  props: Record<string, unknown>,
  state: StateStore,
  name: string,
) {
  props.onValueChange = withStateUpdate(props.onValueChange, (value: string) =>
    state.set(name, value),
  );
}
