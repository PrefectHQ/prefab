import { z } from "zod";
import { componentBase } from "./base.ts";

export const videoSchema = componentBase.extend({
  type: z.literal("Video"),
  src: z.string(),
  poster: z.string().optional(),
  controls: z.boolean().optional(),
  autoplay: z.boolean().optional(),
  loop: z.boolean().optional(),
  muted: z.boolean().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
});

export type VideoWire = z.infer<typeof videoSchema>;

export const audioSchema = componentBase.extend({
  type: z.literal("Audio"),
  src: z.string(),
  controls: z.boolean().optional(),
  autoplay: z.boolean().optional(),
  loop: z.boolean().optional(),
  muted: z.boolean().optional(),
});

export type AudioWire = z.infer<typeof audioSchema>;
