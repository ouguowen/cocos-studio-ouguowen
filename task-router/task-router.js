#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const configDir = path.join(root, "config");
const defaultConfigPath = path.join(configDir, "task-routing.json");
const levelIds = ["L0", "L1", "L2", "L3"];
const fastLevelIds = new Set(["L0", "L1"]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || value.length === 0
    || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`${label} must be a non-empty string array.`);
  }
  if (new Set(value).size !== value.length) {
    throw new Error(`${label} must not contain duplicates.`);
  }
}

function validateBinding(binding, level) {
  if (!binding || typeof binding !== "object" || Array.isArray(binding)) {
    throw new Error(`Task routing ${level} binding must be an object.`);
  }
  for (const field of ["task_id", "agent", "capability", "tool_id"]) {
    assertNonEmptyString(binding[field], `Task routing ${level} binding ${field}`);
  }
  if (binding.task_id !== binding.capability) {
    throw new Error(`Task routing ${level} task_id must equal its direct capability.`);
  }
}

function validateTaskRoutingConfig(config) {
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("Task routing config must be an object.");
  }
  assertNonEmptyString(config.schema_version, "Task routing schema_version");
  if (config.execution_enabled !== false) {
    throw new Error("Task routing must keep execution_enabled false.");
  }
  if (!levelIds.includes(config.default_level)) {
    throw new Error("Task routing default_level must be L0, L1, L2, or L3.");
  }
  if (!Array.isArray(config.level_order)
    || config.level_order.length !== levelIds.length
    || config.level_order.some((level, index) => level !== levelIds[index])) {
    throw new Error("Task routing level_order must be L0, L1, L2, L3.");
  }
  if (!config.levels || typeof config.levels !== "object" || Array.isArray(config.levels)) {
    throw new Error("Task routing levels must be an object.");
  }
  for (const [index, level] of levelIds.entries()) {
    const definition = config.levels[level];
    if (!definition || definition.rank !== index) {
      throw new Error(`Task routing ${level} rank must be ${index}.`);
    }
    assertNonEmptyString(definition.description, `Task routing ${level} description`);
    assertStringArray(definition.signals, `Task routing ${level} signals`);
  }

  const fastLane = config.fast_lane;
  if (!fastLane || typeof fastLane !== "object" || Array.isArray(fastLane)) {
    throw new Error("Task routing fast_lane must be an object.");
  }
  if (typeof fastLane.enabled !== "boolean") {
    throw new Error("Task routing fast_lane enabled must be boolean.");
  }
  if (fastLane.execution_mode !== "mock" || fastLane.validation_required !== true) {
    throw new Error("Fast Lane must use mock execution and require validation.");
  }
  assertStringArray(fastLane.allowed_levels, "Fast Lane allowed_levels");
  if (fastLane.allowed_levels.some((level) => !fastLevelIds.has(level))) {
    throw new Error("Fast Lane may only allow L0 and L1 tasks.");
  }
  assertStringArray(fastLane.allowed_stages, "Fast Lane allowed_stages");
  const requiredStages = ["task-router", "capability-loader", "agent-executor", "validation-agent"];
  if (requiredStages.some((stage) => !fastLane.allowed_stages.includes(stage))) {
    throw new Error("Fast Lane must retain routing, capability, executor, and validation stages.");
  }
  for (const level of fastLane.allowed_levels) {
    validateBinding(fastLane.bindings?.[level], level);
  }
  assertStringArray(config.force_full_pipeline_signals, "Task routing force_full_pipeline_signals");
  return true;
}

function loadTaskRoutingConfig(configPath = defaultConfigPath) {
  const resolvedPath = path.resolve(configPath);
  const relative = path.relative(configDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Task routing config must stay inside ${configDir}.`);
  }
  let config;
  try {
    config = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read Task routing config ${resolvedPath}: ${error.message}`);
  }
  validateTaskRoutingConfig(config);
  return config;
}

function normalizeText(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function containsSignal(normalizedRequest, rawSignal) {
  const signal = normalizeText(rawSignal);
  if (/^[a-z0-9-]{1,3}$/.test(signal)) {
    const escaped = signal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(normalizedRequest);
  }
  return normalizedRequest.includes(signal);
}

function findSignal(normalizedRequest, signals) {
  return signals.find((signal) => containsSignal(normalizedRequest, signal)) || null;
}

function routeTask(request, options = {}) {
  assertNonEmptyString(request, "Task Router request");
  const config = options.config || loadTaskRoutingConfig(options.configPath);
  validateTaskRoutingConfig(config);
  const normalizedRequest = normalizeText(request);

  const forcedSignal = findSignal(normalizedRequest, config.force_full_pipeline_signals);
  let selectedLevel = forcedSignal ? "L3" : null;
  let matchedSignal = forcedSignal;
  if (!selectedLevel) {
    for (const level of [...config.level_order].reverse()) {
      const signal = findSignal(normalizedRequest, config.levels[level].signals);
      if (signal) {
        selectedLevel = level;
        matchedSignal = signal;
        break;
      }
    }
  }
  selectedLevel ||= config.default_level;

  const fastLaneAllowed = config.fast_lane.enabled
    && config.fast_lane.allowed_levels.includes(selectedLevel);
  const executionPath = fastLaneAllowed ? "fast" : "studio";
  const reason = forcedSignal
    ? `Force-full signal matched: ${forcedSignal}`
    : matchedSignal
      ? `${selectedLevel} signal matched: ${matchedSignal}`
      : `No task signal matched; defaulted to ${config.default_level}.`;

  return {
    level: selectedLevel,
    execution_path: executionPath,
    reason,
    matched_signal: matchedSignal,
    fast_lane_allowed: fastLaneAllowed,
    binding: fastLaneAllowed ? clone(config.fast_lane.bindings[selectedLevel]) : null,
    allowed_stages: fastLaneAllowed ? [...config.fast_lane.allowed_stages] : [],
    validation_required: true,
    execution_mode: "mock",
    execution_enabled: false,
  };
}

module.exports = {
  containsSignal,
  loadTaskRoutingConfig,
  normalizeText,
  routeTask,
  validateTaskRoutingConfig,
};
