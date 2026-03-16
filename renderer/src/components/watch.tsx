/**
 * Watch — fires actions when a watched state key changes.
 *
 * Non-visual component. Uses useEffect to compare the current value of
 * a state key against its previous value. When the value changes, the
 * onChange actions fire with the new value as $event.
 *
 * Because useEffect runs after React commits, watchers naturally batch:
 * multiple state changes within a single action chain only trigger
 * watchers once, after all synchronous mutations settle.
 */

import { useEffect, useRef } from "react";
import type { App } from "@modelcontextprotocol/ext-apps";
import type { StateStore } from "../state";
import type { ActionSpec } from "../actions";
import { executeActions } from "../actions";
import { interpolateString } from "../interpolation";
import type { OverlayCloseFn } from "../overlay-context";

/** Sentinel value for "no previous value recorded yet". */
const UNSET = Symbol("UNSET");

interface WatchProps {
  /** State key or template expression to watch. */
  watchKey: string;
  /** Raw onChange action spec(s) — dispatched when the value changes. */
  onChange?: ActionSpec | ActionSpec[];
  /** MCP app reference for server actions. */
  app: App | null;
  /** State store. */
  state: StateStore;
  /** Local interpolation scope. */
  scope: Record<string, unknown>;
  /** Overlay close function (for CloseOverlay actions). */
  overlayClose?: OverlayCloseFn;
}

export function Watch({
  watchKey,
  onChange,
  app,
  state,
  scope,
  overlayClose,
}: WatchProps) {
  const prevRef = useRef<unknown>(UNSET);

  // Resolve the current watched value.
  // If the key contains {{ }}, evaluate it as a template expression.
  // Otherwise, read the state key directly.
  const allState = state.getAll();
  const ctx: Record<string, unknown> = { ...allState, ...scope };
  let currentValue: unknown;
  if (watchKey.includes("{{")) {
    currentValue = interpolateString(watchKey, ctx);
  } else if (watchKey.includes(".")) {
    // Dot-path: use state.get which handles nested paths
    currentValue = state.get(watchKey);
  } else {
    currentValue = allState[watchKey];
  }

  useEffect(() => {
    const prev = prevRef.current;

    // Always record the current value
    prevRef.current = currentValue;

    // Skip the initial render — watchers only fire on *changes*
    if (prev === UNSET) return;

    // Deep-compare for objects/arrays, strict equality for primitives
    if (deepEqual(prev, currentValue)) return;

    // Fire onChange actions with the new value as $event
    if (onChange) {
      void executeActions(
        onChange,
        app,
        state,
        currentValue,
        0,
        undefined,
        scope,
        overlayClose,
      );
    }
  }); // No dependency array — runs every render to catch all state changes

  return null;
}

/**
 * Simple deep equality for JSON-serializable values.
 * Handles primitives, arrays, and plain objects.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }

  if (typeof a === "object") {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) =>
      deepEqual(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
      ),
    );
  }

  return false;
}
