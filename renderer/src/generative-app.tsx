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
import { generativeBridge } from "./generative-bridge";
import { clearAllIntervals, setAppName } from "./actions";
import {
  SUPPORTED_VERSIONS,
  applyTheme,
  hostContextToState,
} from "./shared-app-utils";
import type { ExecuteResult } from "./pyodide/executor";

function FastMCPLogo({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 196 196"
      fill="none"
      className={className}
    >
      <path
        d="M145.747 44.611L145.355 44.3877L144.96 44.611L86.0283 78.5276V171.267L86.4014 171.499L99.6674 179.667V86.3859L159 52.2379L145.747 44.611Z"
        fill="currentColor"
      />
      <path
        d="M121.616 30.2714L121.224 30.0454L120.832 30.2714L61.8975 64.188V156.928L62.2732 157.156L75.5393 165.325V72.0463L134.869 37.8983L121.616 30.2714Z"
        fill="currentColor"
      />
      <path
        d="M97.4894 16.3818L97.0973 16.1558L96.7025 16.3818L37.7705 50.3038V142.066L51.4096 150.463V58.1567L110.742 24.0086L97.4894 16.3818Z"
        fill="currentColor"
      />
      <path
        d="M131.23 113.671L124.979 117.266L124.584 117.494V117.5L116.796 121.987L110.547 125.581L110.152 125.807V141.51L144.564 121.709V121.698L158.999 113.394V97.6851L139.277 109.034L131.23 113.671Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GenerativeApp() {
  const [tree, setTree] = useState<ComponentNode | null>(null);
  const [defs, setDefs] = useState<Record<string, ComponentNode>>({});
  const [, setIsStreaming] = useState(false);
  const state = useStateStore();

  // Handle server-validated tool result (final render)
  const handleToolResult = useCallback(
    (result: { structuredContent?: Record<string, unknown> }) => {
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
  }, [handleToolResult, handleHostContext, handleCodeResult]);

  // Apply initial theme
  useEffect(() => {
    if (generativeBridge.app) {
      const ctx = generativeBridge.app.getHostContext();
      if (ctx) handleHostContext(ctx);
    }
  }, [handleHostContext]);

  if (!tree) {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            gap: "6px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div className="pf-absolute pf-inset-0 pf-rounded-full pf-border-2 pf-border-muted-foreground/20 pf-border-t-muted-foreground pf-animate-spin" />
            <FastMCPLogo size={16} className="pf-text-muted-foreground" />
          </div>
          <span className="pf-text-sm pf-text-muted-foreground">
            Generating UI…
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <RenderTree
        tree={tree}
        defs={defs}
        state={state}
        app={generativeBridge.app}
      />
      <Toaster />
    </>
  );
}
