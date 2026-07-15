#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const {
  loadAgentRegistry,
  requireRegisteredAgent,
} = require("./agent-registry");
const { validateExecutionPlan } = require("./task-scheduler");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const capabilitiesDir = path.join(root, "capabilities");
const schemaPath = path.join(root, "agents", "schemas", "agent-capability-schema.json");
const toolsPath = path.join(capabilitiesDir, "tools.json");
const defaultExecutionPlanPath = path.join(generatedDir, "execution-plan.json");
const defaultOutputPath = path.join(generatedDir, "bound-execution-plan.json");

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
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

function assertString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertStringArray(value, label, allowEmpty = false) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) {
    throw new Error(`${label} must be ${allowEmpty ? "an" : "a non-empty"} array.`);
  }
  if (value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`${label} must contain only non-empty strings.`);
  }
  if (new Set(value).size !== value.length) {
    throw new Error(`${label} must not contain duplicates.`);
  }
}

function validateAgentCapabilityBinding(agent, schema = readJson(schemaPath, "Agent Capability schema")) {
  if (!agent || typeof agent !== "object" || Array.isArray(agent)) {
    throw new Error("Agent Capability binding must be an object.");
  }
  for (const required of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(agent, required)) {
      throw new Error(`Agent ${agent.id || "unknown"} is missing capability field: ${required}`);
    }
  }

  assertString(agent.id, "Agent Capability id");
  assertStringArray(agent.capabilities, `Agent ${agent.id} capabilities`);
  assertStringArray(agent.tool_ids, `Agent ${agent.id} tool_ids`);
  if (agent.execution_enabled !== schema.properties.execution_enabled.const) {
    throw new Error(`Agent ${agent.id} must keep execution_enabled false.`);
  }
}

function loadToolCatalog() {
  const catalog = readJson(toolsPath, "Tool Catalog");
  assertString(catalog.schema_version, "Tool Catalog schema_version");
  if (catalog.mode !== "prototype-metadata-only") {
    throw new Error("Tool Catalog mode must be prototype-metadata-only.");
  }
  if (!Array.isArray(catalog.capabilities) || catalog.capabilities.length === 0) {
    throw new Error("Tool Catalog must contain capabilities.");
  }
  if (!Array.isArray(catalog.tools) || catalog.tools.length === 0) {
    throw new Error("Tool Catalog must contain tools.");
  }

  const capabilitiesById = new Map();
  for (const capability of catalog.capabilities) {
    assertString(capability.id, "Tool Catalog capability id");
    assertString(capability.description, `Capability ${capability.id} description`);
    if (capabilitiesById.has(capability.id)) {
      throw new Error(`Tool Catalog contains duplicate capability: ${capability.id}`);
    }
    capabilitiesById.set(capability.id, capability);
  }

  const toolsById = new Map();
  for (const tool of catalog.tools) {
    assertString(tool.id, "Tool Catalog tool id");
    assertString(tool.description, `Tool ${tool.id} description`);
    assertStringArray(tool.capabilities, `Tool ${tool.id} capabilities`);
    assertStringArray(tool.allowed_agents, `Tool ${tool.id} allowed_agents`);
    if (tool.external !== false || tool.execution_enabled !== false) {
      throw new Error(`Tool ${tool.id} must remain internal metadata with execution disabled.`);
    }
    if (toolsById.has(tool.id)) {
      throw new Error(`Tool Catalog contains duplicate tool: ${tool.id}`);
    }
    for (const capabilityId of tool.capabilities) {
      if (!capabilitiesById.has(capabilityId)) {
        throw new Error(`Tool ${tool.id} references unknown capability: ${capabilityId}`);
      }
    }
    toolsById.set(tool.id, tool);
  }

  return {
    schema_version: catalog.schema_version,
    mode: catalog.mode,
    capabilities: catalog.capabilities,
    capabilitiesById,
    tools: catalog.tools,
    toolsById,
  };
}

function readExecutionPlan(executionPlanPath = defaultExecutionPlanPath, registry = loadAgentRegistry()) {
  const resolvedPath = resolveGeneratedPath(executionPlanPath, "Execution Plan input");
  const executionPlan = readJson(resolvedPath, "Execution Plan");
  validateExecutionPlan(executionPlan, registry);
  return executionPlan;
}

function matchAgentTools(agent, catalog) {
  validateAgentCapabilityBinding(agent);

  for (const capabilityId of agent.capabilities) {
    if (!catalog.capabilitiesById.has(capabilityId)) {
      throw new Error(`Agent ${agent.id} references unknown capability: ${capabilityId}`);
    }
  }

  const matchedTools = agent.tool_ids.map((toolId) => {
    const tool = catalog.toolsById.get(toolId);
    if (!tool) {
      throw new Error(`Agent ${agent.id} references unknown Tool: ${toolId}`);
    }
    if (!tool.allowed_agents.includes(agent.id)) {
      throw new Error(`Tool ${toolId} does not allow Agent: ${agent.id}`);
    }
    if (!tool.capabilities.some((capabilityId) => agent.capabilities.includes(capabilityId))) {
      throw new Error(`Tool ${toolId} does not support Agent ${agent.id} capabilities.`);
    }
    return tool;
  });

  for (const capabilityId of agent.capabilities) {
    if (!matchedTools.some((tool) => tool.capabilities.includes(capabilityId))) {
      throw new Error(`Agent ${agent.id} has no matched Tool for capability: ${capabilityId}`);
    }
  }

  return matchedTools;
}

function buildBoundExecutionPlan(executionPlan, registry, catalog) {
  const boundExecutionPlan = {
    project: executionPlan.project,
    bound_execution_plan: executionPlan.execution_plan.map((entry) => {
      const agent = requireRegisteredAgent(registry, entry.agent);
      validateAgentCapabilityBinding(agent);
      if (!agent.capabilities.includes(entry.task_id)) {
        throw new Error(`Agent ${agent.id} is not bound to task capability: ${entry.task_id}`);
      }
      const matchedTools = matchAgentTools(agent, catalog);
      return {
        task_id: entry.task_id,
        agent: entry.agent,
        required_capabilities: [...agent.capabilities],
        matched_tools: matchedTools.map((tool) => tool.id),
        execution_status: "bound-not-executed",
      };
    }),
  };

  validateBoundExecutionPlan(boundExecutionPlan, registry, catalog);
  return boundExecutionPlan;
}

function validateBoundExecutionPlan(boundExecutionPlan, registry, catalog) {
  if (!boundExecutionPlan || typeof boundExecutionPlan !== "object" || Array.isArray(boundExecutionPlan)) {
    throw new Error("Bound Execution Plan must be an object.");
  }
  assertString(boundExecutionPlan.project, "Bound Execution Plan project");
  if (!Array.isArray(boundExecutionPlan.bound_execution_plan) || boundExecutionPlan.bound_execution_plan.length === 0) {
    throw new Error("Bound Execution Plan must contain bound_execution_plan entries.");
  }

  const seenTasks = new Set();
  for (const entry of boundExecutionPlan.bound_execution_plan) {
    const requiredFields = [
      "task_id",
      "agent",
      "required_capabilities",
      "matched_tools",
      "execution_status",
    ];
    for (const field of requiredFields) {
      if (!Object.prototype.hasOwnProperty.call(entry, field)) {
        throw new Error(`Bound Execution Plan entry is missing field: ${field}`);
      }
    }
    assertString(entry.task_id, "Bound task_id");
    assertString(entry.agent, `Bound task ${entry.task_id} agent`);
    assertStringArray(entry.required_capabilities, `Bound task ${entry.task_id} required_capabilities`);
    assertStringArray(entry.matched_tools, `Bound task ${entry.task_id} matched_tools`);
    if (entry.execution_status !== "bound-not-executed") {
      throw new Error(`Bound task ${entry.task_id} has invalid execution_status.`);
    }
    if (seenTasks.has(entry.task_id)) {
      throw new Error(`Bound Execution Plan contains duplicate task: ${entry.task_id}`);
    }
    seenTasks.add(entry.task_id);

    const agent = requireRegisteredAgent(registry, entry.agent);
    if (agent.execution_enabled !== false) {
      throw new Error(`Bound Agent ${agent.id} must keep execution disabled.`);
    }
    for (const capabilityId of entry.required_capabilities) {
      if (!catalog.capabilitiesById.has(capabilityId)) {
        throw new Error(`Bound task ${entry.task_id} has unknown capability: ${capabilityId}`);
      }
    }
    for (const toolId of entry.matched_tools) {
      const tool = catalog.toolsById.get(toolId);
      if (!tool || tool.execution_enabled !== false || tool.external !== false) {
        throw new Error(`Bound task ${entry.task_id} has unsafe Tool: ${toolId}`);
      }
    }
  }
}

function writeBoundExecutionPlan(boundExecutionPlan, outputPath = defaultOutputPath) {
  const resolvedPath = resolveGeneratedPath(outputPath, "Bound Execution Plan output");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(boundExecutionPlan, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function bindExecutionPlan(options = {}) {
  const registry = loadAgentRegistry(options.registryOptions);
  const catalog = loadToolCatalog();
  const executionPlan = readExecutionPlan(options.executionPlanPath || defaultExecutionPlanPath, registry);
  const boundExecutionPlan = buildBoundExecutionPlan(executionPlan, registry, catalog);
  const outputPath = options.write === false
    ? null
    : writeBoundExecutionPlan(boundExecutionPlan, options.outputPath || defaultOutputPath);

  return {
    registry,
    catalog,
    executionPlan,
    boundExecutionPlan,
    outputPath,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node scheduler/capability-matcher.js");
    console.log("Reads generated/execution-plan.json and writes generated/bound-execution-plan.json.");
    return;
  }
  if (args.length > 0) {
    console.error("Usage: node scheduler/capability-matcher.js");
    process.exitCode = 1;
    return;
  }

  try {
    const result = bindExecutionPlan();
    console.log(JSON.stringify({
      project: result.boundExecutionPlan.project,
      source: "generated/execution-plan.json",
      tool_catalog: "capabilities/tools.json",
      output: path.relative(root, result.outputPath).replaceAll(path.sep, "/"),
      bound_tasks: result.boundExecutionPlan.bound_execution_plan.length,
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
  bindExecutionPlan,
  buildBoundExecutionPlan,
  loadToolCatalog,
  matchAgentTools,
  readExecutionPlan,
  validateAgentCapabilityBinding,
  validateBoundExecutionPlan,
  writeBoundExecutionPlan,
};
