/**
 * Carousel — scrollable container powered by Embla Carousel.
 *
 * Lazy-loads embla-carousel-react and plugins on first use.
 * Supports three modes:
 * - Carousel: user-navigable with arrows/dots
 * - Reel: auto-advancing discrete ticks
 * - Marquee: continuous smooth scroll
 */

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface CarouselProps {
  direction?: "left" | "right" | "up" | "down";
  loop?: boolean;
  autoAdvance?: number;
  continuous?: boolean;
  speed?: number;
  showControls?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  align?: "start" | "center" | "end";
  slidesToScroll?: number;
  drag?: boolean;
  className?: string;
  cssClass?: string;
  children?: React.ReactNode;
}

export function PrefabCarousel({
  direction = "left",
  loop = true,
  autoAdvance = 0,
  continuous = false,
  speed = 2,
  showControls = true,
  showDots = false,
  pauseOnHover = true,
  align = "start",
  slidesToScroll = 1,
  drag = true,
  className,
  cssClass,
  children,
}: CarouselProps) {
  const isVertical = direction === "up" || direction === "down";
  const isReverse = direction === "right" || direction === "down";

  const options: EmblaOptionsType = {
    axis: isVertical ? "y" : "x",
    loop,
    align,
    slidesToScroll,
    dragFree: continuous,
    direction: isReverse ? "rtl" : "ltr",
    watchDrag: drag,
  };

  // Build plugins based on mode
  const plugins: Parameters<typeof useEmblaCarousel>[1] = [];

  if (continuous) {
    plugins.push(
      AutoScroll({
        speed,
        direction: "forward",
        playOnInit: true,
        stopOnMouseEnter: pauseOnHover,
        stopOnInteraction: false,
      }),
    );
  } else if (autoAdvance > 0) {
    plugins.push(
      Autoplay({
        delay: autoAdvance,
        playOnInit: true,
        stopOnMouseEnter: pauseOnHover,
        stopOnInteraction: false,
      }),
    );
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSlideCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const PrevIcon = isVertical ? ChevronUp : ChevronLeft;
  const NextIcon = isVertical ? ChevronDown : ChevronRight;

  return (
    <div
      className={cn("pf-relative pf-group", className, cssClass)}
      dir={isReverse && !isVertical ? "rtl" : undefined}
    >
      <div
        ref={emblaRef}
        className="pf-overflow-hidden"
        style={isVertical ? { maxHeight: "100%" } : undefined}
      >
        <div
          className={cn("pf-flex", isVertical ? "pf-flex-col" : "pf-flex-row")}
          style={isReverse && !isVertical ? { direction: "ltr" } : undefined}
        >
          {children}
        </div>
      </div>

      {/* Navigation arrows */}
      {showControls && !continuous && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!loop && !canScrollPrev}
            className={cn(
              "pf-absolute pf-z-10 pf-flex pf-items-center pf-justify-center",
              "pf-size-8 pf-rounded-full pf-bg-background/80 pf-border pf-border-border",
              "pf-shadow-sm pf-backdrop-blur-sm pf-transition-opacity",
              "hover:pf-bg-background disabled:pf-opacity-0",
              "pf-opacity-0 group-hover:pf-opacity-100",
              isVertical
                ? "pf-top-2 pf-left-1/2 -pf-translate-x-1/2"
                : "pf-left-2 pf-top-1/2 -pf-translate-y-1/2",
            )}
          >
            <PrevIcon className="pf-size-4" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!loop && !canScrollNext}
            className={cn(
              "pf-absolute pf-z-10 pf-flex pf-items-center pf-justify-center",
              "pf-size-8 pf-rounded-full pf-bg-background/80 pf-border pf-border-border",
              "pf-shadow-sm pf-backdrop-blur-sm pf-transition-opacity",
              "hover:pf-bg-background disabled:pf-opacity-0",
              "pf-opacity-0 group-hover:pf-opacity-100",
              isVertical
                ? "pf-bottom-2 pf-left-1/2 -pf-translate-x-1/2"
                : "pf-right-2 pf-top-1/2 -pf-translate-y-1/2",
            )}
          >
            <NextIcon className="pf-size-4" />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {showDots && slideCount > 1 && (
        <div className={cn("pf-flex pf-justify-center pf-gap-1.5 pf-mt-3")}>
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                "pf-size-2 pf-rounded-full pf-transition-colors",
                i === selectedIndex
                  ? "pf-bg-foreground"
                  : "pf-bg-foreground/20 hover:pf-bg-foreground/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
