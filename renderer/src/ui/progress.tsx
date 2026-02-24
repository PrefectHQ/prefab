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
    }
>(({ className, indicatorClassName, variant, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "cn-progress relative w-full overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariants({ variant }), indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress, progressVariants }
