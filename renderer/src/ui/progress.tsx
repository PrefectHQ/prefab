import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "cn-progress-indicator h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "cn-progress-variant-default",
        success: "cn-progress-variant-success",
        warning: "cn-progress-variant-warning",
        destructive: "cn-progress-variant-destructive",
        info: "cn-progress-variant-info",
        muted: "cn-progress-variant-muted",
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
  value,
  orientation = "horizontal",
  ...props
}: ProgressPrimitive.Root.Props &
  VariantProps<typeof progressVariants> & {
    indicatorClassName?: string;
    target?: number;
    targetClassName?: string;
    orientation?: "horizontal" | "vertical";
  }) {
  const isVertical = orientation === "vertical";
  const clampedTarget =
    target != null ? Math.max(0, Math.min(100, target)) : undefined;

  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn(
        "cn-progress relative overflow-visible rounded-full",
        isVertical
          ? "cn-progress-vertical flex flex-col-reverse"
          : "w-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Track
        className={cn(
          "cn-progress relative flex items-center overflow-hidden rounded-full",
          isVertical ? "h-full w-full" : "w-full",
        )}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressVariants({ variant }), indicatorClassName)}
          style={
            isVertical
              ? { transform: `translateY(${100 - (value || 0)}%)` }
              : { transform: `translateX(-${100 - (value || 0)}%)` }
          }
        />
      </ProgressPrimitive.Track>
      {clampedTarget != null && (
        <span
          className={cn("cn-progress-target", targetClassName)}
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
