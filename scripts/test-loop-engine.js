#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  runDevelopmentLoop,
  validateLoopReport,
} = require("../loop-engine/loop-controller");
const {
  beginIteration,
  createProgressTracker,
  decideNextAction,
  loadProgressTracker,
  loadRetryPolicy,
  validateProgressTracker,
} = require("../loop-engine/iteration-manager");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "loop-report.json");
const fixedTimestamp = "2026-01-01T00:00:00.000Z";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function transformValidationInputs(iteration, inputs) {
  const transformed = clone(inputs);
  if (iteration === 1) {
    transformed.scannerReport.scenes.scene_count = 0;
    transformed.scannerReport.scenes.node_count = 0;
    return transformed;
  }
  if (iteration === 3) {
    transformed.scannerReport.code.todo_count = 0;
    transformed.projectContext.current_project_state.status = "on-track";
    transformed.projectContext.tasks = transformed.projectContext.tasks.map((task) => ({
      ...task,
      status: "completed",
    }));
    transformed.feedbackReport.summary.failed_count = 0;
  }
  return transformed;
}

function runTests() {
  const policy = loadRetryPolicy();
  const repairTracker = beginIteration(createProgressTracker(2, policy));
  const repairTransition = decideNextAction("WARNING", repairTracker, policy, "repair");
  assert.strictEqual(repairTransition.nextAction, "repair-validation-warnings");
  assert.strictEqual(repairTransition.shouldContinue, true, "WARNING should support repair mode.");

  const result = runDevelopmentLoop({
    maxIterations: 3,
    policy,
    validationInputTransformer: transformValidationInputs,
    mockAdapterOptions: {
      clock: () => fixedTimestamp,
    },
  });
  assert.strictEqual(result.execution_enabled, false, "Loop must disable execution.");
  assert.strictEqual(validateLoopReport(result.report), true, "Loop Report should validate.");
  assert.strictEqual(result.report.iteration, "iteration-0003");
  assert.strictEqual(result.report.status, "PASS", "Loop should stop after PASS.");
  assert.strictEqual(result.report.next_action, "advance-to-next-phase");
  assert.deepStrictEqual(result.report.completed_tasks, ["system-implementation-plan"]);
  assert.deepStrictEqual(result.report.failed_tasks, ["system-implementation-plan"]);

  const tracker = loadProgressTracker();
  assert.strictEqual(validateProgressTracker(tracker), true, "Progress Tracker should validate.");
  assert.strictEqual(tracker.iteration_id, "iteration-0003");
  assert.strictEqual(tracker.max_iterations, 3);
  assert.strictEqual(tracker.current_status, "completed");
  assert.strictEqual(tracker.retry_count, 1, "FAILED validation should increment retry_count.");
  assert.deepStrictEqual(
    tracker.iterations.map((iteration) => iteration.validation_status),
    ["FAILED", "WARNING", "PASS"],
    "Loop should preserve validation lifecycle order.",
  );
  assert.strictEqual(tracker.iterations[1].task_regenerated, true, "Task should regenerate after FAILED.");
  assert.ok(
    tracker.iterations.every(
      (iteration) => iteration.execution_mode === "mock" && iteration.execution_enabled === false,
    ),
    "Every iteration should remain a disabled mock execution.",
  );

  assert.strictEqual(result.decisionHistory.decisions.length, 3, "Each iteration should generate a Decision.");
  assert.deepStrictEqual(
    result.decisionHistory.decisions.map((decision) => decision.decision_id),
    ["decision-0001", "decision-0002", "decision-0003"],
  );
  assert.strictEqual(result.feedbackState.feedbackSkipped, false, "Abstract Provider selection should support feedback.");
  assert.strictEqual(result.feedbackState.entries.length, 7, "Each iteration should add one Feedback record.");
  const capabilityMetrics = Object.values(
    result.feedbackState.store.capabilities["system-implementation-plan"],
  );
  assert.strictEqual(capabilityMetrics.length, 1, "Capability feedback should retain one abstract Provider record.");
  assert.strictEqual(
    capabilityMetrics[0].samples,
    4,
    "Feedback Store should include all simulated loop iterations.",
  );

  assert.ok(fs.existsSync(reportPath), "Loop Report should be generated.");
  const generatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.strictEqual(generatedReport.status, "PASS");
  assert.strictEqual(generatedReport.execution_enabled, false);
  assert.throws(
    () => validateLoopReport({ ...generatedReport, execution_enabled: true }),
    /execution_enabled false/,
    "Loop Report should reject enabled execution.",
  );

  console.log(JSON.stringify({
    test: "loop-engine",
    decision_connected: true,
    task_generator_connected: true,
    mock_executor_connected: true,
    validation_connected: true,
    feedback_connected: true,
    failed_regeneration: true,
    warning_continue_and_repair: true,
    pass_phase_advance: true,
    progress_tracking: true,
    report_generated: true,
    provider_abstracted: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/loop-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
