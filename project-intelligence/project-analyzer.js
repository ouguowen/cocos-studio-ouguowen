#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const intelligenceDir = __dirname;
const generatedDir = path.join(root, "generated");
const schemaPath = path.join(intelligenceDir, "project-schema.json");
const defaultStatePath = path.join(intelligenceDir, "project-state.json");
const defaultReportPath = path.join(generatedDir, "project-report.json");

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

function resolveInside(baseDir, filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(baseDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${baseDir}.`);
  }
  return resolvedPath;
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertStringArray(value, label) {
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

function validateObjectFields(value, definition, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  for (const field of definition.required || []) {
    if (!Object.prototype.hasOwnProperty.call(value, field)) {
      throw new Error(`${label} is missing field: ${field}`);
    }
  }
  const allowed = new Set(Object.keys(definition.properties));
  for (const field of Object.keys(value)) {
    if (!allowed.has(field)) {
      throw new Error(`${label} contains unsupported field: ${field}`);
    }
  }
}

function assertEnum(value, allowed, label) {
  if (!allowed.includes(value)) {
    throw new Error(`${label} has unsupported value: ${value}`);
  }
}

function assertUniqueIds(items, label) {
  const ids = new Set();
  for (const item of items) {
    if (ids.has(item.id)) {
      throw new Error(`${label} contains duplicate id: ${item.id}`);
    }
    ids.add(item.id);
  }
  return ids;
}

function validateTaskDependencies(tasks) {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  for (const task of tasks) {
    for (const dependency of task.depends_on) {
      if (!byId.has(dependency)) {
        throw new Error(`Task ${task.id} references unknown dependency: ${dependency}`);
      }
      if (dependency === task.id) {
        throw new Error(`Task ${task.id} cannot depend on itself.`);
      }
    }
  }

  const visiting = new Set();
  const visited = new Set();
  function visit(taskId) {
    if (visiting.has(taskId)) {
      throw new Error(`Project tasks contain a dependency cycle at: ${taskId}`);
    }
    if (visited.has(taskId)) {
      return;
    }
    visiting.add(taskId);
    for (const dependency of byId.get(taskId).depends_on) {
      visit(dependency);
    }
    visiting.delete(taskId);
    visited.add(taskId);
  }
  for (const task of tasks) {
    visit(task.id);
  }
}

function validateProjectState(state, schema = readJson(schemaPath, "Project Intelligence schema")) {
  validateObjectFields(state, schema, "Project Intelligence state");
  for (const field of ["schema_version", "project_id", "game_type", "engine", "phase"]) {
    assertNonEmptyString(state[field], `Project Intelligence ${field}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(state.project_id)) {
    throw new Error("Project Intelligence project_id must use lowercase kebab-case.");
  }
  if (state.mode !== "project-intelligence-metadata-only" || state.execution_enabled !== false) {
    throw new Error("Project Intelligence must remain metadata-only with execution disabled.");
  }
  assertEnum(state.phase, schema.properties.phase.enum, "Project Intelligence phase");
  for (const field of ["systems", "assets", "agents", "tasks", "issues", "history"]) {
    if (!Array.isArray(state[field])) {
      throw new Error(`Project Intelligence ${field} must be an array.`);
    }
  }

  const definitions = schema.$defs;
  for (const system of state.systems) {
    validateObjectFields(system, definitions.system, "Project system");
    assertNonEmptyString(system.id, "Project system id");
    assertNonEmptyString(system.name, `Project system ${system.id} name`);
    assertEnum(system.status, definitions.system.properties.status.enum, `Project system ${system.id} status`);
  }
  assertUniqueIds(state.systems, "Project systems");

  for (const asset of state.assets) {
    validateObjectFields(asset, definitions.asset, "Project asset");
    assertNonEmptyString(asset.id, "Project asset id");
    assertNonEmptyString(asset.type, `Project asset ${asset.id} type`);
    assertEnum(asset.status, definitions.asset.properties.status.enum, `Project asset ${asset.id} status`);
    if (asset.provider !== null) {
      assertNonEmptyString(asset.provider, `Project asset ${asset.id} provider`);
    }
  }
  assertUniqueIds(state.assets, "Project assets");

  for (const agent of state.agents) {
    validateObjectFields(agent, definitions.agent, "Project Agent");
    assertNonEmptyString(agent.id, "Project Agent id");
    assertEnum(agent.status, definitions.agent.properties.status.enum, `Project Agent ${agent.id} status`);
    assertStringArray(agent.assigned_tasks, `Project Agent ${agent.id} assigned_tasks`);
    if (agent.execution_enabled !== false) {
      throw new Error(`Project Agent ${agent.id} must keep execution_enabled false.`);
    }
  }
  const agentIds = assertUniqueIds(state.agents, "Project Agents");

  for (const task of state.tasks) {
    validateObjectFields(task, definitions.task, "Project task");
    for (const field of ["id", "title", "agent"]) {
      assertNonEmptyString(task[field], `Project task ${field}`);
    }
    assertEnum(task.status, definitions.task.properties.status.enum, `Project task ${task.id} status`);
    assertStringArray(task.depends_on, `Project task ${task.id} depends_on`);
    if (!Number.isInteger(task.priority) || task.priority < 1) {
      throw new Error(`Project task ${task.id} priority must be a positive integer.`);
    }
    if (!agentIds.has(task.agent)) {
      throw new Error(`Project task ${task.id} references unknown Agent: ${task.agent}`);
    }
  }
  const taskIds = assertUniqueIds(state.tasks, "Project tasks");
  validateTaskDependencies(state.tasks);
  for (const agent of state.agents) {
    for (const taskId of agent.assigned_tasks) {
      if (!taskIds.has(taskId)) {
        throw new Error(`Project Agent ${agent.id} references unknown task: ${taskId}`);
      }
      const task = state.tasks.find((item) => item.id === taskId);
      if (task.agent !== agent.id) {
        throw new Error(`Project Agent ${agent.id} is not the owner of task: ${taskId}`);
      }
    }
  }

  for (const issue of state.issues) {
    validateObjectFields(issue, definitions.issue, "Project issue");
    assertNonEmptyString(issue.id, "Project issue id");
    assertNonEmptyString(issue.description, `Project issue ${issue.id} description`);
    assertEnum(issue.severity, definitions.issue.properties.severity.enum, `Project issue ${issue.id} severity`);
    assertEnum(issue.status, definitions.issue.properties.status.enum, `Project issue ${issue.id} status`);
  }
  assertUniqueIds(state.issues, "Project issues");

  const historyIds = new Set();
  for (const entry of state.history) {
    validateObjectFields(entry, definitions.history, "Project history");
    for (const field of ["decision_id", "task_id", "decision", "reason", "timestamp"]) {
      assertNonEmptyString(entry[field], `Project history ${field}`);
    }
    assertStringArray(entry.related_agents, `Project history ${entry.decision_id} related_agents`);
    if (Number.isNaN(Date.parse(entry.timestamp))) {
      throw new Error(`Project history ${entry.decision_id} timestamp must be ISO-compatible.`);
    }
    if (historyIds.has(entry.decision_id)) {
      throw new Error(`Project history contains duplicate decision_id: ${entry.decision_id}`);
    }
    historyIds.add(entry.decision_id);
  }
  return true;
}

function loadProjectState(statePath = defaultStatePath) {
  const resolvedPath = resolveInside(intelligenceDir, statePath, "Project Intelligence state");
  const state = readJson(resolvedPath, "Project Intelligence state");
  validateProjectState(state);
  return state;
}

function writeProjectState(state, statePath = defaultStatePath) {
  validateProjectState(state);
  const resolvedPath = resolveInside(intelligenceDir, statePath, "Project Intelligence state");
  fs.writeFileSync(resolvedPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function updateProjectState(patch, options = {}) {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    throw new Error("Project Intelligence update must be an object.");
  }
  const current = clone(options.state || loadProjectState(options.statePath || defaultStatePath));
  const schema = readJson(schemaPath, "Project Intelligence schema");
  const allowed = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(patch)) {
    if (!allowed.has(field)) {
      throw new Error(`Project Intelligence update contains unsupported field: ${field}`);
    }
  }
  if (patch.project_id !== undefined && patch.project_id !== current.project_id) {
    throw new Error("Project Intelligence project_id cannot be changed.");
  }
  if (patch.execution_enabled !== undefined && patch.execution_enabled !== false) {
    throw new Error("Project Intelligence execution cannot be enabled.");
  }
  const state = { ...current, ...clone(patch), execution_enabled: false };
  validateProjectState(state, schema);
  const statePath = options.write === false
    ? null
    : writeProjectState(state, options.statePath || defaultStatePath);
  return { state, statePath, execution_enabled: false };
}

function countByStatus(items) {
  return items.reduce((counts, item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    return counts;
  }, {});
}

function completionRate(items) {
  if (items.length === 0) {
    return 0;
  }
  return Number(((items.filter((item) => item.status === "completed").length / items.length) * 100).toFixed(2));
}

function deriveProgressStatus(items, completeStatus = "completed") {
  if (items.some((item) => item.status === "blocked")) {
    return "blocked";
  }
  if (items.length > 0 && items.every((item) => item.status === completeStatus || item.status === "ready")) {
    return "complete";
  }
  if (items.some((item) => item.status === "in-progress" || item.status === "specified" || item.status === "ready")) {
    return "in-progress";
  }
  return "pending";
}

function buildNextActions(state) {
  const statusOrder = { blocked: 0, "in-progress": 1, pending: 2 };
  return state.tasks
    .filter((task) => task.status !== "completed")
    .sort((left, right) => statusOrder[left.status] - statusOrder[right.status] || left.priority - right.priority)
    .slice(0, 5)
    .map((task) => ({
      task_id: task.id,
      action: task.title,
      agent: task.agent,
      priority: task.priority,
      status: task.status,
    }));
}

function analyzeProject(state = loadProjectState()) {
  validateProjectState(state);
  const completedTasks = state.tasks.filter((task) => task.status === "completed");
  const pendingTasks = state.tasks.filter((task) => task.status !== "completed");
  const scenes = state.assets.filter((asset) => asset.type === "scene");
  const openIssues = state.issues.filter((issue) => issue.status === "open");
  const blockingIssue = openIssues.some((issue) => ["critical", "high"].includes(issue.severity));
  const blockedWork = state.tasks.some((task) => task.status === "blocked")
    || state.systems.some((system) => system.status === "blocked");
  const status = blockingIssue || blockedWork
    ? "blocked"
    : openIssues.some((issue) => issue.severity === "medium")
      ? "at-risk"
      : "on-track";

  return {
    project_id: state.project_id,
    game_type: state.game_type,
    engine: state.engine,
    project_phase: state.phase,
    status,
    execution_enabled: false,
    completed_tasks: clone(completedTasks),
    pending_tasks: clone(pendingTasks),
    completion_rate: completionRate(state.tasks),
    assets_status: {
      status: deriveProgressStatus(state.assets, "ready"),
      counts: countByStatus(state.assets),
    },
    code_status: {
      status: deriveProgressStatus(state.systems),
      completion_rate: completionRate(state.systems),
      counts: countByStatus(state.systems),
    },
    scene_status: {
      status: scenes.length === 0 ? "missing" : deriveProgressStatus(scenes, "ready"),
      counts: countByStatus(scenes),
    },
    quality_status: {
      status: blockingIssue ? "blocked" : openIssues.length > 0 ? "at-risk" : "pass",
      open_issues: clone(openIssues),
    },
    next_actions: buildNextActions(state),
  };
}

function createProjectReport(analysis) {
  if (!analysis || analysis.execution_enabled !== false) {
    throw new Error("Project analysis must keep execution disabled.");
  }
  return {
    status: analysis.status,
    project_phase: analysis.project_phase,
    completion_rate: analysis.completion_rate,
    next_actions: clone(analysis.next_actions),
    execution_enabled: false,
  };
}

function writeProjectReport(report, reportPath = defaultReportPath) {
  if (!report || report.execution_enabled !== false) {
    throw new Error("Project Report must keep execution disabled.");
  }
  const resolvedPath = resolveInside(generatedDir, reportPath, "Project Report");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

module.exports = {
  analyzeProject,
  buildNextActions,
  createProjectReport,
  loadProjectState,
  updateProjectState,
  validateProjectState,
  writeProjectReport,
  writeProjectState,
};
