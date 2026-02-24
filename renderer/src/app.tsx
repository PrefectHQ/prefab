/**
 * Main application — MCP Apps protocol integration + tree rendering.
 *
 * Handles the full lifecycle:
 * 1. Initialize connection with host via ext-apps SDK
 * 2. Receive tool results (component tree JSON + state)
 * 3. Render component tree using shadcn components
 * 4. Handle actions (server tool calls, client state mutations)
 * 5. Re-render on new tool results or state changes
 *
 * Supports two modes:
 * - **MCP mode**: data arrives via ontoolresult from the host bridge
 * - **Standalone mode**: data is baked into the HTML as a <script> tag
 *   (e.g. when served via `prefab serve` or a plain HTTP server)
 *
 * State model: the `state` key in structuredContent holds client-side state.
 * The model sees initial state via structuredContent; all subsequent mutations
 * (SetState, form inputs, CallTool result_key) are renderer-private and never
 * propagate back.
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
import { earlyBridge } from "./early-bridge";
import { clearAllIntervals } from "./actions";
import { resolveTheme, buildThemeCss } from "./themes";

/** Protocol versions this renderer understands. */
const SUPPORTED_VERSIONS = new Set(["0.2"]);

/** Read baked-in data from the HTML (standalone mode). */
function readInitialData(): {
  view: ComponentNode | null;
  defs: Record<string, ComponentNode>;
  state: Record<string, unknown>;
} | null {
  const el = document.getElementById("prefab:initial-data");
  if (!el?.textContent) return null;
  try {
    const data = JSON.parse(el.textContent) as Record<string, unknown>;

    // Apply theme overrides (string name or custom object)
    if (data.theme) {
      const resolved = resolveTheme(
        data.theme as string | Record<string, string>,
      );
      if (resolved) {
        const style = document.createElement("style");
        style.id = "prefab-theme";
        style.textContent = buildThemeCss(resolved, false);
        document.head.appendChild(style);
      }
    }

    return {
      view: (data.view as ComponentNode) ?? null,
      defs: (data.defs ?? {}) as Record<string, ComponentNode>,
      state: (data.state ?? {}) as Record<string, unknown>,
    };
  } catch {
    console.error("[Prefab] Failed to parse baked-in initial data");
    return null;
  }
}

// Parse baked-in data once before React mounts.
const INITIAL = readInitialData();

/** Apply host theme context (dark mode, CSS variables, fonts). */
function applyTheme(ctx: McpUiHostContext) {
  if (ctx.theme) {
    applyDocumentTheme(ctx.theme);
  }
  if (ctx.styles?.variables) {
    applyHostStyleVariables(ctx.styles.variables);
  }
  if (ctx.styles?.css?.fonts) {
    applyHostFonts(ctx.styles.css.fonts);
  }
}

export function App() {
  const [tree, setTree] = useState<ComponentNode | null>(INITIAL?.view ?? null);
  const [defs, setDefs] = useState<Record<string, ComponentNode>>(
    INITIAL?.defs ?? {},
  );
  const state = useStateStore();
  const appRef = useRef<McpApp | null>(earlyBridge.app);

  // Initialize state store with baked-in data.
  useEffect(() => {
    if (INITIAL?.state) {
      state.reset(INITIAL.state);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToolResult = useCallback(
    (result: { structuredContent?: Record<string, unknown> }) => {
      const structured = result.structuredContent;
      if (!structured) return;

      // Check protocol version (warn but don't block rendering)
      const version = structured.version as string | undefined;
      if (version && !SUPPORTED_VERSIONS.has(version)) {
        console.warn(
          `[Prefab] Unrecognized protocol version "${version}" (supported: ${[
            ...SUPPORTED_VERSIONS,
          ].join(", ")})`,
        );
      }

      // Extract component tree, defs, and state from structuredContent
      const view = structured.view as ComponentNode | undefined;
      const extractedDefs = (structured.defs ?? {}) as Record<
        string,
        ComponentNode
      >;
      const stateData = (structured.state ?? {}) as Record<string, unknown>;

      // Full state reset — host is providing a fresh view + state
      clearAllIntervals();
      state.reset(stateData);
      setDefs(extractedDefs);

      if (view) {
        setTree(view);
      }
    },
    [state],
  );

  // Subscribe to the early bridge — this replays any buffered tool results
  // that arrived before React mounted.
  useEffect(() => {
    earlyBridge.onToolResult(handleToolResult);
    earlyBridge.onHostContext(applyTheme);
  }, [handleToolResult]);

  // Apply initial theme from host context (if already available)
  useEffect(() => {
    if (earlyBridge.app) {
      const ctx = earlyBridge.app.getHostContext();
      if (ctx) applyTheme(ctx);
    }
  }, []);

  // Error state — only fatal if we have no content to render
  if (!earlyBridge.app && !tree) {
    return (
      <div className="p-4 text-destructive">
        <p className="font-medium">Connection error</p>
        <p className="text-sm text-muted-foreground">Bridge not initialized</p>
      </div>
    );
  }

  // Waiting for content
  if (!tree) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Waiting for content…
      </div>
    );
  }

  // Render component tree
  return (
    <>
      <RenderTree tree={tree} defs={defs} state={state} app={appRef.current} />
      <Toaster />
    </>
  );
}
