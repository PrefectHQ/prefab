/**
 * Shared utilities used by both the standard App and GenerativeApp.
 */

import {
  applyDocumentTheme,
  applyHostStyleVariables,
  applyHostFonts,
} from "@modelcontextprotocol/ext-apps/react";
import type { McpUiHostContext } from "@modelcontextprotocol/ext-apps";

/** Protocol versions this renderer understands. */
export const SUPPORTED_VERSIONS = new Set(["0.2"]);

/** Apply host theme context (dark mode, CSS variables, fonts). */
export function applyTheme(ctx: McpUiHostContext) {
  if (ctx.theme) {
    applyDocumentTheme(ctx.theme);
    // The SDK sets data-theme + colorScheme but not the .dark class.
    // Tailwind's dark variant requires .dark on an ancestor.
    document.documentElement.classList.toggle("dark", ctx.theme === "dark");
  }
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
}

/**
 * Extract the subset of host context fields that are useful as reactive
 * state. Excludes `styles` (CSS variables, not data) and `toolInfo`
 * (static metadata about the originating tool call).
 */
export function hostContextToState(
  ctx: McpUiHostContext,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  if (ctx.theme != null) result.theme = ctx.theme;
  if (ctx.displayMode != null) result.displayMode = ctx.displayMode;
  if (ctx.availableDisplayModes != null)
    result.availableDisplayModes = ctx.availableDisplayModes;
  if (ctx.containerDimensions != null)
    result.containerDimensions = ctx.containerDimensions;
  return result;
}
