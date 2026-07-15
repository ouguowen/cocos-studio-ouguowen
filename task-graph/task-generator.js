#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { validateBlueprint } = require("../planner/game-planner");

const root = path.resolve(__dirname, "..");
const schemaPath = path.join(__dirname, "task-schema.json");
const templatePath = path.join(__dirname, "templates", "default.json");
const defaultBlueprintPath = path.join(root, "generated", "game-blueprint.json");
const defaultOutputPath = path.join(root, "generated", "task-graph.json");

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function readBlueprint(blueprintPath = defaultBlueprintPath) {
  const resolvedPath = resolveGeneratedPath(blueprintPath, "Blueprint input");
  const blueprint = readJson(resolvedPath, "Game Blueprint");
  validateBlueprint(blueprint);
  return blueprint;
}

function loadTaskTemplate() {
  const template = readJson(templatePath, "task template");
  if (template.status !== "implemented") {
    throw new Error(`Task template is not implemented: ${template.id || "unknown"}`);
  }
  if (!Array.isArray(template.tasks) || template.tasks.length === 0) {
    throw new Error("Task template must contain a non-empty tasks array.");
  }

  const allowedSections = new Set(["project", "design", "systems", "assets", "agents"]);
  for (const task of template.tasks) {
    if (!Array.isArray(task.input_sections) || task.input_sections.length === 0) {
      throw new Error(`Task template ${task.id || "unknown"} must define input_sections.`);
    }
    for (const section of task.input_sections) {
      if (!allowedSections.has(section)) {
        throw new Error(`Task template ${task.id} uses unknown Blueprint section: ${section}`);
      }
    }
  }

  return template;
}

function resolveGeneratedPath(filePath, label) {
  const generatedDir = path.join(root, "generated");
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(generatedDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${generatedDir}.`);
  }
  return resolvedPath;
}

function createTaskInput(blueprint, inputSections) {
  const selected = {};
  for (const section of inputSections) {
    selected[section] = blueprint[section];
  }
  return JSON.stringify(selected);
}

function buildTaskGraph(blueprint, template = loadTaskTemplate()) {
  const taskGraph = {
    project: blueprint.project.name,
    tasks: template.tasks.map((task) => ({
      id: task.id,
      agent: task.agent,
      priority: task.priority,
      depends_on: [...task.depends_on],
      input: createTaskInput(blueprint, task.input_sections),
      output: task.output,
      validation: task.validation,
    })),
  };

  validateTaskGraph(taskGraph);
  return taskGraph;
}

function resolveSchemaReference(reference, rootSchema) {
  if (!reference.startsWith("#/$defs/")) {
    throw new Error(`Unsupported task schema reference: ${reference}`);
  }
  const definitionName = reference.slice("#/$defs/".length);
  const definition = rootSchema.$defs?.[definitionName];
  if (!definition) {
    throw new Error(`Unknown task schema definition: ${definitionName}`);
  }
  return definition;
}

function validateSchemaValue(value, schema, valuePath, rootSchema) {
  if (schema.$ref) {
    validateSchemaValue(value, resolveSchemaReference(schema.$ref, rootSchema), valuePath, rootSchema);
    return;
  }

  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error(`${valuePath} must be an object.`);
    }
    for (const required of schema.required || []) {
      if (!Object.prototype.hasOwnProperty.call(value, required)) {
        throw new Error(`${valuePath} is missing required property: ${required}`);
      }
    }
    if (schema.additionalProperties === false) {
      const allowed = new Set(Object.keys(schema.properties || {}));
      for (const key of Object.keys(value)) {
        if (!allowed.has(key)) {
          throw new Error(`${valuePath} contains unsupported property: ${key}`);
        }
      }
    }
    for (const [key, propertySchema] of Object.entries(schema.properties || {})) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        validateSchemaValue(value[key], propertySchema, `${valuePath}.${key}`, rootSchema);
      }
    }
    return;
  }

  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      throw new Error(`${valuePath} must be an array.`);
    }
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      throw new Error(`${valuePath} must contain at least ${schema.minItems} items.`);
    }
    value.forEach((item, index) => {
      validateSchemaValue(item, schema.items, `${valuePath}[${index}]`, rootSchema);
    });
    return;
  }

  if (schema.type === "string") {
    if (typeof value !== "string") {
      throw new Error(`${valuePath} must be a string.`);
    }
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      throw new Error(`${valuePath} must contain at least ${schema.minLength} characters.`);
    }
    if (schema.enum && !schema.enum.includes(value)) {
      throw new Error(`${valuePath} must be one of: ${schema.enum.join(", ")}.`);
    }
    return;
  }

  if (schema.type === "integer") {
    if (!Number.isInteger(value)) {
      throw new Error(`${valuePath} must be an integer.`);
    }
    if (schema.minimum !== undefined && value < schema.minimum) {
      throw new Error(`${valuePath} must be at least ${schema.minimum}.`);
    }
    return;
  }

  throw new Error(`Unsupported task schema type at ${valuePath}: ${schema.type}`);
}

function validateDependencies(taskGraph) {
  const tasksById = new Map();
  for (const task of taskGraph.tasks) {
    if (tasksById.has(task.id)) {
      throw new Error(`Task Graph contains duplicate task id: ${task.id}`);
    }
    tasksById.set(task.id, task);
  }

  for (const task of taskGraph.tasks) {
    const uniqueDependencies = new Set(task.depends_on);
    if (uniqueDependencies.size !== task.depends_on.length) {
      throw new Error(`Task ${task.id} contains duplicate dependencies.`);
    }
    for (const dependencyId of task.depends_on) {
      if (dependencyId === task.id) {
        throw new Error(`Task ${task.id} cannot depend on itself.`);
      }
      const dependency = tasksById.get(dependencyId);
      if (!dependency) {
        throw new Error(`Task ${task.id} depends on unknown task: ${dependencyId}`);
      }
      if (dependency.priority >= task.priority) {
        throw new Error(`Task ${task.id} must have lower precedence than dependency ${dependencyId}.`);
      }
    }
  }

  const visiting = new Set();
  const visited = new Set();

  function visit(taskId) {
    if (visiting.has(taskId)) {
      throw new Error(`Task Graph contains a dependency cycle at: ${taskId}`);
    }
    if (visited.has(taskId)) {
      return;
    }
    visiting.add(taskId);
    for (const dependencyId of tasksById.get(taskId).depends_on) {
      visit(dependencyId);
    }
    visiting.delete(taskId);
    visited.add(taskId);
  }

  for (const taskId of tasksById.keys()) {
    visit(taskId);
  }
}

function validateTaskGraph(taskGraph, schema = readJson(schemaPath, "Task Graph schema")) {
  validateSchemaValue(taskGraph, schema, "taskGraph", schema);
  validateDependencies(taskGraph);
}

function writeTaskGraph(taskGraph, outputPath = defaultOutputPath) {
  const resolvedPath = resolveGeneratedPath(outputPath, "Task Graph output");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(taskGraph, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function generateTaskGraph(options = {}) {
  const blueprint = readBlueprint(options.blueprintPath || defaultBlueprintPath);
  const template = loadTaskTemplate();
  const taskGraph = buildTaskGraph(blueprint, template);
  const outputPath = options.write === false
    ? null
    : writeTaskGraph(taskGraph, options.outputPath || defaultOutputPath);

  return {
    blueprint,
    template,
    taskGraph,
    outputPath,
  };
}

function printUsage() {
  console.log("Usage: node task-graph/task-generator.js");
  console.log("Reads generated/game-blueprint.json and writes generated/task-graph.json.");
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }
  if (args.length > 0) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const result = generateTaskGraph();
    console.log(JSON.stringify({
      project: result.taskGraph.project,
      source: "generated/game-blueprint.json",
      output: path.relative(root, result.outputPath).replaceAll(path.sep, "/"),
      task_count: result.taskGraph.tasks.length,
      agents: result.taskGraph.tasks.map((task) => task.agent),
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
  buildTaskGraph,
  generateTaskGraph,
  loadTaskTemplate,
  readBlueprint,
  validateTaskGraph,
  writeTaskGraph,
};
