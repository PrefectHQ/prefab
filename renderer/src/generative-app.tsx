/**
 * Generative UI application — extends the standard App with Pyodide execution.
 *
 * Handles three sources of content:
 * 1. ontoolinputpartial → Pyodide executes partial code → progressive render
 * 2. ontoolinput → Pyodide executes complete code → clean render
 * 3. ontoolresult → server-validated PrefabApp → final render (replaces preview)
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { Toaster } from "sonner";
import {
  applyDocumentTheme,
  applyHostStyleVariables,
  applyHostFonts,
} from "@modelcontextprotocol/ext-apps/react";
import type {
  App as McpApp,
  McpUiHostContext,
} from "@modelcontextprotocol/ext-apps";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";
import { generativeBridge } from "./generative-bridge";
import { clearAllIntervals, setAppName } from "./actions";
import type { ExecuteResult } from "./pyodide/executor";

const SUPPORTED_VERSIONS = new Set(["0.2"]);

function applyTheme(ctx: McpUiHostContext) {
  if (ctx.theme) applyDocumentTheme(ctx.theme);
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
}

function hostContextToState(ctx: McpUiHostContext): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  if (ctx.theme != null) result.theme = ctx.theme;
  if (ctx.displayMode != null) result.displayMode = ctx.displayMode;
  if (ctx.availableDisplayModes != null)
    result.availableDisplayModes = ctx.availableDisplayModes;
  if (ctx.containerDimensions != null)
    result.containerDimensions = ctx.containerDimensions;
  return result;
}

export function GenerativeApp() {
  const [tree, setTree] = useState<ComponentNode | null>(null);
  const [defs, setDefs] = useState<Record<string, ComponentNode>>({});
  const [isStreaming, setIsStreaming] = useState(false);
  const state = useStateStore();
  const appRef = useRef<McpApp | null>(generativeBridge.app);

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

  // Loading state
  if (!tree) {
    return (
      <div className="pf-p-4 pf-text-sm pf-text-muted-foreground pf-flex pf-items-center pf-gap-2">
        <div className="pf-animate-spin pf-h-4 pf-w-4 pf-border-2 pf-border-current pf-border-t-transparent pf-rounded-full" />
        Preparing…
      </div>
    );
  }

  return (
    <>
      {isStreaming && (
        <div className="pf-fixed pf-top-2 pf-right-2 pf-z-50 pf-text-xs pf-text-muted-foreground pf-bg-background/80 pf-px-2 pf-py-1 pf-rounded pf-border">
          Generating…
        </div>
      )}
      <RenderTree tree={tree} defs={defs} state={state} app={appRef.current} />
      <Toaster />
    </>
  );
}
