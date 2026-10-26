import { cn } from "@/lib/utils";
import {
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";

interface EmbedProps extends AccessibleNameProps {
  url?: string;
  html?: string;
  width?: string;
  height?: string;
  sandbox?: string;
  allow?: string;
  className?: string;
  cssClass?: string;
}

export function Embed({
  url,
  html,
  width,
  height,
  sandbox,
  allow,
  className,
  cssClass,
  ...accessibleName
}: EmbedProps) {
  const style: React.CSSProperties = { border: "none" };
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <iframe
      {...getAccessibleNameProps(accessibleName)}
      src={url}
      srcDoc={html}
      sandbox={sandbox}
      allow={allow}
      style={style}
      className={cn(className, cssClass)}
    />
  );
}
