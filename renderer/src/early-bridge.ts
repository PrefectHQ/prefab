/**
 * Early bridge — connects to the MCP Apps host BEFORE React mounts.
 *
 * Some hosts (e.g. MCPJam's double-iframe sandbox) send tool-result
 * notifications very quickly after loading the renderer HTML. If we wait
 * for React to mount and `useApp` to register `ontoolresult`, the message
 * has already been sent and dropped.
 *
 * This module creates the ext-apps `App` instance eagerly and buffers any
 * tool results that arrive before the React tree is ready to consume them.
 * The `App` component in `app.tsx` picks up the pre-connected instance
 * instead of creating a new one.
 */

import { App } from "@modelcontextprotocol/ext-apps";
import type { McpUiHostContext } from "@modelcontextprotocol/ext-apps";

export interface BufferedToolResult {
  structuredContent?: Record<string, unknown>;
}

export interface EarlyBridge {
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
}

let toolResultCb: ((result: BufferedToolResult) => void) | null = null;
let hostContextCb: ((ctx: McpUiHostContext) => void) | null = null;

export const earlyBridge: EarlyBridge = {
  app: null,
  bufferedResults: [],
  hostContext: null,

  connect() {
    const app = new App({ name: "Prefab", version: "1.0.0" });
    this.app = app;

    app.ontoolresult = (params) => {
      const result = params as BufferedToolResult;
      if (toolResultCb) {
        toolResultCb(result);
      } else {
        this.bufferedResults.push(result);
      }
    };

    app.onhostcontextchanged = (ctx) => {
      const hostCtx = ctx as McpUiHostContext;
      this.hostContext = hostCtx;
      if (hostContextCb) {
        hostContextCb(hostCtx);
      }
    };

    app.connect().catch((err) => {
      console.error("[Prefab] Early bridge connection failed:", err);
    });
  },

  onToolResult(cb) {
    toolResultCb = cb;
    // Replay any buffered results immediately
    for (const result of this.bufferedResults) {
      cb(result);
    }
    this.bufferedResults.length = 0;
  },

  onHostContext(cb) {
    hostContextCb = cb;
    // Replay buffered context immediately
    if (this.hostContext) {
      cb(this.hostContext);
    }
  },
};
