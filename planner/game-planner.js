#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const {
  loadCapabilities,
  matchCapability,
  normalizeText,
} = require("../scripts/capability-loader");

const root = path.resolve(__dirname, "..");
const templatesDir = path.join(__dirname, "templates");
const schemaPath = path.join(__dirname, "blueprint-schema.json");
const defaultOutputPath = path.join(root, "generated", "game-blueprint.json");

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function resolveInside(baseDir, relativePath, label) {
  if (typeof relativePath !== "string" || relativePath.length === 0 || path.isAbsolute(relativePath)) {
    throw new Error(`${label} must be a non-empty relative path.`);
  }

  const resolved = path.resolve(baseDir, relativePath);
  const relative = path.relative(baseDir, resolved);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} escapes ${baseDir}: ${relativePath}`);
  }

  return resolved;
}

function loadPlannerTemplate(capabilityId) {
  const templatePath = resolveInside(templatesDir, `${capabilityId}.json`, "Planner template");
  const template = readJson(templatePath, "planner template");

  if (template.id !== capabilityId) {
    throw new Error(`Planner template id mismatch: capability=${capabilityId}, template=${template.id}`);
  }

  if (template.status !== "implemented") {
    throw new Error(`Planner template is not implemented: ${capabilityId}`);
  }

  validateTemplate(template);
  return template;
}

function validateTemplate(template) {
  assertObject(template.project, "template project");
  assertObject(template.gameplay, "template gameplay");
  assertObject(template.assets, "template assets");
  assertObject(template.validation, "template validation");
  assertNonEmptyArray(template.gameplay.gameplay_loop, "template gameplay_loop");
  assertNonEmptyArray(template.systems, "template systems");
  assertNonEmptyArray(template.agents, "template agents");
  assertNonEmptyArray(template.validation.required_systems, "template required_systems");
  assertNonEmptyArray(template.validation.required_agents, "template required_agents");

  const systemIds = new Set(template.systems.map((system) => system.id));
  for (const requiredSystem of template.validation.required_systems) {
    if (!systemIds.has(requiredSystem)) {
      throw new Error(`Planner template is missing required system: ${requiredSystem}`);
    }
  }

  const agentRoles = new Set(template.agents.map((agent) => agent.role));
  for (const requiredAgent of template.validation.required_agents) {
    if (!agentRoles.has(requiredAgent)) {
      throw new Error(`Planner template is missing required Agent: ${requiredAgent}`);
    }
  }
}

function assertObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
}

function assertNonEmptyArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a non-empty array.`);
  }
}

function inferTheme(request, template) {
  const normalized = normalizeText(request);
  const modernCitySignals = ["\u73b0\u4ee3\u57ce\u5e02", "modern city"];
  if (modernCitySignals.some((signal) => normalized.includes(signal))) {
    return "modern-city";
  }
  return template.gameplay.default_theme;
}

function inferPlatform(request, template) {
  const normalized = normalizeText(request);
  const mobileSignals = ["\u624b\u6e38", "\u624b\u673a", "mobile"];
  if (mobileSignals.some((signal) => normalized.includes(signal))) {
    return "mobile";
  }
  return template.project.platform;
}

function createProjectName(theme, capability, template) {
  if (theme === "modern-city" && capability.id === "tower-defense") {
    return "Modern City Tower Defense";
  }
  return template.project.default_name;
}

function buildBlueprint(request, capability, template) {
  const theme = inferTheme(request, template);
  const blueprint = {
    project: {
      name: createProjectName(theme, capability, template),
      genre: capability.id,
      engine: template.project.engine,
      platform: inferPlatform(request, template),
    },
    design: {
      theme,
      camera: template.gameplay.camera,
      gameplay_loop: [...template.gameplay.gameplay_loop],
    },
    systems: template.systems.map((system) => ({ ...system })),
    assets: {
      characters: [...template.assets.characters],
      scenes: [...template.assets.scenes],
      ui: [...template.assets.ui],
      audio: [...template.assets.audio],
    },
    agents: template.agents.map((agent) => ({ ...agent })),
  };

  validateCapabilityCoverage(capability, blueprint);
  validateBlueprint(blueprint);
  return blueprint;
}

function validateCapabilityCoverage(capability, blueprint) {
  const blueprintAgents = new Set(blueprint.agents.map((agent) => agent.role));
  for (const requiredAgent of capability.required_agents) {
    if (!blueprintAgents.has(requiredAgent)) {
      throw new Error(`Blueprint is missing capability-required Agent: ${requiredAgent}`);
    }
  }
}

function resolveSchemaReference(schema, reference, rootSchema) {
  if (!reference.startsWith("#/$defs/")) {
    throw new Error(`Unsupported blueprint schema reference: ${reference}`);
  }

  const definitionName = reference.slice("#/$defs/".length);
  const definition = rootSchema.$defs?.[definitionName];
  if (!definition) {
    throw new Error(`Unknown blueprint schema definition: ${definitionName}`);
  }
  return definition;
}

function validateSchemaValue(value, schema, valuePath, rootSchema) {
  if (schema.$ref) {
    validateSchemaValue(value, resolveSchemaReference(schema, schema.$ref, rootSchema), valuePath, rootSchema);
    return;
  }

  if (schema.type === "object") {
    assertObject(value, valuePath);
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
    if (schema.const !== undefined && value !== schema.const) {
      throw new Error(`${valuePath} must equal ${schema.const}.`);
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

  throw new Error(`Unsupported blueprint schema type at ${valuePath}: ${schema.type}`);
}

function validateBlueprint(blueprint, schema = readJson(schemaPath, "blueprint schema")) {
  validateSchemaValue(blueprint, schema, "blueprint", schema);
}

function writeBlueprint(blueprint, outputPath = defaultOutputPath) {
  const resolvedOutput = path.resolve(outputPath);
  const generatedDir = path.join(root, "generated");
  const relative = path.relative(generatedDir, resolvedOutput);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Blueprint output must stay inside ${generatedDir}.`);
  }

  fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  fs.writeFileSync(resolvedOutput, `${JSON.stringify(blueprint, null, 2)}\n`, "utf8");
  return resolvedOutput;
}

function planGame(request, options = {}) {
  if (typeof request !== "string" || request.trim().length === 0) {
    throw new Error("Game Planner requires a non-empty user request.");
  }

  const capabilities = loadCapabilities(options.capabilityOptions);
  const capability = matchCapability(request, capabilities);
  if (!capability) {
    throw new Error("No capability matched the user request.");
  }

  const template = loadPlannerTemplate(capability.id);
  const blueprint = buildBlueprint(request, capability, template);
  const outputPath = options.write === false
    ? null
    : writeBlueprint(blueprint, options.outputPath || defaultOutputPath);

  return {
    capability,
    template,
    blueprint,
    outputPath,
  };
}

function printUsage() {
  console.log('Usage: node planner/game-planner.js "<game request>"');
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exitCode = args.length === 0 ? 1 : 0;
    return;
  }

  try {
    const request = args.join(" ").trim();
    const result = planGame(request);
    console.log(JSON.stringify({
      request,
      matched_capability: result.capability.id,
      capability_context: {
        required_agents: result.capability.required_agents,
        context_files: result.capability.context_files,
        dependencies: result.capability.dependencies,
      },
      blueprint: path.relative(root, result.outputPath).replaceAll(path.sep, "/"),
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
  buildBlueprint,
  loadPlannerTemplate,
  planGame,
  validateBlueprint,
  writeBlueprint,
};
