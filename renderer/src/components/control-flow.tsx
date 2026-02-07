/**
 * Control flow components: ForEach, State.
 *
 * ForEach iterates over a data array and renders its children template
 * once per item. State provides scoped interpolation values to children.
 * Both are handled specially by the renderer — these components exist
 * for registry completeness.
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

interface StateProps {
  children?: ReactNode;
}

/**
 * State is handled by the recursive renderer (scope merging), not here.
 * This exists for the registry but the renderer intercepts it.
 */
export function PrefabState({ children }: StateProps) {
  return <>{children}</>;
}
