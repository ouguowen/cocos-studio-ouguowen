#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const memoryDir = path.join(root, "execution-memory");
const defaultHistoryPath = path.join(memoryDir, "execution-history.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function normalizeText(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function resolveInsideMemoryDir(filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(memoryDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${memoryDir}.`);
  }
  return resolvedPath;
}

function createEmptyExecutionMemory() {
  return {
    schema_version: "1.0.0",
    execution_enabled: false,
    records: [],
  };
}

function validateExecutionMemoryStore(store) {
  if (!store || typeof store !== "object" || Array.isArray(store)) {
    throw new Error("Execution Memory store must be an object.");
  }
  assertNonEmptyString(store.schema_version, "Execution Memory schema_version");
  if (store.execution_enabled !== false) {
    throw new Error("Execution Memory must keep execution_enabled false.");
  }
  if (!Array.isArray(store.records)) {
    throw new Error("Execution Memory records must be an array.");
  }
  for (const record of store.records) {
    validateExecutionMemoryRecord(record);
  }
  return true;
}

function validateExecutionMemoryRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("Execution Memory record must be an object.");
  }
  for (const field of ["run_id", "request", "route_type", "status", "timestamp"]) {
    assertNonEmptyString(record[field], `Execution Memory record ${field}`);
  }
  if (!new Set(["fast_path", "full_pipeline"]).has(record.route_type)) {
    throw new Error("Execution Memory record route_type must be fast_path or full_pipeline.");
  }
  if (!record.execution_mode || !new Set(["fast", "full"]).has(record.execution_mode.mode)
    || !Array.isArray(record.execution_mode.agents)) {
    throw new Error("Execution Memory record execution_mode is invalid.");
  }
  if (!record.decision || typeof record.decision !== "object" || Array.isArray(record.decision)) {
    throw new Error("Execution Memory record decision must be an object.");
  }
  return true;
}

function loadExecutionMemory(options = {}) {
  const historyPath = resolveInsideMemoryDir(
    options.historyPath || defaultHistoryPath,
    "Execution Memory history",
  );
  try {
    const store = JSON.parse(fs.readFileSync(historyPath, "utf8"));
    validateExecutionMemoryStore(store);
    return store;
  } catch (error) {
    throw new Error(`Unable to read Execution Memory history ${historyPath}: ${error.message}`);
  }
}

function scoreRequestSimilarity(left, right) {
  const leftTokens = new Set(normalizeText(left).split(" ").filter(Boolean));
  const rightTokens = new Set(normalizeText(right).split(" ").filter(Boolean));
  if (leftTokens.size === 0 || rightTokens.size === 0) {
    return 0;
  }
  const overlap = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return overlap / Math.max(leftTokens.size, rightTokens.size);
}

function findExecutionMemoryMatches(request, store, options = {}) {
  assertNonEmptyString(request, "Execution Memory request");
  validateExecutionMemoryStore(store);
  const minScore = options.minScore ?? 0.4;
  return store.records
    .map((record) => ({
      record: clone(record),
      similarity: scoreRequestSimilarity(request, record.request),
    }))
    .filter((entry) => entry.similarity >= minScore)
    .sort((a, b) => b.similarity - a.similarity);
}

function summarizeExecutionMemory(request, store = createEmptyExecutionMemory(), options = {}) {
  const matches = findExecutionMemoryMatches(request, store, options);
  const routeCounts = matches.reduce((counts, entry) => {
    counts[entry.record.route_type] = (counts[entry.record.route_type] || 0) + 1;
    return counts;
  }, {
    fast_path: 0,
    full_pipeline: 0,
  });
  const suggestedRoute = routeCounts.fast_path > routeCounts.full_pipeline
    ? "fast_path"
    : routeCounts.full_pipeline > routeCounts.fast_path
      ? "full_pipeline"
      : null;
  return {
    schema_version: store.schema_version,
    execution_enabled: false,
    total_records: store.records.length,
    matched_records: matches.length,
    fast_path_count: routeCounts.fast_path || 0,
    full_pipeline_count: routeCounts.full_pipeline || 0,
    suggested_route_type: suggestedRoute,
    confidence: matches.length === 0
      ? 0
      : Math.max(...matches.map((entry) => entry.similarity)),
  };
}

function buildExecutionMemoryContext(request, options = {}) {
  const store = options.store || loadExecutionMemory(options);
  return summarizeExecutionMemory(request, store, options);
}

function createExecutionMemoryRecord(input) {
  const now = input.timestamp || new Date().toISOString();
  const record = {
    run_id: input.run_id || `run-${Date.now()}`,
    request: input.request,
    route_type: input.route_type,
    execution_mode: clone(input.execution_mode),
    decision: {
      level: input.level,
      reason: input.reason,
      adaptive_reasons: [...(input.adaptive_reasons || [])],
      task_complexity: clone(input.task_complexity || {}),
    },
    dependency_impact: clone(input.dependency_impact || {
      changed_nodes: [],
      affected_nodes: [],
      affected_agents: [],
    }),
    status: input.status || "planned",
    timestamp: now,
  };
  validateExecutionMemoryRecord(record);
  return record;
}

function recordExecutionMemoryDecision(input, options = {}) {
  const store = clone(options.store || createEmptyExecutionMemory());
  validateExecutionMemoryStore(store);
  const record = createExecutionMemoryRecord(input);
  store.records.push(record);
  validateExecutionMemoryStore(store);

  let storePath = null;
  if (options.write === true) {
    storePath = resolveInsideMemoryDir(
      options.historyPath || defaultHistoryPath,
      "Execution Memory history output",
    );
    fs.mkdirSync(path.dirname(storePath), { recursive: true });
    fs.writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  }
  return {
    store,
    record,
    storePath,
  };
}

module.exports = {
  buildExecutionMemoryContext,
  createEmptyExecutionMemory,
  createExecutionMemoryRecord,
  findExecutionMemoryMatches,
  loadExecutionMemory,
  recordExecutionMemoryDecision,
  summarizeExecutionMemory,
  validateExecutionMemoryRecord,
  validateExecutionMemoryStore,
};
