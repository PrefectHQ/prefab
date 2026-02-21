import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SIZE_CLASSES = {
  sm: "size-4",
  default: "size-6",
  lg: "size-8",
} as const

type LoaderSize = keyof typeof SIZE_CLASSES
type LoaderVariant = "spin" | "dots" | "pulse"

interface LoaderProps {
  variant?: LoaderVariant
  size?: LoaderSize
  className?: string
}

/**
 * Bouncing dots — three circles with staggered SVG animations.
 * Uses native <animate> so it works without CSS keyframes.
 */
function DotsBounce({ size = "default", className }: { size?: LoaderSize; className?: string }) {
  const dotRadius = size === "sm" ? 2 : size === "lg" ? 4 : 3
  const viewHeight = 24
  const cy = viewHeight / 2
  const bounceTarget = cy - (size === "sm" ? 4 : size === "lg" ? 6 : 5)

  return (
    <svg
      viewBox={`0 0 24 ${viewHeight}`}
      className={cn("text-muted-foreground", SIZE_CLASSES[size], className)}
      role="status"
      aria-label="Loading"
    >
      {[4, 12, 20].map((cx, i) => (
        <circle key={cx} cx={cx} cy={cy} r={dotRadius} fill="currentColor">
          <animate
            attributeName="cy"
            values={`${cy};${bounceTarget};${cy};${cy}`}
            keyTimes="0;0.15;0.3;1"
            dur="2s"
            begin={`${i * 0.1}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.33 0 0.67 1; 0.33 0 0.67 1; 0 0 1 1"
          />
        </circle>
      ))}
    </svg>
  )
}

/**
 * Pulsing dot — a single circle that scales and fades in/out.
 */
function PulsingDot({ size = "default", className }: { size?: LoaderSize; className?: string }) {
  const dotRadius = size === "sm" ? 3 : size === "lg" ? 6 : 4

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-muted-foreground", SIZE_CLASSES[size], className)}
      role="status"
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r={dotRadius} fill="currentColor" opacity="0.3">
        <animate
          attributeName="r"
          values={`${dotRadius};${dotRadius + 4};${dotRadius}`}
          dur="1.2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.33 0 0.67 1; 0.33 0 0.67 1"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.08;0.3"
          dur="1.2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.33 0 0.67 1; 0.33 0 0.67 1"
        />
      </circle>
      <circle cx="12" cy="12" r={dotRadius} fill="currentColor" />
    </svg>
  )
}

function Loader({ variant = "spin", size = "default", className }: LoaderProps) {
  if (variant === "dots") {
    return <DotsBounce size={size} className={className} />
  }

  if (variant === "pulse") {
    return <PulsingDot size={size} className={className} />
  }

  // Default: spinning arc (Lucide Loader2 + CSS animate-spin)
  return (
    <Loader2
      className={cn("animate-spin text-muted-foreground", SIZE_CLASSES[size], className)}
      role="status"
      aria-label="Loading"
    />
  )
}

export { Loader }
export type { LoaderProps }
