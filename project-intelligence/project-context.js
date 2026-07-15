#!/usr/bin/env node

"use strict";

const {
  analyzeProject,
  loadProjectState,
  validateProjectState,
} = require("./project-analyzer");
const { readMemory } = require("../memory/memory-manager");
const { loadProjectScanReport } = require("../project-scanner/project-scanner");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readOptionalMemory(projectId, options = {}) {
  if (options.includeMemory === false) {
    return null;
  }
  try {
    return readMemory(projectId, options.memoryOptions || {});
  } catch (error) {
    if (/Project Memory not found/.test(error.message)) {
      return null;
    }
    throw error;
  }
}

function mergeHistory(stateHistory, memoryHistory = []) {
  const byId = new Map();
  for (const entry of [...stateHistory, ...memoryHistory]) {
    if (!byId.has(entry.decision_id)) {
      byId.set(entry.decision_id, clone(entry));
    }
  }
  return [...byId.values()].sort((left, right) => left.timestamp.localeCompare(right.timestamp));
}

function readOptionalProjectScan(projectId, options = {}) {
  if (options.projectScan !== undefined) {
    return options.projectScan;
  }
  if (options.includeProjectScan === false) {
    return null;
  }
  try {
    const report = loadProjectScanReport(options.projectScanPath);
    return report.project === projectId ? report : null;
  } catch (error) {
    if (/Unable to read Project Scan Report/.test(error.message)) {
      return null;
    }
    throw error;
  }
}

function buildProjectContext(state, options = {}) {
  validateProjectState(state);
  const analysis = options.analysis || analyzeProject(state);
  const memory = options.memory === undefined
    ? readOptionalMemory(state.project_id, options)
    : options.memory;
  const projectScan = readOptionalProjectScan(state.project_id, options);
  const memoryHistory = memory ? memory.decision_history : [];

  return {
    project_id: state.project_id,
    execution_enabled: false,
    current_project_state: {
      status: analysis.status,
      game_type: analysis.game_type,
      engine: analysis.engine,
      project_phase: analysis.project_phase,
      completion_rate: analysis.completion_rate,
      assets_status: clone(analysis.assets_status),
      code_status: clone(analysis.code_status),
      scene_status: clone(analysis.scene_status),
      quality_status: clone(analysis.quality_status),
    },
    historical_decisions: mergeHistory(state.history, memoryHistory),
    generated_assets: clone(state.assets.filter((asset) => asset.status === "ready")),
    known_asset_memory: memory ? clone(memory.assets) : [],
    current_issues: clone(state.issues.filter((issue) => issue.status === "open")),
    next_actions: clone(analysis.next_actions),
    project_scan: projectScan ? clone(projectScan) : null,
    validation_report: options.validationReport ? clone(options.validationReport) : null,
    tasks: clone(state.tasks),
    agents: clone(state.agents),
  };
}

function loadProjectContext(options = {}) {
  const state = options.state || loadProjectState(options.statePath);
  return buildProjectContext(state, options);
}

function queryAgentProjectState(agentId, options = {}) {
  if (typeof agentId !== "string" || agentId.trim().length === 0) {
    throw new Error("Project Context Agent id must be a non-empty string.");
  }
  const state = options.state || loadProjectState(options.statePath);
  const context = options.context || buildProjectContext(state, options);
  const agent = state.agents.find((item) => item.id === agentId);
  if (!agent) {
    throw new Error(`Project Context contains no registered Agent: ${agentId}`);
  }
  const assignedTaskIds = new Set(agent.assigned_tasks);
  return {
    project_id: state.project_id,
    agent: agentId,
    execution_enabled: false,
    current_project_state: clone(context.current_project_state),
    assigned_tasks: clone(state.tasks.filter((task) => assignedTaskIds.has(task.id))),
    historical_decisions: clone(
      context.historical_decisions.filter((entry) => entry.related_agents.includes(agentId)),
    ),
    generated_assets: clone(context.generated_assets),
    current_issues: clone(context.current_issues),
    next_actions: clone(context.next_actions.filter((action) => action.agent === agentId)),
    project_scan: context.project_scan ? clone(context.project_scan) : null,
    validation_report: context.validation_report ? clone(context.validation_report) : null,
  };
}

module.exports = {
  buildProjectContext,
  loadProjectContext,
  mergeHistory,
  queryAgentProjectState,
  readOptionalMemory,
  readOptionalProjectScan,
};
