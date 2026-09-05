/** App-provided tools and local .invoke() actions share one instance dispatcher. */
import type { App } from "@modelcontextprotocol/ext-apps";
import type { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";
import { Validator } from "@cfworker/json-schema";
import { z } from "zod";
import { executeActions, type ActionSpec } from "./actions";
import { interpolateProps } from "./interpolation";
import type { StateStore } from "./state";
import {
  registerAppToolDispatcher,
  type AppToolCallOptions,
} from "./app-tool-dispatch";

const actionSchema = z.object({ action: z.string() }).passthrough();
const toolSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[a-zA-Z0-9_.-]+$/),
  description: z.string().optional(),
  inputSchema: z.object({ type: z.literal("object") }).passthrough(),
  bind: z.record(z.string(), z.unknown()).default({}),
  actions: z.union([actionSchema, z.array(actionSchema)]).default([]),
  result: z.record(z.string(), z.unknown()),
});

function toolError(message: string): CallToolResult {
  return { isError: true, content: [{ type: "text", text: message }] };
}

type ToolEntry = {
  definition: Tool;
  run: (args: unknown, options: AppToolCallOptions) => Promise<CallToolResult>;
};

export class AppTools {
  private entries = new Map<string, ToolEntry>();
  private generation = 0;
  private ready = false;
  private pending: Promise<unknown> = Promise.resolve();
  private controllers = new Set<AbortController>();
  private unregister?: () => void;

  /** Install before connect so discovery works even before the payload arrives. */
  constructor(private app: App | null) {
    if (!app) return;
    app.onlisttools = async () => ({
      tools: [...this.entries.values()].map((entry) => entry.definition),
    });
    app.oncalltool = ({ name, arguments: args }, extra) =>
      this.call(name, args ?? {}, { signal: extra.signal });
  }

  /** Human and model invocations join the same queue for this app instance. */
  call(name: string, args: unknown = {}, options: AppToolCallOptions = {}) {
    const entry = this.entries.get(name);
    if (!entry) return Promise.resolve(toolError(`Unknown app tool: ${name}`));
    // Capture both the definition and arguments before waiting in the queue.
    // Bindings, in contrast, are evaluated against live state when execution starts.
    const input = structuredClone(args);
    const call = this.pending.then(() => entry.run(input, options));
    this.pending = call.catch(() => undefined);
    return call;
  }

  connected(): void {
    this.ready = true;
    if (this.entries.size) this.notify();
  }

  private notify(): void {
    if (this.ready && this.app) {
      void this.app.sendToolListChanged().catch((error) => {
        console.warn("[Prefab] Unable to notify app tool list change", error);
      });
    }
  }

  private reset(): void {
    this.generation++;
    this.unregister?.();
    this.unregister = undefined;
    for (const controller of this.controllers) controller.abort();
    this.controllers.clear();
    this.entries.clear();
    this.pending = Promise.resolve();
  }

  clear(): void {
    this.reset();
    this.notify();
  }

  /** Replace the complete tool set; omitted tools must never survive a new app. */
  replace(raw: unknown, state: StateStore): void {
    this.reset();
    const generation = this.generation;
    try {
      const specs = z.array(toolSchema).parse(raw ?? []);
      const entries = new Map<string, ToolEntry>();
      for (const spec of specs) {
        if (entries.has(spec.name))
          throw new Error(`Duplicate app tool: ${spec.name}`);
        // Interpreted JSON Schema supports Pydantic $defs without eval/Function.
        const validator = new Validator(spec.inputSchema, "2020-12");
        entries.set(spec.name, {
          definition: {
            name: spec.name,
            description: spec.description,
            inputSchema: spec.inputSchema,
          },
          run: async (rawArgs, options) => {
            const controller = new AbortController();
            const cancel = () => controller.abort();
            options.signal?.addEventListener("abort", cancel, { once: true });
            if (options.signal?.aborted) cancel();
            this.controllers.add(controller);
            let running = true;
            try {
              const checkActive = () => {
                if (
                  generation !== this.generation ||
                  controller.signal.aborted
                ) {
                  throw new Error("App tool invocation is no longer active");
                }
              };
              checkActive();
              if (rawArgs && typeof rawArgs === "object") {
                for (const key of Object.keys(spec.bind)) {
                  if (Object.prototype.hasOwnProperty.call(rawArgs, key)) {
                    return toolError(
                      `Bound argument cannot be overridden: ${key}`,
                    );
                  }
                }
              }
              const validation = validator.validate(rawArgs);
              if (!validation.valid) {
                return toolError(
                  `Invalid arguments for ${spec.name}: ${validation.errors
                    .map((e) => `${e.instanceLocation}: ${e.error}`)
                    .join("; ")}`,
                );
              }
              const bindings = interpolateProps(spec.bind, state.getAll());
              const args = structuredClone({
                ...(rawArgs as object),
                ...bindings,
              });
              const liveState: StateStore = {
                get: (key) => {
                  checkActive();
                  return state.get(key);
                },
                getAll: () => {
                  checkActive();
                  return state.getAll();
                },
                set: (key, value) => {
                  checkActive();
                  state.set(key, value);
                },
                merge: (values) => {
                  checkActive();
                  state.merge(values);
                },
                reset: (initial) => {
                  checkActive();
                  state.reset(initial);
                },
              };
              // Nested local calls run inside their parent's queue slot. Joining
              // the queue again would deadlock. Action depth still limits recursion.
              registerAppToolDispatcher(liveState, (name, input, nested) => {
                checkActive();
                // Deferred actions (for example interval ticks) run after
                // this invocation completes and should join the normal queue.
                if (!running) return this.call(name, input, nested);
                const entry = entries.get(name);
                return entry
                  ? entry.run(structuredClone(input), {
                      ...nested,
                      signal: controller.signal,
                    })
                  : Promise.resolve(toolError(`Unknown app tool: ${name}`));
              });
              let failure: string | undefined;
              const ok = await executeActions(
                spec.actions as ActionSpec | ActionSpec[],
                this.app,
                liveState,
                args,
                options.depth ?? 0,
                undefined,
                undefined,
                options.overlayClose,
                undefined,
                {
                  signal: controller.signal,
                  reportError: (message) => {
                    failure ??= message;
                  },
                },
              );
              checkActive();
              if (!ok)
                return toolError(
                  failure ??
                    `Action execution failed in app tool: ${spec.name}`,
                );
              const result = interpolateProps(spec.result, {
                ...state.getAll(),
                $event: args,
              });
              const text = JSON.stringify(result);
              return {
                content: [{ type: "text", text }],
                structuredContent: JSON.parse(text),
              };
            } catch (error) {
              return toolError(
                error instanceof Error ? error.message : String(error),
              );
            } finally {
              // The WeakMap entry can outlive execution if a deferred action
              // retains this guarded store; otherwise it is garbage collected.
              running = false;
              options.signal?.removeEventListener("abort", cancel);
              this.controllers.delete(controller);
            }
          },
        });
      }
      this.entries = entries;
      this.unregister = registerAppToolDispatcher(
        state,
        (name, args, options) => this.call(name, args, options),
      );
    } catch (error) {
      console.warn("[Prefab] Invalid app tools; tools cleared", error);
    }
    this.notify();
  }
}
