#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { loadProviderRegistry } = require("../providers/provider-selector");

const root = path.resolve(__dirname, "..");
const feedbackDir = __dirname;
const generatedDir = path.join(root, "generated");
const schemaPath = path.join(feedbackDir, "feedback-schema.json");
const defaultStorePath = path.join(feedbackDir, "performance-store.json");
const defaultReportPath = path.join(generatedDir, "feedback-report.json");

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertInteger(value, minimum, maximum, label) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${label} must be an integer from ${minimum} to ${maximum}.`);
  }
}

function resolveInside(baseDir, filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(baseDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${baseDir}.`);
  }
  return resolvedPath;
}

function validateFeedback(feedback, options = {}) {
  const schema = options.schema || readJson(schemaPath, "Execution Feedback schema");
  const registry = options.registry || loadProviderRegistry();
  if (!feedback || typeof feedback !== "object" || Array.isArray(feedback)) {
    throw new Error("Execution Feedback must be an object.");
  }
  for (const field of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(feedback, field)) {
      throw new Error(`Execution Feedback is missing field: ${field}`);
    }
  }
  const allowedFields = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(feedback)) {
    if (!allowedFields.has(field)) {
      throw new Error(`Execution Feedback contains unsupported field: ${field}`);
    }
  }

  assertNonEmptyString(feedback.task_id, "Execution Feedback task_id");
  assertNonEmptyString(feedback.capability, "Execution Feedback capability");
  assertNonEmptyString(feedback.provider, "Execution Feedback provider");
  if (!schema.properties.status.enum.includes(feedback.status)) {
    throw new Error(`Execution Feedback has invalid status: ${feedback.status}`);
  }
  assertInteger(feedback.duration, 0, Number.MAX_SAFE_INTEGER, "Execution Feedback duration");
  for (const field of ["quality_score", "speed_score", "success_score"]) {
    assertInteger(feedback[field], 0, 100, `Execution Feedback ${field}`);
  }

  const validation = feedback.validation_result;
  if (!validation || typeof validation !== "object" || Array.isArray(validation)) {
    throw new Error("Execution Feedback validation_result must be an object.");
  }
  if (typeof validation.passed !== "boolean") {
    throw new Error("Execution Feedback validation_result.passed must be boolean.");
  }
  assertNonEmptyString(validation.message, "Execution Feedback validation_result.message");
  const validationFields = new Set(Object.keys(schema.properties.validation_result.properties));
  for (const field of Object.keys(validation)) {
    if (!validationFields.has(field)) {
      throw new Error(`Execution Feedback validation_result contains unsupported field: ${field}`);
    }
  }

  const provider = registry.byId.get(feedback.provider);
  if (!provider) {
    throw new Error(`Execution Feedback references unknown Provider: ${feedback.provider}`);
  }
  if (!provider.capabilities.includes(feedback.capability)) {
    throw new Error(`Provider ${provider.id} does not declare capability: ${feedback.capability}`);
  }
  if (provider.execution_enabled !== false) {
    throw new Error(`Provider ${provider.id} must remain execution-disabled.`);
  }
  return true;
}

function createFeedback(feedback, options = {}) {
  validateFeedback(feedback, options);
  return JSON.parse(JSON.stringify(feedback));
}

function createEmptyPerformanceStore() {
  return {
    schema_version: "1.0.0",
    mode: "feedback-metadata-only",
    execution_enabled: false,
    capabilities: {},
  };
}

function validatePerformanceStore(store) {
  if (!store || typeof store !== "object" || Array.isArray(store)) {
    throw new Error("Provider Performance Store must be an object.");
  }
  assertNonEmptyString(store.schema_version, "Provider Performance Store schema_version");
  if (store.mode !== "feedback-metadata-only" || store.execution_enabled !== false) {
    throw new Error("Provider Performance Store must remain metadata-only with execution disabled.");
  }
  if (!store.capabilities || typeof store.capabilities !== "object" || Array.isArray(store.capabilities)) {
    throw new Error("Provider Performance Store capabilities must be an object.");
  }

  for (const [capability, providers] of Object.entries(store.capabilities)) {
    assertNonEmptyString(capability, "Provider Performance capability");
    if (!providers || typeof providers !== "object" || Array.isArray(providers)) {
      throw new Error(`Provider Performance capability ${capability} must contain an object.`);
    }
    for (const [providerId, metrics] of Object.entries(providers)) {
      assertNonEmptyString(providerId, `Provider Performance ${capability} provider`);
      if (!metrics || typeof metrics !== "object" || Array.isArray(metrics)) {
        throw new Error(`Provider Performance metrics are invalid for ${providerId}.`);
      }
      assertInteger(metrics.samples, 1, Number.MAX_SAFE_INTEGER, `${providerId} samples`);
      assertInteger(metrics.success_count, 0, metrics.samples, `${providerId} success_count`);
      for (const field of ["success_rate", "average_duration", "quality_score", "speed_score", "success_score"]) {
        if (typeof metrics[field] !== "number" || !Number.isFinite(metrics[field]) || metrics[field] < 0) {
          throw new Error(`Provider Performance ${providerId} has invalid ${field}.`);
        }
      }
      if (metrics.success_rate > 1 || metrics.quality_score > 100 || metrics.speed_score > 100 || metrics.success_score > 100) {
        throw new Error(`Provider Performance ${providerId} metrics exceed their allowed range.`);
      }
    }
  }
  return true;
}

function loadPerformanceStore(storePath = defaultStorePath) {
  const resolvedPath = resolveInside(feedbackDir, storePath, "Provider Performance Store");
  const store = readJson(resolvedPath, "Provider Performance Store");
  validatePerformanceStore(store);
  return store;
}

function roundMetric(value) {
  return Number(value.toFixed(4));
}

function updateAverage(previous, samples, nextValue) {
  return roundMetric(((previous * samples) + nextValue) / (samples + 1));
}

function updatePerformanceStore(store, feedback) {
  validatePerformanceStore(store);
  const nextStore = JSON.parse(JSON.stringify(store));
  const providers = nextStore.capabilities[feedback.capability]
    || (nextStore.capabilities[feedback.capability] = {});
  const existing = providers[feedback.provider];

  if (!existing) {
    const successCount = feedback.status === "success" ? 1 : 0;
    providers[feedback.provider] = {
      samples: 1,
      success_count: successCount,
      success_rate: successCount,
      average_duration: feedback.duration,
      quality_score: feedback.quality_score,
      speed_score: feedback.speed_score,
      success_score: feedback.success_score,
    };
  } else {
    const samples = existing.samples;
    existing.samples += 1;
    existing.success_count += feedback.status === "success" ? 1 : 0;
    existing.success_rate = roundMetric(existing.success_count / existing.samples);
    existing.average_duration = updateAverage(existing.average_duration, samples, feedback.duration);
    existing.quality_score = updateAverage(existing.quality_score, samples, feedback.quality_score);
    existing.speed_score = updateAverage(existing.speed_score, samples, feedback.speed_score);
    existing.success_score = updateAverage(existing.success_score, samples, feedback.success_score);
  }

  validatePerformanceStore(nextStore);
  return nextStore;
}

function writePerformanceStore(store, storePath = defaultStorePath) {
  validatePerformanceStore(store);
  const resolvedPath = resolveInside(feedbackDir, storePath, "Provider Performance Store");
  fs.writeFileSync(resolvedPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function recordFeedback(feedbackInput, options = {}) {
  const registry = options.registry || loadProviderRegistry();
  const feedback = createFeedback(feedbackInput, { registry });
  const currentStore = options.store || loadPerformanceStore(options.storePath || defaultStorePath);
  const store = updatePerformanceStore(currentStore, feedback);
  const storePath = options.write === false
    ? null
    : writePerformanceStore(store, options.storePath || defaultStorePath);
  return {
    feedback,
    store,
    storePath,
    execution_enabled: false,
  };
}

function createFeedbackReport(feedbackEntries, providerRankings, options = {}) {
  if (!Array.isArray(feedbackEntries) || feedbackEntries.length === 0) {
    throw new Error("Feedback Report requires feedback entries.");
  }
  const registry = options.registry || loadProviderRegistry();
  const feedback = feedbackEntries.map((entry) => createFeedback(entry, { registry }));
  const successes = feedback.filter((entry) => entry.status === "success").length;
  return {
    schema_version: "1.0.0",
    mode: "feedback-only",
    execution_enabled: false,
    summary: {
      total_feedback: feedback.length,
      success_count: successes,
      failed_count: feedback.length - successes,
    },
    feedback,
    provider_rankings: providerRankings,
  };
}

function writeFeedbackReport(report, reportPath = defaultReportPath) {
  if (!report || report.mode !== "feedback-only" || report.execution_enabled !== false) {
    throw new Error("Feedback Report must remain feedback-only with execution disabled.");
  }
  const resolvedPath = resolveInside(generatedDir, reportPath, "Feedback Report");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

module.exports = {
  createEmptyPerformanceStore,
  createFeedback,
  createFeedbackReport,
  loadPerformanceStore,
  recordFeedback,
  updatePerformanceStore,
  validateFeedback,
  validatePerformanceStore,
  writeFeedbackReport,
  writePerformanceStore,
};
