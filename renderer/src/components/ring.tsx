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
  label?: string;
  variant?: string;
  size?: string;
  thickness?: number;
  className?: string;
  cssClass?: string;
  children?: React.ReactNode;
}

export function Ring({
  value = 0,
  label,
  variant = "default",
  size = "default",
  thickness = 6,
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

  return (
    <div
      className={cn(
        "cn-ring inline-flex items-center justify-center",
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
        style={{ transform: "rotate(-90deg)" }}
      >
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
          )}
          cx={half}
          cy={half}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
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
