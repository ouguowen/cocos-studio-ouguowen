#!/usr/bin/env node

const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");

const {
  loadAgentRegistry,
  requireRegisteredAgent,
} = require("../scheduler/agent-registry");
const {
  buildExecutionPlan,
  readTaskGraph,
  scheduleTasks,
  validateExecutionPlan,
} = require("../scheduler/task-scheduler");

const root = path.resolve(__dirname, "..");
const taskGraphPath = path.join(root, "generated", "task-graph.json");
const outputPath = path.join(root, "generated", "execution-plan.json");

const registry = loadAgentRegistry();
assert.equal(registry.mode, "prototype-plan-only");
assert.equal(registry.agents.length, 4, "Agent Registry should load four prototype Agents");
assert.ok(registry.agents.every((agent) => agent.execution_enabled === false));

const taskGraph = readTaskGraph(taskGraphPath);
assert.equal(taskGraph.project, "Modern City Tower Defense");
assert.equal(taskGraph.tasks.length, 4, "Task Graph should parse successfully");

for (const task of taskGraph.tasks) {
  assert.equal(requireRegisteredAgent(registry, task.agent).id, task.agent);
}

const result = scheduleTasks({ taskGraphPath, outputPath });
assert.ok(fs.statSync(outputPath).isFile(), "Execution Plan should be generated");

const executionPlan = JSON.parse(fs.readFileSync(outputPath, "utf8"));
validateExecutionPlan(executionPlan, result.registry);
assert.equal(executionPlan.execution_plan.length, taskGraph.tasks.length);

const byTaskId = new Map(executionPlan.execution_plan.map((entry) => [entry.task_id, entry]));
assert.equal(byTaskId.get("game-design").execution_order, 1);
assert.equal(byTaskId.get("system-implementation-plan").execution_order, 2);
assert.equal(byTaskId.get("asset-requirements").execution_order, 3);
assert.equal(byTaskId.get("validation-checklist").execution_order, 4);

for (const entry of executionPlan.execution_plan) {
  for (const dependencyId of entry.dependencies) {
    assert.ok(
      byTaskId.get(dependencyId).execution_order < entry.execution_order,
      `${dependencyId} should run before ${entry.task_id}`,
    );
  }
}

const unknownAgentGraph = JSON.parse(JSON.stringify(taskGraph));
unknownAgentGraph.tasks[0].agent = "unregistered-agent";
assert.throws(
  () => buildExecutionPlan(unknownAgentGraph, registry),
  /unregistered Agent/,
  "Scheduler should reject tasks assigned to an unregistered Agent",
);

console.log("Agent Scheduler prototype tests passed: registry, matching, plan generation, and dependency order validated.");
