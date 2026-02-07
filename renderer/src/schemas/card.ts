/**
 * Card component schemas: Card, CardHeader, CardTitle, CardDescription,
 * CardContent, CardFooter.
 */

import { z } from "zod";
import { containerBase } from "./base.ts";

export const cardSchema = containerBase.extend({
  type: z.literal("Card"),
});

export const cardHeaderSchema = containerBase.extend({
  type: z.literal("CardHeader"),
});

export const cardTitleSchema = containerBase.extend({
  type: z.literal("CardTitle"),
  content: z.string().optional(),
});

export const cardDescriptionSchema = containerBase.extend({
  type: z.literal("CardDescription"),
  content: z.string().optional(),
});

export const cardContentSchema = containerBase.extend({
  type: z.literal("CardContent"),
});

export const cardFooterSchema = containerBase.extend({
  type: z.literal("CardFooter"),
});
