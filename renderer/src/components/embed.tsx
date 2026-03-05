import { cn } from "@/lib/utils";

interface EmbedProps {
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
}: EmbedProps) {
  const style: React.CSSProperties = { border: "none" };
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <iframe
      src={url}
      srcDoc={html}
      sandbox={sandbox}
      allow={allow}
      style={style}
      className={cn(className, cssClass)}
    />
  );
}
