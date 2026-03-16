import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dotVariants = cva("cn-dot inline-block shrink-0", {
  variants: {
    variant: {
      default: "cn-dot-variant-default",
      secondary: "cn-dot-variant-secondary",
      success: "cn-dot-variant-success",
      warning: "cn-dot-variant-warning",
      destructive: "cn-dot-variant-destructive",
      info: "cn-dot-variant-info",
      muted: "cn-dot-variant-muted",
    },
    size: {
      sm: "cn-dot-sm",
      default: "cn-dot-default",
      lg: "cn-dot-lg",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "cn-dot-rounded",
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
