import { cn } from "@/lib/utils";

// ── Video ───────────────────────────────────────────────────────────────

interface VideoProps {
  src: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string;
  height?: string;
  className?: string;
  cssClass?: string;
}

export function Video({
  src,
  poster,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  width,
  height,
  className,
  cssClass,
}: VideoProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      style={Object.keys(style).length > 0 ? style : undefined}
      className={cn(className, cssClass)}
    />
  );
}

// ── Audio ───────────────────────────────────────────────────────────────

interface AudioProps {
  src: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  cssClass?: string;
}

export function Audio({
  src,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  className,
  cssClass,
}: AudioProps) {
  return (
    <audio
      src={src}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      className={cn(className, cssClass)}
    />
  );
}
