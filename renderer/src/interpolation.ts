/**
 * Template interpolation engine.
 *
 * Replaces {{ key }}, {{ nested.path }}, and {{ $event }} references
 * in string values with actual data. Supports dot-path access for nested
 * objects (e.g., {{ user.address.city }}).
 *
 * Format specifiers via pipe syntax:
 *   {{ value | percent }}     → "75%"        (0.75 × 100)
 *   {{ value | percent:1 }}   → "75.6%"      (with 1 decimal)
 *   {{ price | number:2 }}    → "1,234.00"   (locale-formatted)
 *   {{ price | currency }}    → "$1,234.00"
 *   {{ date | date }}         → "Jan 15, 2025"
 *   {{ date | date:short }}   → "1/15/2025"
 *   {{ date | date:long }}    → "January 15, 2025"
 *   {{ date | time }}         → "2:30 PM"
 *   {{ date | datetime }}     → "Jan 15, 2025, 2:30 PM"
 *   {{ name | upper }}        → "ALICE"
 *   {{ name | lower }}        → "alice"
 */

const TEMPLATE_RE = /\{\{\s*([\w.$]+)(?:\s*\|\s*([\w:]+))?\s*\}\}/g;

/**
 * Resolve a dot-path against a data object.
 * "user.name" on { user: { name: "Alice" } } → "Alice"
 */
function resolve(path: string, data: Record<string, unknown>): unknown {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Apply a format specifier to a resolved value. */
function applyFormat(value: unknown, format: string): string {
  const [name, arg] = format.split(":");

  switch (name) {
    case "percent": {
      const num = Number(value);
      if (isNaN(num)) return String(value);
      const decimals = arg ? parseInt(arg) : 0;
      return `${(num * 100).toFixed(decimals)}%`;
    }

    case "number": {
      const num = Number(value);
      if (isNaN(num)) return String(value);
      const decimals = arg ? parseInt(arg) : undefined;
      return num.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    case "currency": {
      const num = Number(value);
      if (isNaN(num)) return String(value);
      const currency = arg ?? "USD";
      return num.toLocaleString("en-US", {
        style: "currency",
        currency,
      });
    }

    case "date": {
      const d = new Date(String(value));
      if (isNaN(d.getTime())) return String(value);
      const style = (arg ?? "medium") as "short" | "medium" | "long";
      if (style === "short") return d.toLocaleDateString("en-US");
      if (style === "long")
        return d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    case "time": {
      const d = new Date(String(value));
      if (isNaN(d.getTime())) {
        // Try parsing as time-only (HH:MM)
        const t = new Date(`1970-01-01T${value}`);
        if (!isNaN(t.getTime()))
          return t.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });
        return String(value);
      }
      return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    case "datetime": {
      const d = new Date(String(value));
      if (isNaN(d.getTime())) return String(value);
      return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }

    case "upper":
      return String(value).toUpperCase();

    case "lower":
      return String(value).toLowerCase();

    default:
      return String(value);
  }
}

/**
 * Interpolate a single string template.
 * Returns the resolved value if the entire string is a single template
 * (preserves types), or a string with replacements if mixed.
 */
export function interpolateString(
  template: string,
  data: Record<string, unknown>,
): unknown {
  // Fast path: entire string is one template → preserve the original type
  // (unless a format specifier is present, which always returns a string)
  const singleMatch = template.match(
    /^\{\{\s*([\w.$]+)(?:\s*\|\s*([\w:]+))?\s*\}\}$/,
  );
  if (singleMatch) {
    const value = resolve(singleMatch[1], data);
    if (value === undefined) return template;
    if (singleMatch[2]) return applyFormat(value, singleMatch[2]);
    return value;
  }

  // Mixed template: replace each {{ ... }} with its string value
  return template.replace(
    TEMPLATE_RE,
    (_match, path: string, format?: string) => {
      const value = resolve(path, data);
      if (value === undefined) return "";
      if (format) return applyFormat(value, format);
      return String(value);
    },
  );
}

/**
 * Deep-interpolate all string values in a props object.
 * Non-string values pass through unchanged.
 * Action objects (with "action" key) get their own interpolation pass.
 */
export function interpolateProps(
  props: Record<string, unknown>,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === "string") {
      result[key] = interpolateString(value, data);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? interpolateProps(item as Record<string, unknown>, data)
          : typeof item === "string"
            ? interpolateString(item, data)
            : item,
      );
    } else if (typeof value === "object" && value !== null) {
      result[key] = interpolateProps(value as Record<string, unknown>, data);
    } else {
      result[key] = value;
    }
  }
  return result;
}
