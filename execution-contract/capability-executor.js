#!/usr/bin/env node

"use strict";

const {
  loadAgentRegistry,
  requireRegisteredAgent,
} = require("../scheduler/agent-registry");
const { loadToolCatalog } = require("../scheduler/capability-matcher");
const { validateExecutionRequest } = require("./execution-result");

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

class CapabilityExecutor {
  constructor(options = {}) {
    if (!options.router || typeof options.router.execute !== "function") {
      throw new Error("Capability Executor requires an Execution Router.");
    }
    this.router = options.router;
    this.agentRegistry = options.agentRegistry || loadAgentRegistry();
    this.toolCatalog = options.toolCatalog || loadToolCatalog();
    this.requestCounter = 0;
    this.idFactory = options.idFactory
      || ((index) => `execution-request-${String(index).padStart(4, "0")}`);
  }

  validateCapabilityTask(task) {
    if (!task || typeof task !== "object" || Array.isArray(task)) {
      throw new Error("Capability task must be an object.");
    }
    for (const field of [
      "run_id",
      "task_id",
      "agent",
      "capability",
      "tool",
      "operation",
      "workspace_path",
    ]) {
      assertNonEmptyString(task[field], `Capability task ${field}`);
    }
    const agent = requireRegisteredAgent(this.agentRegistry, task.agent);
    if (agent.execution_enabled !== false || !agent.capabilities.includes(task.capability)) {
      throw new Error(`Agent ${agent.id} cannot route capability: ${task.capability}`);
    }
    if (!agent.tool_ids.includes(task.tool)) {
      throw new Error(`Agent ${agent.id} cannot route Tool: ${task.tool}`);
    }
    const tool = this.toolCatalog.toolsById.get(task.tool);
    if (!tool || tool.execution_enabled !== false || tool.external !== false
      || !tool.capabilities.includes(task.capability)
      || !tool.allowed_agents.includes(agent.id)) {
      throw new Error(`Tool ${task.tool} cannot safely route capability ${task.capability}.`);
    }
    return { agent, tool };
  }

  createExecutionRequest(task) {
    this.validateCapabilityTask(task);
    this.requestCounter += 1;
    const request = {
      schema_version: "1.0.0",
      request_id: this.idFactory(this.requestCounter),
      run_id: task.run_id,
      task_id: task.task_id,
      agent: task.agent,
      capability: task.capability,
      tool: task.tool,
      operation: task.operation,
      workspace_path: task.workspace_path,
      content: task.content === undefined ? null : task.content,
      mode: task.mode || this.router.policy.default_mode,
      provider_requirements: task.provider_requirements || {},
      transaction_id: task.transaction_id || null,
      external_execution: false,
      execution_enabled: false,
    };
    validateExecutionRequest(request);
    return request;
  }

  executeTask(task) {
    return this.router.execute(this.createExecutionRequest(task));
  }

  rollbackTask(task, transactionId) {
    assertNonEmptyString(transactionId, "Rollback transaction id");
    return this.executeTask({
      ...task,
      operation: "rollback",
      content: null,
      transaction_id: transactionId,
    });
  }
}

module.exports = {
  CapabilityExecutor,
};
