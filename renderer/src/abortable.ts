/** Stop waiting on cancellation while observing any eventual background failure. */
export function abortable<T>(
  pending: Promise<T>,
  signal: AbortSignal,
): Promise<T> {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    const onAbort = () => {
      cancelled = true;
      signal.removeEventListener("abort", onAbort);
      reject(signal.reason);
    };
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) onAbort();
    pending.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", onAbort);
        if (
          cancelled &&
          error !== signal.reason &&
          !(error instanceof Error && error.name === "AbortError")
        ) {
          console.warn("[Prefab] Action failed after cancellation", error);
        }
        reject(error);
      },
    );
  });
}
