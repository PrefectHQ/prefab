import { z } from "zod";
import { containerBase } from "./base.ts";

export const carouselSchema = containerBase.extend({
  type: z.literal("Carousel"),
  direction: z.enum(["left", "right", "up", "down"]).optional(),
  loop: z.boolean().optional(),
  autoAdvance: z.number().optional(),
  continuous: z.boolean().optional(),
  speed: z.number().optional(),
  showControls: z.boolean().optional(),
  showDots: z.boolean().optional(),
  pauseOnHover: z.boolean().optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  slidesToScroll: z.number().optional(),
  drag: z.boolean().optional(),
});

export type CarouselWire = z.infer<typeof carouselSchema>;
