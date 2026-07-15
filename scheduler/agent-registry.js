#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const agentsDir = path.join(root, "agents");
const defaultRegistryPath = path.join(agentsDir, "registry.json");

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

  const resolvedPath = path.resolve(baseDir, relativePath);
  const relative = path.relative(baseDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} escapes ${baseDir}: ${relativePath}`);
  }
  return resolvedPath;
}

function assertString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`${label} must be an array of non-empty strings.`);
  }
}

function validateAgent(agent, sourceFile) {
  if (!agent || typeof agent !== "object" || Array.isArray(agent)) {
    throw new Error(`Agent file must contain an object: ${sourceFile}`);
  }

  assertString(agent.id, `${sourceFile} id`);
  assertString(agent.display_name, `${sourceFile} display_name`);
  assertString(agent.status, `${sourceFile} status`);
  assertStringArray(agent.responsibilities, `${sourceFile} responsibilities`);
  assertStringArray(agent.accepts, `${sourceFile} accepts`);
  assertStringArray(agent.produces, `${sourceFile} produces`);
  assertStringArray(agent.constraints, `${sourceFile} constraints`);

  if (agent.canonical_agent_id !== null) {
    assertString(agent.canonical_agent_id, `${sourceFile} canonical_agent_id`);
  }
  if (agent.execution_enabled !== false) {
    throw new Error(`${sourceFile} must keep execution_enabled false in the prototype.`);
  }
}

function loadAgentRegistry(options = {}) {
  const registryPath = path.resolve(options.registryPath || defaultRegistryPath);
  const relativeRegistry = path.relative(agentsDir, registryPath);
  if (relativeRegistry === ".." || relativeRegistry.startsWith(`..${path.sep}`) || path.isAbsolute(relativeRegistry)) {
    throw new Error(`Agent registry must stay inside ${agentsDir}.`);
  }

  const registry = readJson(registryPath, "Agent Registry");
  assertString(registry.schema_version, "Agent Registry schema_version");
  if (registry.mode !== "prototype-plan-only") {
    throw new Error("Agent Registry mode must be prototype-plan-only.");
  }
  if (!Array.isArray(registry.agents) || registry.agents.length === 0) {
    throw new Error("Agent Registry must contain a non-empty agents array.");
  }

  const agents = [];
  const byId = new Map();

  for (const entry of registry.agents) {
    if (!entry || typeof entry !== "object") {
      throw new Error("Agent Registry contains an invalid entry.");
    }
    assertString(entry.id, "Agent Registry entry id");
    assertString(entry.file, "Agent Registry entry file");
    if (path.extname(entry.file).toLowerCase() !== ".json") {
      throw new Error(`Agent Registry file must be JSON: ${entry.file}`);
    }
    if (byId.has(entry.id)) {
      throw new Error(`Agent Registry contains duplicate id: ${entry.id}`);
    }

    const agentPath = resolveInside(agentsDir, entry.file, "Agent file");
    const agent = readJson(agentPath, "Agent");
    validateAgent(agent, entry.file);
    if (agent.id !== entry.id) {
      throw new Error(`Agent id mismatch: registry=${entry.id}, file=${agent.id}`);
    }

    agents.push(agent);
    byId.set(agent.id, agent);
  }

  return {
    schema_version: registry.schema_version,
    mode: registry.mode,
    agents,
    byId,
  };
}

function requireRegisteredAgent(registry, agentId) {
  const agent = registry.byId.get(agentId);
  if (!agent) {
    throw new Error(`Task references unregistered Agent: ${agentId}`);
  }
  return agent;
}

function main() {
  try {
    const registry = loadAgentRegistry();
    console.log(JSON.stringify({
      schema_version: registry.schema_version,
      mode: registry.mode,
      agent_count: registry.agents.length,
      agents: registry.agents.map((agent) => ({
        id: agent.id,
        canonical_agent_id: agent.canonical_agent_id,
        execution_enabled: agent.execution_enabled,
      })),
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
  loadAgentRegistry,
  requireRegisteredAgent,
};
