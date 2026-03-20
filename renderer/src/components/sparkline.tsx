/**
 * Sparkline component — lightweight inline SVG charts.
 */

import { cn } from "@/lib/utils";
import type { SparklineWire } from "@/schemas/chart";

const SPARKLINE_VARIANT_CLASS: Record<string, string> = {
  default: "pf-sparkline-variant-default",
  success: "pf-sparkline-variant-success",
  warning: "pf-sparkline-variant-warning",
  destructive: "pf-sparkline-variant-destructive",
  info: "pf-sparkline-variant-info",
  muted: "pf-sparkline-variant-muted",
};

function sparkPoints(
  data: number[],
  w: number,
  h: number,
  strokeWidth: number,
): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth / 2;
  // Reserve 30% of height so the minimum value still has visible fill beneath it
  const usableH = h * 0.7 - pad;
  const topPad = pad;
  return data
    .map((v, i) => {
      const x = data.length === 1 ? w / 2 : (i / (data.length - 1)) * w;
      const y = topPad + usableH * (1 - (v - min) / range);
      return `${x},${y}`;
    })
    .join(" ");
}

function stepPoints(
  data: number[],
  w: number,
  h: number,
  strokeWidth: number,
): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth / 2;
  const usableH = h * 0.7 - pad;
  const topPad = pad;
  const pts: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const x = data.length === 1 ? w / 2 : (i / (data.length - 1)) * w;
    const y = topPad + usableH * (1 - (data[i] - min) / range);
    if (i > 0) {
      const prevY = topPad + usableH * (1 - (data[i - 1] - min) / range);
      pts.push(`${x},${prevY}`);
    }
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

// Returns an SVG path `d` string using catmull-rom spline interpolation
// (converted to cubic bezier commands). Tension ~0.5 via the 1/6 factor.
function smoothPath(
  data: number[],
  w: number,
  h: number,
  strokeWidth: number,
): string {
  if (data.length < 2) {
    const x = w / 2;
    const min = data[0];
    const max = data[0];
    const range = max - min || 1;
    const pad = strokeWidth / 2;
    const usableH = h * 0.7 - pad;
    const topPad = pad;
    const y = topPad + usableH * (1 - (data[0] - min) / range);
    return `M ${x},${y}`;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth / 2;
  const usableH = h * 0.7 - pad;
  const topPad = pad;

  const xs = data.map((_, i) => (i / (data.length - 1)) * w);
  const ys = data.map((v) => topPad + usableH * (1 - (v - min) / range));

  let d = `M ${xs[0]},${ys[0]}`;
  for (let i = 0; i < data.length - 1; i++) {
    // Catmull-rom uses four surrounding points; clamp at boundaries
    const p0x = xs[Math.max(0, i - 1)];
    const p0y = ys[Math.max(0, i - 1)];
    const p1x = xs[i];
    const p1y = ys[i];
    const p2x = xs[i + 1];
    const p2y = ys[i + 1];
    const p3x = xs[Math.min(data.length - 1, i + 2)];
    const p3y = ys[Math.min(data.length - 1, i + 2)];

    // Control points: CP1 = P1 + (P2 - P0) / 6, CP2 = P2 - (P3 - P1) / 6
    const cp1x = p1x + (p2x - p0x) / 6;
    const cp1y = p1y + (p2y - p0y) / 6;
    const cp2x = p2x - (p3x - p1x) / 6;
    const cp2y = p2y - (p3y - p1y) / 6;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2x},${p2y}`;
  }
  return d;
}

// Unique ID counter for gradient defs
let sparkId = 0;

export function PrefabSparkline({
  data = [],
  height,
  variant = "default",
  indicatorClass,
  fill = false,
  curve = "linear",
  strokeWidth = 1.5,
  mode = "line",
  className,
  cssClass,
}: SparklineWire & { className?: string }) {
  if (typeof data === "string" || data.length === 0) return null;

  const variantClass =
    SPARKLINE_VARIANT_CLASS[variant ?? "default"] ??
    SPARKLINE_VARIANT_CLASS.default;

  // Stable gradient ID per instance
  const gradientId = `spark-${++sparkId}`;

  // Use a fixed viewBox — the SVG scales to fill its container via CSS
  const vw = 100;
  const vh = 40;

  if (mode === "bar") {
    const min = Math.min(0, ...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const gap = 1;
    const barW = (vw - gap * (data.length - 1)) / data.length;
    return (
      <svg
        className={cn(
          "pf-sparkline w-full",
          height == null && "h-6",
          variantClass,
          className,
          cssClass,
        )}
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="none"
        style={height != null ? { height } : undefined}
      >
        {data.map((v, i) => {
          const barH = ((v - min) / range) * (vh - 1);
          return (
            <rect
              key={i}
              x={i * (barW + gap)}
              y={vh - barH}
              width={barW}
              height={barH}
              fill="currentColor"
              opacity={0.7}
              rx={0.5}
              className={indicatorClass}
            />
          );
        })}
      </svg>
    );
  }

  // Line / area mode
  const useSmooth = curve === "smooth";
  const useStep = curve === "step";

  // For smooth curve we work with SVG path `d` strings; for others, polyline points
  const smoothD = useSmooth ? smoothPath(data, vw, vh, strokeWidth) : "";
  const pts = useSmooth
    ? ""
    : useStep
      ? stepPoints(data, vw, vh, strokeWidth)
      : sparkPoints(data, vw, vh, strokeWidth);

  // Fill area: smooth uses a closed path, others use a polygon
  const smoothFillD = useSmooth ? `${smoothD} L ${vw},${vh} L 0,${vh} Z` : "";
  const fillPts = fill && !useSmooth ? `${pts} ${vw},${vh} 0,${vh}` : "";

  const sharedStrokeProps = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
    className: cn("pf-sparkline-line", indicatorClass),
  };

  return (
    <svg
      className={cn("pf-sparkline w-full", variantClass, className, cssClass)}
      viewBox={`0 0 ${vw} ${vh}`}
      preserveAspectRatio="none"
      style={{ height }}
    >
      {fill && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className="pf-sparkline-fill-stop-start" />
              <stop offset="100%" className="pf-sparkline-fill-stop-end" />
            </linearGradient>
          </defs>
          {useSmooth ? (
            <path d={smoothFillD} fill={`url(#${gradientId})`} stroke="none" />
          ) : (
            <polygon points={fillPts} fill={`url(#${gradientId})`} />
          )}
        </>
      )}
      {useSmooth ? (
        <path d={smoothD} {...sharedStrokeProps} />
      ) : (
        <polyline points={pts} {...sharedStrokeProps} />
      )}
    </svg>
  );
}
