/**
 * Layout components: Row, Column, Grid, Div, Span.
 * These map Python layout primitives to Tailwind flex/grid divs.
 */

import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface LayoutProps {
  gap?: number | [number | null, number | null];
  className?: string;
  cssClass?: string;
  children?: ReactNode;
}

/** Convert a Tailwind-scale gap number to a CSS gap style. */
function gapStyle(gap: number | [number | null, number | null]): CSSProperties {
  if (typeof gap === "number") return { gap: `${gap * 0.25}rem` };
  const [x, y] = gap;
  const style: CSSProperties = {};
  if (x != null) style.columnGap = `${x * 0.25}rem`;
  if (y != null) style.rowGap = `${y * 0.25}rem`;
  return style;
}

/** Convert a column count to a CSS grid-template-columns style. */
function colsStyle(columns: number): CSSProperties {
  return { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` };
}

export function Row({ gap, className, cssClass, children }: LayoutProps) {
  return (
    <div
      className={cn("flex flex-row", className, cssClass)}
      style={gap != null ? gapStyle(gap) : undefined}
    >
      {children}
    </div>
  );
}

export function Column({ gap, className, cssClass, children }: LayoutProps) {
  return (
    <div
      className={cn("flex flex-col", className, cssClass)}
      style={gap != null ? gapStyle(gap) : undefined}
    >
      {children}
    </div>
  );
}

interface GridProps extends LayoutProps {
  columns?: number;
}

export function Grid({
  columns,
  gap,
  className,
  cssClass,
  children,
}: GridProps) {
  const style: CSSProperties = {
    ...(gap != null ? gapStyle(gap) : undefined),
    ...(columns ? colsStyle(columns) : undefined),
  };
  return (
    <div
      className={cn("grid", className, cssClass)}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </div>
  );
}

interface DivProps {
  className?: string;
  cssClass?: string;
  children?: ReactNode;
}

export function Div({ className, cssClass, children }: DivProps) {
  return <div className={cn(className, cssClass)}>{children}</div>;
}

interface SpanProps extends DivProps {
  content?: string;
  text?: string;
}

export function Span({
  className,
  cssClass,
  children,
  content,
  text,
}: SpanProps) {
  return (
    <span className={cn(className, cssClass)}>
      {children ?? content ?? text}
    </span>
  );
}
