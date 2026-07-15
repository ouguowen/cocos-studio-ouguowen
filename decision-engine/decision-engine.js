#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const {
  analyzeProject,
  loadProjectState,
} = require("../project-intelligence/project-analyzer");
const { buildProjectContext } = require("../project-intelligence/project-context");
const {
  calculateActionPriority,
  calculateDecisionConfidence,
  rankCandidateActions,
} = require("./priority-calculator");

const root = path.resolve(__dirname, "..");
const decisionDir = __dirname;
const generatedDir = path.join(root, "generated");
const schemaPath = path.join(decisionDir, "decision-schema.json");
const defaultHistoryPath = path.join(decisionDir, "decision-history.json");
const defaultFeedbackPath = path.join(generatedDir, "feedback-report.json");
const defaultReportPath = path.join(generatedDir, "decision-report.json");

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

function validateFields(value, definition, label) {
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

function assertScore(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(`${label} must be a number from 0 to 100.`);
  }
}

function validateAction(action, definition, label) {
  validateFields(action, definition, label);
  for (const field of ["task_id", "action", "agent", "capability", "status", "risk_level"]) {
    assertNonEmptyString(action[field], `${label} ${field}`);
  }
  if (!definition.properties.status.enum.includes(action.status)) {
    throw new Error(`${label} has invalid status: ${action.status}`);
  }
  if (!definition.properties.risk_level.enum.includes(action.risk_level)) {
    throw new Error(`${label} has invalid risk_level: ${action.risk_level}`);
  }
  if (!Number.isInteger(action.base_priority) || action.base_priority < 1) {
    throw new Error(`${label} base_priority must be a positive integer.`);
  }
  if (!Array.isArray(action.blocked_by) || new Set(action.blocked_by).size !== action.blocked_by.length) {
    throw new Error(`${label} blocked_by must be a unique array.`);
  }
  for (const dependency of action.blocked_by) {
    assertNonEmptyString(dependency, `${label} blocked_by item`);
  }
  if (action.feedback_score !== null) {
    assertScore(action.feedback_score, `${label} feedback_score`);
  }
  if (!Number.isInteger(action.memory_relevance) || action.memory_relevance < 0) {
    throw new Error(`${label} memory_relevance must be a non-negative integer.`);
  }
  assertScore(action.priority_score, `${label} priority_score`);
}

function validateDecision(decision, schema = readJson(schemaPath, "Decision schema")) {
  validateFields(decision, schema, "Next Action Decision");
  if (!/^decision-[0-9]{4,}$/.test(decision.decision_id)) {
    throw new Error("Next Action Decision decision_id is invalid.");
  }
  if (decision.execution_enabled !== false) {
    throw new Error("Next Action Decision must keep execution_enabled false.");
  }
  validateFields(decision.input_context, schema.$defs.inputContext, "Decision input_context");
  const input = decision.input_context;
  for (const field of ["project_id", "project_phase", "project_status"]) {
    assertNonEmptyString(input[field], `Decision input_context ${field}`);
  }
  assertScore(input.completion_rate, "Decision input_context completion_rate");
  if (!Array.isArray(input.current_issues) || !Array.isArray(input.feedback_capabilities)) {
    throw new Error("Decision input_context issue and capability fields must be arrays.");
  }
  if (!Number.isInteger(input.historical_decision_count) || input.historical_decision_count < 0
    || !Number.isInteger(input.memory_asset_count) || input.memory_asset_count < 0) {
    throw new Error("Decision input_context counts must be non-negative integers.");
  }

  if (!Array.isArray(decision.candidate_actions) || decision.candidate_actions.length === 0) {
    throw new Error("Next Action Decision must contain candidate_actions.");
  }
  const taskIds = new Set();
  for (const action of decision.candidate_actions) {
    validateAction(action, schema.$defs.action, "Candidate action");
    if (taskIds.has(action.task_id)) {
      throw new Error(`Next Action Decision contains duplicate candidate task: ${action.task_id}`);
    }
    taskIds.add(action.task_id);
  }
  validateAction(decision.selected_action, schema.$defs.action, "Selected action");
  const selectedCandidate = decision.candidate_actions.find(
    (action) => action.task_id === decision.selected_action.task_id,
  );
  if (!selectedCandidate || JSON.stringify(selectedCandidate) !== JSON.stringify(decision.selected_action)) {
    throw new Error("Selected action must match one candidate action.");
  }
  assertScore(decision.priority_score, "Next Action Decision priority_score");
  if (decision.priority_score !== decision.selected_action.priority_score) {
    throw new Error("Next Action Decision priority_score must match selected_action.");
  }
  assertNonEmptyString(decision.reason, "Next Action Decision reason");
  assertScore(decision.confidence, "Next Action Decision confidence");
  return true;
}

function createEmptyDecisionHistory() {
  return {
    schema_version: "1.0.0",
    mode: "decision-history-only",
    execution_enabled: false,
    decisions: [],
  };
}

function validateDecisionHistory(history) {
  if (!history || typeof history !== "object" || Array.isArray(history)) {
    throw new Error("Decision History must be an object.");
  }
  assertNonEmptyString(history.schema_version, "Decision History schema_version");
  if (history.mode !== "decision-history-only" || history.execution_enabled !== false) {
    throw new Error("Decision History must remain history-only with execution disabled.");
  }
  if (!Array.isArray(history.decisions)) {
    throw new Error("Decision History decisions must be an array.");
  }
  const ids = new Set();
  for (const decision of history.decisions) {
    validateDecision(decision);
    if (ids.has(decision.decision_id)) {
      throw new Error(`Decision History contains duplicate id: ${decision.decision_id}`);
    }
    ids.add(decision.decision_id);
  }
  return true;
}

function loadDecisionHistory(historyPath = defaultHistoryPath) {
  const resolvedPath = resolveInside(decisionDir, historyPath, "Decision History");
  const history = readJson(resolvedPath, "Decision History");
  validateDecisionHistory(history);
  return history;
}

function writeDecisionHistory(history, historyPath = defaultHistoryPath) {
  validateDecisionHistory(history);
  const resolvedPath = resolveInside(decisionDir, historyPath, "Decision History");
  fs.writeFileSync(resolvedPath, `${JSON.stringify(history, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function loadFeedbackReport(feedbackPath = defaultFeedbackPath) {
  const resolvedPath = resolveInside(generatedDir, feedbackPath, "Feedback Report");
  const feedback = readJson(resolvedPath, "Feedback Report");
  if (feedback.mode !== "feedback-only" || feedback.execution_enabled !== false) {
    throw new Error("Decision Engine requires a feedback-only report with execution disabled.");
  }
  if (!feedback.provider_rankings || typeof feedback.provider_rankings !== "object") {
    throw new Error("Feedback Report must contain provider_rankings.");
  }
  return feedback;
}

function resolveTaskCapability(task) {
  const capabilitiesByAgent = {
    "game-designer": "game-design",
    "cocos-programmer": "system-implementation-plan",
    artist: "asset-requirements",
    qa: "validation-checklist",
  };
  return capabilitiesByAgent[task.agent] || task.id;
}

function getCapabilityFeedbackScore(feedbackReport, capability) {
  const ranking = feedbackReport.provider_rankings[capability];
  if (!Array.isArray(ranking) || ranking.length === 0) {
    return null;
  }
  const totalSamples = ranking.reduce((total, entry) => total + entry.samples, 0);
  if (totalSamples <= 0) {
    return null;
  }
  const weighted = ranking.reduce((total, entry) => total + (entry.score * entry.samples), 0);
  return Number((weighted / totalSamples).toFixed(2));
}

function countMemoryRelevance(projectContext, task) {
  return projectContext.historical_decisions.filter(
    (decision) => decision.task_id === task.id || decision.related_agents.includes(task.agent),
  ).length;
}

function buildCandidateActions(state, analysis, projectContext, feedbackReport) {
  const completedTaskIds = new Set(analysis.completed_tasks.map((task) => task.id));
  const actions = analysis.pending_tasks.map((task) => {
    const capability = resolveTaskCapability(task);
    const priority = calculateActionPriority(task, {
      completedTaskIds,
      openIssues: analysis.quality_status.open_issues,
      projectStatus: analysis.status,
      feedbackScore: getCapabilityFeedbackScore(feedbackReport, capability),
      memoryRelevance: countMemoryRelevance(projectContext, task),
    });
    return {
      task_id: task.id,
      action: task.title,
      agent: task.agent,
      capability,
      status: task.status,
      base_priority: task.priority,
      ...priority,
    };
  });
  if (actions.length === 0) {
    throw new Error(`Project ${state.project_id} has no pending action candidates.`);
  }
  return rankCandidateActions(actions);
}

function nextDecisionId(history) {
  const maximum = history.decisions.reduce((current, decision) => {
    const sequence = Number(decision.decision_id.replace("decision-", ""));
    return Number.isInteger(sequence) ? Math.max(current, sequence) : current;
  }, 0);
  return `decision-${String(maximum + 1).padStart(4, "0")}`;
}

function createInputContext(analysis, projectContext, feedbackReport) {
  return {
    project_id: analysis.project_id,
    project_phase: analysis.project_phase,
    project_status: analysis.status,
    completion_rate: analysis.completion_rate,
    current_issues: analysis.quality_status.open_issues.map((issue) => ({
      id: issue.id,
      severity: issue.severity,
      description: issue.description,
    })),
    feedback_capabilities: Object.keys(feedbackReport.provider_rankings).sort(),
    historical_decision_count: projectContext.historical_decisions.length,
    memory_asset_count: projectContext.known_asset_memory.length,
  };
}

function createDecision(options = {}) {
  const state = options.projectState || loadProjectState(options.projectStatePath);
  const analysis = options.analysis || analyzeProject(state);
  const projectContext = options.projectContext || buildProjectContext(state, { analysis });
  const feedbackReport = options.feedbackReport || loadFeedbackReport(options.feedbackPath);
  const history = options.history || loadDecisionHistory(options.historyPath);
  const candidateActions = buildCandidateActions(state, analysis, projectContext, feedbackReport);
  const selectedAction = candidateActions[0];
  const dependencyText = selectedAction.blocked_by.length === 0
    ? "all dependencies are satisfied"
    : `blocked by ${selectedAction.blocked_by.join(", ")}`;
  const decision = {
    decision_id: nextDecisionId(history),
    input_context: createInputContext(analysis, projectContext, feedbackReport),
    candidate_actions: candidateActions,
    priority_score: selectedAction.priority_score,
    selected_action: clone(selectedAction),
    reason: `${selectedAction.action} has the highest calculated priority; ${dependencyText}; risk is ${selectedAction.risk_level}.`,
    confidence: calculateDecisionConfidence(selectedAction),
    execution_enabled: false,
  };
  validateDecision(decision);
  return { decision, state, analysis, projectContext, feedbackReport, history };
}

function recordDecision(history, decision) {
  validateDecisionHistory(history);
  validateDecision(decision);
  if (history.decisions.some((entry) => entry.decision_id === decision.decision_id)) {
    throw new Error(`Decision History already contains id: ${decision.decision_id}`);
  }
  const nextHistory = clone(history);
  nextHistory.decisions.push(clone(decision));
  validateDecisionHistory(nextHistory);
  return nextHistory;
}

function writeDecisionReport(decision, reportPath = defaultReportPath) {
  validateDecision(decision);
  const resolvedPath = resolveInside(generatedDir, reportPath, "Decision Report");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(decision, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function runDecisionEngine(options = {}) {
  const created = createDecision(options);
  const history = recordDecision(created.history, created.decision);
  const historyPath = options.write === false
    ? null
    : writeDecisionHistory(history, options.historyPath || defaultHistoryPath);
  const reportPath = options.write === false
    ? null
    : writeDecisionReport(created.decision, options.reportPath || defaultReportPath);
  return {
    ...created,
    history,
    historyPath,
    reportPath,
    execution_enabled: false,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node decision-engine/decision-engine.js");
    console.log("Generates a recommendation report only; it never executes the selected action.");
    return;
  }
  if (args.length > 0) {
    console.error("Usage: node decision-engine/decision-engine.js");
    process.exitCode = 1;
    return;
  }
  try {
    const result = runDecisionEngine();
    console.log(JSON.stringify({
      decision_id: result.decision.decision_id,
      selected_task: result.decision.selected_action.task_id,
      priority_score: result.decision.priority_score,
      confidence: result.decision.confidence,
      execution_enabled: false,
    }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  buildCandidateActions,
  createDecision,
  createEmptyDecisionHistory,
  createInputContext,
  getCapabilityFeedbackScore,
  loadDecisionHistory,
  loadFeedbackReport,
  nextDecisionId,
  recordDecision,
  resolveTaskCapability,
  runDecisionEngine,
  validateDecision,
  validateDecisionHistory,
  writeDecisionHistory,
  writeDecisionReport,
};
