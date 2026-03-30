/**
 * Async action dispatcher with lifecycle callbacks and short-circuit chains.
 *
 * Actions execute asynchronously and return success/failure. When an action
 * list is dispatched, the first failure stops the chain — the failing
 * action's `onError` fires, then no further actions in the list run.
 *
 * Each action can declare `onSuccess` and `onError` callbacks, which are
 * themselves action specs (recursive). This enables patterns like:
 *
 *   Button("Save", onClick=[
 *     SetState("saving", true),
 *     CallTool("save_item",
 *       onSuccess=SetState("result", "$result"),
 *       onError=ShowToast("Failed", variant="error")),
 *     SetState("saving", false),   // only runs if CallTool succeeded
 *   ])
 *
 * Interpolation context: all state keys as bare names, plus `$event` for
 * the triggering event value, `$result` for the action's return value in
 * `onSuccess` callbacks, and `$error` for error messages in `onError`
 * callbacks.
 */

import type { App } from "@modelcontextprotocol/ext-apps";
import { toast } from "sonner";
import type { StateStore } from "./state";
import type { OverlayCloseFn } from "./overlay-context";
import { interpolateProps, interpolateString } from "./interpolation";
import { validateAction } from "./validation";
import { readFiles, filterByAccept } from "./file-utils";
import { evaluateCondition } from "./conditions";
import { getCustomActionHandler } from "./custom-handlers";

/** Action spec as received from the JSON component tree. */
export interface ActionSpec {
  action: string;
  onSuccess?: ActionSpec | ActionSpec[];
  onError?: ActionSpec | ActionSpec[];
  [key: string]: unknown;
}

/** Maximum callback nesting depth to prevent runaway recursion. */
const MAX_DEPTH = 10;

/** Active interval IDs for cleanup on unmount / tree replacement. */
const activeIntervals = new Set<ReturnType<typeof setInterval>>();

/** Clear all active intervals. Call when the component tree is replaced. */
export function clearAllIntervals(): void {
  for (const id of activeIntervals) {
    globalThis.clearInterval(id);
  }
  activeIntervals.clear();
}

/**
 * FastMCPApp identity for scoping callServerTool requests.
 *
 * When set, every outgoing tool call includes
 * `_meta: { fastmcp: { app: appName } }` so the server can route the
 * call to the correct app's tool registry.
 */
let appName: string | undefined;

/** Set the app name used to scope server tool calls. */
export function setAppName(name: string | undefined): void {
  appName = name;
}

/**
 * Extract a human-readable error message from a failed action result.
 *
 * Looks for text content in the result's content array (the standard MCP
 * error format). Falls back to a generic message.
 */
function extractErrorText(result: Record<string, unknown>): string {
  const content = result.content as
    | Array<{ type: string; text: string }>
    | undefined;
  if (content?.length) {
    return (
      content
        .filter((c) => c.type === "text" && c.text)
        .map((c) => c.text)
        .join("\n") || "Unknown error"
    );
  }
  return "Unknown error";
}

/**
 * Extract user-facing data from a tool result's content blocks.
 *
 * MCP tool results contain an array of content blocks. This extracts text
 * content and tries to parse it as JSON, falling back to the raw string.
 */
function extractToolResultData(result: Record<string, unknown>): unknown {
  const content = result.content as
    | Array<{ type: string; text?: string }>
    | undefined;
  if (!content?.length) return undefined;
  const text = content
    .filter((c) => c.type === "text" && c.text)
    .map((c) => c.text)
    .join("");
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Execute a single action. Returns true on success, false on failure.
 *
 * Server actions are awaited; client actions are synchronous (always
 * succeed). After the action completes, onSuccess or onError callbacks
 * are dispatched recursively.
 */
export async function executeAction(
  action: ActionSpec,
  app: App | null,
  state: StateStore,
  event?: unknown,
  depth = 0,
  error?: string,
  scope?: Record<string, unknown>,
  overlayClose?: OverlayCloseFn,
  result?: unknown,
): Promise<boolean> {
  if (depth > MAX_DEPTH) {
    console.warn("[Prefab] Action callback depth limit exceeded");
    return false;
  }

  // Interpolation context: state + scope (ForEach vars) + $event + $result + $error
  const ctx: Record<string, unknown> = {
    ...state.getAll(),
    ...scope,
    $event: event,
    $result: result,
    $error: error,
  };

  // Interpolate references in the action's parameters
  const resolved = interpolateProps(
    action as Record<string, unknown>,
    ctx,
  ) as ActionSpec;

  // Validate resolved action against its Zod schema
  const validationError = validateAction(resolved);
  if (validationError) {
    return false;
  }

  let success = true;
  let errorMessage: string | undefined;
  let resultData: unknown;

  try {
    switch (resolved.action) {
      // ── Server actions ──────────────────────────────────────────
      case "toolCall": {
        const name = resolved.tool as string;
        const args = (resolved.arguments ?? {}) as Record<string, string>;
        const toolResult = await app?.callServerTool({
          name,
          arguments: args,
          _meta: appName ? { fastmcp: { app: appName } } : undefined,
        });
        if (toolResult?.isError) {
          success = false;
          errorMessage = extractErrorText(toolResult);
          break;
        }
        // Extract result data — available as $result in onSuccess callbacks.
        // Prefer structuredContent (typed response). FastMCP wraps
        // non-object results in a {"result": ...} envelope and signals
        // this via _meta.fastmcp.wrap_result on the tool result.
        // The unwrapResult flag from the callable resolver handles the
        // host-initiated case; _meta handles CallTool from within the UI.
        if (toolResult?.structuredContent != null) {
          const sc = toolResult.structuredContent as Record<string, unknown>;
          const meta = (toolResult as Record<string, unknown>)._meta as
            | Record<string, unknown>
            | undefined;
          const fmMeta = meta?.fastmcp as Record<string, unknown> | undefined;
          const shouldUnwrap = resolved.unwrapResult || fmMeta?.wrap_result;
          resultData = shouldUnwrap && "result" in sc ? sc.result : sc;
        } else {
          resultData = toolResult
            ? extractToolResultData(toolResult)
            : undefined;
        }
        break;
      }
      case "sendMessage": {
        const text = resolved.content as string;
        const result = await app?.sendMessage({
          role: "user",
          content: [{ type: "text", text }],
        });
        if (result?.isError) {
          success = false;
          errorMessage = extractErrorText(result);
        }
        break;
      }
      case "updateContext": {
        try {
          await app?.updateModelContext({
            content: resolved.content
              ? [{ type: "text", text: resolved.content as string }]
              : undefined,
            structuredContent: resolved.structuredContent as
              | Record<string, unknown>
              | undefined,
          });
        } catch (e) {
          success = false;
          errorMessage = e instanceof Error ? e.message : String(e);
        }
        break;
      }
      case "openLink": {
        const url = resolved.url as string;
        if (app) {
          try {
            const result = await app.openLink({ url });
            if (result?.isError) {
              window.open(url, "_blank", "noopener,noreferrer");
            }
          } catch {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        } else {
          window.open(url, "_blank", "noopener,noreferrer");
        }
        break;
      }
      case "requestDisplayMode": {
        try {
          await app?.requestDisplayMode({
            mode: resolved.mode as "inline" | "fullscreen" | "pip",
          });
        } catch (e) {
          success = false;
          errorMessage = e instanceof Error ? e.message : String(e);
        }
        break;
      }

      // ── Client actions (synchronous, always succeed) ────────────
      case "setState": {
        state.set(resolved.key as string, resolved.value);
        break;
      }
      case "toggleState": {
        const key = resolved.key as string;
        state.set(key, !state.get(key));
        break;
      }
      case "appendState": {
        const key = resolved.key as string;
        const current = state.get(key);
        if (current != null && !Array.isArray(current)) {
          console.warn(`[Prefab] appendState: "${key}" is not an array`);
          break;
        }
        const arr = Array.isArray(current) ? [...current] : [];
        const rawIndex = resolved.index as number | undefined;
        if (rawIndex != null) {
          const index =
            rawIndex < 0 ? Math.max(0, arr.length + rawIndex) : rawIndex;
          arr.splice(index, 0, resolved.value);
        } else {
          arr.push(resolved.value);
        }
        state.set(key, arr);
        break;
      }
      case "popState": {
        const key = resolved.key as string;
        const rawIndex = resolved.index as number;
        const current = state.get(key);
        if (!Array.isArray(current)) {
          console.warn(`[Prefab] popState: "${key}" is not an array`);
          break;
        }
        const index = rawIndex < 0 ? current.length + rawIndex : rawIndex;
        state.set(
          key,
          current.filter((_, i) => i !== index),
        );
        break;
      }
      case "showToast": {
        const message = resolved.message as string;
        const opts = {
          description: resolved.description as string | undefined,
          duration: resolved.duration as number | undefined,
        };
        const variant = resolved.variant as string | undefined;
        if (variant === "success") toast.success(message, opts);
        else if (variant === "error") toast.error(message, opts);
        else if (variant === "warning") toast.warning(message, opts);
        else if (variant === "info") toast.info(message, opts);
        else toast(message, opts);
        break;
      }
      case "closeOverlay": {
        overlayClose?.();
        break;
      }

      case "fetch": {
        const url = resolved.url as string;
        const method = (resolved.method as string) ?? "GET";
        const headers = (resolved.headers as Record<string, string>) ?? {};
        const rawBody = resolved.body;

        const fetchInit: RequestInit = { method, headers: { ...headers } };
        if (rawBody != null && method !== "GET" && method !== "HEAD") {
          if (typeof rawBody === "object") {
            fetchInit.body = JSON.stringify(rawBody);
            (fetchInit.headers as Record<string, string>)["Content-Type"] ??=
              "application/json";
          } else {
            fetchInit.body = rawBody as string;
          }
        }

        const response = await globalThis.fetch(url, fetchInit);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        // Parse response: try JSON first, fall back to text
        const contentType = response.headers.get("content-type") ?? "";
        let data: unknown;
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          try {
            data = JSON.parse(text);
          } catch {
            data = text;
          }
        }

        // Response data is available as $result in onSuccess callbacks
        resultData = data;
        break;
      }

      case "openFilePicker": {
        const accept = resolved.accept as string | undefined;
        const multiple = (resolved.multiple as boolean) ?? false;
        const maxSize = resolved.maxSize as number | undefined;

        const fileData = await new Promise<unknown>((resolve, reject) => {
          const input = document.createElement("input");
          input.type = "file";
          if (accept) input.accept = accept;
          if (multiple) input.multiple = true;
          input.style.display = "none";
          document.body.appendChild(input);

          input.addEventListener("change", async () => {
            try {
              let files = Array.from(input.files ?? []);
              files = filterByAccept(files, accept);
              const result = await readFiles(files, { maxSize });
              resolve(result);
            } catch (err) {
              reject(err);
            } finally {
              document.body.removeChild(input);
            }
          });

          // Handle cancel — the input fires no change event on cancel,
          // but we can detect it when the window regains focus.
          const onFocus = () => {
            // Small delay to let the change event fire first if files were selected
            setTimeout(() => {
              if (document.body.contains(input)) {
                document.body.removeChild(input);
                resolve([]);
              }
              window.removeEventListener("focus", onFocus);
            }, 300);
          };
          window.addEventListener("focus", onFocus);

          input.click();
        });

        if (!Array.isArray(fileData) || fileData.length === 0) {
          // User cancelled or all files rejected — not an error, just stop the chain
          return true;
        }

        // File data is available as $result in onSuccess callbacks
        resultData = fileData;
        break;
      }

      case "setInterval": {
        // Duration can be a number or a {{ template }} expression.
        // Keep the raw expression so we can re-evaluate it each tick.
        const rawDuration = action.duration;
        const resolveDuration = (): number => {
          if (typeof rawDuration === "number") return rawDuration;
          const ctx = { ...state.getAll(), ...(scope ?? {}) };
          const val = interpolateString(String(rawDuration), ctx);
          return Number(val) || 1000;
        };

        // Use the raw (uninterpolated) while expression — it must be
        // re-evaluated each tick against the live state, not resolved once.
        const whileExpr = action.while as string | undefined;
        const maxCount = resolved.count as number | undefined;
        // Keep onTick/onComplete as raw specs — they get interpolated
        // at execution time inside executeActions.
        const onTick = action.onTick as ActionSpec | ActionSpec[] | undefined;
        const onComplete = action.onComplete as
          | ActionSpec
          | ActionSpec[]
          | undefined;

        let tickCount = 0;
        let currentDuration = resolveDuration();

        const shouldContinue = (): boolean => {
          if (maxCount != null && tickCount >= maxCount) return false;
          if (whileExpr != null) {
            const ctx: Record<string, unknown> = {
              ...state.getAll(),
              ...(scope ?? {}),
            };
            return evaluateCondition(whileExpr, ctx);
          }
          return true;
        };

        const fireComplete = async () => {
          if (onComplete) {
            await executeActions(
              onComplete,
              app,
              state,
              undefined,
              depth + 1,
              undefined,
              scope,
              overlayClose,
            );
          }
        };

        // If condition is already false, fire onComplete immediately
        if (!shouldContinue()) {
          await fireComplete();
          break;
        }

        // Start the interval, restarting if duration changes reactively.
        const startInterval = (): ReturnType<typeof setInterval> => {
          const id = globalThis.setInterval(async () => {
            tickCount++;

            if (onTick) {
              await executeActions(
                onTick,
                app,
                state,
                tickCount,
                depth + 1,
                undefined,
                scope,
                overlayClose,
              );
            }

            if (!shouldContinue()) {
              globalThis.clearInterval(id);
              activeIntervals.delete(id);
              await fireComplete();
              return;
            }

            // Check if duration changed (reactive {{ template }})
            if (typeof rawDuration !== "number") {
              const newDuration = resolveDuration();
              if (newDuration !== currentDuration) {
                currentDuration = newDuration;
                globalThis.clearInterval(id);
                activeIntervals.delete(id);
                const newId = startInterval();
                activeIntervals.add(newId);
              }
            }
          }, currentDuration);
          return id;
        };

        const intervalId = startInterval();
        activeIntervals.add(intervalId);

        // Fire-and-forget: return immediately
        break;
      }

      case "callHandler": {
        const handlerName = resolved.handler as string;
        const handlerFn = getCustomActionHandler(handlerName);
        if (!handlerFn) {
          success = false;
          errorMessage = `Unknown handler: "${handlerName}"`;
          break;
        }
        const handlerCtx = {
          state: { ...state.getAll() },
          event,
          arguments: resolved.arguments as Record<string, unknown> | undefined,
        };
        const updates = handlerFn(handlerCtx);
        if (updates && typeof updates === "object") {
          state.merge(updates);
          resultData = updates;
        }
        break;
      }
    }
  } catch (e: unknown) {
    success = false;
    errorMessage = e instanceof Error ? e.message : String(e);
  }

  // Dispatch lifecycle callbacks: $result to onSuccess, $error to onError
  if (success && resolved.onSuccess) {
    await executeActions(
      resolved.onSuccess,
      app,
      state,
      undefined,
      depth + 1,
      undefined,
      scope,
      overlayClose,
      resultData,
    );
  } else if (!success && resolved.onError) {
    await executeActions(
      resolved.onError,
      app,
      state,
      undefined,
      depth + 1,
      errorMessage,
      scope,
      overlayClose,
    );
  }

  return success;
}

/**
 * Execute one or many actions sequentially with short-circuit.
 *
 * Accepts a single ActionSpec or an array (for composed action chains).
 * The first action that fails stops the chain — its onError callback runs,
 * then no further actions execute.
 */
export async function executeActions(
  actions: ActionSpec | ActionSpec[],
  app: App | null,
  state: StateStore,
  event?: unknown,
  depth = 0,
  error?: string,
  scope?: Record<string, unknown>,
  overlayClose?: OverlayCloseFn,
  result?: unknown,
): Promise<void> {
  const list = Array.isArray(actions) ? actions : [actions];
  for (const action of list) {
    const ok = await executeAction(
      action,
      app,
      state,
      event,
      depth,
      error,
      scope,
      overlayClose,
      result,
    );
    if (!ok) break;
  }
}
