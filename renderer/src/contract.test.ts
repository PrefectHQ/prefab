/**
 * Contract tests: Python (Pydantic) ↔ TypeScript (Zod) wire format agreement.
 *
 * These tests ensure the JSON protocol between the Python DSL and the
 * TypeScript renderer stays in sync. They validate three things:
 *
 * 1. Registry completeness — every component in the Python manifest has
 *    a corresponding entry in both REGISTRY (React) and SCHEMA_REGISTRY (Zod).
 * 2. Action completeness — every action in the manifest is handled.
 * 3. Fixture validation — Python-generated JSON fixtures parse successfully
 *    against the corresponding Zod schemas.
 */

import { describe, test, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  SCHEMA_REGISTRY,
  HANDLED_ACTIONS,
  ACTION_SCHEMA_REGISTRY,
} from "./schemas/index.ts";
import { REGISTRY } from "./components/registry.ts";

const SCHEMAS_DIR = path.resolve(__dirname, "../../schemas");
const MANIFEST_PATH = path.join(SCHEMAS_DIR, "manifest.json");

interface Manifest {
  components: string[];
  actions: string[];
}

function loadManifest(): Manifest {
  const raw = fs.readFileSync(MANIFEST_PATH, "utf-8");
  return JSON.parse(raw) as Manifest;
}

function loadFixture(dir: string, name: string): Record<string, unknown> {
  const raw = fs.readFileSync(
    path.join(SCHEMAS_DIR, "fixtures", dir, `${name}.json`),
    "utf-8",
  );
  return JSON.parse(raw) as Record<string, unknown>;
}

describe("Contract: Registry completeness", () => {
  const manifest = loadManifest();

  test("every Python component has a React component in REGISTRY", () => {
    const missing = manifest.components.filter((name) => !(name in REGISTRY));
    expect(missing, `Missing from REGISTRY: ${missing.join(", ")}`).toEqual([]);
  });

  test("every Python component has a Zod schema in SCHEMA_REGISTRY", () => {
    const missing = manifest.components.filter(
      (name) => !(name in SCHEMA_REGISTRY),
    );
    expect(
      missing,
      `Missing from SCHEMA_REGISTRY: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  test("every SCHEMA_REGISTRY entry corresponds to a Python component", () => {
    const extra = Object.keys(SCHEMA_REGISTRY).filter(
      (name) => !manifest.components.includes(name),
    );
    expect(extra, `Extra in SCHEMA_REGISTRY: ${extra.join(", ")}`).toEqual([]);
  });

  test("every REGISTRY entry corresponds to a Python component", () => {
    const extra = Object.keys(REGISTRY).filter(
      (name) => !manifest.components.includes(name),
    );
    expect(extra, `Extra in REGISTRY: ${extra.join(", ")}`).toEqual([]);
  });
});

describe("Contract: Action completeness", () => {
  const manifest = loadManifest();

  test("every Python action is in HANDLED_ACTIONS", () => {
    const missing = manifest.actions.filter(
      (a) => !HANDLED_ACTIONS.has(a as never),
    );
    expect(
      missing,
      `Missing from HANDLED_ACTIONS: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  test("every HANDLED_ACTIONS entry corresponds to a Python action", () => {
    const extra = [...HANDLED_ACTIONS].filter(
      (a) => !manifest.actions.includes(a),
    );
    expect(extra, `Extra in HANDLED_ACTIONS: ${extra.join(", ")}`).toEqual([]);
  });

  test("every Python action has a Zod schema in ACTION_SCHEMA_REGISTRY", () => {
    const missing = manifest.actions.filter(
      (a) => !(a in ACTION_SCHEMA_REGISTRY),
    );
    expect(
      missing,
      `Missing from ACTION_SCHEMA_REGISTRY: ${missing.join(", ")}`,
    ).toEqual([]);
  });
});

describe("Contract: Component fixtures validate against Zod schemas", () => {
  const manifest = loadManifest();

  for (const name of manifest.components) {
    test(`${name} fixture passes Zod validation`, () => {
      const fixture = loadFixture("components", name);
      const schema = SCHEMA_REGISTRY[name];
      expect(schema, `No schema for ${name}`).toBeDefined();

      const result = schema.safeParse(fixture);
      if (!result.success) {
        // Show the fixture and error for debugging
        expect.fail(
          `${name} fixture failed Zod validation:\n` +
            `  Fixture: ${JSON.stringify(fixture)}\n` +
            `  Errors: ${JSON.stringify(result.error.issues, null, 2)}`,
        );
      }
    });
  }
});

describe("Contract: Action fixtures validate against Zod schemas", () => {
  const manifest = loadManifest();

  for (const discriminator of manifest.actions) {
    test(`${discriminator} fixture passes Zod validation`, () => {
      const fixture = loadFixture("actions", discriminator);
      const schema = ACTION_SCHEMA_REGISTRY[discriminator];
      expect(schema, `No schema for action ${discriminator}`).toBeDefined();

      const result = schema.safeParse(fixture);
      if (!result.success) {
        expect.fail(
          `${discriminator} fixture failed Zod validation:\n` +
            `  Fixture: ${JSON.stringify(fixture)}\n` +
            `  Errors: ${JSON.stringify(result.error.issues, null, 2)}`,
        );
      }
    });
  }
});
