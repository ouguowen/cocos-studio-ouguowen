#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const {
  buildCacheHitExecutionMode,
  lookupExecutionCache,
} = require("../execution-cache/execution-cache");
const { buildExecutionMemoryContext } = require("../execution-memory/execution-memory");

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
  const requiredStages = ["blueprint-manager", "task-router", "agent-router", "capability-loader", "agent-executor", "validation-agent"];
  if (requiredStages.some((stage) => !fastLane.allowed_stages.includes(stage))) {
    throw new Error("Fast Lane must retain routing, capability, executor, and validation stages.");
  }
  for (const level of fastLane.allowed_levels) {
    validateBinding(fastLane.bindings?.[level], level);
  }
  const adaptive = config.adaptive_execution;
  if (!adaptive || typeof adaptive !== "object" || Array.isArray(adaptive)) {
    throw new Error("Task routing adaptive_execution must be an object.");
  }
  if (adaptive.enabled !== true
    || adaptive.fast_path !== "fast_path"
    || adaptive.full_pipeline !== "full_pipeline") {
    throw new Error("Adaptive Execution Router must define fast_path and full_pipeline routes.");
  }
  for (const field of ["max_fast_complexity", "max_fast_affected_agents", "max_fast_affected_nodes"]) {
    if (!Number.isInteger(adaptive[field]) || adaptive[field] < 0) {
      throw new Error(`Adaptive Execution Router ${field} must be a non-negative integer.`);
    }
  }
  assertStringArray(adaptive.full_pipeline_levels, "Adaptive Execution Router full_pipeline_levels");
  if (adaptive.full_pipeline_levels.some((level) => !levelIds.includes(level))) {
    throw new Error("Adaptive Execution Router full_pipeline_levels references an invalid level.");
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

function normalizeDependencyImpact(dependencyImpact = null) {
  if (dependencyImpact === null || dependencyImpact === undefined) {
    return {
      changed_nodes: [],
      affected_nodes: [],
      affected_agents: [],
    };
  }
  if (!dependencyImpact || typeof dependencyImpact !== "object" || Array.isArray(dependencyImpact)) {
    throw new Error("Task Router dependencyImpact must be an object.");
  }
  for (const field of ["changed_nodes", "affected_nodes", "affected_agents"]) {
    if (!Array.isArray(dependencyImpact[field])
      || dependencyImpact[field].some((item) => typeof item !== "string" || item.trim().length === 0)) {
      throw new Error(`Task Router dependencyImpact.${field} must be a string array.`);
    }
  }
  return {
    changed_nodes: [...new Set(dependencyImpact.changed_nodes)],
    affected_nodes: [...new Set(dependencyImpact.affected_nodes)],
    affected_agents: [...new Set(dependencyImpact.affected_agents)],
  };
}

function calculateTaskComplexity(level, dependencyImpact, forcedSignal = null) {
  const levelRank = levelIds.indexOf(level);
  const affectedAgentPenalty = dependencyImpact.affected_agents.length > 2 ? 1 : 0;
  const affectedNodePenalty = dependencyImpact.affected_nodes.length > 8 ? 1 : 0;
  const forcedPenalty = forcedSignal ? 2 : 0;
  return {
    level,
    level_rank: levelRank,
    affected_agent_count: dependencyImpact.affected_agents.length,
    affected_node_count: dependencyImpact.affected_nodes.length,
    score: levelRank + affectedAgentPenalty + affectedNodePenalty + forcedPenalty,
  };
}

function chooseAdaptiveExecution(config, selectedLevel, fastLaneAllowed, dependencyImpact, forcedSignal) {
  const adaptive = config.adaptive_execution;
  const complexity = calculateTaskComplexity(selectedLevel, dependencyImpact, forcedSignal);
  const blocks = [];
  if (!fastLaneAllowed) {
    blocks.push("fast-lane-not-allowed");
  }
  if (adaptive.full_pipeline_levels.includes(selectedLevel)) {
    blocks.push(`level-${selectedLevel}-requires-full-pipeline`);
  }
  if (complexity.score > adaptive.max_fast_complexity) {
    blocks.push("task-complexity-exceeds-fast-path");
  }
  if (complexity.affected_agent_count > adaptive.max_fast_affected_agents) {
    blocks.push("too-many-affected-agents");
  }
  if (complexity.affected_node_count > adaptive.max_fast_affected_nodes) {
    blocks.push("too-many-affected-nodes");
  }
  const mode = blocks.length === 0 ? "fast" : "full";
  return {
    route_type: mode === "fast" ? adaptive.fast_path : adaptive.full_pipeline,
    execution_path: mode === "fast" ? "fast" : "studio",
    execution_mode: {
      mode,
      agents: [...dependencyImpact.affected_agents],
    },
    runtime_mode: "mock",
    task_complexity: complexity,
    decision_reasons: blocks.length === 0 ? ["adaptive-fast-path-approved"] : blocks,
  };
}

function resolveExecutionMemoryContext(request, options = {}) {
  if (options.executionMemoryContext) {
    return clone(options.executionMemoryContext);
  }
  if (options.executionMemory || options.executionMemoryStore || options.executionMemoryHistoryPath) {
    return buildExecutionMemoryContext(request, {
      store: options.executionMemoryStore || options.executionMemory,
      historyPath: options.executionMemoryHistoryPath,
    });
  }
  return null;
}

function resolveExecutionCacheContext(request, options = {}) {
  if (options.executionCacheResult) {
    return clone(options.executionCacheResult);
  }
  if (options.executionCacheStore || options.executionCache) {
    return lookupExecutionCache(request, options.executionCacheStore || options.executionCache);
  }
  return {
    status: "disabled",
    hit: false,
    fingerprint: null,
    execution_enabled: false,
    execution_mode: null,
    entry: null,
  };
}

function routeTask(request, options = {}) {
  assertNonEmptyString(request, "Task Router request");
  const config = options.config || loadTaskRoutingConfig(options.configPath);
  validateTaskRoutingConfig(config);
  const normalizedRequest = normalizeText(request);
  const executionMemory = resolveExecutionMemoryContext(request, options);
  const executionCache = resolveExecutionCacheContext(request, options);

  const forcedSignal = findSignal(normalizedRequest, config.force_full_pipeline_signals);
  const cachedExecutionMode = executionCache.status === "hit" && !forcedSignal
    ? buildCacheHitExecutionMode(executionCache)
    : null;
  if (cachedExecutionMode) {
    return {
      level: "L0",
      execution_path: "fast",
      route_type: "fast_path",
      reason: `Execution Cache hit: ${executionCache.fingerprint}`,
      matched_signal: "execution-cache-hit",
      adaptive_reasons: ["execution-cache-fast-path-hit"],
      task_complexity: {
        level: "L0",
        level_rank: 0,
        affected_agent_count: cachedExecutionMode.agents.length,
        affected_node_count: 0,
        score: 0,
      },
      dependency_impact: normalizeDependencyImpact(options.dependencyImpact),
      execution_cache: executionCache,
      execution_memory: executionMemory,
      fast_lane_allowed: true,
      binding: clone(config.fast_lane.bindings.L0),
      allowed_stages: [...config.fast_lane.allowed_stages],
      validation_required: true,
      runtime_mode: "mock",
      execution_mode: cachedExecutionMode,
      execution_enabled: false,
    };
  }

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
  const dependencyImpact = normalizeDependencyImpact(options.dependencyImpact);
  const adaptiveDecision = chooseAdaptiveExecution(
    config,
    selectedLevel,
    fastLaneAllowed,
    dependencyImpact,
    forcedSignal,
  );
  const executionPath = adaptiveDecision.execution_path;
  const reason = forcedSignal
    ? `Force-full signal matched: ${forcedSignal}`
    : matchedSignal
      ? `${selectedLevel} signal matched: ${matchedSignal}`
      : `No task signal matched; defaulted to ${config.default_level}.`;

  return {
    level: selectedLevel,
    execution_path: executionPath,
    route_type: adaptiveDecision.route_type,
    reason,
    matched_signal: matchedSignal,
    adaptive_reasons: adaptiveDecision.decision_reasons,
    task_complexity: adaptiveDecision.task_complexity,
    dependency_impact: clone(dependencyImpact),
    execution_cache: executionCache,
    execution_memory: executionMemory,
    fast_lane_allowed: executionPath === "fast",
    binding: executionPath === "fast" ? clone(config.fast_lane.bindings[selectedLevel]) : null,
    allowed_stages: executionPath === "fast" ? [...config.fast_lane.allowed_stages] : [],
    validation_required: true,
    runtime_mode: adaptiveDecision.runtime_mode,
    execution_mode: adaptiveDecision.execution_mode,
    execution_enabled: false,
  };
}

module.exports = {
  containsSignal,
  loadTaskRoutingConfig,
  normalizeText,
  routeTask,
  calculateTaskComplexity,
  resolveExecutionCacheContext,
  resolveExecutionMemoryContext,
  validateTaskRoutingConfig,
};
