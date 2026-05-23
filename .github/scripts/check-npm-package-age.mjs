#!/usr/bin/env node

import fs from "node:fs/promises";

const args = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i], process.argv[i + 1]);
}

const lockfilePath = args.get("--lockfile");
const baseLockfilePath = args.get("--base-lockfile");
const daysArg = args.get("--days") ?? "7";

if (!lockfilePath) {
  console.error(
    "Usage: check-npm-package-age.mjs --lockfile <path> [--days 7]",
  );
  process.exit(2);
}

const days = Number(daysArg);
if (!Number.isFinite(days) || days <= 0) {
  console.error(`Invalid --days value: ${daysArg}`);
  process.exit(2);
}

const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
function packageNameFromPath(path) {
  const marker = "node_modules/";
  const index = path.lastIndexOf(marker);
  if (index === -1) {
    return null;
  }

  const parts = path.slice(index + marker.length).split("/");
  if (parts[0]?.startsWith("@")) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0];
}

async function readRegistryPackages(path) {
  const lockfile = JSON.parse(await fs.readFile(path, "utf8"));
  const packages = lockfile.packages ?? {};
  const registryPackages = new Map();

  for (const [packagePath, details] of Object.entries(packages)) {
    if (
      !details?.version ||
      !details?.resolved?.startsWith("https://registry.npmjs.org/")
    ) {
      continue;
    }

    const name = packageNameFromPath(packagePath);
    if (!name) {
      continue;
    }

    registryPackages.set(`${name}@${details.version}`, {
      name,
      version: details.version,
    });
  }

  return registryPackages;
}

const lockedPackages = await readRegistryPackages(lockfilePath);
const basePackages = baseLockfilePath
  ? await readRegistryPackages(baseLockfilePath)
  : new Map();
const packagesToCheck = new Map(
  [...lockedPackages].filter(([key]) => !basePackages.has(key)),
);

const metadataCache = new Map();

async function fetchPackageMetadata(name) {
  if (metadataCache.has(name)) {
    return metadataCache.get(name);
  }

  const response = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(name)}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${name}: ${response.status} ${response.statusText}`,
    );
  }

  const metadata = await response.json();
  metadataCache.set(name, metadata);
  return metadata;
}

const tooNew = [];
const missingTimes = [];

for (const { name, version } of packagesToCheck.values()) {
  const metadata = await fetchPackageMetadata(name);
  const publishedAt = metadata.time?.[version];

  if (!publishedAt) {
    missingTimes.push(`${name}@${version}`);
    continue;
  }

  const publishedDate = new Date(publishedAt);
  if (publishedDate > cutoff) {
    tooNew.push({
      package: `${name}@${version}`,
      publishedAt,
    });
  }
}

if (missingTimes.length > 0 || tooNew.length > 0) {
  if (tooNew.length > 0) {
    console.error(
      `Found ${tooNew.length} npm packages published within the last ${days} days:`,
    );
    for (const entry of tooNew.slice(0, 25)) {
      console.error(`- ${entry.package} published at ${entry.publishedAt}`);
    }
    if (tooNew.length > 25) {
      console.error(`... and ${tooNew.length - 25} more`);
    }
  }

  if (missingTimes.length > 0) {
    console.error("Missing npm publish times for:");
    for (const name of missingTimes.slice(0, 25)) {
      console.error(`- ${name}`);
    }
    if (missingTimes.length > 25) {
      console.error(`... and ${missingTimes.length - 25} more`);
    }
  }

  process.exit(1);
}

console.log(
  `All ${
    packagesToCheck.size
  } npm registry packages were published before ${cutoff.toISOString()}.`,
);
