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
 * State model: structuredContent keys (minus reserved `_prefab_*` keys)
 * become client-side state. The model sees initial state via structuredContent;
 * all subsequent mutations (SetState, form inputs, CallTool result_key) are
 * renderer-private and never propagate back.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { Toaster } from "sonner";
import {
  useApp,
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

/** Reserved key prefix in structuredContent (renderer internals). */
const RESERVED_PREFIX = "_prefab_";

/** Protocol versions this renderer understands. */
const SUPPORTED_VERSIONS = new Set(["0.1"]);

/** Extract state from structuredContent (everything except reserved keys). */
function extractState(
  structured: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!structured) return {};
  const state: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(structured)) {
    if (!key.startsWith(RESERVED_PREFIX)) {
      state[key] = value;
    }
  }
  return state;
}

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
  const [tree, setTree] = useState<ComponentNode | null>(null);
  const [defs, setDefs] = useState<Record<string, ComponentNode>>({});
  const state = useStateStore();
  const appRef = useRef<McpApp | null>(null);

  const handleToolResult = useCallback(
    (result: { structuredContent?: Record<string, unknown> }) => {
      const structured = result.structuredContent;
      if (!structured) return;

      // Check protocol version (warn but don't block rendering)
      const version = structured._prefab_version as string | undefined;
      if (!version) {
        console.warn("[Prefab] Missing _prefab_version in structuredContent");
      } else if (!SUPPORTED_VERSIONS.has(version)) {
        console.warn(
          `[Prefab] Unrecognized protocol version "${version}" (supported: ${[
            ...SUPPORTED_VERSIONS,
          ].join(", ")})`,
        );
      }

      // Extract component tree, defs, and state from structuredContent
      const view = structured._prefab_view as ComponentNode | undefined;
      const extractedDefs = (structured._prefab_defs ?? {}) as Record<
        string,
        ComponentNode
      >;
      const stateData = extractState(structured);

      // Full state reset — host is providing a fresh view + state
      state.reset(stateData);
      setDefs(extractedDefs);

      if (view) {
        setTree(view);
      }
    },
    [state],
  );

  const { app, isConnected, error } = useApp({
    appInfo: { name: "Prefab", version: "1.0.0" },
    capabilities: {
      availableDisplayModes: ["inline", "fullscreen"],
    },
    onAppCreated: (newApp: McpApp) => {
      appRef.current = newApp;

      newApp.ontoolresult = (params) => {
        handleToolResult(
          params as { structuredContent?: Record<string, unknown> },
        );
      };

      newApp.onhostcontextchanged = (ctx) => {
        applyTheme(ctx as McpUiHostContext);
      };
    },
  });

  // Apply initial theme from host context
  useEffect(() => {
    if (isConnected && app) {
      const ctx = app.getHostContext();
      if (ctx) applyTheme(ctx);
    }
  }, [isConnected, app]);

  // Error state
  if (error) {
    return (
      <div className="p-4 text-destructive">
        <p className="font-medium">Connection error</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  // Waiting for content
  if (!tree) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Waiting for content...</p>
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
