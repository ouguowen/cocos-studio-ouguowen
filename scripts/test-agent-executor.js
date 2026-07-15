#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const { MockExecutionAdapter } = require("../executor/execution-adapter");
const {
  readBoundExecutionPlan,
  resolveExecutionBinding,
  runAgentExecutor,
  validateExecutionResults,
} = require("../executor/agent-executor");
const { loadAgentRegistry } = require("../scheduler/agent-registry");
const { loadToolCatalog } = require("../scheduler/capability-matcher");

const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "generated", "execution-results.json");
const fixedTimestamp = "2026-01-01T00:00:00.000Z";

function runTests() {
  const registry = loadAgentRegistry();
  const catalog = loadToolCatalog();
  const boundPlan = readBoundExecutionPlan(undefined, registry, catalog);
  assert.strictEqual(boundPlan.bound_execution_plan.length, 4, "Bound plan should contain four tasks.");

  for (const entry of boundPlan.bound_execution_plan) {
    const binding = resolveExecutionBinding(entry, registry, catalog);
    assert.strictEqual(binding.agent, entry.agent, `Agent should match for ${entry.task_id}.`);
    assert.ok(entry.matched_tools.includes(binding.tool), `Tool should match for ${entry.task_id}.`);
    assert.ok(entry.required_capabilities.includes(binding.capability), `Capability should match for ${entry.task_id}.`);
  }

  const successRun = runAgentExecutor({
    adapter: new MockExecutionAdapter({ clock: () => fixedTimestamp }),
  });
  assert.strictEqual(successRun.executionResults.mode, "mock", "Executor must remain in mock mode.");
  assert.ok(
    successRun.executionResults.results.every((result) => result.status === "success" && result.mode === "mock"),
    "All default mock tasks should succeed.",
  );
  assert.ok(fs.existsSync(outputPath), "Execution Results file should be generated.");

  const generatedResults = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  validateExecutionResults(generatedResults, registry, catalog, boundPlan);

  const failedRun = runAgentExecutor({
    adapter: new MockExecutionAdapter({
      failTaskIds: ["asset-requirements"],
      clock: () => fixedTimestamp,
    }),
    write: false,
  });
  const failedTasks = failedRun.executionResults.results.filter((result) => result.status === "failed");
  assert.deepStrictEqual(
    failedTasks.map((result) => result.task_id),
    ["asset-requirements"],
    "Configured mock failure should be recorded without stopping other tasks.",
  );
  assert.strictEqual(
    failedRun.executionResults.results.filter((result) => result.status === "success").length,
    3,
    "Other mock tasks should still succeed.",
  );

  assert.throws(
    () => runAgentExecutor({
      adapter: {
        mode: "live",
        execute() {
          throw new Error("Live execution must never be reached.");
        },
      },
      write: false,
    }),
    /only permits an execution adapter with mode "mock"/,
    "Non-mock adapters must be blocked.",
  );

  console.log(JSON.stringify({
    test: "agent-executor",
    bound_plan_read: true,
    agent_match: true,
    tool_match: true,
    mock_success: true,
    failed_task_handling: true,
    results_generated: true,
    non_mock_blocked: true,
    output: "generated/execution-results.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
