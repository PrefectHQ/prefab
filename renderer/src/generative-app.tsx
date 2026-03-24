/**
 * Generative UI application — extends the standard App with Pyodide execution.
 *
 * Handles three sources of content:
 * 1. ontoolinputpartial → Pyodide executes partial code → progressive render
 * 2. ontoolinput → Pyodide executes complete code → clean render
 * 3. ontoolresult → server-validated PrefabApp → final render (replaces preview)
 */

import { useState, useCallback, useEffect } from "react";
import { Toaster } from "sonner";
import type { McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";
import { generativeBridge, onDebug } from "./generative-bridge";
import { clearAllIntervals, setAppName } from "./actions";
import {
  SUPPORTED_VERSIONS,
  applyTheme,
  hostContextToState,
} from "./shared-app-utils";
import type { ExecuteResult } from "./pyodide/executor";

export function GenerativeApp() {
  const [tree, setTree] = useState<ComponentNode | null>(null);
  const [defs, setDefs] = useState<Record<string, ComponentNode>>({});
  const [isStreaming, setIsStreaming] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([
    "[init] GenerativeApp mounted",
  ]);
  const state = useStateStore();

  const addDebug = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString();
    setDebugLog((prev) => [...prev.slice(-50), `[${time}] ${msg}`]);
  }, []);

  // Handle server-validated tool result (final render)
  const handleToolResult = useCallback(
    (result: { structuredContent?: Record<string, unknown> }) => {
      addDebug(
        `ontoolresult: ${
          result.structuredContent ? "has structured content" : "empty"
        }`,
      );
      const structured = result.structuredContent;
      if (!structured) return;

      const prefabMeta = structured.$prefab as { version?: string } | undefined;
      const version =
        prefabMeta?.version ?? (structured.version as string | undefined);
      if (version && !SUPPORTED_VERSIONS.has(version)) {
        console.warn(
          `[Prefab Generative] Unrecognized protocol version "${version}"`,
        );
      }

      const view = structured.view as ComponentNode | undefined;
      const extractedDefs = (structured.defs ?? {}) as Record<
        string,
        ComponentNode
      >;
      const stateData = (structured.state ?? {}) as Record<string, unknown>;

      const meta = structured._meta as
        | { fastmcp?: { app?: string } }
        | undefined;
      setAppName(meta?.fastmcp?.app);

      clearAllIntervals();
      const currentHost = state.get("$host");
      state.reset(
        currentHost != null ? { ...stateData, $host: currentHost } : stateData,
      );
      setDefs(extractedDefs);
      setIsStreaming(false);

      if (view) {
        setTree(view);
      }
    },
    [state],
  );

  // Handle Pyodide execution result from partial/complete code
  const handleCodeResult = useCallback(
    (result: ExecuteResult) => {
      addDebug(
        `codeResult: tree=${!!result.tree} error=${result.error ?? "none"}`,
      );
      if (result.tree) {
        setTree(result.tree);
        setIsStreaming(true);
        if (result.state) {
          const currentHost = state.get("$host");
          state.reset(
            currentHost != null
              ? { ...result.state, $host: currentHost }
              : result.state,
          );
        }
      }
    },
    [state],
  );

  const handleHostContext = useCallback(
    (ctx: McpUiHostContext) => {
      applyTheme(ctx);
      state.set("$host", hostContextToState(ctx));
    },
    [state],
  );

  // Subscribe to the generative bridge
  useEffect(() => {
    generativeBridge.onToolResult(handleToolResult);
    generativeBridge.onHostContext(handleHostContext);
    generativeBridge.onCodeResult(handleCodeResult);
    onDebug(addDebug);
  }, [handleToolResult, handleHostContext, handleCodeResult, addDebug]);

  // Apply initial theme
  useEffect(() => {
    if (generativeBridge.app) {
      const ctx = generativeBridge.app.getHostContext();
      if (ctx) handleHostContext(ctx);
    }
  }, [handleHostContext]);

  const debugPanel = (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: "200px",
        overflow: "auto",
        background: "#1a1a2e",
        color: "#e0e0e0",
        fontFamily: "monospace",
        fontSize: "11px",
        lineHeight: "1.4",
        padding: "8px",
        borderTop: "1px solid #333",
        zIndex: 9999,
      }}
    >
      <strong style={{ color: "#58a6ff" }}>Debug Log</strong>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
        {debugLog.join("\n")}
      </pre>
    </div>
  );

  // Loading state
  if (!tree) {
    return (
      <>
        <div className="pf-p-4 pf-text-sm pf-text-muted-foreground pf-flex pf-items-center pf-gap-2">
          <div className="pf-animate-spin pf-h-4 pf-w-4 pf-border-2 pf-border-current pf-border-t-transparent pf-rounded-full" />
          Preparing…
        </div>
        {debugPanel}
      </>
    );
  }

  return (
    <>
      {isStreaming && (
        <div className="pf-fixed pf-top-2 pf-right-2 pf-z-50 pf-text-xs pf-text-muted-foreground pf-bg-background/80 pf-px-2 pf-py-1 pf-rounded pf-border">
          Generating…
        </div>
      )}
      <RenderTree
        tree={tree}
        defs={defs}
        state={state}
        app={generativeBridge.app}
      />
      <Toaster />
      {debugPanel}
    </>
  );
}
