#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const {
  createEmptyDecisionHistory,
  loadFeedbackReport,
  runDecisionEngine,
} = require("../decision-engine/decision-engine");
const {
  createFeedbackReport,
  loadPerformanceStore,
  recordFeedback,
} = require("../feedback/execution-feedback");
const { rankProvidersByFeedback } = require("../feedback/provider-ranking");
const {
  createDefaultAdapterRegistry,
  executeBoundPlan,
  validateExecutionResults,
} = require("../executor/agent-executor");
const { loadProjectState } = require("../project-intelligence/project-analyzer");
const { buildProjectContext } = require("../project-intelligence/project-context");
const { loadProjectScanReport } = require("../project-scanner/project-scanner");
const {
  loadProviderRegistry,
  selectProvider,
} = require("../providers/provider-selector");
const { loadAgentRegistry } = require("../scheduler/agent-registry");
const {
  buildBoundExecutionPlan,
  loadToolCatalog,
} = require("../scheduler/capability-matcher");
const { buildExecutionPlan } = require("../scheduler/task-scheduler");
const { buildTaskGraph, generateTaskGraph } = require("../task-graph/task-generator");
const {
  runValidationAgent,
  validateValidationReport,
} = require("../validation-agent/validation-agent");
const {
  beginIteration,
  completeIteration,
  createProgressTracker,
  loadRetryPolicy,
  writeProgressTracker,
} = require("./iteration-manager");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const defaultReportPath = path.join(generatedDir, "loop-report.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function resolveInsideGenerated(filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(generatedDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${generatedDir}.`);
  }
  return resolvedPath;
}

function findGeneratedTask(taskGraph, selectedAction) {
  const task = taskGraph.tasks.find((item) => item.id === selectedAction.capability)
    || taskGraph.tasks.find((item) => item.agent === selectedAction.agent);
  if (!task) {
    throw new Error(`Task Generator produced no task for capability: ${selectedAction.capability}`);
  }
  return task;
}

function executeGeneratedTaskGraph(taskGraph, selectedTaskId, options = {}) {
  const agentRegistry = options.agentRegistry || loadAgentRegistry();
  const toolCatalog = options.toolCatalog || loadToolCatalog();
  const executionPlan = buildExecutionPlan(taskGraph, agentRegistry);
  const boundExecutionPlan = buildBoundExecutionPlan(executionPlan, agentRegistry, toolCatalog);
  const adapterRegistry = createDefaultAdapterRegistry({
    mockAdapterOptions: options.mockAdapterOptions,
  });
  const executionResults = executeBoundPlan(
    boundExecutionPlan,
    agentRegistry,
    toolCatalog,
    adapterRegistry,
    "mock",
  );
  validateExecutionResults(executionResults, agentRegistry, toolCatalog, boundExecutionPlan);
  const selectedResult = executionResults.results.find((result) => result.task_id === selectedTaskId);
  if (!selectedResult) {
    throw new Error(`Mock Executor produced no result for task: ${selectedTaskId}`);
  }
  return {
    executionPlan,
    boundExecutionPlan,
    executionResults,
    selectedResult,
  };
}

function createFeedbackInput(iterationId, action, executionResult, validationReport, providerId) {
  const passed = validationReport.status !== "FAILED" && executionResult.status === "success";
  const qualityScore = validationReport.status === "PASS"
    ? 100
    : validationReport.status === "WARNING"
      ? 70
      : 30;
  return {
    task_id: `${iterationId}-${action.task_id}`,
    capability: action.capability,
    provider: providerId,
    status: passed ? "success" : "failed",
    duration: 1,
    quality_score: qualityScore,
    speed_score: 100,
    success_score: passed ? validationReport.status === "PASS" ? 100 : 75 : 0,
    validation_result: {
      passed,
      message: `Loop validation completed with status ${validationReport.status}.`,
    },
  };
}

function rebuildFeedbackReport(feedbackEntries, store, providerRegistry) {
  const rankings = {};
  for (const capability of Object.keys(store.capabilities)) {
    rankings[capability] = rankProvidersByFeedback(capability, {}, store);
  }
  return createFeedbackReport(feedbackEntries, rankings, { registry: providerRegistry });
}

function applyFeedback(feedbackState, iterationId, action, executionResult, validationReport) {
  let provider;
  try {
    provider = selectProvider(action.capability, {}, feedbackState.providerRegistry);
  } catch (error) {
    if (/No Provider matches capability/.test(error.message)) {
      return { ...feedbackState, feedbackSkipped: true };
    }
    throw error;
  }
  const feedbackInput = createFeedbackInput(
    iterationId,
    action,
    executionResult,
    validationReport,
    provider.id,
  );
  const recorded = recordFeedback(feedbackInput, {
    registry: feedbackState.providerRegistry,
    store: feedbackState.store,
    write: false,
  });
  const entries = [...feedbackState.entries, recorded.feedback];
  return {
    ...feedbackState,
    store: recorded.store,
    entries,
    report: rebuildFeedbackReport(entries, recorded.store, feedbackState.providerRegistry),
    feedbackSkipped: false,
  };
}

function loadLoopInputs(options = {}) {
  const projectState = options.projectState || loadProjectState(options.projectStatePath);
  const scannerReport = options.scannerReport || loadProjectScanReport(options.scannerReportPath);
  const projectContext = options.projectContext || buildProjectContext(projectState, {
    projectScan: scannerReport,
  });
  const feedbackReport = options.feedbackReport || loadFeedbackReport(options.feedbackReportPath);
  const providerRegistry = options.providerRegistry || loadProviderRegistry();
  return {
    projectState,
    scannerReport,
    projectContext,
    feedbackReport,
    providerRegistry,
  };
}

function validateLoopReport(report) {
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    throw new Error("Loop Report must be an object.");
  }
  const required = ["iteration", "status", "completed_tasks", "failed_tasks", "next_action", "execution_enabled"];
  for (const field of required) {
    if (!Object.prototype.hasOwnProperty.call(report, field)) {
      throw new Error(`Loop Report is missing field: ${field}`);
    }
  }
  if (!/^iteration-[0-9]{4,}$/.test(report.iteration)
    || !new Set(["PASS", "WARNING", "FAILED"]).has(report.status)
    || typeof report.next_action !== "string"
    || report.next_action.length === 0) {
    throw new Error("Loop Report contains invalid summary fields.");
  }
  for (const field of ["completed_tasks", "failed_tasks"]) {
    if (!Array.isArray(report[field]) || new Set(report[field]).size !== report[field].length
      || report[field].some((taskId) => typeof taskId !== "string" || taskId.length === 0)) {
      throw new Error(`Loop Report ${field} must be a unique string array.`);
    }
  }
  if (report.execution_enabled !== false) {
    throw new Error("Loop Report must keep execution_enabled false.");
  }
  return true;
}

function writeLoopReport(report, reportPath = defaultReportPath) {
  validateLoopReport(report);
  const resolvedPath = resolveInsideGenerated(reportPath, "Loop Report");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function runDevelopmentLoop(options = {}) {
  const policy = options.policy || loadRetryPolicy(options.policyPath);
  const inputs = loadLoopInputs(options);
  let tracker = createProgressTracker(options.maxIterations, policy);
  let decisionHistory = options.decisionHistory || createEmptyDecisionHistory();
  let feedbackState = {
    report: inputs.feedbackReport,
    entries: clone(inputs.feedbackReport.feedback),
    store: options.performanceStore || loadPerformanceStore(),
    providerRegistry: inputs.providerRegistry,
    feedbackSkipped: false,
  };
  let previousValidationStatus = null;
  let lastTransition = null;

  while (tracker.current_iteration < tracker.max_iterations) {
    tracker = beginIteration(tracker);
    const decisionResult = runDecisionEngine({
      projectState: inputs.projectState,
      projectContext: inputs.projectContext,
      feedbackReport: feedbackState.report,
      history: decisionHistory,
      write: false,
    });
    decisionHistory = decisionResult.history;

    const taskGeneration = options.blueprint
      ? { blueprint: options.blueprint, taskGraph: buildTaskGraph(options.blueprint), outputPath: null }
      : generateTaskGraph({ write: false });
    const generatedTask = findGeneratedTask(
      taskGeneration.taskGraph,
      decisionResult.decision.selected_action,
    );
    const execution = executeGeneratedTaskGraph(
      taskGeneration.taskGraph,
      generatedTask.id,
      options,
    );

    const validationInputs = {
      scannerReport: clone(inputs.scannerReport),
      projectState: clone(inputs.projectState),
      projectContext: clone(inputs.projectContext),
      feedbackReport: clone(feedbackState.report),
    };
    const transformedInputs = options.validationInputTransformer
      ? options.validationInputTransformer(tracker.current_iteration, validationInputs)
      : validationInputs;
    const validation = runValidationAgent({
      ...transformedInputs,
      write: false,
    });
    validateValidationReport(validation.report);

    feedbackState = applyFeedback(
      feedbackState,
      tracker.iteration_id,
      decisionResult.decision.selected_action,
      execution.selectedResult,
      validation.report,
    );

    lastTransition = completeIteration(tracker, {
      decision_id: decisionResult.decision.decision_id,
      task_id: generatedTask.id,
      validation_status: validation.report.status,
      task_regenerated: previousValidationStatus === "FAILED",
    }, policy, {
      warningAction: options.warningAction,
    });
    tracker = lastTransition.tracker;
    previousValidationStatus = validation.report.status;
    if (options.write !== false) {
      writeProgressTracker(tracker, options.trackerPath);
    }
    if (!lastTransition.shouldContinue) {
      break;
    }
  }

  const finalIteration = tracker.iterations[tracker.iterations.length - 1];
  if (!finalIteration || !lastTransition) {
    throw new Error("Autonomous Development Loop completed without an iteration result.");
  }
  const report = {
    iteration: tracker.iteration_id,
    status: finalIteration.validation_status,
    completed_tasks: clone(tracker.completed_tasks),
    failed_tasks: clone(tracker.failed_tasks),
    next_action: finalIteration.next_action,
    execution_enabled: false,
  };
  validateLoopReport(report);
  const reportPath = options.write === false
    ? null
    : writeLoopReport(report, options.reportPath || defaultReportPath);
  return {
    report,
    reportPath,
    tracker,
    decisionHistory,
    feedbackState,
    execution_enabled: false,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node loop-engine/loop-controller.js");
    console.log("Runs a disabled mock development loop and writes summary metadata only.");
    return;
  }
  if (args.length > 0) {
    console.error("Usage: node loop-engine/loop-controller.js");
    process.exitCode = 1;
    return;
  }
  try {
    const result = runDevelopmentLoop();
    console.log(JSON.stringify({
      iteration: result.report.iteration,
      status: result.report.status,
      next_action: result.report.next_action,
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
  applyFeedback,
  createFeedbackInput,
  executeGeneratedTaskGraph,
  findGeneratedTask,
  loadLoopInputs,
  rebuildFeedbackReport,
  runDevelopmentLoop,
  validateLoopReport,
  writeLoopReport,
};
