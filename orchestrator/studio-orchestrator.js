#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { createGameBlueprint } = require("../blueprint/blueprint-manager");
const { createDefaultAdapterRegistry } = require("../executor/agent-executor");
const {
  executeBoundPlan,
  validateExecutionResults,
} = require("../executor/agent-executor");
const {
  createEmptyPerformanceStore,
  createFeedbackReport,
  recordFeedback,
} = require("../feedback/execution-feedback");
const { rankProvidersByFeedback } = require("../feedback/provider-ranking");
const {
  createEmptyMemoryStore,
  createMemory,
  updateMemory,
} = require("../memory/memory-manager");
const {
  analyzeProject,
  validateProjectState,
} = require("../project-intelligence/project-analyzer");
const { buildProjectContext } = require("../project-intelligence/project-context");
const { scanProject } = require("../project-scanner/project-scanner");
const {
  createEmptyDecisionHistory,
  runDecisionEngine,
} = require("../decision-engine/decision-engine");
const { createDefaultIntegrationManager } = require("../integration/integration-manager");
const { runDevelopmentLoop } = require("../loop-engine/loop-controller");
const { planGame } = require("../planner/game-planner");
const {
  createEmptyExecutionMemory,
  recordExecutionMemoryDecision,
} = require("../execution-memory/execution-memory");
const {
  loadProviderRegistry,
  selectProvider,
} = require("../providers/provider-selector");
const { createDefaultRuntimeManager } = require("../runtime/runtime-manager");
const { loadAgentRegistry } = require("../scheduler/agent-registry");
const {
  buildBoundExecutionPlan,
  loadToolCatalog,
} = require("../scheduler/capability-matcher");
const { buildExecutionPlan } = require("../scheduler/task-scheduler");
const { buildTaskGraph } = require("../task-graph/task-generator");
const {
  loadCapabilities,
  matchCapability,
} = require("../scripts/capability-loader");
const {
  buildFastBoundExecutionPlan,
  validateFastExecutionPath,
} = require("../task-router/fast-execution-path");
const { routeAgents } = require("../agent-router/agent-router");
const { routeTask } = require("../task-router/task-router");
const { runValidationAgent } = require("../validation-agent/validation-agent");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const defaultReportPath = path.join(generatedDir, "studio-e2e-report.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function slugify(value, separator = "-") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "") || "project";
}

function runStage(report, stage, input, operation, summarize) {
  const trace = {
    stage,
    status: "RUNNING",
    input: clone(input),
    output: null,
  };
  report.stages.push(trace);
  try {
    const result = operation();
    trace.status = "PASS";
    trace.output = clone(summarize(result));
    return result;
  } catch (error) {
    trace.status = "FAILED";
    trace.output = {
      error: error.message,
    };
    error.failedStage = stage;
    throw error;
  }
}

function createStudioReport(request, options = {}) {
  return {
    run_id: options.runId || `run-${Date.now()}`,
    request,
    status: "RUNNING",
    failed_stage: null,
    runtime_mode: "mock",
    execution_enabled: false,
    task_id: null,
    iteration_id: null,
    execution_mode: null,
    execution_memory: null,
    blueprint_context: null,
    routing: null,
    agent_selection: null,
    stages: [],
    acceptance: {},
  };
}

function findProviderSelection(boundExecutionPlan, providerRegistry) {
  for (const entry of boundExecutionPlan.bound_execution_plan) {
    for (const capability of entry.required_capabilities) {
      try {
        return {
          task_id: entry.task_id,
          capability,
          provider: selectProvider(capability, {}, providerRegistry),
        };
      } catch (error) {
        if (!/No Provider matches capability/.test(error.message)) {
          throw error;
        }
      }
    }
  }
  throw new Error("No Provider can satisfy any bound execution capability.");
}

function flattenBlueprintAssets(blueprint) {
  return Object.entries(blueprint.assets).flatMap(([category, assets]) => assets.map((asset) => ({
    category,
    name: asset,
  })));
}

function createProjectState(options) {
  const {
    projectId,
    blueprint,
    taskGraph,
    executionResults,
    scannerReport,
  } = options;
  const agents = [...new Set(taskGraph.tasks.map((task) => task.agent))];
  const selectedInProgress = "system-implementation-plan";
  const state = {
    schema_version: "1.0.0",
    mode: "project-intelligence-metadata-only",
    execution_enabled: false,
    project_id: projectId,
    game_type: blueprint.project.genre,
    engine: blueprint.project.engine,
    phase: "production",
    systems: blueprint.systems.map((system, index) => ({
      id: system.id,
      name: system.id.replaceAll("-", " "),
      status: index === 0 ? "completed" : index === 1 ? "in-progress" : "pending",
    })),
    assets: flattenBlueprintAssets(blueprint).map((asset, index) => ({
      id: slugify(asset.name),
      type: asset.category === "scenes" ? "scene" : asset.category.replace(/s$/, ""),
      status: index === 0 ? "ready" : "specified",
      provider: null,
    })),
    agents: agents.map((agent) => ({
      id: agent,
      status: "registered",
      assigned_tasks: taskGraph.tasks.filter((task) => task.agent === agent).map((task) => task.id),
      execution_enabled: false,
    })),
    tasks: taskGraph.tasks.map((task, index) => ({
      id: task.id,
      title: task.output,
      status: task.id === selectedInProgress ? "in-progress" : index === 0 ? "completed" : "pending",
      agent: task.agent,
      depends_on: [...task.depends_on],
      priority: task.priority,
    })),
    issues: scannerReport.code.todo_count > 0 ? [{
      id: "scanner-todo-markers",
      severity: "medium",
      status: "open",
      description: `Project Scanner found ${scannerReport.code.todo_count} TODO marker(s).`,
    }] : [],
    history: [{
      decision_id: "provider-neutral-orchestration",
      task_id: taskGraph.tasks[0].id,
      decision: "Keep orchestration independent from concrete tools and Providers.",
      reason: "Runtime and Integration abstractions must remain replaceable.",
      related_agents: agents,
      timestamp: "2026-01-01T00:00:00.000Z",
    }],
  };
  if (executionResults.results.some((result) => result.status !== "success")) {
    throw new Error("Cannot create a successful Project State from failed Executor results.");
  }
  validateProjectState(state);
  return state;
}

function createMemoryInputs(projectId, blueprint) {
  const palette = blueprint.design.theme === "modern-city"
    ? ["cyan", "yellow", "charcoal", "white"]
    : ["primary", "accent", "neutral"];
  return {
    projectMemory: {
      project_id: projectId,
      project_name: slugify(blueprint.project.name),
      game_type: blueprint.project.genre,
      genre: blueprint.project.genre,
      platform: blueprint.project.platform,
      design_rules: blueprint.design.gameplay_loop.map((rule) => `Gameplay loop: ${rule}.`),
      technical_constraints: [
        "End-to-end acceptance remains mock-only.",
        "External execution requires a separate approval gate.",
      ],
      art_direction: {
        style: blueprint.design.theme,
        color: palette.join(" "),
        lighting: "high contrast",
      },
      audio_direction: {
        style: "gameplay-responsive",
        mood: "tactical",
      },
      ui_direction: {
        style: "readable tactical UI",
        color: palette.join(" "),
        layout: blueprint.project.platform === "mobile" ? "mobile controls" : "responsive controls",
      },
    },
    styleMemory: {
      visual_style: `${blueprint.design.theme} ${blueprint.project.genre}`,
      color_palette: palette,
      character_style: "role-readable silhouettes",
      environment_style: `${blueprint.design.theme} environment consistency`,
      ui_style: "high-contrast tactical interface",
      animation_style: "short readable gameplay timing",
    },
    assets: flattenBlueprintAssets(blueprint).map((asset) => ({
      asset_id: slugify(asset.name, "_"),
      asset_type: asset.category.replace(/s$/, ""),
      related_assets: [],
      version: "1.0.0",
      description: `Blueprint ${asset.category} requirement: ${asset.name}.`,
      usage_context: ["studio-e2e"],
    })),
    decision: {
      decision_id: "e2e-provider-neutral",
      task_id: "studio-e2e",
      decision: "Use Provider selection metadata without invoking a concrete Provider.",
      reason: "The release candidate acceptance run must remain tool-neutral and mock-only.",
      related_agents: ["game-designer", "cocos-programmer", "artist", "qa"],
      timestamp: "2026-01-01T00:00:00.000Z",
    },
  };
}

function createLoopValidationTransformer() {
  return (iteration, inputs) => {
    const transformed = clone(inputs);
    if (iteration === 1) {
      transformed.scannerReport.scenes.scene_count = 0;
      transformed.scannerReport.scenes.node_count = 0;
    } else if (iteration === 3) {
      transformed.scannerReport.code.todo_count = 0;
      transformed.projectContext.current_project_state.status = "on-track";
      transformed.projectContext.tasks = transformed.projectContext.tasks.map((task) => ({
        ...task,
        status: "completed",
      }));
      transformed.feedbackReport.summary.failed_count = 0;
    }
    return transformed;
  };
}

function validateStudioReport(report) {
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    throw new Error("Studio E2E Report must be an object.");
  }
  if (typeof report.run_id !== "string" || report.run_id.length === 0
    || !new Set(["PASS", "FAILED"]).has(report.status)
    || report.runtime_mode !== "mock"
    || report.execution_enabled !== false
    || !Array.isArray(report.stages)) {
    throw new Error("Studio E2E Report has invalid top-level fields.");
  }
  const failedStages = report.stages.filter((stage) => stage.status === "FAILED");
  if (report.stages.length === 0 || report.stages[0].stage !== "blueprint-manager") {
    throw new Error("Studio E2E Report must start with the Blueprint Manager stage.");
  }
  const blueprintPassed = report.stages[0].status === "PASS";
  if (blueprintPassed && (!report.blueprint_context
    || report.blueprint_context.execution_enabled !== false
    || typeof report.blueprint_context.blueprint_version !== "string")) {
    throw new Error("Studio E2E Report contains an invalid Blueprint context.");
  }
  const routerPassed = report.stages.length > 1
    && report.stages[1].stage === "task-router"
    && report.stages[1].status === "PASS";
  if (routerPassed) {
    if (report.stages.length < 3 || report.stages[2].stage !== "agent-router") {
      throw new Error("Studio E2E Report must run Agent Router after Task Router.");
    }
    if (!report.routing || !new Set(["L0", "L1", "L2", "L3"]).has(report.routing.level)
      || !new Set(["fast", "studio"]).has(report.routing.execution_path)
      || !new Set(["fast_path", "full_pipeline"]).has(report.routing.route_type)
      || report.routing.execution_enabled !== false) {
      throw new Error("Studio E2E Report contains an invalid routing decision.");
    }
    if (!report.execution_mode
      || !new Set(["fast", "full"]).has(report.execution_mode.mode)
      || !Array.isArray(report.execution_mode.agents)) {
      throw new Error("Studio E2E Report contains an invalid execution_mode decision.");
    }
    if (report.execution_memory
      && (report.execution_memory.execution_enabled !== false
        || !Number.isInteger(report.execution_memory.record_count))) {
      throw new Error("Studio E2E Report contains an invalid execution_memory summary.");
    }
    if (report.stages[2].status === "PASS") {
      if (!report.agent_selection
        || !Array.isArray(report.agent_selection.selected_agents)
        || report.agent_selection.selected_agents.length === 0
        || report.agent_selection.execution_enabled !== false) {
        throw new Error("Studio E2E Report contains an invalid Agent Router decision.");
      }
    }
    if (report.routing.execution_path === "fast") {
      if (!new Set(["L0", "L1"]).has(report.routing.level)) {
        throw new Error("Fast Lane reports may only contain L0 or L1 routing decisions.");
      }
      const unexpectedStages = report.stages
        .map((stage) => stage.stage)
        .filter((stage) => !report.routing.allowed_stages.includes(stage));
      if (unexpectedStages.length > 0) {
        throw new Error(`Fast Lane report contains forbidden stages: ${unexpectedStages.join(", ")}.`);
      }
    } else if (!new Set(["L2", "L3"]).has(report.routing.level)) {
      throw new Error("Studio Pipeline reports require an L2 or L3 routing decision.");
    }
  }
  if (report.status === "PASS") {
    if (failedStages.length > 0 || report.stages.some((stage) => stage.status !== "PASS")) {
      throw new Error("Passing Studio E2E Report contains a failed or incomplete stage.");
    }
    for (const field of ["task_id", "iteration_id"]) {
      if (typeof report[field] !== "string" || report[field].length === 0) {
        throw new Error(`Passing Studio E2E Report requires ${field}.`);
      }
    }
  } else if (failedStages.length !== 1 || report.failed_stage !== failedStages[0].stage) {
    throw new Error("Failed Studio E2E Report must identify exactly one failed stage.");
  }
  return true;
}

function writeStudioReport(report, reportPath = defaultReportPath) {
  validateStudioReport(report);
  const resolvedPath = path.resolve(reportPath);
  const relative = path.relative(generatedDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Studio E2E Report must stay inside ${generatedDir}.`);
  }
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function completeFailedStudioRun(report, error, options) {
  report.status = "FAILED";
  report.failed_stage = error.failedStage || report.stages.at(-1)?.stage || "orchestrator";
  report.acceptance = {
    fail_fast: true,
    completed_stage_count: report.stages.filter((stage) => stage.status === "PASS").length,
    failed_stage_count: report.stages.filter((stage) => stage.status === "FAILED").length,
  };
  validateStudioReport(report);
  const reportPath = options.write === false
    ? null
    : writeStudioReport(report, options.reportPath || defaultReportPath);
  return { report, reportPath, error };
}

function resolveFastCapability(request, options = {}) {
  const capabilities = loadCapabilities(options.capabilityOptions);
  const matched = matchCapability(request, capabilities);
  if (matched) {
    return matched;
  }
  if (options.activeCapabilityId) {
    const active = capabilities.find((capability) => capability.id === options.activeCapabilityId);
    if (active) {
      return active;
    }
  }
  throw new Error("No capability matched the Fast Lane request.");
}

function runFastExecutionPipeline(request, options, report) {
  try {
    const capability = runStage(report, "capability-loader", {
      request,
      active_capability_id: options.activeCapabilityId || null,
    }, () => resolveFastCapability(request, options), (result) => ({
      capability_id: result.id,
    }));

    const agentRegistry = loadAgentRegistry();
    const toolCatalog = loadToolCatalog();
    const adapterRegistry = createDefaultAdapterRegistry({
      mockAdapterOptions: { clock: () => "2026-01-01T00:00:00.000Z" },
    });
    let boundPlan;
    const executionResults = runStage(report, "agent-executor", {
      route_level: report.routing.level,
      capability_id: capability.id,
      runtime_mode: "mock",
      selected_agents: report.agent_selection.selected_agents,
    }, () => {
      boundPlan = buildFastBoundExecutionPlan(
        report.routing,
        capability,
        agentRegistry,
        toolCatalog,
        report.agent_selection,
      );
      const results = executeBoundPlan(
        boundPlan,
        agentRegistry,
        toolCatalog,
        adapterRegistry,
        "mock",
      );
      validateExecutionResults(results, agentRegistry, toolCatalog, boundPlan);
      return results;
    }, (result) => ({
      task_results: result.results.map((entry) => ({ task_id: entry.task_id, status: entry.status })),
      mode: result.mode,
    }));

    const validation = runStage(report, "validation-agent", {
      route_level: report.routing.level,
      capability_id: capability.id,
      execution_mode: executionResults.mode,
    }, () => validateFastExecutionPath({
      routing: report.routing,
      capability,
      executionResults,
      stageNames: report.stages.map((stage) => stage.stage),
    }), (result) => ({
      status: result.status,
      scope: result.scope,
      checks: result.checks,
    }));

    report.status = "PASS";
    report.task_id = executionResults.results[0].task_id;
    report.iteration_id = "fast-iteration-0001";
    report.acceptance = {
      routing_level: report.routing.level,
      execution_path: "fast",
      matched_capability: capability.id,
      selected_agents: [...report.agent_selection.selected_agents],
      executor_mock: executionResults.mode === "mock",
      validation_status: validation.status,
      planner_skipped: !report.stages.some((stage) => stage.stage === "game-planner"),
      task_graph_skipped: !report.stages.some((stage) => stage.stage === "task-generator"),
      scheduler_skipped: !report.stages.some((stage) => stage.stage === "agent-scheduler"),
      loop_skipped: !report.stages.some((stage) => stage.stage === "loop-engine"),
      full_validation_required_before_release: validation.full_validation_required_before_release,
      trace_complete: report.stages.every((stage) => stage.status === "PASS"),
    };
    validateStudioReport(report);
    const reportPath = options.write === false
      ? null
      : writeStudioReport(report, options.reportPath || defaultReportPath);
    return { report, reportPath };
  } catch (error) {
    return completeFailedStudioRun(report, error, options);
  }
}

function runStudioOrchestrator(request, options = {}) {
  const report = createStudioReport(request, options);
  try {
    const blueprintContext = runStage(report, "blueprint-manager", { request }, () => createGameBlueprint(request, {
      version: options.blueprintVersion,
      projectId: options.projectId,
      genre: options.blueprintGenre,
      platform: options.blueprintPlatform,
    }), (result) => ({
      blueprint_version: result.blueprint_version,
      project_id: result.project.project_id,
      genre: result.project.genre,
      section_count: Object.keys(result.sections).length,
      execution_enabled: result.execution_enabled,
    }));
    report.blueprint_context = clone(blueprintContext);

    const routing = runStage(report, "task-router", { request }, () => routeTask(request, {
      configPath: options.taskRoutingConfigPath,
      dependencyImpact: blueprintContext.dependency_impact,
      executionMemoryStore: options.executionMemoryStore,
      executionMemoryHistoryPath: options.executionMemoryHistoryPath,
    }), (result) => ({
      level: result.level,
      execution_path: result.execution_path,
      route_type: result.route_type,
      execution_mode: result.execution_mode,
      task_complexity: result.task_complexity,
      execution_memory: result.execution_memory,
      reason: result.reason,
      execution_enabled: result.execution_enabled,
    }));
    report.routing = clone(routing);
    report.execution_mode = clone(routing.execution_mode);
    const memoryState = recordExecutionMemoryDecision({
      run_id: report.run_id,
      request,
      route_type: routing.route_type,
      execution_mode: routing.execution_mode,
      level: routing.level,
      reason: routing.reason,
      adaptive_reasons: routing.adaptive_reasons,
      task_complexity: routing.task_complexity,
      dependency_impact: routing.dependency_impact,
      status: "planned",
      timestamp: options.clock ? options.clock() : "2026-01-01T00:00:00.000Z",
    }, {
      store: options.executionMemoryStore || createEmptyExecutionMemory(),
      historyPath: options.executionMemoryHistoryPath,
      write: options.writeExecutionMemory === true,
    });
    report.execution_memory = {
      execution_enabled: false,
      record_count: memoryState.store.records.length,
      latest_route_type: memoryState.record.route_type,
      store_written: memoryState.storePath !== null,
    };
    const agentSelection = runStage(report, "agent-router", {
      request,
      route_level: routing.level,
      execution_path: routing.execution_path,
      execution_mode: routing.execution_mode,
    }, () => routeAgents(request, routing, {
      registryPath: options.agentRouterRegistryPath,
      policyPath: options.agentActivationPolicyPath,
      blueprint: blueprintContext,
    }), (result) => ({
      policy_id: result.policy_id,
      selected_agents: result.selected_agents,
      context_agents: Object.keys(result.blueprint_context),
      full_agent_chain: result.full_agent_chain,
      execution_enabled: result.execution_enabled,
    }));
    report.agent_selection = clone(agentSelection);
    if (routing.execution_path === "fast") {
      return runFastExecutionPipeline(request, options, report);
    }
    return runFullStudioPipeline(request, options, report);
  } catch (error) {
    return completeFailedStudioRun(report, error, options);
  }
}

function runFullStudioPipeline(request, options, report) {
  try {
    const capability = runStage(report, "capability-loader", { request }, () => {
      const capabilities = loadCapabilities(options.capabilityOptions);
      const matched = matchCapability(request, capabilities);
      if (!matched) {
        throw new Error("No capability matched the studio request.");
      }
      return matched;
    }, (result) => ({ capability_id: result.id }));

    const planner = runStage(report, "game-planner", {
      request,
      capability_id: capability.id,
    }, () => planGame(request, { write: false }), (result) => ({
      genre: result.blueprint.project.genre,
      project_name: result.blueprint.project.name,
    }));

    const taskGraph = runStage(report, "task-generator", {
      blueprint_project: planner.blueprint.project.name,
    }, () => buildTaskGraph(planner.blueprint), (result) => ({
      task_ids: result.tasks.map((task) => task.id),
    }));

    const agentRegistry = loadAgentRegistry();
    const executionPlan = runStage(report, "agent-scheduler", {
      task_ids: taskGraph.tasks.map((task) => task.id),
    }, () => buildExecutionPlan(taskGraph, agentRegistry), (result) => ({
      agents: result.execution_plan.map((entry) => entry.agent),
      execution_order: result.execution_plan.map((entry) => entry.task_id),
    }));

    const toolCatalog = loadToolCatalog();
    const boundPlan = runStage(report, "capability-binding", {
      execution_tasks: executionPlan.execution_plan.map((entry) => entry.task_id),
    }, () => buildBoundExecutionPlan(executionPlan, agentRegistry, toolCatalog), (result) => ({
      bindings: result.bound_execution_plan.map((entry) => ({
        task_id: entry.task_id,
        capabilities: entry.required_capabilities,
        tools: entry.matched_tools,
      })),
    }));

    const providerRegistry = loadProviderRegistry();
    const providerSelection = runStage(report, "provider-selector", {
      capabilities: boundPlan.bound_execution_plan.flatMap((entry) => entry.required_capabilities),
    }, () => findProviderSelection(boundPlan, providerRegistry), (result) => ({
      task_id: result.task_id,
      capability: result.capability,
      provider_id: result.provider.id,
      execution_enabled: result.provider.execution_enabled,
    }));

    const integrationManager = createDefaultIntegrationManager({ runtimeMode: "mock" });
    const runtimeManager = createDefaultRuntimeManager({
      runtimeMode: "mock",
      integrationManager,
    });
    const adapterRegistry = createDefaultAdapterRegistry({
      mockAdapterOptions: { clock: () => "2026-01-01T00:00:00.000Z" },
    });
    const executionResults = runStage(report, "agent-executor", {
      bound_task_ids: boundPlan.bound_execution_plan.map((entry) => entry.task_id),
      runtime_mode: "mock",
    }, () => {
      const results = executeBoundPlan(
        boundPlan,
        agentRegistry,
        toolCatalog,
        adapterRegistry,
        "mock",
        runtimeManager,
        "mock",
      );
      validateExecutionResults(results, agentRegistry, toolCatalog, boundPlan);
      return results;
    }, (result) => ({
      task_results: result.results.map((entry) => ({ task_id: entry.task_id, status: entry.status })),
      mode: result.mode,
    }));

    runStage(report, "runtime-manager", {
      executor_tasks: executionResults.results.map((entry) => entry.task_id),
    }, () => runtimeManager.result(), (result) => ({
      runtime_mode: runtimeManager.runtime_mode,
      routed_tasks: result.map((entry) => entry.task_id),
      integration_statuses: result.map((entry) => entry.integration.status),
    }));

    runStage(report, "integration-manager", {
      runtime_events: runtimeManager.result().length,
    }, () => integrationManager.result(), (result) => ({
      runtime_mode: integrationManager.runtime_mode,
      operations: result.map((entry) => ({
        integration: entry.integration,
        operation: entry.operation,
        status: entry.status,
      })),
    }));

    if (!options.projectRoot) {
      throw Object.assign(new Error("Studio Orchestrator requires a projectRoot for the Scanner stage."), {
        failedStage: "project-scanner",
      });
    }
    const projectId = options.projectId || slugify(planner.blueprint.project.name);
    const scannerReport = runStage(report, "project-scanner", {
      project_id: projectId,
    }, () => scanProject(options.projectRoot, {
      projectName: projectId,
      write: false,
    }).report, (result) => ({
      project: result.project,
      scripts: result.code.script_count,
      scenes: result.scenes.scene_count,
      completion_estimate: result.completion_estimate,
    }));

    const projectState = createProjectState({
      projectId,
      blueprint: planner.blueprint,
      taskGraph,
      executionResults,
      scannerReport,
    });
    const initialContext = buildProjectContext(projectState, {
      memory: null,
      projectScan: scannerReport,
    });
    const initialValidation = runStage(report, "validation-agent", {
      project_id: projectId,
      scanner_report: "in-memory",
      project_context: "in-memory",
    }, () => runValidationAgent({
      scannerReport,
      projectState,
      projectContext: initialContext,
      feedbackReport: {
        schema_version: "1.0.0",
        mode: "feedback-only",
        execution_enabled: false,
        summary: { total_feedback: 0, success_count: 0, failed_count: 0 },
        feedback: [],
        provider_rankings: {},
      },
      write: false,
    }).report, (result) => ({
      status: result.status,
      score: result.score,
      issue_count: result.issues.length,
      warning_count: result.warnings.length,
    }));

    const selectedExecution = executionResults.results.find(
      (entry) => entry.task_id === providerSelection.task_id,
    );
    if (!selectedExecution) {
      throw new Error(`Executor has no result for Provider-selected task: ${providerSelection.task_id}`);
    }
    const feedbackState = runStage(report, "feedback-system", {
      task_id: selectedExecution.task_id,
      capability: providerSelection.capability,
      validation_status: initialValidation.status,
    }, () => {
      const recorded = recordFeedback({
        task_id: `${report.run_id}-${selectedExecution.task_id}`,
        capability: providerSelection.capability,
        provider: providerSelection.provider.id,
        status: selectedExecution.status === "success" && initialValidation.status !== "FAILED"
          ? "success"
          : "failed",
        duration: 1,
        quality_score: initialValidation.score,
        speed_score: 100,
        success_score: initialValidation.status === "FAILED" ? 0 : 75,
        validation_result: {
          passed: initialValidation.status !== "FAILED",
          message: `Initial E2E validation status: ${initialValidation.status}.`,
        },
      }, {
        registry: providerRegistry,
        store: createEmptyPerformanceStore(),
        write: false,
      });
      const rankings = {
        [providerSelection.capability]: rankProvidersByFeedback(
          providerSelection.capability,
          {},
          recorded.store,
        ),
      };
      return {
        store: recorded.store,
        report: createFeedbackReport([recorded.feedback], rankings, { registry: providerRegistry }),
      };
    }, (result) => ({
      feedback_count: result.report.feedback.length,
      capabilities: Object.keys(result.store.capabilities),
    }));

    const memoryState = runStage(report, "memory-system", {
      project_id: projectId,
      source: "blueprint-and-decisions",
    }, () => {
      const memoryInputs = createMemoryInputs(projectId, planner.blueprint);
      const created = createMemory(memoryInputs.projectMemory, memoryInputs.styleMemory, {
        store: createEmptyMemoryStore(),
        write: false,
      });
      return updateMemory(projectId, {
        assets: memoryInputs.assets,
        decisions: [memoryInputs.decision],
      }, {
        store: created.store,
        write: false,
      });
    }, (result) => ({
      project_id: result.memory.project_memory.project_id,
      asset_count: result.memory.assets.length,
      decision_count: result.memory.decision_history.length,
      store_written: false,
    }));

    const intelligence = runStage(report, "project-intelligence", {
      project_id: projectId,
      scanner_status: scannerReport.execution_enabled === false ? "available" : "unsafe",
      validation_status: initialValidation.status,
    }, () => {
      const analysis = analyzeProject(projectState);
      const context = buildProjectContext(projectState, {
        analysis,
        memory: memoryState.memory,
        projectScan: scannerReport,
        validationReport: initialValidation,
      });
      return { analysis, context };
    }, (result) => ({
      project_status: result.analysis.status,
      completion_rate: result.analysis.completion_rate,
      scanner_read: result.context.project_scan !== null,
      validation_read: result.context.validation_report !== null,
    }));

    const decision = runStage(report, "decision-engine", {
      project_id: projectId,
      feedback_capabilities: Object.keys(feedbackState.report.provider_rankings),
      memory_decisions: memoryState.memory.decision_history.length,
    }, () => runDecisionEngine({
      projectState,
      projectContext: intelligence.context,
      feedbackReport: feedbackState.report,
      history: createEmptyDecisionHistory(),
      write: false,
    }), (result) => ({
      decision_id: result.decision.decision_id,
      task_id: result.decision.selected_action.task_id,
      capability: result.decision.selected_action.capability,
      confidence: result.decision.confidence,
    }));

    const loop = runStage(report, "loop-engine", {
      decision_id: decision.decision.decision_id,
      task_id: decision.decision.selected_action.task_id,
      max_iterations: 3,
    }, () => runDevelopmentLoop({
      maxIterations: 3,
      blueprint: planner.blueprint,
      projectState,
      scannerReport,
      projectContext: intelligence.context,
      feedbackReport: feedbackState.report,
      performanceStore: feedbackState.store,
      providerRegistry,
      decisionHistory: createEmptyDecisionHistory(),
      validationInputTransformer: createLoopValidationTransformer(),
      mockAdapterOptions: { clock: () => "2026-01-01T00:00:00.000Z" },
      write: false,
    }), (result) => ({
      iteration_id: result.report.iteration,
      status: result.report.status,
      validation_sequence: result.tracker.iterations.map((entry) => entry.validation_status),
      task_regenerated: result.tracker.iterations.some((entry) => entry.task_regenerated),
      feedback_count: result.feedbackState.entries.length,
      next_action: result.report.next_action,
    }));

    report.status = "PASS";
    report.task_id = loop.tracker.iterations[loop.tracker.iterations.length - 1].task_id;
    report.iteration_id = loop.report.iteration;
    report.acceptance = {
      matched_capability: capability.id,
      blueprint_version: report.blueprint_context.blueprint_version,
      selected_agents: [...report.agent_selection.selected_agents],
      blueprint_valid: planner.blueprint.project.genre === capability.id,
      task_graph_valid: taskGraph.tasks.length > 0,
      agents_resolved: executionPlan.execution_plan.every((entry) => agentRegistry.byId.has(entry.agent)),
      capability_provider_matched: providerSelection.provider.execution_enabled === false,
      executor_mock: executionResults.mode === "mock",
      runtime_routed: runtimeManager.result().length === taskGraph.tasks.length,
      integration_routed: integrationManager.result().length === taskGraph.tasks.length,
      validation_statuses: loop.tracker.iterations.map((entry) => entry.validation_status),
      failed_regenerated_task: loop.tracker.iterations.some((entry) => entry.task_regenerated),
      warning_policy_applied: loop.tracker.iterations.some(
        (entry) => entry.validation_status === "WARNING" && entry.next_action === "continue-loop",
      ),
      loop_converged_to_pass: loop.report.status === "PASS",
      feedback_recorded: loop.feedbackState.entries.length > feedbackState.report.feedback.length,
      memory_copy_only: memoryState.storePath === null,
      intelligence_read_scan: intelligence.context.project_scan !== null,
      intelligence_read_validation: intelligence.context.validation_report !== null,
      decision_created: Boolean(decision.decision.selected_action.task_id),
      trace_complete: report.stages.every((stage) => stage.status === "PASS"),
    };
    validateStudioReport(report);
    const reportPath = options.write === false
      ? null
      : writeStudioReport(report, options.reportPath || defaultReportPath);
    return { report, reportPath };
  } catch (error) {
    report.status = "FAILED";
    report.failed_stage = error.failedStage || report.stages.at(-1)?.stage || "orchestrator";
    report.acceptance = {
      fail_fast: true,
      completed_stage_count: report.stages.filter((stage) => stage.status === "PASS").length,
      failed_stage_count: report.stages.filter((stage) => stage.status === "FAILED").length,
    };
    validateStudioReport(report);
    const reportPath = options.write === false
      ? null
      : writeStudioReport(report, options.reportPath || defaultReportPath);
    return { report, reportPath, error };
  }
}

module.exports = {
  createLoopValidationTransformer,
  createMemoryInputs,
  createProjectState,
  findProviderSelection,
  runStudioOrchestrator,
  validateStudioReport,
  writeStudioReport,
};
