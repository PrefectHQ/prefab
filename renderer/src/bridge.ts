/**
 * Unified bridge — connects to the MCP Apps host and handles all modes.
 *
 * Handles three event types from the host:
 * 1. `ontoolresult` — server-validated component tree (standard flow)
 * 2. `ontoolinputpartial` — streaming LLM code for Pyodide execution (generative)
 * 3. `ontoolinput` — complete LLM code for Pyodide execution (generative)
 *
 * Pyodide loads lazily on the first streaming partial — non-generative tools
 * never trigger it, so there's zero overhead unless the host actually sends
 * code partials.
 *
 * Also buffers events that arrive before React mounts (some hosts like
 * MCPJam send tool results very quickly after loading the iframe).
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

export interface Bridge {
  /** Start the connection. Call once, before React mounts. */
  connect(): void;
  /** The pre-connected App instance (null until connect() resolves). */
  app: App | null;
  /** Tool results received before React was ready. */
  bufferedResults: BufferedToolResult[];
  /** Host context received before React was ready. */
  hostContext: McpUiHostContext | null;
  /** Register a listener for tool results (replays buffered ones immediately). */
  onToolResult(cb: (result: BufferedToolResult) => void): void;
  /** Register a listener for host context changes. */
  onHostContext(cb: (ctx: McpUiHostContext) => void): void;
  /** Register a listener for Pyodide code execution results. */
  onCodeResult(cb: (result: ExecuteResult) => void): void;
}

let toolResultCb: ((result: BufferedToolResult) => void) | null = null;
let hostContextCb: ((ctx: McpUiHostContext) => void) | null = null;
let codeResultCb: ((result: ExecuteResult) => void) | null = null;

// ── Pyodide (lazy) ─────────────────────────────────────────────────────

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

// ── Debug logging ──────────────────────────────────────────────────────

export const debugMessages: string[] = [];
let debugCb: ((msg: string) => void) | null = null;

function debug(msg: string) {
  const full = `[${new Date().toLocaleTimeString()}] ${msg}`;
  debugMessages.push(full);
  if (debugCb) debugCb(full);
  console.log(`[Prefab] ${msg}`);
}

// Route executor debug messages through the same channel
setExecutorDebug((msg) => debug(`executor: ${msg}`));

let debugReplayed = false;
export function onDebug(cb: (msg: string) => void) {
  debugCb = cb;
  if (!debugReplayed) {
    debugReplayed = true;
    for (const msg of debugMessages) cb(msg);
  }
}

// ── Throttle for streaming partials ────────────────────────────────────

let throttleTimer: ReturnType<typeof setTimeout> | null = null;
let latestCode: string | null = null;
const THROTTLE_MS = 50;

/** Handle a code string from partial or complete input. */
function handleCode(code: string, immediate = false) {
  if (code === lastCode) return;
  lastCode = code;

  // Lazy-load Pyodide on first code arrival
  ensurePyodideLoading();

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

// ── Bridge singleton ───────────────────────────────────────────────────

export const bridge: Bridge = {
  app: null,
  bufferedResults: [],
  hostContext: null,

  connect() {
    const app = new App({ name: "Prefab", version: "1.0.0" });
    this.app = app;

    // Standard tool result handler
    app.ontoolresult = (params) => {
      const result = params as BufferedToolResult;
      if (toolResultCb) {
        toolResultCb(result);
      } else {
        this.bufferedResults.push(result);
      }
    };

    // Streaming partial tool arguments — generative UI hook.
    // Pyodide loads lazily on first partial, so non-generative tools
    // never trigger it.
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
      console.error("[Prefab] Bridge connection failed:", err);
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
