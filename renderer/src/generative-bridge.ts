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
import {
  loadPyodideRuntime,
  executePrefabCode,
  setExecutorDebug,
} from "./pyodide/executor";

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
  const t0 = performance.now();
  executePrefabCode(code).then((result) => {
    const elapsed = (performance.now() - t0).toFixed(0);
    if (mySeq !== execSeq) {
      return;
    }
    if (result.tree) {
      debug(`exec #${mySeq}: ${code.length}ch → success in ${elapsed}ms`);
    } else if (result.error) {
      debug(
        `exec #${mySeq}: ${
          code.length
        }ch → error in ${elapsed}ms: ${result.error.slice(0, 80)}`,
      );
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
  debug("Pyodide: starting load...");
  loadPyodideRuntime((status) => {
    debug(`Pyodide: status=${status}`);
    if (status === "ready") {
      pyodideReady = true;
      if (pendingCode) {
        const code = pendingCode;
        pendingCode = null;
        debug(`Pyodide: executing buffered code (${code.length} chars)`);
        executeAndDeliver(code);
      }
    } else if (status === "error") {
      debug("Pyodide: FAILED to load");
    }
  }).catch((err) => {
    debug(`Pyodide: load error: ${String(err).slice(0, 200)}`);
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

// Route executor debug messages through the same system
setExecutorDebug((msg) => debug(`executor: ${msg}`));

let debugReplayed = false;
export function onDebug(cb: (msg: string) => void) {
  debugCb = cb;
  if (!debugReplayed) {
    debugReplayed = true;
    for (const msg of debugMessages) cb(msg);
  }
}

/** Throttle: execute at most once per interval, using the latest code. */
let throttleTimer: ReturnType<typeof setTimeout> | null = null;
let latestCode: string | null = null;
const THROTTLE_MS = 50;

/** Handle a code string from partial or complete input. */
function handleCode(code: string, immediate = false) {
  if (code === lastCode) return;
  lastCode = code;

  if (!pyodideReady) {
    pendingCode = code;
    return;
  }

  if (immediate) {
    if (throttleTimer) clearTimeout(throttleTimer);
    throttleTimer = null;
    latestCode = null;
    executeAndDeliver(code);
    return;
  }

  // Stash the latest code. The throttle timer fires every THROTTLE_MS
  // and executes whatever's latest, regardless of whether partials
  // are still arriving.
  latestCode = code;
  if (!throttleTimer) {
    throttleTimer = setTimeout(() => {
      throttleTimer = null;
      if (latestCode) {
        const c = latestCode;
        latestCode = null;
        executeAndDeliver(c);
      }
    }, THROTTLE_MS);
  }
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
    let partialCount = 0;
    app.ontoolinputpartial = (params) => {
      partialCount++;
      const args = params.arguments as Record<string, unknown> | undefined;
      if (!args) return;
      const code = args[codeKey];
      if (typeof code !== "string" || !code.trim()) return;
      if (partialCount % 100 === 1) {
        debug(`partial #${partialCount}: ${code.length} chars`);
      }
      handleCode(code);
    };

    // Complete tool input — execute immediately, no debounce
    app.ontoolinput = (params) => {
      const args = params.arguments as Record<string, unknown> | undefined;
      debug(`ontoolinput: complete`);
      if (!args) return;
      const code = args[codeKey];
      if (typeof code !== "string" || !code.trim()) return;
      handleCode(code, true);
    };

    app.onhostcontextchanged = (ctx) => {
      const hostCtx = ctx as McpUiHostContext;
      debug(
        `hostContext: theme=${hostCtx.theme}, displayMode=${hostCtx.displayMode}`,
      );
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
