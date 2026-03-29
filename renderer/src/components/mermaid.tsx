/**
 * Mermaid diagram renderer — lazy-loads the mermaid library on first use.
 *
 * Renders a Mermaid diagram definition string as an SVG. Falls back to
 * showing the raw diagram source in a <pre> block if rendering fails.
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MermaidProps {
  chart: string;
  className?: string;
  cssClass?: string;
}

let mermaidInstance: typeof import("mermaid").default | null = null;
let mermaidLoading: Promise<typeof import("mermaid").default> | null = null;
let renderCounter = 0;

function loadMermaid() {
  if (!mermaidLoading) {
    mermaidLoading = import("mermaid").then((m) => {
      mermaidInstance = m.default;
      mermaidInstance.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "strict",
      });
      return mermaidInstance;
    });
  }
  return mermaidLoading;
}

export function Mermaid({ chart, className, cssClass }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !chart.trim()) return;

    const el = containerRef.current;
    let cancelled = false;

    loadMermaid().then(async (mermaid) => {
      if (cancelled) return;
      try {
        const id = `mermaid-${++renderCounter}`;
        const { svg } = await mermaid.render(id, chart.trim());
        if (!cancelled) {
          el.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(String(err));
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre
        className={cn(
          "pf-text-sm pf-text-muted-foreground",
          className,
          cssClass,
        )}
      >
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("pf-flex pf-justify-center", className, cssClass)}
    />
  );
}
