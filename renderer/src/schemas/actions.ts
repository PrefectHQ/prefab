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

export const appendStateSchema = z.object({
  action: z.literal("appendState"),
  key: z.string(),
  value: z.unknown().optional(),
  index: z.union([z.number(), z.string()]).optional(),
  ...actionCallbacks,
});

export const popStateSchema = z.object({
  action: z.literal("popState"),
  key: z.string(),
  index: z.union([z.number(), z.string()]),
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

export const closeOverlaySchema = z.object({
  action: z.literal("closeOverlay"),
  ...actionCallbacks,
});

export const openFilePickerSchema = z.object({
  action: z.literal("openFilePicker"),
  accept: z.string().optional(),
  multiple: z.boolean().optional(),
  maxSize: z.number().int().optional(),
  ...actionCallbacks,
});

export const fetchSchema = z.object({
  action: z.literal("fetch"),
  url: z.string(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.union([z.record(z.string(), z.unknown()), z.string()]).optional(),
  resultKey: z.string().optional(),
  ...actionCallbacks,
});

export const setIntervalSchema = z.object({
  action: z.literal("setInterval"),
  duration: z.number().int().positive(),
  // After interpolation, a template like "{{ flag }}" resolves to a boolean,
  // so the post-interpolation schema accepts both. The renderer reads the
  // raw (pre-interpolation) string for re-evaluation each tick.
  while: z.union([z.string(), z.boolean()]).optional(),
  count: z.number().int().positive().optional(),
  onTick: z.union([lazyAction, z.array(lazyAction)]).optional(),
  onComplete: z.union([lazyAction, z.array(lazyAction)]).optional(),
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
  appendStateSchema,
  popStateSchema,
  showToastSchema,
  closeOverlaySchema,
  openFilePickerSchema,
  fetchSchema,
  setIntervalSchema,
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
  "appendState",
  "popState",
  "showToast",
  "closeOverlay",
  "openFilePicker",
  "fetch",
  "setInterval",
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
  appendState: appendStateSchema,
  popState: popStateSchema,
  showToast: showToastSchema,
  closeOverlay: closeOverlaySchema,
  openFilePicker: openFilePickerSchema,
  fetch: fetchSchema,
  setInterval: setIntervalSchema,
};

export type ToolCallWire = z.infer<typeof toolCallSchema>;
export type SendMessageWire = z.infer<typeof sendMessageSchema>;
export type UpdateContextWire = z.infer<typeof updateContextSchema>;
export type OpenLinkWire = z.infer<typeof openLinkSchema>;
export type SetStateWire = z.infer<typeof setStateSchema>;
export type ToggleStateWire = z.infer<typeof toggleStateSchema>;
export type AppendStateWire = z.infer<typeof appendStateSchema>;
export type PopStateWire = z.infer<typeof popStateSchema>;
export type ShowToastWire = z.infer<typeof showToastSchema>;
export type CloseOverlayWire = z.infer<typeof closeOverlaySchema>;
export type OpenFilePickerWire = z.infer<typeof openFilePickerSchema>;
export type FetchWire = z.infer<typeof fetchSchema>;
export type SetIntervalWire = z.infer<typeof setIntervalSchema>;
export type ActionWire = z.infer<typeof actionSchema>;
export type ActionOrListWire = z.infer<typeof actionOrList>;
