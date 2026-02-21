import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SIZE_CLASSES = {
  sm: "size-4",
  default: "size-6",
  lg: "size-8",
} as const

type LoaderSize = keyof typeof SIZE_CLASSES
type LoaderVariant = "spin" | "dots" | "pulse" | "bars" | "ios"

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

/**
 * Oscillating bars — three vertical bars that animate height in sequence.
 */
function OscillatingBars({ size = "default", className }: { size?: LoaderSize; className?: string }) {
  const barWidth = size === "sm" ? 2.5 : size === "lg" ? 4 : 3
  const gap = size === "sm" ? 2 : size === "lg" ? 3.5 : 2.5
  const totalWidth = barWidth * 3 + gap * 2
  const startX = (24 - totalWidth) / 2
  const minH = 4
  const maxH = 16

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-muted-foreground", SIZE_CLASSES[size], className)}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => {
        const x = startX + i * (barWidth + gap)
        return (
          <rect
            key={i}
            x={x}
            width={barWidth}
            rx={barWidth / 2}
            fill="currentColor"
          >
            <animate
              attributeName="height"
              values={`${minH};${maxH};${minH}`}
              dur="1s"
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.33 0 0.67 1; 0.33 0 0.67 1"
            />
            <animate
              attributeName="y"
              values={`${(24 - minH) / 2};${(24 - maxH) / 2};${(24 - minH) / 2}`}
              dur="1s"
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.33 0 0.67 1; 0.33 0 0.67 1"
            />
          </rect>
        )
      })}
    </svg>
  )
}

/**
 * iOS-style spinner — segmented circle with chasing opacity.
 */
function IosSpinner({ size = "default", className }: { size?: LoaderSize; className?: string }) {
  const segments = 8
  const innerR = 5
  const outerR = 10
  const strokeW = size === "sm" ? 1.5 : size === "lg" ? 2.5 : 2

  const lines = Array.from({ length: segments }, (_, i) => {
    const angle = ((i * 360) / segments - 90) * (Math.PI / 180)
    return {
      x1: 12 + Math.cos(angle) * innerR,
      y1: 12 + Math.sin(angle) * innerR,
      x2: 12 + Math.cos(angle) * outerR,
      y2: 12 + Math.sin(angle) * outerR,
      opacity: 1 - (i / segments) * 0.75,
    }
  })

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-muted-foreground", SIZE_CLASSES[size], className)}
      style={{ animation: `spin 0.8s steps(${segments}, end) infinite` }}
      role="status"
      aria-label="Loading"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeWidth={strokeW}
          strokeLinecap="round"
          opacity={l.opacity}
        />
      ))}
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

  if (variant === "bars") {
    return <OscillatingBars size={size} className={className} />
  }

  if (variant === "ios") {
    return <IosSpinner size={size} className={className} />
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
