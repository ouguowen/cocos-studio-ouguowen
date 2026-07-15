#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const loopDir = __dirname;
const defaultPolicyPath = path.join(loopDir, "retry-policy.json");
const defaultTrackerPath = path.join(loopDir, "progress-tracker.json");
const TRACKER_STATUSES = new Set(["idle", "running", "retrying", "continuing", "repairing", "completed", "stopped"]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function resolveInside(filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(loopDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${loopDir}.`);
  }
  return resolvedPath;
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertUniqueStrings(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array.`);
  }
  for (const item of value) {
    assertNonEmptyString(item, `${label} item`);
  }
  if (new Set(value).size !== value.length) {
    throw new Error(`${label} must not contain duplicates.`);
  }
}

function validateRetryPolicy(policy) {
  if (!policy || typeof policy !== "object" || Array.isArray(policy)) {
    throw new Error("Retry Policy must be an object.");
  }
  assertNonEmptyString(policy.schema_version, "Retry Policy schema_version");
  if (policy.mode !== "loop-policy-only" || policy.execution_enabled !== false) {
    throw new Error("Retry Policy must remain policy-only with execution disabled.");
  }
  if (!Number.isInteger(policy.default_max_iterations) || policy.default_max_iterations < 1
    || !Number.isInteger(policy.max_retries) || policy.max_retries < 0) {
    throw new Error("Retry Policy iteration and retry limits are invalid.");
  }
  if (!new Set(["continue", "repair"]).has(policy.warning_action)) {
    throw new Error("Retry Policy warning_action must be continue or repair.");
  }
  const requiredStatuses = ["FAILED", "WARNING", "PASS"];
  if (!policy.status_actions || typeof policy.status_actions !== "object") {
    throw new Error("Retry Policy must contain status_actions.");
  }
  for (const status of requiredStatuses) {
    assertNonEmptyString(policy.status_actions[status], `Retry Policy status action ${status}`);
  }
  return true;
}

function loadRetryPolicy(policyPath = defaultPolicyPath) {
  const policy = readJson(resolveInside(policyPath, "Retry Policy"), "Retry Policy");
  validateRetryPolicy(policy);
  return policy;
}

function createProgressTracker(maxIterations, policy = loadRetryPolicy()) {
  const resolvedMax = maxIterations === undefined ? policy.default_max_iterations : maxIterations;
  if (!Number.isInteger(resolvedMax) || resolvedMax < 1) {
    throw new Error("Loop max_iterations must be a positive integer.");
  }
  return {
    schema_version: "1.0.0",
    mode: "autonomous-loop-simulation",
    execution_enabled: false,
    iteration_id: "iteration-0000",
    max_iterations: resolvedMax,
    current_iteration: 0,
    current_status: "idle",
    retry_count: 0,
    completed_tasks: [],
    failed_tasks: [],
    iterations: [],
  };
}

function validateProgressTracker(tracker) {
  if (!tracker || typeof tracker !== "object" || Array.isArray(tracker)) {
    throw new Error("Loop Progress Tracker must be an object.");
  }
  assertNonEmptyString(tracker.schema_version, "Loop Progress Tracker schema_version");
  if (tracker.mode !== "autonomous-loop-simulation" || tracker.execution_enabled !== false) {
    throw new Error("Loop Progress Tracker must remain a simulation with execution disabled.");
  }
  if (!/^iteration-[0-9]{4,}$/.test(tracker.iteration_id)) {
    throw new Error("Loop Progress Tracker iteration_id is invalid.");
  }
  if (!Number.isInteger(tracker.max_iterations) || tracker.max_iterations < 1
    || !Number.isInteger(tracker.current_iteration) || tracker.current_iteration < 0
    || tracker.current_iteration > tracker.max_iterations
    || !Number.isInteger(tracker.retry_count) || tracker.retry_count < 0) {
    throw new Error("Loop Progress Tracker counters are invalid.");
  }
  if (!TRACKER_STATUSES.has(tracker.current_status)) {
    throw new Error(`Loop Progress Tracker has invalid status: ${tracker.current_status}`);
  }
  assertUniqueStrings(tracker.completed_tasks, "Loop Progress Tracker completed_tasks");
  assertUniqueStrings(tracker.failed_tasks, "Loop Progress Tracker failed_tasks");
  const expectedIterationRecords = tracker.current_status === "running"
    ? tracker.current_iteration - 1
    : tracker.current_iteration;
  if (!Array.isArray(tracker.iterations) || tracker.iterations.length !== expectedIterationRecords) {
    throw new Error("Loop Progress Tracker iterations do not match its lifecycle state.");
  }
  for (const iteration of tracker.iterations) {
    for (const field of ["iteration_id", "decision_id", "task_id", "validation_status", "next_action"]) {
      assertNonEmptyString(iteration[field], `Loop iteration ${field}`);
    }
    if (!new Set(["FAILED", "WARNING", "PASS"]).has(iteration.validation_status)) {
      throw new Error(`Loop iteration has invalid validation_status: ${iteration.validation_status}`);
    }
    if (iteration.execution_mode !== "mock" || iteration.execution_enabled !== false
      || typeof iteration.task_regenerated !== "boolean") {
      throw new Error("Loop iteration must remain a disabled mock execution record.");
    }
  }
  return true;
}

function loadProgressTracker(trackerPath = defaultTrackerPath) {
  const tracker = readJson(resolveInside(trackerPath, "Loop Progress Tracker"), "Loop Progress Tracker");
  validateProgressTracker(tracker);
  return tracker;
}

function writeProgressTracker(tracker, trackerPath = defaultTrackerPath) {
  validateProgressTracker(tracker);
  const resolvedPath = resolveInside(trackerPath, "Loop Progress Tracker");
  fs.writeFileSync(resolvedPath, `${JSON.stringify(tracker, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function beginIteration(tracker) {
  validateProgressTracker(tracker);
  if (tracker.current_iteration >= tracker.max_iterations) {
    throw new Error("Loop cannot start another iteration after max_iterations.");
  }
  const next = clone(tracker);
  next.current_iteration += 1;
  next.iteration_id = `iteration-${String(next.current_iteration).padStart(4, "0")}`;
  next.current_status = "running";
  return next;
}

function decideNextAction(validationStatus, tracker, policy, warningAction = policy.warning_action) {
  if (validationStatus === "PASS") {
    return { trackerStatus: "completed", nextAction: policy.status_actions.PASS, shouldContinue: false };
  }
  if (validationStatus === "FAILED") {
    const retryAllowed = tracker.retry_count <= policy.max_retries
      && tracker.current_iteration < tracker.max_iterations;
    return retryAllowed
      ? { trackerStatus: "retrying", nextAction: policy.status_actions.FAILED, shouldContinue: true }
      : { trackerStatus: "stopped", nextAction: "stop-retry-limit", shouldContinue: false };
  }
  if (validationStatus === "WARNING") {
    if (warningAction === "repair") {
      const canRepair = tracker.current_iteration < tracker.max_iterations;
      return canRepair
        ? { trackerStatus: "repairing", nextAction: "repair-validation-warnings", shouldContinue: true }
        : { trackerStatus: "stopped", nextAction: "stop-max-iterations", shouldContinue: false };
    }
    const canContinue = tracker.current_iteration < tracker.max_iterations;
    return canContinue
      ? { trackerStatus: "continuing", nextAction: policy.status_actions.WARNING, shouldContinue: true }
      : { trackerStatus: "stopped", nextAction: "stop-max-iterations", shouldContinue: false };
  }
  throw new Error(`Loop received unsupported validation status: ${validationStatus}`);
}

function completeIteration(tracker, summary, policy = loadRetryPolicy(), options = {}) {
  validateProgressTracker(tracker);
  if (tracker.current_status !== "running") {
    throw new Error("Loop iteration can only complete from running status.");
  }
  const next = clone(tracker);
  if (summary.validation_status === "FAILED") {
    next.retry_count += 1;
    if (!next.failed_tasks.includes(summary.task_id)) {
      next.failed_tasks.push(summary.task_id);
    }
  } else if (!next.completed_tasks.includes(summary.task_id)) {
    next.completed_tasks.push(summary.task_id);
  }
  const transition = decideNextAction(
    summary.validation_status,
    next,
    policy,
    options.warningAction || policy.warning_action,
  );
  next.current_status = transition.trackerStatus;
  next.iterations.push({
    iteration_id: next.iteration_id,
    decision_id: summary.decision_id,
    task_id: summary.task_id,
    validation_status: summary.validation_status,
    next_action: transition.nextAction,
    execution_mode: "mock",
    execution_enabled: false,
    task_regenerated: summary.task_regenerated === true,
  });
  validateProgressTracker(next);
  return { tracker: next, ...transition };
}

module.exports = {
  beginIteration,
  completeIteration,
  createProgressTracker,
  decideNextAction,
  loadProgressTracker,
  loadRetryPolicy,
  validateProgressTracker,
  validateRetryPolicy,
  writeProgressTracker,
};
