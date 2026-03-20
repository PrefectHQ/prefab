import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva("pf-alert w-full relative group/alert", {
  variants: {
    variant: {
      default: "pf-alert-variant-default",
      destructive: "pf-alert-variant-destructive",
      success: "pf-alert-variant-success",
      warning: "pf-alert-variant-warning",
      info: "pf-alert-variant-info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("pf-alert-title", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("pf-alert-description", className)}
      {...props}
    />
  )
}

export type AlertVariant = NonNullable<
  VariantProps<typeof alertVariants>["variant"]
>

export { Alert, AlertTitle, AlertDescription }
