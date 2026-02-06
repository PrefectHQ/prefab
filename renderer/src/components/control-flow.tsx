/**
 * Control flow components: ForEach.
 *
 * ForEach iterates over a data array and renders its children template
 * once per item. The renderer handles this specially — the children
 * are cloned for each item with the item's data merged into the context.
 */

import type { ReactNode } from "react";

interface ForEachProps {
  /** State key or data path containing the array to iterate */
  itemKey?: string;
  /** The items array (resolved by the renderer from data/state) */
  items?: unknown[];
  children?: ReactNode;
}

/**
 * ForEach is handled by the recursive renderer, not as a regular component.
 * This exists for the registry but the renderer intercepts it.
 */
export function ForEach({ children }: ForEachProps) {
  return <>{children}</>;
}
