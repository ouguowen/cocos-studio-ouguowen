#!/usr/bin/env node

"use strict";

const { createTaskFingerprint } = require("../execution-cache/task-fingerprint");
const { classifyError } = require("./execution-score");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createEmptyFailureMemory() {
  return {
    schema_version: "1.0.0",
    execution_enabled: false,
    failures: {},
  };
}

function validateFailureMemory(memory) {
  if (!memory || typeof memory !== "object" || Array.isArray(memory)) {
    throw new Error("Failure Memory must be an object.");
  }
  if (memory.execution_enabled !== false || !memory.failures || typeof memory.failures !== "object"
    || Array.isArray(memory.failures)) {
    throw new Error("Failure Memory must be disabled and contain failures.");
  }
  return true;
}

function recordFailurePattern(input, memory = createEmptyFailureMemory()) {
  validateFailureMemory(memory);
  const updated = clone(memory);
  const fingerprint = input.fingerprint || createTaskFingerprint(input.task || input.request || "");
  const errorType = classifyError(input.error);
  const route = input.route || input.route_type || input.execution_mode?.mode || "unknown";
  const key = `${fingerprint}:${route}:${errorType}`;
  const existing = updated.failures[key] || {
    task: fingerprint,
    error: errorType,
    route,
    count: 0,
  };
  existing.count += 1;
  existing.last_error = input.error || errorType;
  updated.failures[key] = existing;
  validateFailureMemory(updated);
  return {
    memory: updated,
    pattern: existing,
  };
}

function lookupFailurePatterns(request, route, memory = createEmptyFailureMemory()) {
  validateFailureMemory(memory);
  const fingerprint = createTaskFingerprint(request);
  return Object.values(memory.failures)
    .filter((pattern) => pattern.task === fingerprint && (!route || pattern.route === route))
    .sort((a, b) => b.count - a.count);
}

module.exports = {
  createEmptyFailureMemory,
  lookupFailurePatterns,
  recordFailurePattern,
  validateFailureMemory,
};
