/**
 * Layout components: Row, Column, Grid, Div, Span.
 * These map Python layout primitives to Tailwind flex/grid divs.
 *
 * Layout kwargs (gap, columns, align, justify) are compiled to Tailwind
 * classes on the Python side and arrive via cssClass.
 */

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface LayoutProps {
  className?: string;
  cssClass?: string;
  children?: ReactNode;
}

export function Row({ className, cssClass, children }: LayoutProps) {
  return (
    <div className={cn("flex flex-row", className, cssClass)}>{children}</div>
  );
}

export function Column({ className, cssClass, children }: LayoutProps) {
  return (
    <div className={cn("flex flex-col", className, cssClass)}>{children}</div>
  );
}

export function Grid({ className, cssClass, children }: LayoutProps) {
  return <div className={cn("grid", className, cssClass)}>{children}</div>;
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
