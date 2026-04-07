import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "pf-progress-indicator h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "pf-progress-variant-default",
        success: "pf-progress-variant-success",
        warning: "pf-progress-variant-warning",
        destructive: "pf-progress-variant-destructive",
        info: "pf-progress-variant-info",
        muted: "pf-progress-variant-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Progress({
  className,
  indicatorClassName,
  target,
  targetClassName,
  variant,
  size = "default",
  value,
  orientation = "horizontal",
  ...props
}: ProgressPrimitive.Root.Props &
  VariantProps<typeof progressVariants> & {
    indicatorClassName?: string;
    target?: number;
    targetClassName?: string;
    size?: "sm" | "default" | "lg";
    orientation?: "horizontal" | "vertical";
  }) {
  const isVertical = orientation === "vertical";
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  const clampedTarget =
    target != null ? Math.max(0, Math.min(100, target)) : undefined;
  const sizeClass = `pf-progress-size-${size}`;

  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn(
        "pf-progress relative overflow-visible rounded-full",
        sizeClass,
        isVertical
          ? "pf-progress-vertical flex flex-col-reverse"
          : "w-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Track
        className={cn(
          "pf-progress relative flex items-center overflow-hidden rounded-full",
          sizeClass,
          isVertical ? "h-full w-full" : "w-full",
        )}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressVariants({ variant }), indicatorClassName)}
          style={
            isVertical
              ? { transform: `translateY(${100 - clamped}%)` }
              : { transform: `translateX(-${100 - clamped}%)` }
          }
        />
      </ProgressPrimitive.Track>
      {clampedTarget != null && (
        <span
          className={cn("pf-progress-target", targetClassName)}
          style={
            isVertical
              ? { bottom: `${clampedTarget}%` }
              : { left: `${clampedTarget}%` }
          }
        />
      )}
    </ProgressPrimitive.Root>
  );
}

export { Progress, progressVariants }
