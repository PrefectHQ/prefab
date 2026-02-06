import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva("cn-alert w-full relative group/alert", {
  variants: {
    variant: {
      default: "cn-alert-variant-default",
      destructive: "cn-alert-variant-destructive",
      success: "cn-alert-variant-success",
      warning: "cn-alert-variant-warning",
      info: "cn-alert-variant-info",
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
      className={cn("cn-alert-title", className)}
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
      className={cn("cn-alert-description", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
