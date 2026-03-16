/**
 * Context that provides the RenderNode function to components that need
 * to render Prefab component trees from JSON data (e.g., DataTable cells).
 *
 * This avoids circular imports between the component files and renderer.tsx.
 */

import { createContext, useContext, type ReactNode } from "react";
import type { ComponentNode } from "./renderer";

/** Function that renders a ComponentNode to a ReactNode. */
export type RenderNodeFn = (node: ComponentNode) => ReactNode;

const RenderContext = createContext<RenderNodeFn | undefined>(undefined);

export function RenderProvider({
  renderNode,
  children,
}: {
  renderNode: RenderNodeFn;
  children: ReactNode;
}) {
  return (
    <RenderContext.Provider value={renderNode}>
      {children}
    </RenderContext.Provider>
  );
}

export function useRenderNode(): RenderNodeFn | undefined {
  return useContext(RenderContext);
}

/** Returns true if a value looks like a Prefab component JSON node. */
export function isComponentNode(value: unknown): value is ComponentNode {
  return (
    value !== null &&
    typeof value === "object" &&
    "type" in value &&
    typeof (value as Record<string, unknown>).type === "string"
  );
}
