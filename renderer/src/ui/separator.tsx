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
        "cn-separator",
        orientation === "horizontal" ? "cn-separator-horizontal" : "cn-separator-vertical",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
