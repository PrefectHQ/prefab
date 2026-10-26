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
