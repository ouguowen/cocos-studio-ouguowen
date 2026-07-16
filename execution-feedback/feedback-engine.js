#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { createTaskFingerprint } = require("../execution-cache/task-fingerprint");
const { scoreExecutionResult } = require("./execution-score");
const {
  createEmptyFailureMemory,
  lookupFailurePatterns,
  recordFailurePattern,
  validateFailureMemory,
} = require("./failure-memory");

const feedbackDir = __dirname;
const defaultSuccessPatternsPath = path.join(feedbackDir, "success-patterns.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadSuccessPatterns(patternsPath = defaultSuccessPatternsPath) {
  const resolvedPath = path.resolve(patternsPath);
  const relative = path.relative(feedbackDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Success patterns must stay inside ${feedbackDir}.`);
  }
  const patterns = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  validateSuccessPatterns(patterns);
  return patterns;
}

function validateSuccessPatterns(patterns) {
  if (!patterns || typeof patterns !== "object" || Array.isArray(patterns)
    || patterns.execution_enabled !== false
    || !patterns.patterns || typeof patterns.patterns !== "object") {
    throw new Error("Success patterns must be a disabled pattern object.");
  }
  return true;
}

function createLearningSignal(score, result) {
  if (score.success && score.validation_passed && score.score >= 90) {
    return "prefer-route";
  }
  if (!score.success || !score.validation_passed || result.error) {
    return "avoid-route";
  }
  return "observe-route";
}

function evaluateExecutionFeedback(result, options = {}) {
  const score = scoreExecutionResult(result);
  const fingerprint = result.fingerprint || createTaskFingerprint(result.task || result.request || "");
  const learningSignal = createLearningSignal(score, result);
  const route = result.route || result.route_type || result.execution_mode?.mode || "unknown";
  let failureMemory = options.failureMemory || createEmptyFailureMemory();
  validateFailureMemory(failureMemory);
  let failurePattern = null;
  if (learningSignal === "avoid-route") {
    const recorded = recordFailurePattern({
      fingerprint,
      error: result.error || "validation failed",
      route,
    }, failureMemory);
    failureMemory = recorded.memory;
    failurePattern = recorded.pattern;
  }
  return {
    score,
    learning_signal: learningSignal,
    route_update: {
      fingerprint,
      route,
      confidence_delta: learningSignal === "prefer-route" ? 0.15 : learningSignal === "avoid-route" ? -0.35 : 0,
      agents: [...(result.agents || [])],
      failure_pattern: failurePattern,
    },
    failure_memory: failureMemory,
    execution_enabled: false,
  };
}

function buildFeedbackRoutingContext(request, options = {}) {
  const successPatterns = options.successPatterns || loadSuccessPatterns(options.successPatternsPath);
  validateSuccessPatterns(successPatterns);
  const failureMemory = options.failureMemory || createEmptyFailureMemory();
  validateFailureMemory(failureMemory);
  const fingerprint = createTaskFingerprint(request);
  const successPattern = successPatterns.patterns[fingerprint] || null;
  const fastFailures = lookupFailurePatterns(request, "fast", failureMemory);
  const failureCount = fastFailures.reduce((total, pattern) => total + pattern.count, 0);
  const successScore = successPattern ? successPattern.score : 0;
  const confidence_delta = (successScore >= 90 ? 0.15 : successScore >= 70 ? 0.05 : 0)
    - Math.min(0.6, failureCount * 0.2);
  return {
    schema_version: successPatterns.schema_version,
    execution_enabled: false,
    fingerprint,
    success_pattern: successPattern ? clone(successPattern) : null,
    failure_patterns: fastFailures.map(clone),
    confidence_delta,
    prefer_fast: Boolean(successPattern && successPattern.best_route === "fast" && failureCount === 0),
    avoid_fast: failureCount > 0,
  };
}

module.exports = {
  buildFeedbackRoutingContext,
  evaluateExecutionFeedback,
  loadSuccessPatterns,
  validateSuccessPatterns,
};
