import { z } from "zod";
import { componentBase } from "./base.ts";

export const embedSchema = componentBase
  .extend({
    type: z.literal("Embed"),
    url: z.string().optional(),
    html: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    sandbox: z.string().optional(),
    allow: z.string().optional(),
  })
  .refine((d) => d.url != null || d.html != null, {
    message: "Embed requires either 'url' or 'html'",
  });

export type EmbedWire = z.infer<typeof embedSchema>;
