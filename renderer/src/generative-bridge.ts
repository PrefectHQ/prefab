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

/** Whether Pyodide loading has been triggered. */
let pyodideLoading = false;

/**
 * Monotonically increasing sequence number for code executions.
 * Used to discard results from stale executions — only the result
 * from the most recently started execution is delivered.
 */
let execSeq = 0;

/** Buffer the latest partial received before Pyodide was ready. */
let pendingCode: string | null = null;

/** Execute code with sequence-based stale result rejection. */
function executeAndDeliver(code: string) {
  const mySeq = ++execSeq;
  debug(`execute: seq=${mySeq}, ${code.length} chars`);
  executePrefabCode(code).then((result) => {
    if (mySeq !== execSeq) {
      debug(`execute: seq=${mySeq} stale (current=${execSeq}), discarding`);
      return;
    }
    if (result.tree) {
      debug(
        `execute: seq=${mySeq} success, tree type=${(result.tree as any).type}`,
      );
    } else if (result.error) {
      debug(`execute: seq=${mySeq} error: ${result.error.slice(0, 100)}`);
    }
    if (result.tree && codeResultCb) {
      codeResultCb(result);
    }
  });
}

/** Kick off Pyodide loading if not already started. */
function ensurePyodideLoading() {
  if (pyodideLoading) return;
  pyodideLoading = true;
  loadPyodideRuntime((status) => {
    if (status === "ready") {
      pyodideReady = true;
      console.log("[Prefab Generative] Pyodide ready");
      if (pendingCode) {
        const code = pendingCode;
        pendingCode = null;
        executeAndDeliver(code);
      }
    } else if (status === "error") {
      console.error("[Prefab Generative] Pyodide failed to load");
    }
  }).catch((err) => {
    console.error("[Prefab Generative] Pyodide load error:", err);
  });
}

/** Visible debug log — appended to by the bridge, read by the app. */
export const debugMessages: string[] = [];
let debugCb: ((msg: string) => void) | null = null;

function debug(msg: string) {
  const time = new Date().toLocaleTimeString();
  const full = `[${time}] ${msg}`;
  debugMessages.push(full);
  if (debugCb) debugCb(full);
  console.log(`[Prefab Generative] ${msg}`);
}

export function onDebug(cb: (msg: string) => void) {
  debugCb = cb;
  for (const msg of debugMessages) cb(msg);
}

/** Handle a code string from partial or complete input. */
function handleCode(code: string) {
  if (code === lastCode) {
    debug(`handleCode: skipped (identical, ${code.length} chars)`);
    return;
  }
  lastCode = code;
  debug(`handleCode: ${code.length} chars, pyodideReady=${pyodideReady}`);

  if (!pyodideReady) {
    pendingCode = code;
    debug("handleCode: buffered (Pyodide not ready)");
    return;
  }

  executeAndDeliver(code);
}

export const generativeBridge: GenerativeBridge = {
  app: null,
  bufferedResults: [],
  hostContext: null,

  connect() {
    const app = new App({ name: "Prefab Generative", version: "1.0.0" });
    this.app = app;

    // Start loading Pyodide immediately. The host creates the iframe in
    // parallel with the tool call (per MCP spec), so we have the full
    // LLM generation time to cold-start (~2-3s). This IS the generative
    // renderer — it will always receive streaming code. Non-streaming
    // tools use app.html instead.
    ensurePyodideLoading();

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
      debug(
        `ontoolinputpartial: args keys=${
          args ? Object.keys(args).join(",") : "none"
        }`,
      );
      if (!args) return;
      const code = args[codeKey];
      if (typeof code !== "string" || !code.trim()) {
        debug(`ontoolinputpartial: no code (key="${codeKey}")`);
        return;
      }
      handleCode(code);
    };

    // Complete tool input
    app.ontoolinput = (params) => {
      const args = params.arguments as Record<string, unknown> | undefined;
      debug(
        `ontoolinput: args keys=${args ? Object.keys(args).join(",") : "none"}`,
      );
      if (!args) return;
      const code = args[codeKey];
      if (typeof code !== "string" || !code.trim()) return;
      handleCode(code);
    };

    app.onhostcontextchanged = (ctx) => {
      const hostCtx = ctx as McpUiHostContext;
      this.hostContext = hostCtx;
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
