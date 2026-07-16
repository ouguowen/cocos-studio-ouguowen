#!/usr/bin/env node

"use strict";

const assert = require("assert");

const { createGameBlueprint } = require("../blueprint/blueprint-manager");
const {
  buildFeedbackRoutingContext,
  evaluateExecutionFeedback,
  loadSuccessPatterns,
} = require("../execution-feedback/feedback-engine");
const {
  createEmptyFailureMemory,
  recordFailurePattern,
} = require("../execution-feedback/failure-memory");
const { scoreExecutionResult } = require("../execution-feedback/execution-score");
const { routeTask } = require("../task-router/task-router");

function runTests() {
  const score = scoreExecutionResult({
    success: true,
    validation_result: true,
    execution_time: 15,
  });
  assert.strictEqual(score.score, 95);
  assert.strictEqual(score.success, true);
  assert.strictEqual(score.validation_passed, true);

  const feedback = evaluateExecutionFeedback({
    task: "修改塔防按钮颜色",
    route: "fast",
    agents: ["artist", "cocos-programmer"],
    success: true,
    validation_result: true,
    execution_time: 15,
  });
  assert.strictEqual(feedback.learning_signal, "prefer-route");
  assert.strictEqual(feedback.route_update.confidence_delta, 0.15);
  assert.strictEqual(feedback.execution_enabled, false);

  let failureMemory = createEmptyFailureMemory();
  for (let index = 0; index < 3; index += 1) {
    failureMemory = recordFailurePattern({
      task: "修改塔防按钮颜色",
      error: "node missing",
      route: "fast",
    }, failureMemory).memory;
  }
  const failedFeedback = evaluateExecutionFeedback({
    task: "修改塔防按钮颜色",
    route: "fast",
    agents: ["artist", "cocos-programmer"],
    success: false,
    validation_result: false,
    execution_time: 18,
    error: "node missing",
  }, {
    failureMemory,
  });
  assert.strictEqual(failedFeedback.learning_signal, "avoid-route");
  assert.strictEqual(failedFeedback.route_update.failure_pattern.count, 4);

  const successPatterns = loadSuccessPatterns();
  const successContext = buildFeedbackRoutingContext("修改塔防按钮颜色", {
    successPatterns,
  });
  assert.strictEqual(successContext.prefer_fast, true);
  assert.strictEqual(successContext.confidence_delta, 0.15);

  const failureContext = buildFeedbackRoutingContext("修改塔防按钮颜色", {
    successPatterns,
    failureMemory: failedFeedback.failure_memory,
  });
  assert.strictEqual(failureContext.avoid_fast, true);
  assert.ok(failureContext.confidence_delta < 0);

  const blueprint = createGameBlueprint("修改塔防按钮颜色");
  const routed = routeTask("修改塔防按钮颜色", {
    dependencyImpact: blueprint.dependency_impact,
    failureMemory: failedFeedback.failure_memory,
  });
  assert.strictEqual(routed.execution_feedback.avoid_fast, true);
  assert.strictEqual(routed.route_type, "full_pipeline");
  assert.strictEqual(routed.execution_mode.mode, "full");
  assert.ok(routed.execution_mode.confidence < 0.5);

  console.log(JSON.stringify({
    test: "execution-feedback",
    score: score.score,
    learning_signal: feedback.learning_signal,
    failure_count: failedFeedback.route_update.failure_pattern.count,
    success_prefer_fast: successContext.prefer_fast,
    failure_avoid_fast: failureContext.avoid_fast,
    routed_mode_after_failures: routed.execution_mode,
    execution_enabled: false,
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
