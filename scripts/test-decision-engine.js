#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  createEmptyDecisionHistory,
  loadDecisionHistory,
  loadFeedbackReport,
  runDecisionEngine,
  validateDecision,
  writeDecisionHistory,
} = require("../decision-engine/decision-engine");
const {
  calculateActionPriority,
  determineRisk,
} = require("../decision-engine/priority-calculator");
const { loadProjectState } = require("../project-intelligence/project-analyzer");
const { loadProjectContext } = require("../project-intelligence/project-context");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "decision-report.json");

function runTests() {
  const projectState = loadProjectState();
  const feedbackReport = loadFeedbackReport();
  const projectContext = loadProjectContext({ state: projectState });
  assert.strictEqual(projectState.execution_enabled, false, "Project state must disable execution.");
  assert.strictEqual(feedbackReport.execution_enabled, false, "Feedback input must disable execution.");
  assert.strictEqual(projectContext.execution_enabled, false, "Memory Context must disable execution.");

  const assetTask = projectState.tasks.find((task) => task.id === "prepare-asset-requirements");
  const openIssues = projectState.issues.filter((issue) => issue.status === "open");
  assert.strictEqual(determineRisk(assetTask, openIssues), "medium", "Matching project risk should be detected.");
  const riskPriority = calculateActionPriority(assetTask, {
    completedTaskIds: new Set(["define-game-design"]),
    openIssues,
    projectStatus: "at-risk",
    feedbackScore: null,
    memoryRelevance: 2,
  });
  assert.strictEqual(riskPriority.risk_level, "medium", "Priority result should retain risk level.");
  assert.ok(riskPriority.priority_score > 0, "Priority score should be calculated.");

  writeDecisionHistory(createEmptyDecisionHistory());
  const result = runDecisionEngine({
    projectState,
    projectContext,
    feedbackReport,
  });
  assert.strictEqual(result.execution_enabled, false, "Decision Engine must disable execution.");
  assert.strictEqual(validateDecision(result.decision), true, "Generated Decision should match schema.");
  assert.strictEqual(result.decision.decision_id, "decision-0001", "First Decision id should be deterministic.");
  assert.strictEqual(result.decision.candidate_actions.length, 2, "Two pending actions should be ranked.");
  assert.strictEqual(
    result.decision.selected_action.task_id,
    "implement-core-systems",
    "In-progress dependency-ready system work should be selected.",
  );
  assert.strictEqual(
    result.decision.selected_action.capability,
    "system-implementation-plan",
    "Selected action should retain an abstract capability.",
  );
  assert.strictEqual(
    result.decision.priority_score,
    result.decision.selected_action.priority_score,
    "Decision priority should match selected action.",
  );
  assert.ok(result.decision.confidence > 0 && result.decision.confidence <= 100);
  assert.ok(result.decision.reason.includes("highest calculated priority"));
  assert.ok(result.decision.input_context.feedback_capabilities.includes("system-implementation-plan"));
  assert.ok(result.decision.input_context.historical_decision_count >= 1);
  assert.ok(result.decision.input_context.memory_asset_count >= 1);

  const history = loadDecisionHistory();
  assert.strictEqual(history.execution_enabled, false, "Decision History must disable execution.");
  assert.strictEqual(history.decisions.length, 1, "Decision should be recorded in history.");
  assert.strictEqual(history.decisions[0].decision_id, "decision-0001");
  assert.ok(fs.existsSync(reportPath), "Decision Report should be generated.");
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.strictEqual(report.selected_action.task_id, "implement-core-systems");
  assert.strictEqual(report.execution_enabled, false);
  assert.throws(
    () => validateDecision({ ...result.decision, execution_enabled: true }),
    /execution_enabled false/,
    "Decision schema should reject enabled execution.",
  );

  console.log(JSON.stringify({
    test: "decision-engine",
    project_intelligence_read: true,
    feedback_report_read: true,
    memory_context_read: true,
    priority_calculation: true,
    risk_handling: true,
    next_action_recommendation: true,
    decision_history: true,
    report_generated: true,
    provider_neutral: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/decision-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
