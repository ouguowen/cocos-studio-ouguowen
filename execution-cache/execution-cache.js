#!/usr/bin/env node

"use strict";

const { createTaskFingerprint } = require("./task-fingerprint");
const { createRouteScore, updateRouteScore } = require("./route-score");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function createEmptyExecutionCache() {
  return {
    schema_version: "1.0.0",
    execution_enabled: false,
    entries: {},
  };
}

function validateExecutionCacheStore(store) {
  if (!store || typeof store !== "object" || Array.isArray(store)) {
    throw new Error("Execution Cache store must be an object.");
  }
  assertNonEmptyString(store.schema_version, "Execution Cache schema_version");
  if (store.execution_enabled !== false) {
    throw new Error("Execution Cache must keep execution_enabled false.");
  }
  if (!store.entries || typeof store.entries !== "object" || Array.isArray(store.entries)) {
    throw new Error("Execution Cache entries must be an object.");
  }
  for (const [fingerprint, entry] of Object.entries(store.entries)) {
    validateExecutionCacheEntry(entry, fingerprint);
  }
  return true;
}

function validateExecutionCacheEntry(entry, expectedFingerprint = null) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    throw new Error("Execution Cache entry must be an object.");
  }
  assertNonEmptyString(entry.fingerprint, "Execution Cache entry fingerprint");
  if (expectedFingerprint && entry.fingerprint !== expectedFingerprint) {
    throw new Error("Execution Cache entry key must equal fingerprint.");
  }
  if (!entry.execution_mode || !new Set(["fast", "full"]).has(entry.execution_mode.mode)
    || !Array.isArray(entry.execution_mode.agents)) {
    throw new Error("Execution Cache entry execution_mode is invalid.");
  }
  if (!new Set(["fast_path", "full_pipeline"]).has(entry.route_type)) {
    throw new Error("Execution Cache entry route_type must be fast_path or full_pipeline.");
  }
  if (!Number.isFinite(entry.score) || entry.score < 0 || entry.score > 100) {
    throw new Error("Execution Cache entry score must be between 0 and 100.");
  }
  for (const field of ["success_count", "failure_count"]) {
    if (!Number.isInteger(entry[field]) || entry[field] < 0) {
      throw new Error(`Execution Cache entry ${field} must be a non-negative integer.`);
    }
  }
  createRouteScore(entry.route_score || {});
  return true;
}

function lookupExecutionCache(request, store = createEmptyExecutionCache()) {
  validateExecutionCacheStore(store);
  const fingerprint = createTaskFingerprint(request);
  const entry = store.entries[fingerprint] || null;
  if (!entry) {
    return {
      status: "miss",
      fingerprint,
      hit: false,
      execution_enabled: false,
      execution_mode: null,
      entry: null,
    };
  }
  validateExecutionCacheEntry(entry, fingerprint);
  return {
    status: "hit",
    fingerprint,
    hit: true,
    execution_enabled: false,
    execution_mode: clone(entry.execution_mode),
    route_type: entry.route_type,
    score: entry.score,
    success_count: entry.success_count,
    failure_count: entry.failure_count,
    route_score: createRouteScore(entry.route_score),
    entry: clone(entry),
  };
}

function buildCacheHitExecutionMode(cacheResult) {
  if (!cacheResult || cacheResult.status !== "hit") {
    throw new Error("Cache hit execution mode requires a cache hit.");
  }
  if (cacheResult.route_type !== "fast_path") {
    return null;
  }
  return {
    mode: "fast",
    agents: [...cacheResult.execution_mode.agents],
  };
}

function updateExecutionCache(request, routeDecision, result = {}, store = createEmptyExecutionCache()) {
  validateExecutionCacheStore(store);
  const updated = clone(store);
  const fingerprint = createTaskFingerprint(request);
  const existing = updated.entries[fingerprint] || {
    fingerprint,
    route_type: routeDecision.route_type,
    execution_mode: routeDecision.execution_mode,
    score: 0,
    success_count: 0,
    failure_count: 0,
    route_score: createRouteScore(),
  };
  const success = (result.status || "success") === "success";
  const entry = {
    fingerprint,
    route_type: routeDecision.route_type,
    execution_mode: clone(routeDecision.execution_mode),
    score: Number.isFinite(result.score)
      ? Math.max(0, Math.min(100, result.score))
      : existing.score,
    success_count: existing.success_count + (success ? 1 : 0),
    failure_count: existing.failure_count + (success ? 0 : 1),
    route_score: updateRouteScore(existing.route_score, result),
    last_status: result.status || "success",
    updated_at: result.timestamp || "2026-01-01T00:00:00.000Z",
  };
  validateExecutionCacheEntry(entry, fingerprint);
  updated.entries[fingerprint] = entry;
  validateExecutionCacheStore(updated);
  return {
    store: updated,
    entry,
  };
}

module.exports = {
  buildCacheHitExecutionMode,
  createEmptyExecutionCache,
  lookupExecutionCache,
  updateExecutionCache,
  validateExecutionCacheEntry,
  validateExecutionCacheStore,
};
