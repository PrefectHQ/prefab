import { cn } from "@/lib/utils";

const SIZE_PX: Record<string, number> = {
  sm: 64,
  default: 96,
  lg: 128,
};

const LABEL_CLASS: Record<string, string> = {
  sm: "cn-ring-label cn-ring-label-sm",
  default: "cn-ring-label cn-ring-label-default",
  lg: "cn-ring-label cn-ring-label-lg",
};

const VARIANT_CLASS: Record<string, string> = {
  default: "cn-ring-variant-default",
  success: "cn-ring-variant-success",
  warning: "cn-ring-variant-warning",
  destructive: "cn-ring-variant-destructive",
  info: "cn-ring-variant-info",
  muted: "cn-ring-variant-muted",
};

interface RingProps {
  value?: number;
  target?: number;
  label?: string;
  variant?: string;
  size?: string;
  thickness?: number;
  indicatorClassName?: string;
  targetClassName?: string;
  className?: string;
  cssClass?: string;
  children?: React.ReactNode;
}

export function Ring({
  value = 0,
  target,
  label,
  variant = "default",
  size = "default",
  thickness = 6,
  indicatorClassName,
  targetClassName,
  className,
  cssClass,
  children,
}: RingProps) {
  const px = SIZE_PX[size] ?? SIZE_PX.default;
  const half = px / 2;
  const radius = half - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - clamped / 100);

  // Target tick mark: a short line at the target angle on the ring.
  // The SVG is rotated -90deg so angle 0 in SVG space = 12 o'clock visually.
  const clampedTarget =
    target != null ? Math.max(0, Math.min(100, target)) : undefined;
  let targetLine: React.ReactNode = null;
  if (clampedTarget != null) {
    const angle = (clampedTarget / 100) * 360;
    const rad = (angle * Math.PI) / 180;
    const tickLen = thickness + 4;
    const innerR = radius - tickLen / 2;
    const outerR = radius + tickLen / 2;
    targetLine = (
      <line
        className={cn("cn-ring-target", targetClassName)}
        x1={half + innerR * Math.cos(rad)}
        y1={half + innerR * Math.sin(rad)}
        x2={half + outerR * Math.cos(rad)}
        y2={half + outerR * Math.sin(rad)}
        strokeWidth={2}
        strokeLinecap="round"
      />
    );
  }

  return (
    <div
      className={cn(
        "cn-ring group inline-flex items-center justify-center overflow-visible",
        className,
        cssClass,
      )}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `${Math.round(clamped)}%`}
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        className="cn-ring-svg"
        overflow="visible"
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          <linearGradient
            id="ring-gradient-default"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" style={{ stopColor: "var(--primary)" }} />
            <stop
              offset="100%"
              style={{
                stopColor: "oklch(from var(--primary) calc(l - 0.12) c h)",
              }}
            />
          </linearGradient>
          <linearGradient
            id="ring-gradient-success"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" style={{ stopColor: "var(--success)" }} />
            <stop
              offset="100%"
              style={{
                stopColor: "oklch(from var(--success) calc(l - 0.12) c h)",
              }}
            />
          </linearGradient>
          <linearGradient
            id="ring-gradient-warning"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" style={{ stopColor: "var(--warning)" }} />
            <stop
              offset="100%"
              style={{
                stopColor: "oklch(from var(--warning) calc(l - 0.12) c h)",
              }}
            />
          </linearGradient>
          <linearGradient
            id="ring-gradient-destructive"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" style={{ stopColor: "var(--destructive)" }} />
            <stop
              offset="100%"
              style={{
                stopColor: "oklch(from var(--destructive) calc(l - 0.12) c h)",
              }}
            />
          </linearGradient>
          <linearGradient id="ring-gradient-info" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--info)" }} />
            <stop
              offset="100%"
              style={{
                stopColor: "oklch(from var(--info) calc(l - 0.12) c h)",
              }}
            />
          </linearGradient>
        </defs>
        <circle
          className="cn-ring-track"
          cx={half}
          cy={half}
          r={radius}
          strokeWidth={thickness}
        />
        <circle
          className={cn(
            "cn-ring-fill",
            VARIANT_CLASS[variant] ?? VARIANT_CLASS.default,
            indicatorClassName,
          )}
          cx={half}
          cy={half}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        {targetLine}
      </svg>
      {children ? (
        <div className="cn-ring-label-overlay absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : (
        label && (
          <span
            className={cn(
              "cn-ring-label-overlay absolute",
              LABEL_CLASS[size] ?? LABEL_CLASS.default,
            )}
          >
            {label}
          </span>
        )
      )}
    </div>
  );
}
