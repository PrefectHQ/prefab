/**
 * Unified application — handles all rendering modes.
 *
 * Supports three sources of content:
 * 1. **Baked-in data** — `<script id="prefab:initial-data">` in standalone HTML
 * 2. **ontoolresult** — server-validated component tree via MCP Apps bridge
 * 3. **ontoolinputpartial / ontoolinput** — Pyodide-executed code from LLM streaming
 *
 * State model: the `state` key in structuredContent holds client-side state.
 * The model sees initial state via structuredContent; all subsequent mutations
 * (SetState, form inputs, action callbacks) are renderer-private and never
 * propagate back.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { Toaster } from "sonner";
import type { McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";
import { bridge } from "./bridge";
import {
  clearAllIntervals,
  executeActions,
  setAppName,
  type ActionSpec,
} from "./actions";
import { resolveTheme, buildThemeCss } from "./themes";
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

/** Read baked-in data from the HTML (standalone mode). */
type KeyBindings = Record<string, ActionSpec | ActionSpec[]>;

function readInitialData(): {
  view: ComponentNode | null;
  defs: Record<string, ComponentNode>;
  state: Record<string, unknown>;
  keyBindings: KeyBindings;
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
      keyBindings: (data.keyBindings ?? {}) as KeyBindings,
    };
  } catch {
    console.error("[Prefab] Failed to parse baked-in initial data");
    return null;
  }
}

// Parse baked-in data once before React mounts.
const INITIAL = readInitialData();

export function App() {
  const [tree, setTree] = useState<ComponentNode | null>(INITIAL?.view ?? null);
  const [defs, setDefs] = useState<Record<string, ComponentNode>>(
    INITIAL?.defs ?? {},
  );
  const [, setIsStreaming] = useState(false);
  const state = useStateStore();
  const appRef = useRef(bridge.app);

  // Initialize state store with baked-in data.
  useEffect(() => {
    if (INITIAL?.state) {
      state.reset(INITIAL.state);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Key bindings — document-level keyboard shortcuts.
  const keyBindingsRef = useRef<KeyBindings>(INITIAL?.keyBindings ?? {});

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const bindings = keyBindingsRef.current;
      if (!bindings || Object.keys(bindings).length === 0) return;

      // Skip when user is typing in an input/textarea/contenteditable
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ((e.target as HTMLElement)?.isContentEditable) return;

      // Build key string with modifiers
      const parts: string[] = [];
      if (e.ctrlKey) parts.push("Ctrl");
      if (e.altKey) parts.push("Alt");
      if (e.metaKey) parts.push("Meta");
      if (e.shiftKey) parts.push("Shift");
      parts.push(e.key);
      const keyStr = parts.join("+");

      const action = bindings[keyStr];
      if (action) {
        e.preventDefault();
        const actions = Array.isArray(action) ? action : [action];
        executeActions(actions, appRef.current, state);
      }
    }

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle server-validated tool result (standard + final render after streaming)
  const handleToolResult = useCallback(
    (result: { structuredContent?: Record<string, unknown> }) => {
      const structured = result.structuredContent;
      if (!structured) return;

      const prefabMeta = structured.$prefab as { version?: string } | undefined;
      const version =
        prefabMeta?.version ?? (structured.version as string | undefined);
      if (version && !SUPPORTED_VERSIONS.has(version)) {
        console.warn(
          `[Prefab] Unrecognized protocol version "${version}" (supported: ${[
            ...SUPPORTED_VERSIONS,
          ].join(", ")})`,
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

      // Update key bindings from tool result (clear if absent)
      keyBindingsRef.current =
        (structured.keyBindings as KeyBindings | undefined) ?? {};

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

  // Subscribe to the unified bridge — replays any buffered events
  // that arrived before React mounted.
  useEffect(() => {
    bridge.onToolResult(handleToolResult);
    bridge.onHostContext(handleHostContext);
    bridge.onCodeResult(handleCodeResult);
  }, [handleToolResult, handleHostContext, handleCodeResult]);

  // Apply initial theme from host context (if already available)
  useEffect(() => {
    if (bridge.app) {
      const ctx = bridge.app.getHostContext();
      if (ctx) handleHostContext(ctx);
    }
  }, [handleHostContext]);

  // Error state — only fatal if we have no content to render
  if (!bridge.app && !tree) {
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
          Waiting for content…
        </span>
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
