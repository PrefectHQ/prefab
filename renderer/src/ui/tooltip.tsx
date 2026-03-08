import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Pure-CSS tooltip that avoids Radix's Portal/ref composition issues
 * in production builds within sandboxed iframes.
 *
 * Uses CSS group-hover for zero-JS tooltip display. The tooltip content
 * is positioned absolutely relative to the trigger wrapper.
 */

interface SimpleTooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

const sideStyles: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
}

function SimpleTooltip({
  content,
  side = "top",
  delay = 700,
  className,
  children,
}: SimpleTooltipProps) {
  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "cn-tooltip-content",
          "pointer-events-none absolute z-50",
          "opacity-0 group-hover/tooltip:opacity-100",
          "transition-opacity duration-150",
          "whitespace-nowrap",
          sideStyles[side] || sideStyles.top
        )}
        style={{
          "--tooltip-delay": `${delay}ms`,
        } as React.CSSProperties}
      >
        {content}
      </span>
    </span>
  )
}
SimpleTooltip.displayName = "SimpleTooltip"

export { SimpleTooltip }
