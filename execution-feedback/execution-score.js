#!/usr/bin/env node

"use strict";

function normalizeValidation(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (value && typeof value === "object") {
    if (typeof value.passed === "boolean") {
      return value.passed;
    }
    if (typeof value.status === "string") {
      return value.status.toUpperCase() === "PASS";
    }
  }
  return false;
}

function classifyError(error) {
  const message = String(error || "").toLowerCase();
  if (!message) {
    return "none";
  }
  if (message.includes("node missing") || message.includes("missing")) {
    return "missing-node";
  }
  if (message.includes("validation")) {
    return "validation";
  }
  if (message.includes("timeout")) {
    return "timeout";
  }
  return "generic";
}

function scoreExecutionResult(result) {
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    throw new Error("Execution Score requires a result object.");
  }
  const success = result.success === true;
  const validationPassed = normalizeValidation(result.validation_result ?? result.validation);
  const executionTime = Number.isFinite(result.execution_time) ? result.execution_time : Infinity;
  const errorType = classifyError(result.error);

  let score = 0;
  if (success) {
    score += 50;
  } else {
    score -= errorType === "timeout" ? 20 : errorType === "missing-node" ? 25 : 15;
  }
  if (validationPassed) {
    score += 30;
  }
  if (executionTime <= 10) {
    score += 10;
  } else if (executionTime <= 20) {
    score += 5;
  }
  if (errorType === "none") {
    score += 10;
  }
  score = Math.max(0, Math.min(100, score));
  return {
    score,
    success,
    validation_passed: validationPassed,
    execution_time: Number.isFinite(executionTime) ? executionTime : null,
    error_type: errorType,
  };
}

module.exports = {
  classifyError,
  scoreExecutionResult,
};
