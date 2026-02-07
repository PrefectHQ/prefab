/**
 * Typography component schemas.
 *
 * All typography components share the same base shape: content + optional
 * bold/italic styling.  The `Heading` component adds a `level` field.
 * `Text` is the explicit text wrapper.
 */

import { z } from "zod";
import { componentBase } from "./base.ts";

const typographyBase = componentBase.extend({
  content: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
});

export const textSchema = typographyBase.extend({ type: z.literal("Text") });

export const headingSchema = typographyBase.extend({
  type: z.literal("Heading"),
  level: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
    .optional(),
});

export const h1Schema = typographyBase.extend({ type: z.literal("H1") });
export const h2Schema = typographyBase.extend({ type: z.literal("H2") });
export const h3Schema = typographyBase.extend({ type: z.literal("H3") });
export const h4Schema = typographyBase.extend({ type: z.literal("H4") });
export const pSchema = typographyBase.extend({ type: z.literal("P") });
export const leadSchema = typographyBase.extend({ type: z.literal("Lead") });
export const largeSchema = typographyBase.extend({ type: z.literal("Large") });
export const smallSchema = typographyBase.extend({ type: z.literal("Small") });
export const mutedSchema = typographyBase.extend({ type: z.literal("Muted") });
export const blockQuoteSchema = typographyBase.extend({
  type: z.literal("BlockQuote"),
});
export const inlineCodeSchema = typographyBase.extend({
  type: z.literal("InlineCode"),
});
