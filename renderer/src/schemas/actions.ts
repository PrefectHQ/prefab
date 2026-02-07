/**
 * Zod schemas for the Prefab action wire format.
 *
 * Actions are the "verbs" of the protocol — button clicks, form submissions,
 * etc. dispatch these as JSON to the renderer, which interprets them.
 *
 * Each action carries an `action` discriminator string plus action-specific
 * fields.  `onSuccess` / `onError` are recursive callback chains.
 */

import { z } from "zod";

// ── Forward declaration for recursive callbacks ─────────────────────
const lazyAction: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z.record(z.string(), z.unknown()),
);

const actionCallbacks = {
  onSuccess: z.union([lazyAction, z.array(lazyAction)]).optional(),
  onError: z.union([lazyAction, z.array(lazyAction)]).optional(),
};

// ── Individual action schemas ───────────────────────────────────────

export const toolCallSchema = z.object({
  action: z.literal("toolCall"),
  tool: z.string(),
  arguments: z.record(z.string(), z.unknown()).optional(),
  resultKey: z.string().optional(),
  ...actionCallbacks,
});

export const sendMessageSchema = z.object({
  action: z.literal("sendMessage"),
  content: z.string(),
  ...actionCallbacks,
});

export const updateContextSchema = z.object({
  action: z.literal("updateContext"),
  content: z.string().optional(),
  structuredContent: z.record(z.string(), z.unknown()).optional(),
  ...actionCallbacks,
});

export const openLinkSchema = z.object({
  action: z.literal("openLink"),
  url: z.string(),
  ...actionCallbacks,
});

export const setStateSchema = z.object({
  action: z.literal("setState"),
  key: z.string(),
  value: z.unknown().optional(),
  ...actionCallbacks,
});

export const toggleStateSchema = z.object({
  action: z.literal("toggleState"),
  key: z.string(),
  ...actionCallbacks,
});

export const showToastSchema = z.object({
  action: z.literal("showToast"),
  message: z.string(),
  description: z.string().optional(),
  variant: z
    .enum(["default", "success", "error", "warning", "info"])
    .optional(),
  duration: z.number().optional(),
  ...actionCallbacks,
});

// ── Union + helpers ─────────────────────────────────────────────────

export const actionSchema = z.discriminatedUnion("action", [
  toolCallSchema,
  sendMessageSchema,
  updateContextSchema,
  openLinkSchema,
  setStateSchema,
  toggleStateSchema,
  showToastSchema,
]);

/** Single action or array of actions — the shape of onClick / onChange / etc. */
export const actionOrList = z.union([actionSchema, z.array(actionSchema)]);

/** The set of action discriminators the renderer handles. */
export const HANDLED_ACTIONS = new Set([
  "toolCall",
  "sendMessage",
  "updateContext",
  "openLink",
  "setState",
  "toggleState",
  "showToast",
] as const);

/**
 * Schema registry for actions, keyed by discriminator.
 * Contract tests use this to validate Python-generated fixtures.
 */
export const ACTION_SCHEMA_REGISTRY: Record<string, z.ZodType> = {
  toolCall: toolCallSchema,
  sendMessage: sendMessageSchema,
  updateContext: updateContextSchema,
  openLink: openLinkSchema,
  setState: setStateSchema,
  toggleState: toggleStateSchema,
  showToast: showToastSchema,
};
