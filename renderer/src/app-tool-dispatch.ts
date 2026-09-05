/** Local app-tool routing, scoped to the stable methods of one StateStore. */
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { StateStore } from "./state";
import type { OverlayCloseFn } from "./overlay-context";

export interface AppToolCallOptions {
  signal?: AbortSignal;
  depth?: number;
  overlayClose?: OverlayCloseFn;
}

type Dispatcher = (
  name: string,
  args: unknown,
  options: AppToolCallOptions,
) => Promise<CallToolResult>;

const dispatchers = new WeakMap<StateStore["getAll"], Dispatcher>();

export class InactiveAppToolError extends Error {
  constructor() {
    super("App tool invocation is no longer active");
  }
}

export function registerAppToolDispatcher(
  state: StateStore,
  dispatch: Dispatcher,
) {
  dispatchers.set(state.getAll, dispatch);
  return () => {
    if (dispatchers.get(state.getAll) === dispatch)
      dispatchers.delete(state.getAll);
  };
}

export async function dispatchAppTool(
  state: StateStore,
  name: string,
  args: unknown,
  options: AppToolCallOptions,
): Promise<CallToolResult> {
  const dispatch = dispatchers.get(state.getAll);
  if (!dispatch) throw new Error(`No app tool dispatcher for ${name}`);
  const result = await dispatch(name, args, options);
  if (dispatchers.get(state.getAll) !== dispatch)
    throw new InactiveAppToolError();
  return result;
}
