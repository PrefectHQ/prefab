/**
 * Generative bridge — extends the early bridge with streaming input support.
 *
 * Registers `ontoolinputpartial` on the App SDK to receive partial tool
 * arguments as the LLM generates them. Extracts the Python code and
 * feeds it to the Pyodide executor for progressive rendering.
 */

import { App } from "@modelcontextprotocol/ext-apps";
import type { McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import type { ExecuteResult } from "./pyodide/executor";
import { loadPyodideRuntime, executePrefabCode } from "./pyodide/executor";

export interface BufferedToolResult {
  structuredContent?: Record<string, unknown>;
}

export interface GenerativeBridge {
  connect(): void;
  app: App | null;
  bufferedResults: BufferedToolResult[];
  hostContext: McpUiHostContext | null;
  onToolResult(cb: (result: BufferedToolResult) => void): void;
  onHostContext(cb: (ctx: McpUiHostContext) => void): void;
  /** Register a listener for Pyodide execution results from partial code. */
  onCodeResult(cb: (result: ExecuteResult) => void): void;
}

let toolResultCb: ((result: BufferedToolResult) => void) | null = null;
let hostContextCb: ((ctx: McpUiHostContext) => void) | null = null;
let codeResultCb: ((result: ExecuteResult) => void) | null = null;

/** The argument key that contains Python code. Defaults to "code". */
let codeKey = "code";

/** Track the last code string to avoid re-executing identical partials. */
let lastCode = "";

/** Whether Pyodide is ready for execution. */
let pyodideReady = false;

export const generativeBridge: GenerativeBridge = {
  app: null,
  bufferedResults: [],
  hostContext: null,

  connect() {
    const app = new App({ name: "Prefab Generative", version: "1.0.0" });
    this.app = app;

    // Start loading Pyodide immediately — the host creates the iframe
    // in parallel with the tool call, so we have the full LLM generation
    // time to cold-start (~2-3s).
    loadPyodideRuntime((status) => {
      if (status === "ready") {
        pyodideReady = true;
        console.log("[Prefab Generative] Pyodide ready");
      } else if (status === "error") {
        console.error("[Prefab Generative] Pyodide failed to load");
      }
    }).catch((err) => {
      console.error("[Prefab Generative] Pyodide load error:", err);
    });

    // Standard tool result handler (same as early-bridge)
    app.ontoolresult = (params) => {
      const result = params as BufferedToolResult;
      if (toolResultCb) {
        toolResultCb(result);
      } else {
        this.bufferedResults.push(result);
      }
    };

    // Streaming partial tool arguments — the generative UI hook
    app.ontoolinputpartial = (params) => {
      const args = params.arguments as Record<string, unknown> | undefined;
      if (!args) return;

      const code = args[codeKey];
      if (typeof code !== "string" || !code.trim()) return;

      // Skip if identical to the last partial (host may send duplicates)
      if (code === lastCode) return;
      lastCode = code;

      if (!pyodideReady) return;

      // Execute the partial code — errors are expected and silently ignored.
      // Each execution runs in a fresh namespace (the harness resets the
      // component stack), so this is a complete re-execution, not a delta.
      executePrefabCode(code).then((result) => {
        if (result.tree && codeResultCb) {
          codeResultCb(result);
        }
        // Errors from partial code are silently discarded — keep the
        // last successful render.
      });
    };

    // Complete tool input — could be used for a "clean" pre-result render
    app.ontoolinput = (params) => {
      const args = params.arguments as Record<string, unknown> | undefined;
      if (!args) return;

      const code = args[codeKey];
      if (typeof code !== "string" || !code.trim()) return;

      if (code === lastCode) return;
      lastCode = code;

      if (!pyodideReady) return;

      executePrefabCode(code).then((result) => {
        if (result.tree && codeResultCb) {
          codeResultCb(result);
        }
      });
    };

    app.onhostcontextchanged = (ctx) => {
      const hostCtx = ctx as McpUiHostContext;
      this.hostContext = hostCtx;

      // Read codeKey from host context metadata if provided
      const toolMeta = (hostCtx as any).toolInfo?.meta?.ui;
      if (toolMeta?.codeKey && typeof toolMeta.codeKey === "string") {
        codeKey = toolMeta.codeKey;
      }

      if (hostContextCb) {
        hostContextCb(hostCtx);
      }
    };

    app.connect().catch((err) => {
      console.error("[Prefab Generative] Bridge connection failed:", err);
    });
  },

  onToolResult(cb) {
    toolResultCb = cb;
    for (const result of this.bufferedResults) {
      cb(result);
    }
    this.bufferedResults.length = 0;
  },

  onHostContext(cb) {
    hostContextCb = cb;
    if (this.hostContext) {
      cb(this.hostContext);
    }
  },

  onCodeResult(cb) {
    codeResultCb = cb;
  },
};
