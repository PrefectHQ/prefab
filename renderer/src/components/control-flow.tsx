/**
 * Control flow components: ForEach, Condition, Slot.
 *
 * ForEach iterates over a data array and renders its children template
 * once per item. Condition evaluates cases in order and renders the first
 * match. Slot renders a component tree stored in state. All are handled
 * specially by the renderer — these components exist for registry
 * completeness.
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

interface ConditionProps {
  children?: ReactNode;
}

/**
 * Condition is handled by the recursive renderer (case evaluation), not here.
 * This exists for the registry but the renderer intercepts it.
 */
export function Condition({ children }: ConditionProps) {
  return <>{children}</>;
}

interface SlotProps {
  children?: ReactNode;
}

/**
 * Slot is handled by the recursive renderer (reads component tree from state).
 * This exists for the registry but the renderer intercepts it.
 */
export function Slot({ children }: SlotProps) {
  return <>{children}</>;
}
