#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { loadFeedbackReport } = require("../decision-engine/decision-engine");
const { loadProjectState } = require("../project-intelligence/project-analyzer");
const { buildProjectContext } = require("../project-intelligence/project-context");
const {
  loadProjectScanReport,
  validateProjectScanReport,
} = require("../project-scanner/project-scanner");
const {
  loadValidationRules,
  runRuleEngine,
} = require("./rule-engine");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const schemaPath = path.join(__dirname, "validation-schema.json");
const defaultReportPath = path.join(generatedDir, "validation-report.json");

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

function validateFinding(finding, schema, label) {
  if (!finding || typeof finding !== "object" || Array.isArray(finding)) {
    throw new Error(`${label} must be an object.`);
  }
  for (const field of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(finding, field)) {
      throw new Error(`${label} is missing field: ${field}`);
    }
  }
  const allowed = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(finding)) {
    if (!allowed.has(field)) {
      throw new Error(`${label} contains unsupported field: ${field}`);
    }
  }
  for (const field of ["rule_id", "category", "severity", "message", "observed", "expected"]) {
    assertNonEmptyString(finding[field], `${label} ${field}`);
  }
  if (!schema.properties.category.enum.includes(finding.category)
    || !schema.properties.severity.enum.includes(finding.severity)) {
    throw new Error(`${label} contains an invalid category or severity.`);
  }
}

function validateValidationReport(report, schema = readJson(schemaPath, "Validation Agent schema")) {
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    throw new Error("Validation Report must be an object.");
  }
  for (const field of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(report, field)) {
      throw new Error(`Validation Report is missing field: ${field}`);
    }
  }
  const allowed = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(report)) {
    if (!allowed.has(field)) {
      throw new Error(`Validation Report contains unsupported field: ${field}`);
    }
  }
  if (!schema.properties.status.enum.includes(report.status)) {
    throw new Error(`Validation Report has invalid status: ${report.status}`);
  }
  if (typeof report.score !== "number" || !Number.isFinite(report.score) || report.score < 0 || report.score > 100) {
    throw new Error("Validation Report score must be from 0 to 100.");
  }
  if (!Array.isArray(report.issues) || !Array.isArray(report.warnings) || !Array.isArray(report.recommendations)) {
    throw new Error("Validation Report result fields must be arrays.");
  }
  for (const finding of report.issues) {
    validateFinding(finding, schema.$defs.finding, "Validation issue");
    if (finding.severity !== "error") {
      throw new Error("Validation issues must have error severity.");
    }
  }
  for (const finding of report.warnings) {
    validateFinding(finding, schema.$defs.finding, "Validation warning");
    if (finding.severity !== "warning") {
      throw new Error("Validation warnings must have warning severity.");
    }
  }
  for (const recommendation of report.recommendations) {
    assertNonEmptyString(recommendation, "Validation recommendation");
  }
  if (new Set(report.recommendations).size !== report.recommendations.length) {
    throw new Error("Validation recommendations must not contain duplicates.");
  }
  const expectedStatus = report.issues.length > 0 ? "FAILED" : report.warnings.length > 0 ? "WARNING" : "PASS";
  if (report.status !== expectedStatus) {
    throw new Error(`Validation Report status must be ${expectedStatus}.`);
  }
  if (report.execution_enabled !== false) {
    throw new Error("Validation Report must keep execution_enabled false.");
  }
  return true;
}

function validateInputs(scannerReport, projectContext, feedbackReport) {
  validateProjectScanReport(scannerReport);
  if (!projectContext || projectContext.execution_enabled !== false) {
    throw new Error("Validation Agent requires Project Context with execution disabled.");
  }
  if (projectContext.project_id !== scannerReport.project) {
    throw new Error("Validation Agent input project ids do not match.");
  }
  if (!feedbackReport || feedbackReport.mode !== "feedback-only" || feedbackReport.execution_enabled !== false) {
    throw new Error("Validation Agent requires a feedback-only report with execution disabled.");
  }
}

function buildRuleInput(scannerReport, projectContext, feedbackReport) {
  validateInputs(scannerReport, projectContext, feedbackReport);
  return {
    scanner: clone(scannerReport),
    context: clone(projectContext),
    feedback: clone(feedbackReport),
    metrics: {
      unfinished_task_count: projectContext.tasks.filter((task) => task.status !== "completed").length,
    },
  };
}

function createValidationReport(ruleResult) {
  const issues = ruleResult.findings.filter((finding) => finding.severity === "error");
  const warnings = ruleResult.findings.filter((finding) => finding.severity === "warning");
  const report = {
    status: issues.length > 0 ? "FAILED" : warnings.length > 0 ? "WARNING" : "PASS",
    score: ruleResult.score,
    issues,
    warnings,
    recommendations: clone(ruleResult.recommendations),
    execution_enabled: false,
  };
  validateValidationReport(report);
  return report;
}

function writeValidationReport(report, reportPath = defaultReportPath) {
  validateValidationReport(report);
  const resolvedPath = resolveInside(generatedDir, reportPath, "Validation Report");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function runValidationAgent(options = {}) {
  const scannerReport = options.scannerReport || loadProjectScanReport(options.scannerReportPath);
  const projectState = options.projectState || loadProjectState(options.projectStatePath);
  const projectContext = options.projectContext || buildProjectContext(projectState, {
    projectScan: scannerReport,
  });
  const feedbackReport = options.feedbackReport || loadFeedbackReport(options.feedbackReportPath);
  const rules = options.rules || loadValidationRules(options.rulesPath);
  const ruleInput = buildRuleInput(scannerReport, projectContext, feedbackReport);
  const ruleResult = runRuleEngine(ruleInput, rules);
  const report = createValidationReport(ruleResult);
  const reportPath = options.write === false
    ? null
    : writeValidationReport(report, options.reportPath || defaultReportPath);
  return {
    report,
    reportPath,
    ruleInput,
    execution_enabled: false,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node validation-agent/validation-agent.js");
    console.log("Validates metadata reports only; it never launches or modifies a game project.");
    return;
  }
  if (args.length > 0) {
    console.error("Usage: node validation-agent/validation-agent.js");
    process.exitCode = 1;
    return;
  }
  try {
    const result = runValidationAgent();
    console.log(JSON.stringify({
      status: result.report.status,
      score: result.report.score,
      issues: result.report.issues.length,
      warnings: result.report.warnings.length,
      output: "generated/validation-report.json",
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
  buildRuleInput,
  createValidationReport,
  runValidationAgent,
  validateInputs,
  validateValidationReport,
  writeValidationReport,
};
