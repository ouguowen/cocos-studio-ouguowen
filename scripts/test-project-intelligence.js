#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  analyzeProject,
  createProjectReport,
  loadProjectState,
  updateProjectState,
  validateProjectState,
  writeProjectReport,
  writeProjectState,
} = require("../project-intelligence/project-analyzer");
const {
  buildProjectContext,
  loadProjectContext,
  queryAgentProjectState,
} = require("../project-intelligence/project-context");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "project-report.json");

function createPlanningBaseline(state) {
  const systemStatuses = {
    "battle-system": "completed",
    "tower-system": "in-progress",
    "wave-system": "pending",
  };
  const taskStatuses = {
    "define-game-design": "completed",
    "plan-system-implementation": "in-progress",
    "implement-core-systems": "pending",
    "prepare-asset-requirements": "pending",
  };
  return {
    ...state,
    phase: "planning",
    execution_enabled: false,
    systems: state.systems.map((system) => ({
      ...system,
      status: systemStatuses[system.id],
    })),
    tasks: state.tasks.map((task) => ({
      ...task,
      status: taskStatuses[task.id],
    })),
  };
}

function runTests() {
  const baseline = createPlanningBaseline(loadProjectState());
  assert.strictEqual(validateProjectState(baseline), true, "Project schema should validate.");
  assert.throws(
    () => validateProjectState({ ...baseline, execution_enabled: true }),
    /execution disabled/,
    "Project schema should reject enabled execution.",
  );
  writeProjectState(baseline);

  const initialContext = loadProjectContext();
  assert.strictEqual(initialContext.execution_enabled, false, "Project Context must disable execution.");
  assert.strictEqual(initialContext.current_project_state.project_phase, "planning");
  assert.strictEqual(initialContext.generated_assets.length, 1, "Ready metadata artifacts should be visible.");
  assert.ok(initialContext.historical_decisions.length >= 1, "Historical decisions should load.");
  assert.ok(initialContext.known_asset_memory.length >= 1, "Project Memory assets should be available.");

  const productionTasks = baseline.tasks.map((task) => {
    if (task.id === "plan-system-implementation") {
      return { ...task, status: "completed" };
    }
    if (task.id === "implement-core-systems") {
      return { ...task, status: "in-progress" };
    }
    return task;
  });
  const productionSystems = baseline.systems.map((system) => {
    if (system.id === "tower-system") {
      return { ...system, status: "completed" };
    }
    if (system.id === "wave-system") {
      return { ...system, status: "in-progress" };
    }
    return system;
  });
  const updated = updateProjectState({
    phase: "production",
    tasks: productionTasks,
    systems: productionSystems,
  });
  assert.strictEqual(updated.execution_enabled, false, "Project update must disable execution.");
  assert.strictEqual(updated.state.phase, "production", "Project phase should update.");
  assert.strictEqual(loadProjectState().phase, "production", "Updated state should be readable.");
  assert.throws(
    () => updateProjectState({ project_id: "another-project" }, { state: updated.state, write: false }),
    /cannot be changed/,
    "Project id changes should be blocked.",
  );

  const analysis = analyzeProject(updated.state);
  assert.strictEqual(analysis.game_type, "tower-defense", "Analyzer should identify game type.");
  assert.strictEqual(analysis.project_phase, "production", "Analyzer should identify project phase.");
  assert.strictEqual(analysis.completed_tasks.length, 2, "Analyzer should identify completed tasks.");
  assert.strictEqual(analysis.pending_tasks.length, 2, "Analyzer should identify pending work.");
  assert.strictEqual(analysis.completion_rate, 50, "Completion rate should derive from task state.");
  assert.strictEqual(analysis.assets_status.status, "in-progress", "Asset status should be analyzed.");
  assert.strictEqual(analysis.code_status.status, "in-progress", "Code status should be analyzed.");
  assert.strictEqual(analysis.scene_status.status, "in-progress", "Scene status should be analyzed.");
  assert.strictEqual(analysis.quality_status.status, "at-risk", "Quality status should reflect open issues.");

  const context = buildProjectContext(updated.state);
  const agentContext = queryAgentProjectState("cocos-programmer", {
    state: updated.state,
    context,
  });
  assert.strictEqual(agentContext.execution_enabled, false, "Agent project query must disable execution.");
  assert.deepStrictEqual(
    agentContext.assigned_tasks.map((task) => task.id),
    ["plan-system-implementation", "implement-core-systems"],
    "Agent query should return only assigned project tasks.",
  );
  assert.ok(
    agentContext.historical_decisions.some((entry) => entry.decision_id === "provider-neutral-core"),
    "Agent query should include related historical decisions.",
  );
  assert.strictEqual(agentContext.next_actions[0].task_id, "implement-core-systems");
  assert.throws(
    () => queryAgentProjectState("unknown-agent", { state: updated.state, context }),
    /no registered Agent/,
    "Unknown Agent project queries should be rejected.",
  );

  const report = createProjectReport(analysis);
  const writtenReportPath = writeProjectReport(report);
  assert.strictEqual(writtenReportPath, reportPath, "Project Report should use generated output path.");
  assert.ok(fs.existsSync(reportPath), "Project Report should be generated.");
  const generatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.deepStrictEqual(
    Object.keys(generatedReport).sort(),
    ["status", "project_phase", "completion_rate", "next_actions", "execution_enabled"].sort(),
    "Project Report should expose the required summary fields.",
  );
  assert.strictEqual(generatedReport.status, "at-risk");
  assert.strictEqual(generatedReport.project_phase, "production");
  assert.strictEqual(generatedReport.completion_rate, 50);
  assert.strictEqual(generatedReport.execution_enabled, false);

  console.log(JSON.stringify({
    test: "project-intelligence",
    project_schema_validation: true,
    context_read: true,
    state_update: true,
    project_analysis: true,
    agent_project_query: true,
    report_generated: true,
    provider_neutral: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/project-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
