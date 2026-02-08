import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SIZE_CLASSES = {
  sm: "size-4",
  default: "size-6",
  lg: "size-8",
} as const

interface SpinnerProps {
  size?: keyof typeof SIZE_CLASSES
  className?: string
}

function Spinner({ size = "default", className }: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-muted-foreground", SIZE_CLASSES[size], className)}
    />
  )
}

export { Spinner }
