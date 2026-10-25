import { cn } from "@/lib/utils";
import {
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";

interface ImageProps extends AccessibleNameProps {
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
  ...accessibleName
}: ImageProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <img
      {...getAccessibleNameProps(accessibleName)}
      src={src}
      alt={alt}
      style={Object.keys(style).length > 0 ? style : undefined}
      className={cn(className, cssClass)}
    />
  );
}
