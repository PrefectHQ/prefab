import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderRangeVariants = cva(
  "pf-slider-range select-none data-horizontal:h-full data-vertical:w-full",
  {
    variants: {
      variant: {
        default: "pf-slider-variant-default",
        success: "pf-slider-variant-success",
        warning: "pf-slider-variant-warning",
        destructive: "pf-slider-variant-destructive",
        info: "pf-slider-variant-info",
        muted: "pf-slider-variant-muted",
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
  size = "default",
  indicatorClassName,
  handleStyle,
  handleClassName,
  ...props
}: SliderPrimitive.Root.Props &
  VariantProps<typeof sliderRangeVariants> & {
    indicatorClassName?: string;
    size?: "sm" | "default" | "lg";
    handleStyle?: "circle" | "bar";
    handleClassName?: string;
  }) {
  const resolvedStep = step ?? (max - min) / 100
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : value !== undefined
          ? [value]
          : Array.isArray(defaultValue)
            ? defaultValue
            : defaultValue !== undefined
              ? [defaultValue]
              : [min],
    [value, defaultValue, min]
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
        "data-horizontal:w-full data-vertical:h-full",
        className
      )}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className={cn("pf-slider relative flex w-full cursor-pointer touch-none items-center select-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col", `pf-slider-size-${size}`)}>
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="pf-slider-track bg-muted relative grow overflow-hidden data-horizontal:w-full data-vertical:h-full"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={cn(sliderRangeVariants({ variant }), indicatorClassName)}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(
              "pf-slider-thumb block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50",
              handleStyle === "bar" && "pf-slider-thumb-bar",
              `pf-slider-thumb-variant-${variant ?? "default"}`,
              handleClassName,
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider, sliderRangeVariants }
