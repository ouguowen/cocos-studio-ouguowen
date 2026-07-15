#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const providersDir = __dirname;
const defaultRegistryPath = path.join(providersDir, "registry.json");
const schemaPath = path.join(providersDir, "schemas", "provider-schema.json");

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function resolveInsideProviders(filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(providersDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${providersDir}.`);
  }
  return resolvedPath;
}

function resolveProviderFile(relativePath) {
  assertNonEmptyString(relativePath, "Provider file");
  if (path.isAbsolute(relativePath) || path.extname(relativePath).toLowerCase() !== ".json") {
    throw new Error(`Provider file must be a relative JSON path: ${relativePath}`);
  }
  return resolveInsideProviders(path.join(providersDir, relativePath), "Provider file");
}

function assertScore(value, label) {
  if (!Number.isInteger(value) || value < 0 || value > 100) {
    throw new Error(`${label} must be an integer from 0 to 100.`);
  }
}

function validateProvider(provider, schema, sourceFile) {
  if (!provider || typeof provider !== "object" || Array.isArray(provider)) {
    throw new Error(`Provider must be an object: ${sourceFile}`);
  }
  for (const field of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(provider, field)) {
      throw new Error(`Provider ${sourceFile} is missing field: ${field}`);
    }
  }

  assertNonEmptyString(provider.id, `${sourceFile} id`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(provider.id)) {
    throw new Error(`Provider ${sourceFile} has an invalid id.`);
  }
  assertNonEmptyString(provider.name, `${sourceFile} name`);
  if (!schema.properties.type.enum.includes(provider.type)) {
    throw new Error(`Provider ${provider.id} has an unsupported type: ${provider.type}`);
  }
  if (!Array.isArray(provider.capabilities) || provider.capabilities.length === 0) {
    throw new Error(`Provider ${provider.id} must declare capabilities.`);
  }
  for (const capability of provider.capabilities) {
    assertNonEmptyString(capability, `Provider ${provider.id} capability`);
  }
  if (new Set(provider.capabilities).size !== provider.capabilities.length) {
    throw new Error(`Provider ${provider.id} contains duplicate capabilities.`);
  }
  assertNonEmptyString(provider.adapter, `Provider ${provider.id} adapter`);
  if (provider.execution_enabled !== false) {
    throw new Error(`Provider ${provider.id} must keep execution_enabled false.`);
  }
  assertScore(provider.priority, `Provider ${provider.id} priority`);
  assertScore(provider.speed, `Provider ${provider.id} speed`);
  assertScore(provider.quality, `Provider ${provider.id} quality`);

  const allowedFields = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(provider)) {
    if (!allowedFields.has(field)) {
      throw new Error(`Provider ${provider.id} contains unsupported field: ${field}`);
    }
  }
}

function loadProviderRegistry(options = {}) {
  const registryPath = resolveInsideProviders(
    options.registryPath || defaultRegistryPath,
    "Provider Registry",
  );
  const registry = readJson(registryPath, "Provider Registry");
  const schema = readJson(schemaPath, "Provider schema");

  assertNonEmptyString(registry.schema_version, "Provider Registry schema_version");
  if (registry.mode !== "architecture-metadata-only") {
    throw new Error("Provider Registry mode must be architecture-metadata-only.");
  }
  if (!Array.isArray(registry.providers) || registry.providers.length === 0) {
    throw new Error("Provider Registry must contain providers.");
  }

  const providers = [];
  const byId = new Map();
  for (const entry of registry.providers) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error("Provider Registry contains an invalid entry.");
    }
    assertNonEmptyString(entry.id, "Provider Registry entry id");
    const providerPath = resolveProviderFile(entry.file);
    const provider = readJson(providerPath, "Provider");
    validateProvider(provider, schema, entry.file);
    if (provider.id !== entry.id) {
      throw new Error(`Provider id mismatch: registry=${entry.id}, file=${provider.id}`);
    }
    if (byId.has(provider.id)) {
      throw new Error(`Provider Registry contains duplicate id: ${provider.id}`);
    }
    providers.push(provider);
    byId.set(provider.id, provider);
  }

  return {
    schema_version: registry.schema_version,
    mode: registry.mode,
    providers,
    byId,
  };
}

function readWeight(value, fallback, label) {
  const resolved = value === undefined ? fallback : value;
  if (typeof resolved !== "number" || !Number.isFinite(resolved) || resolved < 0) {
    throw new Error(`${label} must be a non-negative number.`);
  }
  return resolved;
}

function normalizeRequirements(requirements = {}) {
  if (!requirements || typeof requirements !== "object" || Array.isArray(requirements)) {
    throw new Error("Provider requirements must be an object.");
  }
  const weights = requirements.weights || {};
  if (!weights || typeof weights !== "object" || Array.isArray(weights)) {
    throw new Error("Provider requirement weights must be an object.");
  }

  const normalized = {
    type: requirements.type,
    min_speed: requirements.min_speed === undefined ? 0 : requirements.min_speed,
    min_quality: requirements.min_quality === undefined ? 0 : requirements.min_quality,
    weights: {
      priority: readWeight(weights.priority, 1, "Provider priority weight"),
      speed: readWeight(weights.speed, 1, "Provider speed weight"),
      quality: readWeight(weights.quality, 1, "Provider quality weight"),
    },
  };
  if (normalized.type !== undefined && !new Set(["image", "engine"]).has(normalized.type)) {
    throw new Error("Provider requirement type must be image or engine.");
  }
  assertScore(normalized.min_speed, "Provider minimum speed");
  assertScore(normalized.min_quality, "Provider minimum quality");
  return normalized;
}

function rankProviders(capability, requirements = {}, registry = loadProviderRegistry()) {
  assertNonEmptyString(capability, "Provider capability");
  const normalized = normalizeRequirements(requirements);

  return registry.providers
    .filter((provider) => provider.capabilities.includes(capability))
    .filter((provider) => normalized.type === undefined || provider.type === normalized.type)
    .filter((provider) => provider.speed >= normalized.min_speed)
    .filter((provider) => provider.quality >= normalized.min_quality)
    .map((provider) => ({
      provider,
      score: (provider.priority * normalized.weights.priority)
        + (provider.speed * normalized.weights.speed)
        + (provider.quality * normalized.weights.quality),
    }))
    .sort((left, right) => (
      right.score - left.score
      || right.provider.priority - left.provider.priority
      || right.provider.quality - left.provider.quality
      || right.provider.speed - left.provider.speed
      || left.provider.id.localeCompare(right.provider.id)
    ));
}

function selectProvider(capability, requirements = {}, registry = loadProviderRegistry()) {
  const ranked = rankProviders(capability, requirements, registry);
  if (ranked.length === 0) {
    throw new Error(`No Provider matches capability: ${capability}`);
  }
  return ranked[0].provider;
}

function assertProviderExecutionEnabled(provider) {
  if (!provider || provider.execution_enabled !== true) {
    const providerId = provider && provider.id ? provider.id : "unknown";
    const error = new Error(`Provider ${providerId} execution is disabled.`);
    error.code = "PROVIDER_EXECUTION_DISABLED";
    throw error;
  }
  return provider;
}

function selectExecutableProvider(capability, requirements = {}, registry = loadProviderRegistry()) {
  return assertProviderExecutionEnabled(selectProvider(capability, requirements, registry));
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h") || args.length === 0 || args.length > 2) {
    console.log("Usage: node providers/provider-selector.js <capability> [requirements-json]");
    console.log("Selects provider metadata only; it never executes a Provider.");
    if (args.length === 0 || args.length > 2) {
      process.exitCode = args.length === 0 ? 0 : 1;
    }
    return;
  }

  try {
    const requirements = args[1] ? JSON.parse(args[1]) : {};
    const provider = selectProvider(args[0], requirements);
    console.log(JSON.stringify({
      capability: args[0],
      provider,
      selection_only: true,
      execution_enabled: false,
    }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  assertProviderExecutionEnabled,
  loadProviderRegistry,
  normalizeRequirements,
  rankProviders,
  selectExecutableProvider,
  selectProvider,
  validateProvider,
};
