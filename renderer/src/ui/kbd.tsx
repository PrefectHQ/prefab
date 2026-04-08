import { cn } from "@/lib/utils";

function Kbd({
  label,
  className,
  cssClass,
}: {
  label?: string;
  className?: string;
  cssClass?: string;
}) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pf-kbd pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className,
        cssClass,
      )}
    >
      {label}
    </kbd>
  );
}

export { Kbd };
