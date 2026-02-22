/**
 * Icon resolver — converts kebab-case icon names to lucide-react components.
 *
 * A static map covers the ~15 icons used by UI primitives (always available,
 * zero async). For any other name, the full lucide-react icon barrel is
 * lazy-loaded from a separate chunk (~500-800 KB, fetched once on first miss).
 *
 * Components that accept dynamic icon names use the `useIcon` hook, which
 * returns the resolved component (or null while loading).
 */

import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Circle,
  CircleAlert,
  Info,
  Loader2,
  TriangleAlert,
  Upload,
  X,
} from "lucide-react";

// ── Static icon map ─────────────────────────────────────────────────────
// Icons imported individually are tree-shaken into the core bundle (~1-2KB
// each). This covers all icons used by shadcn UI primitives plus a handful
// of common names that show up in component defaults (e.g. DropZone's
// default "upload" icon, Alert variants).

const STATIC_ICONS: Record<string, LucideIcon> = {
  calendar: CalendarIcon,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "chevrons-up-down": ChevronsUpDown,
  circle: Circle,
  "circle-alert": CircleAlert,
  info: Info,
  "loader-2": Loader2,
  "triangle-alert": TriangleAlert,
  upload: Upload,
  x: X,
};

// ── Lazy barrel loader ──────────────────────────────────────────────────
// Module-level cache: once the full icon set is loaded, all subsequent
// lookups are synchronous.

type IconsMap = Record<string, LucideIcon>;

let barrelPromise: Promise<IconsMap> | null = null;
let barrelIcons: IconsMap | null = null;

function loadBarrel(): Promise<IconsMap> {
  if (!barrelPromise) {
    barrelPromise = import("./icons-barrel").then((m) => {
      barrelIcons = m.icons as IconsMap;
      return barrelIcons;
    });
  }
  return barrelPromise;
}

function kebabToPascal(name: string): string {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// ── Public API ──────────────────────────────────────────────────────────

/**
 * Synchronous resolver — returns the icon if it's in the static map or
 * the barrel has already been loaded. Returns undefined otherwise.
 */
export function resolveIcon(name: string): LucideIcon | undefined {
  const staticHit = STATIC_ICONS[name];
  if (staticHit) return staticHit;

  if (barrelIcons) {
    return barrelIcons[kebabToPascal(name)];
  }

  return undefined;
}

/**
 * React hook for async icon resolution. Returns the icon component if
 * available (static map or cached barrel), or null while the barrel is
 * loading. Triggers a single re-render when the barrel finishes loading.
 */
export function useIcon(name: string | undefined): LucideIcon | null {
  const [, setLoaded] = useState(false);

  // Try synchronous resolution first.
  const syncResult = name ? resolveIcon(name) : undefined;

  useEffect(() => {
    if (!name || syncResult) return;

    // Barrel not yet loaded — kick off the load and re-render when done.
    let cancelled = false;
    loadBarrel().then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [name, syncResult]);

  if (!name) return null;
  if (syncResult) return syncResult;

  // Barrel might have loaded between render and effect — check again.
  if (barrelIcons) {
    return (barrelIcons[kebabToPascal(name)] as LucideIcon) ?? null;
  }

  return null;
}
