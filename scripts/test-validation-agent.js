#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const { loadFeedbackReport } = require("../decision-engine/decision-engine");
const { loadProjectState } = require("../project-intelligence/project-analyzer");
const { buildProjectContext } = require("../project-intelligence/project-context");
const { loadProjectScanReport } = require("../project-scanner/project-scanner");
const {
  runValidationAgent,
  validateValidationReport,
} = require("../validation-agent/validation-agent");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "validation-report.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function runTests() {
  const scannerReport = loadProjectScanReport();
  const projectState = loadProjectState();
  const projectContext = buildProjectContext(projectState, { projectScan: scannerReport });
  const feedbackReport = loadFeedbackReport();

  const warningResult = runValidationAgent({
    scannerReport,
    projectState,
    projectContext,
    feedbackReport,
  });
  assert.strictEqual(warningResult.execution_enabled, false, "Validation Agent must disable execution.");
  assert.strictEqual(validateValidationReport(warningResult.report), true, "Validation Report should match schema.");
  assert.strictEqual(warningResult.report.status, "WARNING", "Current metadata should produce WARNING.");
  assert.strictEqual(warningResult.report.score, 65, "Warning penalties should produce a deterministic score.");
  assert.strictEqual(warningResult.report.issues.length, 0, "Current metadata should have no failed checks.");
  assert.deepStrictEqual(
    warningResult.report.warnings.map((warning) => warning.rule_id).sort(),
    ["feedback-failures-zero", "project-risk-clear", "todo-count-zero", "unfinished-tasks-zero"].sort(),
    "Current metadata should expose all quality warnings.",
  );
  assert.ok(fs.existsSync(reportPath), "Validation Report should be generated.");

  const passScanner = clone(scannerReport);
  passScanner.code.todo_count = 0;
  const passContext = clone(projectContext);
  passContext.current_project_state.status = "on-track";
  passContext.tasks = passContext.tasks.map((task) => ({ ...task, status: "completed" }));
  const passFeedback = clone(feedbackReport);
  passFeedback.summary.failed_count = 0;
  const passResult = runValidationAgent({
    scannerReport: passScanner,
    projectState,
    projectContext: passContext,
    feedbackReport: passFeedback,
    write: false,
  });
  assert.strictEqual(passResult.report.status, "PASS", "Clean metadata should produce PASS.");
  assert.strictEqual(passResult.report.score, 100, "PASS should retain full score.");
  assert.strictEqual(passResult.report.warnings.length, 0);

  const failedScanner = clone(scannerReport);
  failedScanner.scenes.scene_count = 0;
  failedScanner.scenes.node_count = 0;
  const failedResult = runValidationAgent({
    scannerReport: failedScanner,
    projectState,
    projectContext,
    feedbackReport,
    write: false,
  });
  assert.strictEqual(failedResult.report.status, "FAILED", "Missing scenes should produce FAILED.");
  assert.ok(
    failedResult.report.issues.some((issue) => issue.rule_id === "scenes-present"),
    "FAILED report should identify the missing scene rule.",
  );

  const generatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.strictEqual(generatedReport.status, "WARNING", "Generated report should preserve the real input result.");
  assert.strictEqual(generatedReport.execution_enabled, false);
  assert.throws(
    () => validateValidationReport({ ...warningResult.report, execution_enabled: true }),
    /execution_enabled false/,
    "Validation schema should reject enabled execution.",
  );

  console.log(JSON.stringify({
    test: "validation-agent",
    scanner_report_read: true,
    project_context_read: true,
    feedback_report_read: true,
    completeness_rules: true,
    quality_rules: true,
    pass_status: true,
    warning_status: true,
    failed_status: true,
    report_generated: true,
    tool_neutral: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/validation-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
