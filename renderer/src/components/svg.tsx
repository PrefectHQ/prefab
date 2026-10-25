import {
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";

interface SvgProps extends AccessibleNameProps {
  content: string;
  width?: string;
  height?: string;
  className?: string;
  cssClass?: string;
}

export function Svg({
  content,
  width,
  height,
  className,
  cssClass,
  ...accessibleName
}: SvgProps) {
  const clean = useMemo(
    () =>
      DOMPurify.sanitize(content, {
        USE_PROFILES: { svg: true, svgFilters: true },
      }),
    [content],
  );

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      {...getAccessibleNameProps(accessibleName)}
      style={Object.keys(style).length > 0 ? style : undefined}
      className={cn(className, cssClass)}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
