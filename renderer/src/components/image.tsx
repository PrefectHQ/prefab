import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  cssClass?: string;
}

export function Image({
  src,
  alt = "",
  width,
  height,
  className,
  cssClass,
}: ImageProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <img
      src={src}
      alt={alt}
      style={Object.keys(style).length > 0 ? style : undefined}
      className={cn(className, cssClass)}
    />
  );
}
