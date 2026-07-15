#!/usr/bin/env node

"use strict";

const { requireRegisteredAgent } = require("../scheduler/agent-registry");

function buildFastTaskEntry(agentId, registry, catalog, fallbackBinding) {
  const agent = requireRegisteredAgent(registry, agentId);
  if (agent.execution_enabled !== false) {
    throw new Error(`Fast Lane Agent must keep execution disabled: ${agentId}.`);
  }
  const capability = agent.capabilities[0] || fallbackBinding.capability;
  const toolId = agent.tool_ids.find((candidate) => {
    const tool = catalog.toolsById.get(candidate);
    return tool
      && tool.external === false
      && tool.execution_enabled === false
      && tool.allowed_agents.includes(agent.id)
      && tool.capabilities.includes(capability);
  });
  if (!agent.capabilities.includes(capability) || !toolId) {
    throw new Error(`Fast Lane Agent binding is invalid: ${agent.id}.`);
  }
  return {
    task_id: capability,
    agent: agent.id,
    required_capabilities: [capability],
    matched_tools: [toolId],
    execution_status: "bound-not-executed",
  };
}

function buildFastBoundExecutionPlan(routing, capability, registry, catalog, agentSelection = null) {
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
  const selectedAgents = Array.isArray(agentSelection?.selected_agents)
    && agentSelection.selected_agents.length > 0
    ? agentSelection.selected_agents
    : [binding.agent];
  const boundTasks = selectedAgents.map((agentId) => buildFastTaskEntry(agentId, registry, catalog, binding));

  return {
    project: capability.id,
    bound_execution_plan: boundTasks,
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
