/**
 * Layout components: Row, Column, Grid, Div, Span.
 * These map Python layout primitives to Tailwind flex/grid divs.
 *
 * Layout kwargs (gap, columns, align, justify) are compiled to Tailwind
 * classes on the Python side and arrive via cssClass.
 */

import { cn } from "@/lib/utils";
import type { FormEvent, ReactNode } from "react";

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
    <div className={cn("flex w-full min-w-0 flex-col", className, cssClass)}>
      {children}
    </div>
  );
}

interface GridProps extends LayoutProps {
  minColumnWidth?: string;
  columnTemplate?: string;
}

export function Grid({
  className,
  cssClass,
  children,
  minColumnWidth,
  columnTemplate,
}: GridProps) {
  const style = columnTemplate
    ? { gridTemplateColumns: columnTemplate }
    : minColumnWidth
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
        }
      : undefined;
  return (
    <div className={cn("grid w-full", className, cssClass)} style={style}>
      {children}
    </div>
  );
}

interface FormProps extends LayoutProps {
  onSubmit?: (e: FormEvent) => void;
}

export function PrefabForm({
  className,
  cssClass,
  children,
  onSubmit,
}: FormProps) {
  return (
    <form
      className={cn("flex w-full flex-col", className, cssClass)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      {children}
    </form>
  );
}

export function Container({ className, cssClass, children }: LayoutProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        className,
        cssClass,
      )}
    >
      {children}
    </div>
  );
}

interface DivProps {
  className?: string;
  cssClass?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export function Div({ className, cssClass, style, children }: DivProps) {
  return (
    <div className={cn(className, cssClass)} style={style}>
      {children}
    </div>
  );
}

interface SpanProps extends DivProps {
  content?: string;
  text?: string;
}

export function Span({
  className,
  cssClass,
  style,
  children,
  content,
  text,
}: SpanProps) {
  return (
    <span className={cn(className, cssClass)} style={style}>
      {children ?? content ?? text}
    </span>
  );
}
