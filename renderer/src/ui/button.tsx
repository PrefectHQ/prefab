import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "pf-button group/button",
  {
    variants: {
      variant: {
        default: "pf-button-variant-default",
        outline: "pf-button-variant-outline",
        secondary: "pf-button-variant-secondary",
        ghost: "pf-button-variant-ghost",
        destructive: "pf-button-variant-destructive",
        link: "pf-button-variant-link",
        success: "pf-button-variant-success",
        warning: "pf-button-variant-warning",
        info: "pf-button-variant-info",
      },
      size: {
        default: "pf-button-size-default",
        xs: "pf-button-size-xs",
        sm: "pf-button-size-sm",
        lg: "pf-button-size-lg",
        icon: "pf-button-size-icon",
        "icon-xs": "pf-button-size-icon-xs",
        "icon-sm": "pf-button-size-icon-sm",
        "icon-lg": "pf-button-size-icon-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
