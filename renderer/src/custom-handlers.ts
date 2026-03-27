/**
 * Custom handler registry — developer-registered pipes and action handlers.
 *
 * The host app registers custom handlers by assigning `window.__prefab_handlers`
 * before the renderer initializes. Lookup functions read from the global lazily
 * on each call, so handlers can be registered at any time (before or after the
 * renderer mounts).
 *
 * Custom pipes extend the `{{ value | pipeName }}` syntax.
 * Custom action handlers are invoked by the `callHandler` action.
 */

export type PipeFn = (value: unknown, arg?: unknown) => unknown;

export interface HandlerContext {
  /** Snapshot of the current state (not a live reference). */
  state: Record<string, unknown>;
  /** The triggering event value ($event). */
  event: unknown;
  /** Extra arguments from the action spec. */
  arguments?: Record<string, unknown>;
}

export type ActionHandlerFn = (
  ctx: HandlerContext,
) => Record<string, unknown> | void;

interface PrefabHandlers {
  pipes?: Record<string, PipeFn>;
  actions?: Record<string, ActionHandlerFn>;
}

/** Read the handler registry from the global. */
function getHandlers(): PrefabHandlers {
  const w = globalThis as unknown as Record<string, unknown>;
  return (w.__prefab_handlers as PrefabHandlers) ?? {};
}

/** Look up a custom pipe by name. Returns undefined if not registered. */
export function getCustomPipe(name: string): PipeFn | undefined {
  return getHandlers().pipes?.[name];
}

/** Look up a custom action handler by name. Returns undefined if not registered. */
export function getCustomActionHandler(
  name: string,
): ActionHandlerFn | undefined {
  return getHandlers().actions?.[name];
}

/**
 * Override handlers (for testing).
 * @internal
 */
export function _resetHandlers(overrides?: PrefabHandlers): void {
  const w = globalThis as unknown as Record<string, unknown>;
  w.__prefab_handlers = overrides ?? {};
}
