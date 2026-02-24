import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
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

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    VariantProps<typeof progressVariants> & {
      indicatorClassName?: string;
      orientation?: "horizontal" | "vertical";
    }
>(({ className, indicatorClassName, variant, value, orientation = "horizontal", ...props }, ref) => {
  const isVertical = orientation === "vertical";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "cn-progress relative overflow-hidden rounded-full",
        isVertical
          ? "cn-progress-vertical flex flex-col-reverse"
          : "w-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(progressVariants({ variant }), indicatorClassName)}
        style={
          isVertical
            ? { transform: `translateY(${100 - (value || 0)}%)` }
            : { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress, progressVariants }
