import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dotVariants = cva("pf-dot inline-block shrink-0", {
  variants: {
    variant: {
      default: "pf-dot-variant-default",
      secondary: "pf-dot-variant-secondary",
      success: "pf-dot-variant-success",
      warning: "pf-dot-variant-warning",
      destructive: "pf-dot-variant-destructive",
      info: "pf-dot-variant-info",
      muted: "pf-dot-variant-muted",
    },
    size: {
      sm: "pf-dot-sm",
      default: "pf-dot-default",
      lg: "pf-dot-lg",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "pf-dot-rounded",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    shape: "circle",
  },
})

function Dot({
  className,
  variant,
  size,
  shape,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof dotVariants>) {
  return (
    <span
      className={cn(dotVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
}

export { Dot, dotVariants }
