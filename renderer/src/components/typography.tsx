/**
 * Typography components.
 * Maps Python Text/Heading/etc. to styled HTML elements.
 */

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TypographyProps {
  className?: string;
  cssClass?: string;
  bold?: boolean;
  italic?: boolean;
  children?: ReactNode;
}

interface TextProps extends TypographyProps {
  text?: string;
  content?: string;
}

/** Generic text — renders a span with the text content. */
export function Text({ text, content, className, cssClass, bold, italic, children }: TextProps) {
  return <span className={cn(bold && "font-bold", italic && "italic", className, cssClass)}>{children ?? text ?? content}</span>;
}

interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4;
  text?: string;
  content?: string;
}

const headingStyles: Record<number, string> = {
  1: "text-3xl font-semibold tracking-tight m-0",
  2: "text-2xl font-semibold tracking-tight m-0",
  3: "text-xl font-semibold tracking-tight m-0",
  4: "text-lg font-semibold tracking-tight m-0",
};

export function Heading({ level = 1, text, content, className, cssClass, bold, italic, children }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag className={cn(headingStyles[level], bold && "font-bold", italic && "italic", className, cssClass)}>
      {children ?? text ?? content}
    </Tag>
  );
}

export function H1(props: Omit<HeadingProps, "level">) {
  return <Heading level={1} {...props} />;
}
export function H2(props: Omit<HeadingProps, "level">) {
  return <Heading level={2} {...props} />;
}
export function H3(props: Omit<HeadingProps, "level">) {
  return <Heading level={3} {...props} />;
}
export function H4(props: Omit<HeadingProps, "level">) {
  return <Heading level={4} {...props} />;
}

export function P({ className, cssClass, bold, italic, children, ...props }: TextProps) {
  return (
    <p className={cn("leading-7 m-0", bold && "font-bold", italic && "italic", className, cssClass)}>
      {children ?? props.text ?? props.content}
    </p>
  );
}

export function Lead({ className, cssClass, bold, italic, children, ...props }: TextProps) {
  return (
    <p className={cn("text-xl text-muted-foreground m-0", bold && "font-bold", italic && "italic", className, cssClass)}>
      {children ?? props.text ?? props.content}
    </p>
  );
}

export function Large({ className, cssClass, bold, italic, children, ...props }: TextProps) {
  return (
    <div className={cn("text-lg font-semibold", bold && "font-bold", italic && "italic", className, cssClass)}>
      {children ?? props.text ?? props.content}
    </div>
  );
}

export function Small({ className, cssClass, bold, italic, children, ...props }: TextProps) {
  return (
    <small className={cn("text-sm font-medium leading-none", bold && "font-bold", italic && "italic", className, cssClass)}>
      {children ?? props.text ?? props.content}
    </small>
  );
}

export function Muted({ className, cssClass, bold, italic, children, ...props }: TextProps) {
  return (
    <p className={cn("text-sm text-muted-foreground m-0", bold && "font-bold", italic && "italic", className, cssClass)}>
      {children ?? props.text ?? props.content}
    </p>
  );
}

export function InlineCode({ className, cssClass, bold, italic, children, ...props }: TextProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        bold && "font-bold",
        italic && "italic",
        className,
        cssClass,
      )}
    >
      {children ?? props.text ?? props.content}
    </code>
  );
}

export function BlockQuote({ className, cssClass, bold, italic, children, ...props }: TextProps) {
  return (
    <blockquote className={cn("border-l-2 pl-6 italic m-0", bold && "font-bold", italic && "italic", className, cssClass)}>
      {children ?? props.text ?? props.content}
    </blockquote>
  );
}
