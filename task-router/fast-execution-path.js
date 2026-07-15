#!/usr/bin/env node

"use strict";

const { requireRegisteredAgent } = require("../scheduler/agent-registry");

function buildFastBoundExecutionPlan(routing, capability, registry, catalog) {
  if (!routing || routing.execution_path !== "fast" || !routing.fast_lane_allowed) {
    throw new Error("Fast Execution Path requires an approved Fast Lane routing decision.");
  }
  if (!new Set(["L0", "L1"]).has(routing.level)) {
    throw new Error("Fast Execution Path only accepts L0 and L1 tasks.");
  }
  if (routing.execution_mode !== "mock" || routing.execution_enabled !== false
    || routing.validation_required !== true) {
    throw new Error("Fast Execution Path must remain mock, disabled, and validation-required.");
  }
  if (!capability || typeof capability.id !== "string" || capability.id.length === 0) {
    throw new Error("Fast Execution Path requires a matched game capability.");
  }

  const binding = routing.binding;
  const agent = requireRegisteredAgent(registry, binding.agent);
  const tool = catalog.toolsById.get(binding.tool_id);
  if (agent.execution_enabled !== false
    || !agent.capabilities.includes(binding.capability)
    || !agent.tool_ids.includes(binding.tool_id)) {
    throw new Error(`Fast Lane Agent binding is invalid: ${binding.agent}.`);
  }
  if (!tool || tool.external !== false || tool.execution_enabled !== false
    || !tool.allowed_agents.includes(agent.id)
    || !tool.capabilities.includes(binding.capability)) {
    throw new Error(`Fast Lane Tool binding is unsafe: ${binding.tool_id}.`);
  }

  return {
    project: capability.id,
    bound_execution_plan: [{
      task_id: binding.task_id,
      agent: binding.agent,
      required_capabilities: [binding.capability],
      matched_tools: [binding.tool_id],
      execution_status: "bound-not-executed",
    }],
  };
}

function validateFastExecutionPath(options) {
  const {
    routing,
    capability,
    executionResults,
    stageNames,
  } = options;
  const checks = {
    route_is_fast: routing.execution_path === "fast",
    level_is_fast_eligible: new Set(["L0", "L1"]).has(routing.level),
    capability_matched: Boolean(capability?.id),
    executor_is_mock: executionResults.mode === "mock",
    execution_is_disabled: routing.execution_enabled === false,
    all_tasks_succeeded: executionResults.results.every((entry) => entry.status === "success"),
    validation_required: routing.validation_required === true,
    allowed_stages_only: stageNames.every((stage) => routing.allowed_stages.includes(stage)),
  };
  const failedChecks = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([check]) => check);
  if (failedChecks.length > 0) {
    throw new Error(`Fast Execution validation failed: ${failedChecks.join(", ")}.`);
  }
  return {
    status: "PASS",
    scope: "fast-execution",
    route_level: routing.level,
    capability: capability.id,
    checks,
    full_validation_required_before_release: true,
    execution_enabled: false,
  };
}

module.exports = {
  buildFastBoundExecutionPlan,
  validateFastExecutionPath,
};
