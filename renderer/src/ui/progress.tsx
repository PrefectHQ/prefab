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
  variant,
  value,
  orientation = "horizontal",
  ...props
}: ProgressPrimitive.Root.Props &
  VariantProps<typeof progressVariants> & {
    indicatorClassName?: string;
    orientation?: "horizontal" | "vertical";
  }) {
  const isVertical = orientation === "vertical";

  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn(
        "cn-progress relative overflow-hidden rounded-full",
        isVertical
          ? "cn-progress-vertical flex flex-col-reverse"
          : "w-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Track className="cn-progress relative flex w-full items-center overflow-hidden rounded-full">
        <ProgressPrimitive.Indicator
          className={cn(progressVariants({ variant }), indicatorClassName)}
          style={
            isVertical
              ? { transform: `translateY(${100 - (value || 0)}%)` }
              : { transform: `translateX(-${100 - (value || 0)}%)` }
          }
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress, progressVariants }
