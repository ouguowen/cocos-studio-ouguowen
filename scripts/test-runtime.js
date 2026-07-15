#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const { runAgentExecutor } = require("../executor/agent-executor");
const {
  createDefaultRuntimeManager,
  createRuntimeReport,
  validateRuntimeReport,
  writeRuntimeReport,
} = require("../runtime/runtime-manager");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "runtime-report.json");
const fixedTimestamp = "2026-01-01T00:00:00.000Z";
const request = {
  task_id: "system-implementation-plan",
  agent: "cocos-programmer",
  capability: "system-implementation-plan",
};

function runTests() {
  const mockManager = createDefaultRuntimeManager();
  assert.strictEqual(mockManager.runtime_mode, "mock", "Runtime Manager should default to mock.");
  assert.strictEqual(mockManager.execution_enabled, false, "Runtime Manager should disable execution.");
  assert.strictEqual(mockManager.list().length, 4, "Four pluggable Runtimes should register.");
  assert.ok(
    mockManager.list().every((runtime) => runtime.execution_enabled === false),
    "Every Runtime should default to execution_enabled false.",
  );
  assert.strictEqual(mockManager.match("system-implementation-plan").type, "engine");
  assert.strictEqual(mockManager.match("asset-requirements").type, "asset");
  assert.strictEqual(mockManager.match("code-generation").type, "code");
  assert.strictEqual(mockManager.match("version-control").type, "version-control");

  const mockResult = mockManager.execute(request);
  assert.strictEqual(mockResult.status, "simulated", "Mock Runtime should simulate execution.");
  assert.strictEqual(mockResult.runtime_mode, "mock");
  assert.strictEqual(mockResult.execution_enabled, false);
  assert.strictEqual(mockManager.result().length, 1, "Runtime Manager should record mock routing events.");

  const productionManager = createDefaultRuntimeManager({ runtimeMode: "production" });
  const matchedRuntime = productionManager.match(request.capability);
  let productionImplementationReached = false;
  matchedRuntime.perform = () => {
    productionImplementationReached = true;
    throw new Error("Production implementation must not be reached.");
  };
  assert.throws(
    () => productionManager.execute(request),
    (error) => error.code === "RUNTIME_EXECUTION_DISABLED",
    "Production Runtime execution should be blocked.",
  );
  assert.strictEqual(
    productionImplementationReached,
    false,
    "Runtime disabled gate must stop before production implementation.",
  );

  const executorRuntimeManager = createDefaultRuntimeManager({ runtimeMode: "mock" });
  const executorResult = runAgentExecutor({
    runtimeManager: executorRuntimeManager,
    runtimeMode: "mock",
    adapterOptions: { clock: () => fixedTimestamp },
    write: false,
  });
  assert.strictEqual(executorResult.runtimeMode, "mock", "Executor should expose Runtime mode.");
  assert.ok(
    executorResult.executionResults.results.every(
      (result) => result.status === "success" && result.mode === "mock",
    ),
    "Executor should preserve mock Adapter results.",
  );
  assert.strictEqual(
    executorRuntimeManager.result().length,
    executorResult.executionResults.results.length,
    "Every Executor task should pass through Runtime Manager.",
  );
  assert.throws(
    () => runAgentExecutor({ runtimeMode: "production", write: false }),
    (error) => error.code === "RUNTIME_EXECUTION_DISABLED",
    "Executor production Runtime mode should remain disabled.",
  );

  const report = createRuntimeReport(request);
  assert.strictEqual(validateRuntimeReport(report), true, "Runtime Report should validate.");
  const writtenPath = writeRuntimeReport(report);
  assert.strictEqual(writtenPath, reportPath, "Runtime Report should use generated output path.");
  assert.ok(fs.existsSync(reportPath), "Runtime Report should be generated.");
  const generatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.strictEqual(generatedReport.runtime_mode, "mock");
  assert.strictEqual(generatedReport.production_gate.status, "blocked");
  assert.strictEqual(generatedReport.execution_enabled, false);

  console.log(JSON.stringify({
    test: "production-runtime",
    runtime_registration: true,
    runtime_matching: true,
    mock_runtime: true,
    executor_runtime_integration: true,
    production_runtime_blocked: true,
    production_implementation_reached: false,
    report_generated: true,
    provider_abstracted: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/runtime-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
