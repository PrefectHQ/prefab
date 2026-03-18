/**
 * Custom handler registry — developer-registered pipes and action handlers.
 *
 * The host app registers custom handlers by assigning `window.__prefab_handlers`
 * before the renderer initializes. This module reads that global once at startup
 * and exposes lookup functions for the expression engine (pipes) and action
 * dispatcher (action handlers).
 *
 * Custom pipes extend the `{{ value | pipeName }}` syntax.
 * Custom action handlers are invoked by the `callHandler` action.
 */

export type PipeFn = (value: unknown, arg?: string) => unknown;

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

let handlers: PrefabHandlers = {};

/**
 * Read custom handlers from `window.__prefab_handlers`.
 * Call once at startup before React mounts.
 */
export function initHandlers(): void {
  const w = globalThis as unknown as Record<string, unknown>;
  const raw = w.__prefab_handlers as PrefabHandlers | undefined;
  if (raw && typeof raw === "object") {
    handlers = raw;
  }
}

/** Look up a custom pipe by name. Returns undefined if not registered. */
export function getCustomPipe(name: string): PipeFn | undefined {
  return handlers.pipes?.[name];
}

/** Look up a custom action handler by name. Returns undefined if not registered. */
export function getCustomActionHandler(
  name: string,
): ActionHandlerFn | undefined {
  return handlers.actions?.[name];
}

/**
 * Reset handlers (for testing).
 * @internal
 */
export function _resetHandlers(overrides?: PrefabHandlers): void {
  handlers = overrides ?? {};
}
