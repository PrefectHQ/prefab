/**
 * Inline error component for invalid component nodes.
 *
 * Replaces a broken node in the rendered tree with a clear error message
 * and collapsible detail section showing the Zod validation issues.
 */

import { useState } from "react";
import type { ValidationResult } from "../validation";

interface ValidationErrorProps {
  error: ValidationResult;
  node: Record<string, unknown>;
}

export function ValidationError({ error, node }: ValidationErrorProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      role="alert"
      className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-destructive">{error.message}</p>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 text-xs text-muted-foreground hover:text-foreground"
        >
          {expanded ? "Hide" : "Details"}
        </button>
      </div>

      {expanded && (
        <div className="mt-2 space-y-2">
          {error.issues.length > 0 && (
            <ul className="list-inside list-disc space-y-0.5 text-xs text-muted-foreground">
              {error.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          )}
          <pre className="max-h-40 overflow-auto rounded bg-muted p-2 text-xs">
            {JSON.stringify(node, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
