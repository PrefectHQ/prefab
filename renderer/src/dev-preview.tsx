/**
 * Dev preview mode — renders a demo component tree without the MCP protocol.
 *
 * Open renderer.html#preview to see this. Accepts optional JSON via hash:
 *   renderer.html#preview:{"type":"Text","content":"Hello"}
 *
 * Without custom JSON, renders a showcase of all component types.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "sonner";
import { DEMO_DATA, DEMO_TREE } from "./demo-data";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";

/** Injected preview data from the CLI `prefab apps preview` command. */
interface PreviewPayload {
  tree: ComponentNode;
  data: Record<string, unknown>;
  state?: Record<string, unknown>;
}

export function DevPreview({ injected }: { injected?: PreviewPayload }) {
  const hash = window.location.hash;
  const isDocEmbed = hash.startsWith("#docpreview:");

  // Parse hash once — supports envelope {$protocol, view, state} or bare tree
  const { hashTree, hashState, hashData, hashError } = useMemo(() => {
    const jsonStart = hash.indexOf(":");
    if (jsonStart === -1)
      return { hashTree: null, hashState: {}, hashData: {}, hashError: null };
    try {
      const raw = decodeURIComponent(hash.slice(jsonStart + 1));
      const obj = JSON.parse(raw);
      if (obj.view) {
        const reserved = new Set(["view", "state"]);
        const userData: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(obj)) {
          if (!reserved.has(k)) userData[k] = v;
        }
        return {
          hashTree: obj.view as ComponentNode,
          hashState: (obj.state ?? {}) as Record<string, unknown>,
          hashData: userData,
          hashError: null,
        };
      }
      return {
        hashTree: obj as ComponentNode,
        hashState: {} as Record<string, unknown>,
        hashData: {},
        hashError: null,
      };
    } catch (e) {
      return {
        hashTree: null,
        hashState: {},
        hashData: {},
        hashError: (e as Error).message,
      };
    }
  }, []);

  const hasCustomTree = !!(injected?.tree ?? hashTree);
  const defaultData = hasCustomTree ? hashData : { ...DEMO_DATA, ...hashData };
  const initialState = {
    ...(injected?.data ?? defaultData),
    ...(injected?.state ?? hashState),
  };
  const state = useStateStore(initialState);
  const [customTree, setCustomTree] = useState<ComponentNode | null>(
    injected?.tree ?? hashTree,
  );
  const [parseError] = useState<string | null>(hashError);
  const contentRef = useRef<HTMLDivElement>(null);

  // Listen for postMessage updates from playground shell
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "prefab:render") {
        const { tree, data: newData, state: newState } = event.data;
        if (tree) setCustomTree(tree);
        // Merge data into state (data is legacy, state is canonical)
        state.reset({ ...(newData ?? {}), ...(newState ?? {}) });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [state]);

  // For doc embeds, sync theme from parent so renderer matches the host page
  useEffect(() => {
    if (!isDocEmbed) return;
    const handler = (e: MessageEvent) => {
      if (e.data && e.data.type === "prefab:theme") {
        document.documentElement.classList.toggle("dark", e.data.dark);
      }
    };
    window.addEventListener("message", handler);
    // Request theme from parent now that we're ready to receive it
    window.parent.postMessage({ type: "prefab:ready" }, "*");
    return () => {
      window.removeEventListener("message", handler);
    };
  }, [isDocEmbed]);

  // For doc embeds, report content height to parent for iframe auto-sizing
  useEffect(() => {
    if (!isDocEmbed || !contentRef.current) return;
    const report = () => {
      const h = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "prefab:resize", height: h }, "*");
    };
    // Report after initial render and on any resize
    report();
    const observer = new ResizeObserver(report);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [isDocEmbed, customTree]);

  const tree = customTree ?? DEMO_TREE;

  // Doc embed mode: minimal chrome, transparent-friendly, tight padding
  if (isDocEmbed) {
    return (
      <div
        ref={contentRef}
        className="bg-transparent text-foreground py-12 px-16 flex flex-col items-center"
      >
        {parseError && (
          <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            JSON parse error: {parseError}
          </div>
        )}
        <RenderTree tree={tree} state={state} app={null} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl p-8">
        {parseError && (
          <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            JSON parse error: {parseError}
          </div>
        )}
        <RenderTree tree={tree} state={state} app={null} />
      </div>
      <Toaster />
    </div>
  );
}
