export function resolveVisible(
  visible: number | null | undefined,
  continuous: boolean,
  effect: "slide" | "fade",
): number | null {
  // Fade mode is single-slide only.
  if (effect === "fade") return 1;
  if (visible !== undefined) return visible;
  return continuous ? null : 1;
}

export function resolveGap(
  gap: number,
  effect: "slide" | "fade",
  visibleCount: number | null,
): number {
  // Fade with a single visible slide should fill the viewport cleanly.
  // For multi-visible fade layouts, keep the user-defined gap.
  if (effect === "fade" && visibleCount === 1) return 0;
  return gap;
}

export function getVisibleGapCount(visibleCount: number | null): number {
  if (visibleCount == null || visibleCount <= 1) return 0;
  return Math.ceil(visibleCount) - 1;
}

export function resolveVerticalViewportHeight(
  slideHeight: number | undefined,
  visibleCount: number | null,
  gap: number,
): number | undefined {
  if (slideHeight == null) return undefined;
  if (visibleCount == null || visibleCount <= 0) return slideHeight;
  return slideHeight * visibleCount + getVisibleGapCount(visibleCount) * gap;
}

export function resolveVerticalSlideBasis(
  viewportHeight: number,
  visibleCount: number,
  gap: number,
): number {
  return (
    (viewportHeight - getVisibleGapCount(visibleCount) * gap) / visibleCount
  );
}

interface LoopDuplicationArgs {
  loop: boolean;
  continuous: boolean;
  visibleCount: number | null;
  childCount: number;
}

export function getLoopDuplicationRepeats({
  loop,
  continuous,
  visibleCount,
  childCount,
}: LoopDuplicationArgs): number {
  if (!loop || continuous || visibleCount == null || visibleCount <= 1)
    return 1;
  if (childCount <= 0) return 1;
  const minLoopSlides = Math.ceil(visibleCount) + 1;
  if (childCount >= minLoopSlides) return 1;
  return Math.ceil(minLoopSlides / childCount);
}
