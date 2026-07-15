#!/usr/bin/env node

const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");

const {
  generateTaskGraph,
  readBlueprint,
  validateTaskGraph,
} = require("../task-graph/task-generator");

const root = path.resolve(__dirname, "..");
const blueprintPath = path.join(root, "generated", "game-blueprint.json");
const outputPath = path.join(root, "generated", "task-graph.json");

const blueprint = readBlueprint(blueprintPath);
assert.equal(blueprint.project.name, "Modern City Tower Defense", "Blueprint should load successfully");

const result = generateTaskGraph({ blueprintPath, outputPath });
assert.ok(fs.statSync(outputPath).isFile(), "Task Graph should be generated");

const taskGraph = JSON.parse(fs.readFileSync(outputPath, "utf8"));
validateTaskGraph(taskGraph);

assert.equal(taskGraph.project, blueprint.project.name);
assert.equal(taskGraph.tasks.length, 4);

const tasksById = new Map(taskGraph.tasks.map((task) => [task.id, task]));
assert.deepEqual(tasksById.get("game-design").depends_on, []);
assert.deepEqual(tasksById.get("system-implementation-plan").depends_on, ["game-design"]);
assert.deepEqual(tasksById.get("asset-requirements").depends_on, ["game-design"]);
assert.deepEqual(tasksById.get("validation-checklist").depends_on, [
  "game-design",
  "system-implementation-plan",
  "asset-requirements",
]);

assert.equal(tasksById.get("game-design").agent, "game-designer");
assert.equal(tasksById.get("system-implementation-plan").agent, "cocos-programmer");
assert.equal(tasksById.get("asset-requirements").agent, "artist");
assert.equal(tasksById.get("validation-checklist").agent, "qa");

const invalidGraph = JSON.parse(JSON.stringify(taskGraph));
invalidGraph.tasks[1].depends_on = ["missing-task"];
assert.throws(
  () => validateTaskGraph(invalidGraph),
  /unknown task/,
  "Task Graph validation should reject an unknown dependency",
);

console.log("Task Generator prototype tests passed: Blueprint read, DAG generated, dependencies and schema validated.");
