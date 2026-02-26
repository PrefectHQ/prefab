import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderRangeVariants = cva(
  "cn-slider-range absolute select-none data-horizontal:h-full data-vertical:w-full",
  {
    variants: {
      variant: {
        default: "cn-slider-variant-default",
        success: "cn-slider-variant-success",
        warning: "cn-slider-variant-warning",
        destructive: "cn-slider-variant-destructive",
        info: "cn-slider-variant-info",
        muted: "cn-slider-variant-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step,
  variant,
  indicatorClassName,
  handleStyle,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderRangeVariants> & {
    indicatorClassName?: string;
    handleStyle?: "circle" | "bar";
  }) {
  const resolvedStep = step ?? (max - min) / 100
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={resolvedStep}
      className={cn(
        "cn-slider relative flex w-full cursor-pointer touch-none items-center select-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="cn-slider-track bg-muted relative grow overflow-hidden data-horizontal:w-full data-vertical:h-full"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(sliderRangeVariants({ variant }), indicatorClassName)}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "cn-slider-thumb block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50",
            handleStyle === "bar" && "cn-slider-thumb-bar"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider, sliderRangeVariants }
