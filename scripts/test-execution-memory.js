#!/usr/bin/env node

"use strict";

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const { createGameBlueprint } = require("../blueprint/blueprint-manager");
const {
  createEmptyExecutionMemory,
  loadExecutionMemory,
  recordExecutionMemoryDecision,
  summarizeExecutionMemory,
  validateExecutionMemoryStore,
} = require("../execution-memory/execution-memory");
const {
  runStudioOrchestrator,
  validateStudioReport,
} = require("../orchestrator/studio-orchestrator");
const { routeTask } = require("../task-router/task-router");

const root = path.resolve(__dirname, "..");
const historyPath = path.join(root, "execution-memory", "execution-history.json");

function fileHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function runTests() {
  const historyBefore = fileHash(historyPath);
  const emptyStore = loadExecutionMemory();
  assert.strictEqual(validateExecutionMemoryStore(emptyStore), true);
  assert.strictEqual(emptyStore.execution_enabled, false);
  assert.strictEqual(emptyStore.records.length, 0);

  const seeded = recordExecutionMemoryDecision({
    run_id: "run-memory-seed",
    request: "tower defense ui color change",
    route_type: "fast_path",
    execution_mode: {
      mode: "fast",
      agents: ["artist", "cocos-programmer"],
    },
    level: "L0",
    reason: "seed fast path",
    adaptive_reasons: ["adaptive-fast-path-approved"],
    task_complexity: {
      score: 0,
    },
    dependency_impact: {
      changed_nodes: ["blueprint:ui.surface"],
      affected_nodes: ["blueprint:ui.surface", "agent:artist", "agent:cocos-programmer"],
      affected_agents: ["artist", "cocos-programmer"],
    },
    status: "PASS",
    timestamp: "2026-01-01T00:00:00.000Z",
  }, {
    store: createEmptyExecutionMemory(),
    write: false,
  });
  assert.strictEqual(seeded.storePath, null);
  assert.strictEqual(seeded.store.records.length, 1);

  const summary = summarizeExecutionMemory("tower defense ui color change", seeded.store);
  assert.strictEqual(summary.execution_enabled, false);
  assert.strictEqual(summary.matched_records, 1);
  assert.strictEqual(summary.suggested_route_type, "fast_path");

  const blueprint = createGameBlueprint("tower defense ui color change");
  const routing = routeTask("tower defense ui color change", {
    dependencyImpact: blueprint.dependency_impact,
    executionMemoryStore: seeded.store,
  });
  assert.strictEqual(routing.route_type, "fast_path");
  assert.strictEqual(routing.execution_memory.suggested_route_type, "fast_path");
  assert.strictEqual(routing.execution_memory.matched_records, 1);

  const run = runStudioOrchestrator("tower defense ui color change", {
    runId: "run-execution-memory-ui",
    activeCapabilityId: "tower-defense",
    executionMemoryStore: seeded.store,
    write: false,
  });
  assert.ifError(run.error);
  assert.strictEqual(validateStudioReport(run.report), true);
  assert.strictEqual(run.report.routing.route_type, "fast_path");
  assert.strictEqual(run.report.execution_memory.record_count, 2);
  assert.strictEqual(run.report.execution_memory.latest_route_type, "fast_path");
  assert.strictEqual(run.report.execution_memory.store_written, false);

  assert.strictEqual(fileHash(historyPath), historyBefore, "Formal execution history must not be modified by tests.");

  console.log(JSON.stringify({
    test: "execution-memory",
    store_loaded: true,
    seed_records: seeded.store.records.length,
    matched_records: summary.matched_records,
    router_memory_suggestion: routing.execution_memory.suggested_route_type,
    orchestrator_record_count: run.report.execution_memory.record_count,
    store_written: run.report.execution_memory.store_written,
    execution_enabled: false,
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
