/**
 * Shared base schema fragments for Prefab wire format.
 *
 * Every component carries an optional `cssClass` field.
 * Container components add a recursive `children` array.
 */

import { z } from "zod";

/** Fields present on every component. */
export const componentBase = z.object({
  cssClass: z.string().optional(),
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

export type ComponentBaseWire = z.infer<typeof componentBase>;
export type ContainerBaseWire = z.infer<typeof containerBase>;
