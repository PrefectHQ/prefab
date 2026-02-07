/**
 * Alert component schemas: Alert, AlertTitle, AlertDescription.
 */

import { z } from "zod";
import { componentBase, containerBase } from "./base.ts";

export const alertSchema = containerBase.extend({
  type: z.literal("Alert"),
  variant: z
    .enum(["default", "destructive", "success", "warning", "info"])
    .optional(),
});

export const alertTitleSchema = componentBase.extend({
  type: z.literal("AlertTitle"),
  content: z.string(),
});

export const alertDescriptionSchema = componentBase.extend({
  type: z.literal("AlertDescription"),
  content: z.string(),
});
