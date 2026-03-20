import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"
import { usePortalContainer } from "../portal-container"

interface TooltipProps {
  content: string
  side?: "top" | "right" | "bottom" | "left"
  delay?: number
  className?: string
  children?: React.ReactNode
}

function SimpleTooltip({
  content,
  side = "top",
  delay = 700,
  className,
  children,
}: TooltipProps) {
  const container = usePortalContainer()

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger
        delay={delay}
        className={cn("inline-flex", className)}
        render={<span />}
      >
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal container={container}>
        <TooltipPrimitive.Positioner side={side} sideOffset={6}>
          <TooltipPrimitive.Popup className="pf-tooltip-content">
            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
SimpleTooltip.displayName = "SimpleTooltip"

export { SimpleTooltip }
