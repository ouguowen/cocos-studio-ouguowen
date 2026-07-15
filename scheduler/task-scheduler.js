#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { validateTaskGraph } = require("../task-graph/task-generator");
const {
  loadAgentRegistry,
  requireRegisteredAgent,
} = require("./agent-registry");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const defaultTaskGraphPath = path.join(generatedDir, "task-graph.json");
const defaultOutputPath = path.join(generatedDir, "execution-plan.json");

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

function readTaskGraph(taskGraphPath = defaultTaskGraphPath) {
  const resolvedPath = resolveGeneratedPath(taskGraphPath, "Task Graph input");
  const taskGraph = readJson(resolvedPath, "Task Graph");
  validateTaskGraph(taskGraph);
  return taskGraph;
}

function sortTasks(taskGraph) {
  const tasksById = new Map(taskGraph.tasks.map((task, index) => [
    task.id,
    { task, index },
  ]));
  const indegree = new Map(taskGraph.tasks.map((task) => [task.id, task.depends_on.length]));
  const dependents = new Map(taskGraph.tasks.map((task) => [task.id, []]));

  for (const task of taskGraph.tasks) {
    for (const dependencyId of task.depends_on) {
      dependents.get(dependencyId).push(task.id);
    }
  }

  const ready = taskGraph.tasks
    .filter((task) => indegree.get(task.id) === 0)
    .map((task) => task.id);
  const ordered = [];

  function sortReady() {
    ready.sort((leftId, rightId) => {
      const left = tasksById.get(leftId);
      const right = tasksById.get(rightId);
      if (left.task.priority !== right.task.priority) {
        return left.task.priority - right.task.priority;
      }
      if (left.index !== right.index) {
        return left.index - right.index;
      }
      return leftId.localeCompare(rightId);
    });
  }

  sortReady();
  while (ready.length > 0) {
    const taskId = ready.shift();
    ordered.push(tasksById.get(taskId).task);

    for (const dependentId of dependents.get(taskId)) {
      const remaining = indegree.get(dependentId) - 1;
      indegree.set(dependentId, remaining);
      if (remaining === 0) {
        ready.push(dependentId);
      }
    }
    sortReady();
  }

  if (ordered.length !== taskGraph.tasks.length) {
    throw new Error("Task Graph cannot be scheduled because it contains a dependency cycle.");
  }
  return ordered;
}

function buildExecutionPlan(taskGraph, registry) {
  for (const task of taskGraph.tasks) {
    requireRegisteredAgent(registry, task.agent);
  }

  const orderedTasks = sortTasks(taskGraph);
  const executionPlan = {
    project: taskGraph.project,
    execution_plan: orderedTasks.map((task, index) => ({
      task_id: task.id,
      agent: task.agent,
      priority: task.priority,
      dependencies: [...task.depends_on],
      execution_order: index + 1,
    })),
  };

  validateExecutionPlan(executionPlan, registry);
  return executionPlan;
}

function validateExecutionPlan(executionPlan, registry) {
  if (!executionPlan || typeof executionPlan !== "object" || Array.isArray(executionPlan)) {
    throw new Error("Execution Plan must be an object.");
  }
  if (typeof executionPlan.project !== "string" || executionPlan.project.length === 0) {
    throw new Error("Execution Plan project must be a non-empty string.");
  }
  if (!Array.isArray(executionPlan.execution_plan) || executionPlan.execution_plan.length === 0) {
    throw new Error("Execution Plan must contain a non-empty execution_plan array.");
  }

  const byTaskId = new Map();
  for (const entry of executionPlan.execution_plan) {
    const requiredFields = ["task_id", "agent", "priority", "dependencies", "execution_order"];
    for (const field of requiredFields) {
      if (!Object.prototype.hasOwnProperty.call(entry, field)) {
        throw new Error(`Execution Plan entry is missing field: ${field}`);
      }
    }
    if (byTaskId.has(entry.task_id)) {
      throw new Error(`Execution Plan contains duplicate task_id: ${entry.task_id}`);
    }
    requireRegisteredAgent(registry, entry.agent);
    if (!Number.isInteger(entry.priority) || entry.priority < 1) {
      throw new Error(`Execution Plan priority must be a positive integer: ${entry.task_id}`);
    }
    if (!Array.isArray(entry.dependencies)) {
      throw new Error(`Execution Plan dependencies must be an array: ${entry.task_id}`);
    }
    if (!Number.isInteger(entry.execution_order) || entry.execution_order < 1) {
      throw new Error(`Execution Plan execution_order must be positive: ${entry.task_id}`);
    }
    byTaskId.set(entry.task_id, entry);
  }

  const sortedOrders = executionPlan.execution_plan
    .map((entry) => entry.execution_order)
    .sort((left, right) => left - right);
  sortedOrders.forEach((order, index) => {
    if (order !== index + 1) {
      throw new Error("Execution Plan execution_order must be contiguous and unique.");
    }
  });

  for (const entry of executionPlan.execution_plan) {
    for (const dependencyId of entry.dependencies) {
      const dependency = byTaskId.get(dependencyId);
      if (!dependency) {
        throw new Error(`Execution Plan task ${entry.task_id} has unknown dependency: ${dependencyId}`);
      }
      if (dependency.execution_order >= entry.execution_order) {
        throw new Error(`Execution Plan dependency ${dependencyId} must run before ${entry.task_id}.`);
      }
    }
  }
}

function writeExecutionPlan(executionPlan, outputPath = defaultOutputPath) {
  const resolvedPath = resolveGeneratedPath(outputPath, "Execution Plan output");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(executionPlan, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function scheduleTasks(options = {}) {
  const registry = loadAgentRegistry(options.registryOptions);
  const taskGraph = readTaskGraph(options.taskGraphPath || defaultTaskGraphPath);
  const executionPlan = buildExecutionPlan(taskGraph, registry);
  const outputPath = options.write === false
    ? null
    : writeExecutionPlan(executionPlan, options.outputPath || defaultOutputPath);

  return {
    registry,
    taskGraph,
    executionPlan,
    outputPath,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node scheduler/task-scheduler.js");
    console.log("Reads generated/task-graph.json and writes generated/execution-plan.json.");
    return;
  }
  if (args.length > 0) {
    console.error("Usage: node scheduler/task-scheduler.js");
    process.exitCode = 1;
    return;
  }

  try {
    const result = scheduleTasks();
    console.log(JSON.stringify({
      project: result.executionPlan.project,
      source: "generated/task-graph.json",
      registry: "agents/registry.json",
      output: path.relative(root, result.outputPath).replaceAll(path.sep, "/"),
      scheduled_tasks: result.executionPlan.execution_plan.length,
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
  buildExecutionPlan,
  readTaskGraph,
  scheduleTasks,
  sortTasks,
  validateExecutionPlan,
  writeExecutionPlan,
};
