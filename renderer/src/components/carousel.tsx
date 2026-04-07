/**
 * Carousel — scrollable container powered by Embla Carousel.
 */

import React, { useState, useCallback, useEffect, Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";
import {
  getLoopDuplicationRepeats,
  resolveGap,
  resolveVisible,
  resolveVerticalSlideBasis,
  resolveVerticalViewportHeight,
} from "./carousel-logic";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface CarouselProps {
  visible?: number | null;
  gap?: number;
  height?: number;
  direction?: "left" | "right" | "up" | "down";
  loop?: boolean;
  autoAdvance?: number;
  continuous?: boolean;
  speed?: number;
  effect?: "slide" | "fade";
  dimInactive?: boolean;
  showControls?: boolean;
  controlsPosition?: "overlay" | "outside" | "gutter";
  showDots?: boolean;
  pauseOnHover?: boolean;
  align?: "start" | "center" | "end";
  slidesToScroll?: number;
  drag?: boolean;
  className?: string;
  cssClass?: string;
  children?: React.ReactNode;
}

/**
 * Measure the height of the first child element inside a container.
 * Used for vertical carousels to determine viewport height.
 */
function useMeasuredHeight(
  isVertical: boolean,
  explicitHeight: number | undefined,
): [React.RefCallback<HTMLDivElement>, number | undefined] {
  const [measured, setMeasured] = useState<number | undefined>(undefined);
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !isVertical || explicitHeight != null) return;
      // Measure the first child's rendered height
      const firstChild = node.firstElementChild as HTMLElement | null;
      if (firstChild && firstChild.offsetHeight > 0) {
        setMeasured(firstChild.offsetHeight);
      } else {
        // Retry after a frame in case layout hasn't happened yet
        requestAnimationFrame(() => {
          const fc = node.firstElementChild as HTMLElement | null;
          if (fc && fc.offsetHeight > 0) setMeasured(fc.offsetHeight);
        });
      }
    },
    [isVertical, explicitHeight],
  );
  return [ref, explicitHeight ?? measured];
}

export function PrefabCarousel({
  visible,
  gap = 0,
  height,
  direction = "left",
  loop = true,
  autoAdvance = 0,
  continuous = false,
  speed = 2,
  effect = "slide",
  dimInactive = false,
  showControls = true,
  controlsPosition = "outside",
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
  // Distinguish explicit `null` from omitted `undefined`.
  const effectiveVisible = resolveVisible(visible, continuous, effect);

  // Filter children
  const validChildren = Children.toArray(children).filter(
    (child) => child != null && child !== "",
  );

  // For vertical carousels: measure first child's height before mounting Embla.
  // This ensures Embla sees the correct viewport height at init time.
  const [measureRef, measuredHeight] = useMeasuredHeight(isVertical, height);

  // For vertical without explicit height: don't mount Embla until we know the height.
  // Render a hidden measurement div first, then swap to the real carousel.
  const verticalReady = !isVertical || measuredHeight != null;

  // Slide sizing
  const visibleCount =
    effectiveVisible != null && effectiveVisible > 0 ? effectiveVisible : null;
  const effectiveGap = resolveGap(gap, effect, visibleCount);
  const verticalViewportHeight = isVertical
    ? height ??
      resolveVerticalViewportHeight(measuredHeight, visibleCount, effectiveGap)
    : undefined;
  const halfGap = effectiveGap > 0 ? effectiveGap / 2 : 0;
  // For horizontal: basis as % of viewport width.
  // For vertical: basis in px. Use the explicit viewport height when one is
  // provided, otherwise use the measured first slide height.
  const slideBasis =
    visibleCount != null
      ? isVertical && verticalViewportHeight != null
        ? `${resolveVerticalSlideBasis(
            verticalViewportHeight,
            visibleCount,
            effectiveGap,
          )}px`
        : `${100 / visibleCount}%`
      : undefined;

  // Embla requires more content than viewport for loop to work.
  // For marquee: always duplicate so AutoScroll has content to scroll.
  // For multi-visible loop: duplicate when there are too few slides for
  // Embla's loop constraints (e.g. visible=3.6 with only 4 slides).
  let effectiveChildren = validChildren;
  if (loop && continuous) {
    effectiveChildren = [
      ...validChildren,
      ...validChildren.map((c, i) =>
        React.cloneElement(c as React.ReactElement, { key: `dup1-${i}` }),
      ),
      ...validChildren.map((c, i) =>
        React.cloneElement(c as React.ReactElement, { key: `dup2-${i}` }),
      ),
    ];
  } else if (
    loop &&
    visibleCount != null &&
    visibleCount > 1 &&
    validChildren.length > 0
  ) {
    const repeats = getLoopDuplicationRepeats({
      loop,
      continuous,
      visibleCount,
      childCount: validChildren.length,
    });
    if (repeats > 1) {
      effectiveChildren = Array.from({ length: repeats }, (_, repeat) =>
        validChildren.map((child, i) =>
          React.cloneElement(child as React.ReactElement, {
            key: `loopdup-${repeat}-${i}`,
          }),
        ),
      ).flat();
    }
  }

  const realSlideCount = validChildren.length;

  if (!verticalReady) {
    // Measurement pass: render children invisibly to measure their height
    return (
      <div
        ref={measureRef}
        className={cn(className, cssClass)}
        style={{ overflow: "hidden", height: 0, position: "relative" }}
      >
        {validChildren[0]}
      </div>
    );
  }

  return (
    <CarouselInner
      isVertical={isVertical}
      viewportHeight={verticalViewportHeight}
      validChildren={effectiveChildren}
      realSlideCount={realSlideCount}
      slideBasis={slideBasis}
      effectiveGap={effectiveGap}
      halfGap={halfGap}
      loop={loop}
      align={align}
      slidesToScroll={slidesToScroll}
      continuous={continuous}
      drag={drag}
      effect={effect}
      autoAdvance={autoAdvance}
      speed={speed}
      direction={direction}
      pauseOnHover={pauseOnHover}
      dimInactive={dimInactive}
      showControls={showControls}
      controlsPosition={controlsPosition}
      showDots={showDots}
      className={className}
      cssClass={cssClass}
    />
  );
}

/** Inner component that mounts Embla — only rendered when dimensions are known. */
function CarouselInner({
  isVertical,
  viewportHeight,
  validChildren,
  realSlideCount,
  slideBasis,
  effectiveGap,
  halfGap,
  loop,
  align,
  slidesToScroll,
  continuous,
  drag,
  effect,
  autoAdvance,
  speed,
  direction,
  pauseOnHover,
  dimInactive,
  showControls,
  controlsPosition,
  showDots,
  className,
  cssClass,
}: {
  isVertical: boolean;
  viewportHeight: number | undefined;
  validChildren: React.ReactNode[];
  realSlideCount: number;
  slideBasis: string | undefined;
  effectiveGap: number;
  halfGap: number;
  loop: boolean;
  align: "start" | "center" | "end";
  slidesToScroll: number;
  continuous: boolean;
  drag: boolean;
  effect: "slide" | "fade";
  autoAdvance: number;
  speed: number;
  direction: "left" | "right" | "up" | "down";
  pauseOnHover: boolean;
  dimInactive: boolean;
  showControls: boolean;
  controlsPosition: "overlay" | "outside" | "gutter";
  showDots: boolean;
  className?: string;
  cssClass?: string;
}) {
  const options: EmblaOptionsType = {
    axis: isVertical ? "y" : "x",
    loop,
    align,
    slidesToScroll,
    dragFree: continuous,
    watchDrag: drag,
  };

  const plugins: Parameters<typeof useEmblaCarousel>[1] = [];

  if (effect === "fade") {
    plugins.push(Fade());
  }

  if (continuous) {
    plugins.push(
      AutoScroll({
        speed,
        direction:
          direction === "right" || direction === "down"
            ? "backward"
            : "forward",
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

  // Debug: expose all Embla instances
  useEffect(() => {
    if (!emblaApi) return;
    const w = window as any;
    if (!w.__emblaDebug) w.__emblaDebug = [];
    w.__emblaDebug.push(emblaApi);
    console.log(
      "[Carousel] init axis=" +
        (isVertical ? "y" : "x") +
        " snaps=" +
        emblaApi.scrollSnapList().length +
        " canNext=" +
        emblaApi.canScrollNext() +
        " canPrev=" +
        emblaApi.canScrollPrev() +
        " slides=" +
        emblaApi.slideNodes().length,
    );
  }, [emblaApi]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [slideOpacities, setSlideOpacities] = useState<number[]>([]);

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
    const rawIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(realSlideCount > 0 ? rawIndex % realSlideCount : rawIndex);
  }, [emblaApi, realSlideCount]);

  const updateDimming = useCallback((api: EmblaCarouselType) => {
    const scrollProgress = api.scrollProgress();
    const snaps = api.scrollSnapList();
    const opacities = snaps.map((snap) => {
      const distance = Math.abs(scrollProgress - snap);
      return Math.max(0.3, 1 - distance * 2);
    });
    setSlideOpacities(opacities);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSlideCount(realSlideCount);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    if (dimInactive) {
      updateDimming(emblaApi);
      emblaApi.on("scroll", updateDimming);
      emblaApi.on("reInit", updateDimming);
    }

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      if (dimInactive) {
        emblaApi.off("scroll", updateDimming);
        emblaApi.off("reInit", updateDimming);
      }
    };
  }, [emblaApi, onSelect, dimInactive, updateDimming, realSlideCount]);

  const PrevIcon = isVertical ? ChevronUp : ChevronLeft;
  const NextIcon = isVertical ? ChevronDown : ChevronRight;

  const controlsVisible = showControls && !continuous;
  const controlsOutside = controlsPosition === "outside";
  const controlsGutter = controlsPosition === "gutter";
  const dotsVisible = showDots && slideCount > 1;
  const verticalDotsVisible = dotsVisible && isVertical && !controlsGutter;
  const horizontalDotsVisible = dotsVisible && !isVertical && !controlsGutter;
  const controlSize = 32;
  const outsidePadding = controlSize + 8;
  const sideDotsPadding = 20;
  const sideGutterPadding =
    controlsGutter && (controlsVisible || dotsVisible)
      ? controlSize + 12
      : sideDotsPadding;
  const verticalGutterVisible =
    isVertical && controlsGutter && (controlsVisible || dotsVisible);
  const horizontalGutterVisible =
    !isVertical && controlsGutter && (controlsVisible || dotsVisible);
  const controlButtonBaseStyle: React.CSSProperties = {
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: controlSize,
    height: controlSize,
    borderRadius: "50%",
    border: "1px solid var(--border, #e5e7eb)",
    background: "var(--background, #fff)",
    boxShadow: "0 1px 3px rgba(0,0,0,.1)",
    cursor: "pointer",
    transition: "opacity 150ms",
  };

  const viewportShellStyle: React.CSSProperties = {
    position: "relative",
    ...(controlsVisible && controlsOutside
      ? isVertical
        ? { paddingTop: outsidePadding, paddingBottom: outsidePadding }
        : { paddingLeft: outsidePadding, paddingRight: outsidePadding }
      : {}),
    ...(isVertical && (verticalDotsVisible || verticalGutterVisible)
      ? { paddingRight: sideGutterPadding }
      : {}),
  };

  const prevControlPosition: React.CSSProperties = controlsOutside
    ? isVertical
      ? { top: 0, left: "50%", transform: "translateX(-50%)" }
      : { left: 0, top: "50%", transform: "translateY(-50%)" }
    : isVertical
      ? { top: 8, right: 8 }
      : { left: 8, top: "50%", transform: "translateY(-50%)" };

  const nextControlPosition: React.CSSProperties = controlsOutside
    ? isVertical
      ? { bottom: 0, left: "50%", transform: "translateX(-50%)" }
      : { right: 0, top: "50%", transform: "translateY(-50%)" }
    : isVertical
      ? { bottom: 8, right: 8 }
      : { right: 8, top: "50%", transform: "translateY(-50%)" };

  return (
    <div className={cn(className, cssClass)} style={{ position: "relative" }}>
      <div style={viewportShellStyle}>
        {/* Embla viewport */}
        <div
          ref={emblaRef}
          style={{
            overflow: "hidden",
            // For vertical: set height on the viewport so Embla knows the
            // visible area. This was measured before this component mounted.
            ...(isVertical && viewportHeight != null
              ? { height: viewportHeight }
              : {}),
          }}
        >
          {/* Slide container */}
          <div
            style={{
              display: "flex",
              flexDirection: isVertical ? "column" : "row",
              // For vertical carousels, Embla measures the container rect for
              // view size. Keep container height fixed to the viewport height.
              ...(isVertical && viewportHeight != null
                ? { height: viewportHeight }
                : {}),
              touchAction: isVertical ? "pan-x pinch-zoom" : "pan-y pinch-zoom",
              ...(effectiveGap > 0
                ? isVertical
                  ? { marginTop: -effectiveGap }
                  : { marginLeft: -halfGap, marginRight: -halfGap }
                : {}),
              ...(effect === "fade" ? { position: "relative" as const } : {}),
            }}
          >
            {validChildren.map((child, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                style={{
                  flexShrink: 0,
                  flexGrow: 0,
                  ...(isVertical
                    ? { minHeight: 0, boxSizing: "content-box" as const }
                    : { minWidth: 0 }),
                  ...(slideBasis != null ? { flexBasis: slideBasis } : {}),
                  ...(effectiveGap > 0
                    ? isVertical
                      ? { paddingTop: effectiveGap }
                      : { paddingLeft: halfGap, paddingRight: halfGap }
                    : {}),
                  ...(dimInactive && slideOpacities[i] != null
                    ? {
                        opacity: slideOpacities[i],
                        transition: "opacity 300ms ease",
                      }
                    : {}),
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {controlsVisible && !controlsGutter && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!loop && !canScrollPrev}
              style={{
                ...controlButtonBaseStyle,
                position: "absolute",
                opacity: !loop && !canScrollPrev ? 0 : 1,
                ...prevControlPosition,
              }}
            >
              <PrevIcon style={{ width: 16, height: 16 }} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!loop && !canScrollNext}
              style={{
                ...controlButtonBaseStyle,
                position: "absolute",
                opacity: !loop && !canScrollNext ? 0 : 1,
                ...nextControlPosition,
              }}
            >
              <NextIcon style={{ width: 16, height: 16 }} />
            </button>
          </>
        )}

        {/* Pagination dots (vertical = side) */}
        {verticalDotsVisible && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {Array.from({ length: slideCount }, (_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 150ms",
                  background: "var(--foreground, #000)",
                  opacity: i === selectedIndex ? 1 : 0.2,
                }}
              />
            ))}
          </div>
        )}

        {verticalGutterVisible && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: sideGutterPadding,
            }}
          >
            {controlsVisible && (
              <button
                onClick={scrollPrev}
                disabled={!loop && !canScrollPrev}
                style={{
                  ...controlButtonBaseStyle,
                  opacity: !loop && !canScrollPrev ? 0 : 1,
                }}
              >
                <PrevIcon style={{ width: 16, height: 16 }} />
              </button>
            )}
            {dotsVisible &&
              Array.from({ length: slideCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 150ms",
                    background: "var(--foreground, #000)",
                    opacity: i === selectedIndex ? 1 : 0.2,
                  }}
                />
              ))}
            {controlsVisible && (
              <button
                onClick={scrollNext}
                disabled={!loop && !canScrollNext}
                style={{
                  ...controlButtonBaseStyle,
                  opacity: !loop && !canScrollNext ? 0 : 1,
                }}
              >
                <NextIcon style={{ width: 16, height: 16 }} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination dots (horizontal = below) */}
      {horizontalDotsVisible && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 12,
          }}
        >
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                transition: "opacity 150ms",
                background: "var(--foreground, #000)",
                opacity: i === selectedIndex ? 1 : 0.2,
              }}
            />
          ))}
        </div>
      )}

      {horizontalGutterVisible && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginTop: 12,
          }}
        >
          {controlsVisible && (
            <button
              onClick={scrollPrev}
              disabled={!loop && !canScrollPrev}
              style={{
                ...controlButtonBaseStyle,
                opacity: !loop && !canScrollPrev ? 0 : 1,
              }}
            >
              <PrevIcon style={{ width: 16, height: 16 }} />
            </button>
          )}
          {dotsVisible && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {Array.from({ length: slideCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 150ms",
                    background: "var(--foreground, #000)",
                    opacity: i === selectedIndex ? 1 : 0.2,
                  }}
                />
              ))}
            </div>
          )}
          {controlsVisible && (
            <button
              onClick={scrollNext}
              disabled={!loop && !canScrollNext}
              style={{
                ...controlButtonBaseStyle,
                opacity: !loop && !canScrollNext ? 0 : 1,
              }}
            >
              <NextIcon style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
