/**
 * Content components: Code, Image, Markdown.
 */

import { useMemo } from "react";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

hljs.registerLanguage("python", python);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);

/** Highlight code, returning HTML string. */
function highlightCode(source: string, language?: string): string {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(source, { language }).value;
  }
  return hljs.highlightAuto(source).value;
}

interface CodeProps {
  code?: string;
  content?: string;
  language?: string;
  className?: string;
  cssClass?: string;
}

/** Code block — renders preformatted code with syntax highlighting. */
export function Code({
  code,
  content,
  language,
  className,
  cssClass,
}: CodeProps) {
  const source = code ?? content ?? "";
  const highlighted = useMemo(
    () => highlightCode(source, language),
    [source, language],
  );

  return (
    <pre
      className={cn(
        "rounded-md bg-muted p-4 text-sm overflow-x-auto font-mono",
        className,
        cssClass,
      )}
    >
      <code
        className={language ? `language-${language}` : undefined}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
}

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

interface MarkdownProps {
  content?: string;
  text?: string;
  className?: string;
  cssClass?: string;
}

/** Markdown — renders markdown via react-markdown with GFM support. */
export function Markdown({
  content,
  text,
  className,
  cssClass,
}: MarkdownProps) {
  const src = content ?? text ?? "";
  return (
    <div className={cn("max-w-none", className, cssClass)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
          ),
          code: ({ children, className: codeClassName }) => {
            if (codeClassName) {
              const lang = codeClassName.replace("language-", "");
              const source = String(children).replace(/\n$/, "");
              const html = highlightCode(source, lang);
              return (
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto my-4 font-mono">
                  <code dangerouslySetInnerHTML={{ __html: html }} />
                </pre>
              );
            }
            return (
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {children}
            </td>
          ),
          hr: () => <hr className="my-6" />,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {src}
      </ReactMarkdown>
    </div>
  );
}
