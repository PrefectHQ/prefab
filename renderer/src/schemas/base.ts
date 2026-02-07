/**
 * Shared base schema fragments for Prefab wire format.
 *
 * Every component carries optional `cssClass` and `visibleWhen` fields.
 * Container components add a recursive `children` array.
 */

import { z } from "zod";

/** Fields present on every component. */
export const componentBase = z.object({
  cssClass: z.string().optional(),
  visibleWhen: z.string().optional(),
});

/**
 * Lazy reference to any component — resolved once all schemas register
 * themselves in the SCHEMA_REGISTRY.  Used for `children` arrays.
 */
export const anyComponentSchema: z.ZodType<Record<string, unknown>> = z.lazy(
  () => z.record(z.string(), z.unknown()),
);

/** Fields for container components (Column, Row, Card, etc.). */
export const containerBase = componentBase.extend({
  children: z.array(anyComponentSchema).optional(),
});

/**
 * Gap can be a single int or an [x, y] tuple with optional null entries.
 * Python normalises (int,) → int and (None, 4) → [null, 4].
 */
export const gapSchema = z.union([
  z.number().int(),
  z.tuple([z.number().int().nullable(), z.number().int().nullable()]),
]);
