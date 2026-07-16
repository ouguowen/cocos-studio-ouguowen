#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const { buildAgentBlueprintContexts } = require("../blueprint/blueprint-manager");

const root = path.resolve(__dirname, "..");
const agentRouterDir = path.join(root, "agent-router");
const defaultRegistryPath = path.join(agentRouterDir, "agent-registry.json");
const defaultPolicyPath = path.join(agentRouterDir, "activation-policy.json");
const levelIds = new Set(["L0", "L1", "L2", "L3"]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
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

function resolveInsideAgentRouter(filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(agentRouterDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${agentRouterDir}.`);
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

function normalizeText(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function containsSignal(normalizedRequest, rawSignal) {
  const signal = normalizeText(rawSignal);
  if (/^[a-z0-9-]{1,3}$/.test(signal)) {
    const escaped = signal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(normalizedRequest);
  }
  return normalizedRequest.includes(signal);
}

function loadAgentRouterRegistry(options = {}) {
  const registryPath = resolveInsideAgentRouter(
    options.registryPath || defaultRegistryPath,
    "Agent Router registry",
  );
  const registry = readJson(registryPath, "Agent Router registry");
  validateAgentRouterRegistry(registry);
  return registry;
}

function loadActivationPolicy(options = {}) {
  const policyPath = resolveInsideAgentRouter(
    options.policyPath || defaultPolicyPath,
    "Agent Router activation policy",
  );
  const policy = readJson(policyPath, "Agent Router activation policy");
  validateActivationPolicy(policy, options.registry || loadAgentRouterRegistry(options));
  return policy;
}

function validateAgentRouterRegistry(registry) {
  if (!registry || typeof registry !== "object" || Array.isArray(registry)) {
    throw new Error("Agent Router registry must be an object.");
  }
  assertNonEmptyString(registry.schema_version, "Agent Router registry schema_version");
  if (registry.mode !== "prototype-routing-only" || registry.execution_enabled !== false) {
    throw new Error("Agent Router registry must be routing-only with execution disabled.");
  }
  if (!Array.isArray(registry.agents) || registry.agents.length === 0) {
    throw new Error("Agent Router registry must contain agents.");
  }
  const seen = new Set();
  for (const agent of registry.agents) {
    if (!agent || typeof agent !== "object" || Array.isArray(agent)) {
      throw new Error("Agent Router registry contains an invalid agent.");
    }
    assertNonEmptyString(agent.id, "Agent Router agent id");
    assertNonEmptyString(agent.name, `Agent Router ${agent.id} name`);
    assertStringArray(agent.capabilities, `Agent Router ${agent.id} capabilities`);
    assertStringArray(agent.activation_tags, `Agent Router ${agent.id} activation_tags`);
    if (!Number.isInteger(agent.priority) || agent.priority < 0) {
      throw new Error(`Agent Router ${agent.id} priority must be a non-negative integer.`);
    }
    if (seen.has(agent.id)) {
      throw new Error(`Agent Router registry contains duplicate agent: ${agent.id}`);
    }
    seen.add(agent.id);
  }
  return true;
}

function validateActivationPolicy(policy, registry = loadAgentRouterRegistry()) {
  if (!policy || typeof policy !== "object" || Array.isArray(policy)) {
    throw new Error("Agent Router activation policy must be an object.");
  }
  assertNonEmptyString(policy.schema_version, "Agent Router policy schema_version");
  if (policy.mode !== "prototype-routing-only" || policy.execution_enabled !== false) {
    throw new Error("Agent Router policy must be routing-only with execution disabled.");
  }
  const agentIds = new Set(registry.agents.map((agent) => agent.id));
  assertStringArray(policy.default_agents, "Agent Router default_agents");
  assertStringArray(policy.full_pipeline_agents, "Agent Router full_pipeline_agents");
  for (const agentId of [...policy.default_agents, ...policy.full_pipeline_agents]) {
    if (!agentIds.has(agentId)) {
      throw new Error(`Agent Router policy references unknown agent: ${agentId}`);
    }
  }
  if (!Array.isArray(policy.rules) || policy.rules.length === 0) {
    throw new Error("Agent Router policy must contain rules.");
  }
  const seenRules = new Set();
  for (const rule of policy.rules) {
    assertNonEmptyString(rule.id, "Agent Router rule id");
    if (seenRules.has(rule.id)) {
      throw new Error(`Agent Router policy contains duplicate rule: ${rule.id}`);
    }
    seenRules.add(rule.id);
    assertStringArray(rule.levels, `Agent Router ${rule.id} levels`);
    assertStringArray(rule.signals, `Agent Router ${rule.id} signals`);
    assertStringArray(rule.agents, `Agent Router ${rule.id} agents`);
    for (const level of rule.levels) {
      if (!levelIds.has(level)) {
        throw new Error(`Agent Router ${rule.id} references invalid level: ${level}`);
      }
    }
    for (const agentId of rule.agents) {
      if (!agentIds.has(agentId)) {
        throw new Error(`Agent Router ${rule.id} references unknown agent: ${agentId}`);
      }
    }
  }
  return true;
}

function sortSelectedAgents(agentIds, registry) {
  const byId = new Map(registry.agents.map((agent) => [agent.id, agent]));
  return [...new Set(agentIds)].sort((a, b) => {
    const priorityDiff = byId.get(b).priority - byId.get(a).priority;
    return priorityDiff || a.localeCompare(b);
  });
}

function resolveAffectedAgents(options) {
  const affectedAgents = options.affectedAgents
    || options.blueprint?.dependency_impact?.affected_agents
    || [];
  if (!Array.isArray(affectedAgents)) {
    throw new Error("Agent Router affectedAgents must be an array when provided.");
  }
  return new Set(affectedAgents);
}

function routeAgents(request, routing, options = {}) {
  assertNonEmptyString(request, "Agent Router request");
  if (!routing || !levelIds.has(routing.level) || !new Set(["fast", "studio"]).has(routing.execution_path)) {
    throw new Error("Agent Router requires a valid Task Router decision.");
  }
  const registry = options.registry || loadAgentRouterRegistry(options);
  validateAgentRouterRegistry(registry);
  const policy = options.policy || loadActivationPolicy({ ...options, registry });
  validateActivationPolicy(policy, registry);

  const normalizedRequest = normalizeText(request);
  let matchedRule = null;
  if (routing.level === "L3" || routing.execution_path === "studio" && routing.level === "L3") {
    matchedRule = policy.rules.find((rule) => rule.id === "full-production-chain") || null;
  }
  if (!matchedRule) {
    matchedRule = policy.rules.find((rule) => rule.levels.includes(routing.level)
      && rule.signals.some((signal) => containsSignal(normalizedRequest, signal))) || null;
  }

  const selectedAgents = matchedRule
    ? matchedRule.agents
    : routing.execution_path === "studio"
      ? policy.full_pipeline_agents
      : policy.default_agents;
  const affectedAgents = resolveAffectedAgents(options);
  const shouldUseImpactFilter = !(routing.execution_path === "studio" && routing.level === "L3");
  const impactedSelection = shouldUseImpactFilter && affectedAgents.size > 0
    ? selectedAgents.filter((agentId) => affectedAgents.has(agentId))
    : selectedAgents;
  const sortedAgents = sortSelectedAgents(
    impactedSelection.length > 0 ? impactedSelection : selectedAgents,
    registry,
  );
  const blueprint_context = options.blueprint
    ? buildAgentBlueprintContexts(options.blueprint, sortedAgents)
    : {};

  return {
    schema_version: registry.schema_version,
    execution_enabled: false,
    route_level: routing.level,
    execution_path: routing.execution_path,
    policy_id: matchedRule ? matchedRule.id : "default-agent-selection",
    dependency_impact: options.blueprint?.dependency_impact ? clone(options.blueprint.dependency_impact) : null,
    selected_agents: sortedAgents,
    blueprint_context,
    selected_capabilities: sortedAgents.flatMap((agentId) => {
      const agent = registry.agents.find((entry) => entry.id === agentId);
      return agent.capabilities;
    }),
    full_agent_chain: sortedAgents.length === policy.full_pipeline_agents.length
      && policy.full_pipeline_agents.every((agentId) => sortedAgents.includes(agentId)),
    reason: matchedRule
      ? `Agent Router rule matched: ${matchedRule.id}`
      : "Agent Router default selection applied.",
  };
}

module.exports = {
  loadActivationPolicy,
  loadAgentRouterRegistry,
  routeAgents,
  validateActivationPolicy,
  validateAgentRouterRegistry,
};
