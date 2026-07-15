#!/usr/bin/env node

"use strict";

const nodeTypePrefixes = {
  "agent:": "agent",
  "asset:": "asset",
  "blueprint:": "blueprint",
  "file:": "file",
  "system:": "system",
  "validation:": "validation",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function normalizeNodeId(nodeId) {
  assertNonEmptyString(nodeId, "Dependency node id");
  return String(nodeId).trim();
}

function inferNodeType(nodeId) {
  for (const [prefix, type] of Object.entries(nodeTypePrefixes)) {
    if (nodeId.startsWith(prefix)) {
      return type;
    }
  }
  return "blueprint";
}

function createEmptyDependencyGraph() {
  return {
    schema_version: "1.0.0",
    execution_enabled: false,
    nodes: [],
    dependencies: [],
  };
}

function ensureNode(graph, nodeId, metadata = {}) {
  validateDependencyGraphShape(graph);
  const id = normalizeNodeId(nodeId);
  let node = graph.nodes.find((entry) => entry.id === id);
  if (!node) {
    node = {
      id,
      type: metadata.type || inferNodeType(id),
      label: metadata.label || id,
    };
    graph.nodes.push(node);
  } else {
    node.type = metadata.type || node.type || inferNodeType(id);
    node.label = metadata.label || node.label || id;
  }
  return node;
}

function registerDependency(graph, fromNode, toNode, metadata = {}) {
  validateDependencyGraphShape(graph);
  const from = normalizeNodeId(fromNode);
  const to = normalizeNodeId(toNode);
  ensureNode(graph, from, metadata.from || {});
  ensureNode(graph, to, metadata.to || {});
  if (!graph.dependencies.some((dependency) => dependency.from === from && dependency.to === to)) {
    graph.dependencies.push({
      from,
      to,
      reason: metadata.reason || "dependency",
    });
  }
  return graph;
}

function findAffectedNodes(graph, changedNodes) {
  validateDependencyGraphShape(graph);
  if (!Array.isArray(changedNodes) || changedNodes.length === 0) {
    throw new Error("Affected node lookup requires at least one changed node.");
  }
  const adjacency = new Map();
  for (const dependency of graph.dependencies) {
    if (!adjacency.has(dependency.from)) {
      adjacency.set(dependency.from, []);
    }
    adjacency.get(dependency.from).push(dependency.to);
  }

  const affected = new Set();
  const queue = changedNodes.map(normalizeNodeId);
  for (const nodeId of queue) {
    affected.add(nodeId);
  }

  while (queue.length > 0) {
    const current = queue.shift();
    for (const next of adjacency.get(current) || []) {
      if (!affected.has(next)) {
        affected.add(next);
        queue.push(next);
      }
    }
  }
  return [...affected];
}

function getAffectedAgents(graph, changedNodes) {
  const affectedNodes = findAffectedNodes(graph, changedNodes);
  return affectedNodes
    .filter((nodeId) => nodeId.startsWith("agent:"))
    .map((nodeId) => nodeId.slice("agent:".length))
    .sort();
}

function createDefaultDependencyGraph() {
  const graph = createEmptyDependencyGraph();
  const dependencies = [
    ["blueprint:visual.theme", "agent:artist", "Visual theme changes require art review."],
    ["agent:artist", "asset:ui", "Artist owns UI asset direction."],
    ["agent:artist", "asset:environment", "Artist owns environment asset direction."],
    ["asset:ui", "file:ui", "UI asset requirements affect UI files."],
    ["asset:environment", "file:assets/environment", "Environment requirements affect asset files."],

    ["blueprint:ui.surface", "agent:artist", "UI surface changes require visual direction."],
    ["blueprint:ui.surface", "agent:cocos-programmer", "UI surface changes require implementation planning."],
    ["agent:cocos-programmer", "file:code/components", "Programmer owns code component planning."],

    ["blueprint:combat.enemy", "agent:game-designer", "Enemy combat changes require design review."],
    ["agent:game-designer", "system:combat", "Game Designer owns combat rules."],
    ["system:combat", "agent:cocos-programmer", "Combat rules affect implementation planning."],
    ["system:combat", "file:code/combat", "Combat systems affect combat code planning."],
    ["file:code/combat", "agent:qa", "Combat code changes require validation."],
    ["agent:qa", "validation:test-plan", "QA owns validation plan updates."],

    ["blueprint:systems.code", "agent:cocos-programmer", "System/code changes require programmer ownership."],
    ["blueprint:validation.rules", "agent:qa", "Validation rule changes require QA ownership."],

    ["blueprint:project.scope", "agent:game-designer", "Project scope changes affect design."],
    ["blueprint:project.scope", "agent:cocos-programmer", "Project scope changes affect implementation."],
    ["blueprint:project.scope", "agent:artist", "Project scope changes affect art."],
    ["blueprint:project.scope", "agent:qa", "Project scope changes affect validation."],
  ];
  for (const [from, to, reason] of dependencies) {
    registerDependency(graph, from, to, { reason });
  }
  return graph;
}

function validateDependencyGraphShape(graph) {
  if (!graph || typeof graph !== "object" || Array.isArray(graph)) {
    throw new Error("Dependency Graph must be an object.");
  }
  if (graph.execution_enabled !== false) {
    throw new Error("Dependency Graph must keep execution_enabled false.");
  }
  if (!Array.isArray(graph.nodes) || !Array.isArray(graph.dependencies)) {
    throw new Error("Dependency Graph requires nodes and dependencies arrays.");
  }
  return true;
}

function analyzeDependencyImpact(changedNodes, options = {}) {
  const graph = options.graph || createDefaultDependencyGraph();
  validateDependencyGraphShape(graph);
  const normalizedChangedNodes = changedNodes.map(normalizeNodeId);
  const affected_nodes = findAffectedNodes(graph, normalizedChangedNodes);
  const affected_agents = getAffectedAgents(graph, normalizedChangedNodes);
  return {
    schema_version: graph.schema_version,
    execution_enabled: false,
    changed_nodes: normalizedChangedNodes,
    affected_nodes,
    affected_agents,
  };
}

module.exports = {
  analyzeDependencyImpact,
  createDefaultDependencyGraph,
  createEmptyDependencyGraph,
  findAffectedNodes,
  getAffectedAgents,
  registerDependency,
  validateDependencyGraphShape,
};
