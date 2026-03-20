import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "pf-separator",
        orientation === "horizontal" ? "pf-separator-horizontal" : "pf-separator-vertical",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
