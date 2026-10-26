/**
 * Shadow DOM embed entry point for doc previews.
 *
 * Both the preview content and overlay portals render inside shadow roots,
 * giving full CSS isolation from the host page. The portal shadow root lives
 * on document.body so `position: fixed` overlays can use the full viewport.
 */

import { useLayoutEffect, useMemo } from "react";
import { createRoot, type Root } from "react-dom/client";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";
import { clearAllIntervals } from "./actions";
import { AppTools } from "./app-tools";
import { createShadowSurface, type ShadowSurface } from "./shadow-surface";
import { ShadowPreviewContents } from "./shadow-preview";

interface MountHandle {
  unmount(): void;
  setDark(dark: boolean): void;
}

function EmbedPreview({
  tree,
  initialState,
  surface,
  dark,
  tools,
}: {
  tree: ComponentNode;
  initialState: Record<string, unknown>;
  surface: ShadowSurface;
  dark: boolean;
  tools?: unknown;
}) {
  const state = useStateStore(initialState);
  const appTools = useMemo(() => new AppTools(null), []);
  useLayoutEffect(() => {
    appTools.replace(tools, state);
    return () => {
      appTools.clear();
      clearAllIntervals(state);
    };
  }, [appTools, state, tools]);
  return (
    <ShadowPreviewContents surface={surface} dark={dark}>
      <RenderTree tree={tree} state={state} app={null} />
    </ShadowPreviewContents>
  );
}

function isPreviewDark(
  parsed: Record<string, unknown>,
  options?: { dark?: boolean },
): boolean {
  if (options?.dark !== undefined) return options.dark;
  return parsed.mode === "dark";
}

export function mountPreview(
  host: HTMLElement,
  json: string,
  options?: { dark?: boolean },
): MountHandle {
  // Parse JSON — envelope uses view/state keys
  const parsed = JSON.parse(json) as Record<string, unknown>;

  const surface = createShadowSurface(host, "docs");
  let isDark = isPreviewDark(parsed, options);
  surface.setDark(isDark);
  surface.setAssets(parsed.css, parsed.stylesheets);

  const { view, state, tools, theme, css, stylesheets, mode, ...userData } =
    parsed;
  void theme;
  void css;
  void stylesheets;
  void mode;
  const tree: ComponentNode = (view ?? parsed) as ComponentNode;
  const initialState = {
    ...userData,
    ...((state as Record<string, unknown> | undefined) ?? {}),
  };

  // Mount React
  let root: Root | null = createRoot(surface.mount);
  const render = () =>
    root?.render(
      <EmbedPreview
        tree={tree}
        initialState={initialState}
        surface={surface}
        dark={isDark}
        tools={tools}
      />,
    );
  render();

  return {
    unmount() {
      root?.unmount();
      root = null;
      surface.dispose();
    },
    setDark(dark: boolean) {
      isDark = dark;
      surface.setDark(dark);
      render();
    },
  };
}

// Expose public API on window for script-tag consumers.
(window as unknown as Record<string, unknown>).__prefab = { mountPreview };
