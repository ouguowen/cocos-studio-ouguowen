#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const {
  loadAgentRegistry,
  requireRegisteredAgent,
} = require("../scheduler/agent-registry");
const {
  loadToolCatalog,
  validateBoundExecutionPlan,
} = require("../scheduler/capability-matcher");
const { AdapterRegistry } = require("./adapters/base-adapter");
const { CocosAdapter } = require("./adapters/cocos-adapter");
const { CodeAdapter } = require("./adapters/code-adapter");
const { ProviderAdapter } = require("./adapters/provider-adapter");
const { MockExecutionAdapter } = require("./execution-adapter");
const { createDefaultRuntimeManager } = require("../runtime/runtime-manager");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const defaultInputPath = path.join(generatedDir, "bound-execution-plan.json");
const defaultOutputPath = path.join(generatedDir, "execution-results.json");

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function resolveGeneratedPath(filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(generatedDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${generatedDir}.`);
  }
  return resolvedPath;
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function readBoundExecutionPlan(
  inputPath = defaultInputPath,
  registry = loadAgentRegistry(),
  catalog = loadToolCatalog(),
) {
  const resolvedPath = resolveGeneratedPath(inputPath, "Bound Execution Plan input");
  const boundExecutionPlan = readJson(resolvedPath, "Bound Execution Plan");
  validateBoundExecutionPlan(boundExecutionPlan, registry, catalog);
  return boundExecutionPlan;
}

function resolveExecutionBinding(entry, registry, catalog) {
  const agent = requireRegisteredAgent(registry, entry.agent);
  if (agent.execution_enabled !== false) {
    throw new Error(`Agent ${agent.id} must keep execution_enabled false.`);
  }
  if (entry.required_capabilities.length !== 1 || entry.matched_tools.length !== 1) {
    throw new Error(`Task ${entry.task_id} must have exactly one capability and one Tool in this prototype.`);
  }

  const capability = entry.required_capabilities[0];
  const toolId = entry.matched_tools[0];
  const tool = catalog.toolsById.get(toolId);

  if (!agent.capabilities.includes(capability)) {
    throw new Error(`Agent ${agent.id} is not bound to capability: ${capability}`);
  }
  if (!agent.tool_ids.includes(toolId)) {
    throw new Error(`Agent ${agent.id} is not bound to Tool: ${toolId}`);
  }
  if (!tool || tool.external !== false || tool.execution_enabled !== false) {
    throw new Error(`Task ${entry.task_id} references an unsafe Tool: ${toolId}`);
  }
  if (!tool.allowed_agents.includes(agent.id)) {
    throw new Error(`Tool ${toolId} does not allow Agent: ${agent.id}`);
  }
  if (!tool.capabilities.includes(capability)) {
    throw new Error(`Tool ${toolId} does not provide capability: ${capability}`);
  }

  return {
    task_id: entry.task_id,
    agent: agent.id,
    tool: tool.id,
    capability,
  };
}

function validateAdapterResult(adapterResult, taskId) {
  if (!adapterResult || typeof adapterResult !== "object" || Array.isArray(adapterResult)) {
    throw new Error(`Adapter returned an invalid result for task ${taskId}.`);
  }
  if (!new Set(["success", "failed"]).has(adapterResult.status)) {
    throw new Error(`Adapter returned an invalid status for task ${taskId}.`);
  }
  assertNonEmptyString(adapterResult.output, `Task ${taskId} output`);
  assertNonEmptyString(adapterResult.timestamp, `Task ${taskId} timestamp`);
  if (Number.isNaN(Date.parse(adapterResult.timestamp))) {
    throw new Error(`Task ${taskId} timestamp must be ISO-compatible.`);
  }
}

function createDefaultAdapterRegistry(options = {}) {
  const adapterRegistry = new AdapterRegistry();
  adapterRegistry.register(new MockExecutionAdapter(options.mockAdapterOptions));
  adapterRegistry.register(new CocosAdapter());
  adapterRegistry.register(new ProviderAdapter());
  adapterRegistry.register(new CodeAdapter());
  return adapterRegistry;
}

function resolveAdapter(adapterSource, binding, mode) {
  const adapter = adapterSource && typeof adapterSource.match === "function"
    ? adapterSource.match(binding.tool, mode)
    : adapterSource;
  if (!adapter || adapter.mode !== mode || typeof adapter.execute !== "function") {
    if (mode === "mock") {
      throw new Error('Agent Executor only permits an execution adapter with mode "mock".');
    }
    throw new Error(`Agent Executor requires a registered ${mode} Adapter.`);
  }
  return adapter;
}

function executeBoundPlan(
  boundExecutionPlan,
  registry,
  catalog,
  adapterSource,
  mode = "mock",
  runtimeManager = createDefaultRuntimeManager({ runtimeMode: "mock" }),
  runtimeMode = runtimeManager.runtime_mode,
) {
  if (!new Set(["mock", "real"]).has(mode)) {
    throw new Error("Agent Executor mode must be mock or real.");
  }
  if (!new Set(["mock", "production"]).has(runtimeMode)) {
    throw new Error("Agent Executor runtime_mode must be mock or production.");
  }
  if (!runtimeManager || runtimeManager.runtime_mode !== runtimeMode
    || typeof runtimeManager.execute !== "function") {
    throw new Error(`Agent Executor requires a ${runtimeMode} Runtime Manager.`);
  }

  const results = boundExecutionPlan.bound_execution_plan.map((entry) => {
    const binding = resolveExecutionBinding(entry, registry, catalog);
    runtimeManager.execute(binding);
    const adapter = resolveAdapter(adapterSource, binding, mode);
    let adapterResult;
    try {
      adapterResult = adapter.execute(binding);
      validateAdapterResult(adapterResult, binding.task_id);
    } catch (error) {
      if (mode === "real" || error.code === "ADAPTER_EXECUTION_DISABLED") {
        throw error;
      }
      adapterResult = {
        status: "failed",
        output: `Mock execution error for ${binding.task_id}: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      ...binding,
      status: adapterResult.status,
      mode,
      output: adapterResult.output,
      timestamp: adapterResult.timestamp,
    };
  });

  return {
    project: boundExecutionPlan.project,
    mode,
    results,
  };
}

function validateExecutionResults(executionResults, registry, catalog, boundExecutionPlan) {
  if (!executionResults || typeof executionResults !== "object" || Array.isArray(executionResults)) {
    throw new Error("Execution Results must be an object.");
  }
  assertNonEmptyString(executionResults.project, "Execution Results project");
  if (!new Set(["mock", "real"]).has(executionResults.mode)) {
    throw new Error("Execution Results mode must be mock or real.");
  }
  if (!Array.isArray(executionResults.results) || executionResults.results.length === 0) {
    throw new Error("Execution Results must contain results.");
  }
  if (executionResults.results.length !== boundExecutionPlan.bound_execution_plan.length) {
    throw new Error("Execution Results task count does not match the Bound Execution Plan.");
  }

  const expectedByTask = new Map(
    boundExecutionPlan.bound_execution_plan.map((entry) => [entry.task_id, entry]),
  );
  const seenTasks = new Set();

  for (const result of executionResults.results) {
    for (const field of ["task_id", "agent", "tool", "capability", "status", "mode", "output", "timestamp"]) {
      if (!Object.prototype.hasOwnProperty.call(result, field)) {
        throw new Error(`Execution Result is missing field: ${field}`);
      }
    }
    for (const field of ["task_id", "agent", "tool", "capability", "output", "timestamp"]) {
      assertNonEmptyString(result[field], `Execution Result ${field}`);
    }
    if (seenTasks.has(result.task_id) || !expectedByTask.has(result.task_id)) {
      throw new Error(`Execution Results contain an unexpected or duplicate task: ${result.task_id}`);
    }
    seenTasks.add(result.task_id);
    if (!new Set(["success", "failed"]).has(result.status)) {
      throw new Error(`Execution Result ${result.task_id} has invalid status.`);
    }
    if (result.mode !== executionResults.mode) {
      throw new Error(`Execution Result ${result.task_id} mode does not match its parent result.`);
    }
    if (Number.isNaN(Date.parse(result.timestamp))) {
      throw new Error(`Execution Result ${result.task_id} has invalid timestamp.`);
    }

    const expected = resolveExecutionBinding(expectedByTask.get(result.task_id), registry, catalog);
    for (const field of ["agent", "tool", "capability"]) {
      if (result[field] !== expected[field]) {
        throw new Error(`Execution Result ${result.task_id} has mismatched ${field}.`);
      }
    }
  }
}

function writeExecutionResults(executionResults, outputPath = defaultOutputPath) {
  const resolvedPath = resolveGeneratedPath(outputPath, "Execution Results output");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(executionResults, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function runAgentExecutor(options = {}) {
  const mode = options.mode || "mock";
  const runtimeMode = options.runtimeMode || "mock";
  if (!new Set(["mock", "real"]).has(mode)) {
    throw new Error("Agent Executor mode must be mock or real.");
  }
  if (!new Set(["mock", "production"]).has(runtimeMode)) {
    throw new Error("Agent Executor runtime_mode must be mock or production.");
  }
  const registry = loadAgentRegistry(options.registryOptions);
  const catalog = loadToolCatalog();
  const boundExecutionPlan = readBoundExecutionPlan(
    options.inputPath || defaultInputPath,
    registry,
    catalog,
  );
  if (options.adapter && options.adapterRegistry) {
    throw new Error("Provide either adapter or adapterRegistry, not both.");
  }
  const adapterSource = options.adapter
    || options.adapterRegistry
    || createDefaultAdapterRegistry({ mockAdapterOptions: options.adapterOptions });
  const runtimeManager = options.runtimeManager
    || createDefaultRuntimeManager({ runtimeMode });
  const executionResults = executeBoundPlan(
    boundExecutionPlan,
    registry,
    catalog,
    adapterSource,
    mode,
    runtimeManager,
    runtimeMode,
  );
  validateExecutionResults(executionResults, registry, catalog, boundExecutionPlan);
  const outputPath = options.write === false
    ? null
    : writeExecutionResults(executionResults, options.outputPath || defaultOutputPath);

  return {
    registry,
    catalog,
    boundExecutionPlan,
    executionResults,
    runtimeManager,
    runtimeMode,
    outputPath,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node executor/agent-executor.js");
    console.log("Reads generated/bound-execution-plan.json and writes mock execution results.");
    return;
  }
  if (args.length > 0) {
    console.error("Usage: node executor/agent-executor.js");
    process.exitCode = 1;
    return;
  }

  try {
    const result = runAgentExecutor();
    console.log(JSON.stringify({
      project: result.executionResults.project,
      source: "generated/bound-execution-plan.json",
      output: path.relative(root, result.outputPath).replaceAll(path.sep, "/"),
      tasks: result.executionResults.results.length,
      mode: result.executionResults.mode,
      runtime_mode: result.runtimeMode,
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
  createDefaultAdapterRegistry,
  executeBoundPlan,
  readBoundExecutionPlan,
  resolveExecutionBinding,
  runAgentExecutor,
  validateExecutionResults,
  writeExecutionResults,
};
