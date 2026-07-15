#!/usr/bin/env node

const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");

const { loadAgentRegistry } = require("../scheduler/agent-registry");
const {
  bindExecutionPlan,
  buildBoundExecutionPlan,
  loadToolCatalog,
  readExecutionPlan,
  validateAgentCapabilityBinding,
  validateBoundExecutionPlan,
} = require("../scheduler/capability-matcher");

const root = path.resolve(__dirname, "..");
const executionPlanPath = path.join(root, "generated", "execution-plan.json");
const outputPath = path.join(root, "generated", "bound-execution-plan.json");

const registry = loadAgentRegistry();
assert.equal(registry.agents.length, 4);
for (const agent of registry.agents) {
  validateAgentCapabilityBinding(agent);
  assert.equal(agent.execution_enabled, false);
}

const catalog = loadToolCatalog();
assert.equal(catalog.capabilities.length, 4);
assert.equal(catalog.tools.length, 4);
assert.ok(catalog.tools.every((tool) => tool.external === false));
assert.ok(catalog.tools.every((tool) => tool.execution_enabled === false));

const executionPlan = readExecutionPlan(executionPlanPath, registry);
assert.equal(executionPlan.execution_plan.length, 4);

const result = bindExecutionPlan({ executionPlanPath, outputPath });
assert.ok(fs.statSync(outputPath).isFile(), "Bound Execution Plan should be generated");

const boundPlan = JSON.parse(fs.readFileSync(outputPath, "utf8"));
validateBoundExecutionPlan(boundPlan, result.registry, result.catalog);
assert.equal(boundPlan.bound_execution_plan.length, executionPlan.execution_plan.length);

const byTaskId = new Map(boundPlan.bound_execution_plan.map((entry) => [entry.task_id, entry]));
assert.deepEqual(byTaskId.get("game-design").required_capabilities, ["game-design"]);
assert.deepEqual(byTaskId.get("game-design").matched_tools, ["blueprint-design-reader"]);
assert.deepEqual(byTaskId.get("system-implementation-plan").matched_tools, ["blueprint-system-planner"]);
assert.deepEqual(byTaskId.get("asset-requirements").matched_tools, ["asset-requirement-catalog"]);
assert.deepEqual(byTaskId.get("validation-checklist").matched_tools, ["validation-checklist-builder"]);
assert.ok(boundPlan.bound_execution_plan.every((entry) => entry.execution_status === "bound-not-executed"));

const brokenRegistry = {
  ...registry,
  agents: registry.agents.map((agent) => ({ ...agent, tool_ids: [...agent.tool_ids] })),
};
brokenRegistry.byId = new Map(brokenRegistry.agents.map((agent) => [agent.id, agent]));
brokenRegistry.byId.get("game-designer").tool_ids = ["missing-tool"];
assert.throws(
  () => buildBoundExecutionPlan(executionPlan, brokenRegistry, catalog),
  /unknown Tool/,
  "Capability binding should reject an unknown Tool",
);

console.log("Agent Capability Binding prototype tests passed: capabilities and disabled Tools matched without execution.");
