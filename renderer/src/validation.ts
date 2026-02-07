/**
 * Runtime validation for component nodes and actions.
 *
 * Uses the Zod schemas (originally built for contract testing) to validate
 * incoming JSON at render time. Invalid nodes surface clear errors instead
 * of producing cryptic React crashes.
 */

import { SCHEMA_REGISTRY, ACTION_SCHEMA_REGISTRY } from "./schemas";

export interface ValidationResult {
  kind: "unknown_type" | "schema_error";
  message: string;
  issues: string[];
}

/**
 * Validate a component node against its Zod schema.
 * Returns null if valid, or a ValidationResult describing the problem.
 */
export function validateNode(node: {
  type: string;
  [key: string]: unknown;
}): ValidationResult | null {
  const schema = SCHEMA_REGISTRY[node.type];
  if (!schema) {
    const result: ValidationResult = {
      kind: "unknown_type",
      message: `Unknown component: "${node.type}"`,
      issues: [`"${node.type}" is not a registered component type`],
    };
    console.warn("[Prefab] Validation error:", result.message, { node });
    return result;
  }

  const parsed = schema.safeParse(node);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    const result: ValidationResult = {
      kind: "schema_error",
      message: `Invalid <${node.type}> props`,
      issues,
    };
    console.warn("[Prefab] Validation error:", result.message, {
      issues,
      node,
    });
    return result;
  }

  return null;
}

/**
 * Validate a resolved action payload against its Zod schema.
 * Returns null if valid, or a ValidationResult describing the problem.
 */
export function validateAction(action: {
  action: string;
  [key: string]: unknown;
}): ValidationResult | null {
  const schema = ACTION_SCHEMA_REGISTRY[action.action];
  if (!schema) {
    const result: ValidationResult = {
      kind: "unknown_type",
      message: `Unknown action: "${action.action}"`,
      issues: [`"${action.action}" is not a registered action type`],
    };
    console.warn("[Prefab] Action validation error:", result.message, {
      action,
    });
    return result;
  }

  const parsed = schema.safeParse(action);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    const result: ValidationResult = {
      kind: "schema_error",
      message: `Invalid "${action.action}" action`,
      issues,
    };
    console.warn("[Prefab] Action validation error:", result.message, {
      issues,
      action,
    });
    return result;
  }

  return null;
}
