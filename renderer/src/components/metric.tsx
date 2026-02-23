/**
 * Metric/KPI component — displays a headline number with optional
 * trend indicator and description.
 */

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type TrendDirection = "up" | "down" | "neutral";
type TrendSentiment = "positive" | "negative" | "neutral";

interface MetricProps {
  label: string;
  value: string | number;
  description?: string;
  delta?: string | number;
  trend?: TrendDirection;
  trendSentiment?: TrendSentiment;
  className?: string;
  cssClass?: string;
}

/** Infer trend direction from a delta value. */
function inferTrend(delta: string | number): TrendDirection {
  if (typeof delta === "number") {
    if (delta > 0) return "up";
    if (delta < 0) return "down";
    return "neutral";
  }
  // String delta: check for leading sign or negative indicator
  const trimmed = delta.trim();
  if (trimmed.startsWith("-") || trimmed.startsWith("\u2212")) return "down";
  if (trimmed.startsWith("+")) return "up";
  // Try parsing as number
  const num = parseFloat(trimmed.replace(/[^0-9.\-]/g, ""));
  if (!isNaN(num)) {
    if (num > 0) return "up";
    if (num < 0) return "down";
  }
  return "neutral";
}

/** Map trend direction to default sentiment. */
function inferSentiment(direction: TrendDirection): TrendSentiment {
  if (direction === "up") return "positive";
  if (direction === "down") return "negative";
  return "neutral";
}

const SENTIMENT_CLASSES: Record<TrendSentiment, string> = {
  positive: "text-green-600 dark:text-green-500",
  negative: "text-red-600 dark:text-red-500",
  neutral: "text-muted-foreground",
};

const TREND_ICONS: Record<TrendDirection, typeof TrendingUp> = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

export function PrefabMetric({
  label,
  value,
  description,
  delta,
  trend,
  trendSentiment,
  className,
  cssClass,
}: MetricProps) {
  const resolvedTrend =
    trend ?? (delta != null ? inferTrend(delta) : undefined);
  const resolvedSentiment =
    trendSentiment ??
    (resolvedTrend != null ? inferSentiment(resolvedTrend) : undefined);

  const TrendIcon = resolvedTrend != null ? TREND_ICONS[resolvedTrend] : null;
  const sentimentClass =
    resolvedSentiment != null ? SENTIMENT_CLASSES[resolvedSentiment] : "";

  return (
    <div className={cn("flex flex-col gap-1", className, cssClass)}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">
          {String(value)}
        </span>
        {delta != null && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-sm font-medium",
              sentimentClass,
            )}
          >
            {TrendIcon && <TrendIcon className="size-3.5" />}
            {String(delta)}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
