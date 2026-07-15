#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const { analyzeDependencyImpact } = require("../dependency-graph/dependency-graph");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const defaultBlueprintPath = path.join(generatedDir, "shared-game-blueprint.json");
const agentSectionMap = {
  artist: ["visual", "assets", "ui"],
  "cocos-programmer": ["systems", "code", "components"],
  "game-designer": ["design", "gameplay"],
  qa: ["validation", "test"],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function normalizeText(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function slugify(value, separator = "-") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "") || "project";
}

function inferGenre(request) {
  const normalized = normalizeText(request);
  if (normalized.includes("tower defense") || normalized.includes("\u5854\u9632") || normalized.includes("\u9632\u5b88")) {
    return "tower-defense";
  }
  if (normalized.includes("card")) {
    return "card-game";
  }
  if (normalized.includes("rpg")) {
    return "rpg";
  }
  if (normalized.includes("platformer")) {
    return "platformer";
  }
  return "unknown";
}

function inferTheme(request) {
  const normalized = normalizeText(request);
  if (normalized.includes("modern city") || normalized.includes("\u73b0\u4ee3\u57ce\u5e02")) {
    return "modern-city";
  }
  if (normalized.includes("sci-fi") || normalized.includes("cyber")) {
    return "sci-fi";
  }
  return "unspecified";
}

function inferChangedBlueprintNodes(request) {
  const normalized = normalizeText(request);
  const nodes = new Set();
  if (normalized.includes("ui") || normalized.includes("hud") || normalized.includes("\u754c\u9762")) {
    nodes.add("blueprint:ui.surface");
  }
  if (normalized.includes("visual") || normalized.includes("theme") || normalized.includes("asset")
    || normalized.includes("\u7f8e\u672f") || normalized.includes("\u89c6\u89c9")) {
    nodes.add("blueprint:visual.theme");
  }
  if (normalized.includes("enemy") || normalized.includes("combat") || normalized.includes("battle")
    || normalized.includes("\u654c\u4eba") || normalized.includes("\u6218\u6597")) {
    nodes.add("blueprint:combat.enemy");
  }
  if (normalized.includes("code") || normalized.includes("component") || normalized.includes("bug")
    || normalized.includes("fix") || normalized.includes("\u4ee3\u7801") || normalized.includes("\u4fee\u590d")) {
    nodes.add("blueprint:systems.code");
  }
  if (normalized.includes("test") || normalized.includes("qa") || normalized.includes("validation")
    || normalized.includes("\u6d4b\u8bd5") || normalized.includes("\u9a8c\u8bc1")) {
    nodes.add("blueprint:validation.rules");
  }
  if (normalized.includes("complete") || normalized.includes("full") || normalized.includes("production")
    || normalized.includes("from scratch") || normalized.includes("\u5b8c\u6574") || normalized.includes("\u751f\u4ea7")) {
    nodes.add("blueprint:project.scope");
  }
  if (nodes.size === 0) {
    nodes.add("blueprint:systems.code");
  }
  return [...nodes];
}

function analyzeBlueprintChangeImpact(changedNodes, options = {}) {
  return analyzeDependencyImpact(changedNodes, options);
}

function createGameBlueprint(request, options = {}) {
  assertNonEmptyString(request, "Blueprint request");
  const genre = options.genre || inferGenre(request);
  const theme = options.theme || inferTheme(request);
  const projectId = options.projectId || slugify(`${theme}-${genre}`);
  const changedNodes = options.changedNodes || inferChangedBlueprintNodes(request);
  const blueprint = {
    schema_version: "1.0.0",
    blueprint_version: options.version || "0.1.0",
    execution_enabled: false,
    project: {
      project_id: projectId,
      project_name: projectId,
      genre,
      engine: "Cocos Creator",
      platform: options.platform || "mobile",
      theme,
    },
    source_request: request,
    sections: {
      design: {
        intent: request,
        genre,
        theme,
        scope: "shared-context",
      },
      gameplay: {
        loop: genre === "tower-defense"
          ? ["place towers", "defend lanes", "clear waves", "upgrade defenses"]
          : ["define core loop"],
        camera: "2d",
      },
      visual: {
        style: theme === "modern-city" ? "modern tactical city" : "to-be-defined",
        lighting: "readable high contrast",
      },
      assets: {
        required: genre === "tower-defense"
          ? ["tower silhouettes", "enemy silhouettes", "city map tiles", "HUD icons"]
          : ["placeholder asset list"],
      },
      ui: {
        surfaces: ["hud", "pause", "result"],
        constraints: ["mobile readable", "no gameplay truth inside UI callbacks"],
      },
      systems: {
        required: genre === "tower-defense"
          ? ["battle-system", "tower-system", "enemy-system", "wave-system", "economy-system"]
          : ["system list pending"],
      },
      code: {
        language: "TypeScript",
        engine: "Cocos Creator 3.8.8",
        constraints: ["mock-only planning", "no real Cocos project writes"],
      },
      components: {
        candidates: genre === "tower-defense"
          ? ["BattleController", "TowerController", "EnemyController", "WaveController", "HudController"]
          : ["Component list pending"],
      },
      validation: {
        gates: ["mock execution only", "execution_enabled false", "no external APIs"],
      },
      test: {
        required: ["router trace", "agent context dispatch", "json validity"],
      },
    },
    dependency_impact: analyzeBlueprintChangeImpact(changedNodes, options.dependencyGraphOptions || {}),
  };
  validateGameBlueprint(blueprint);
  return blueprint;
}

function validateGameBlueprint(blueprint) {
  if (!blueprint || typeof blueprint !== "object" || Array.isArray(blueprint)) {
    throw new Error("Game Blueprint must be an object.");
  }
  for (const field of ["schema_version", "blueprint_version", "source_request"]) {
    assertNonEmptyString(blueprint[field], `Game Blueprint ${field}`);
  }
  if (blueprint.execution_enabled !== false) {
    throw new Error("Game Blueprint must keep execution_enabled false.");
  }
  if (!blueprint.project || typeof blueprint.project !== "object" || Array.isArray(blueprint.project)) {
    throw new Error("Game Blueprint project must be an object.");
  }
  for (const field of ["project_id", "genre", "engine", "platform"]) {
    assertNonEmptyString(blueprint.project[field], `Game Blueprint project ${field}`);
  }
  if (!blueprint.sections || typeof blueprint.sections !== "object" || Array.isArray(blueprint.sections)) {
    throw new Error("Game Blueprint sections must be an object.");
  }
  for (const section of Object.values(agentSectionMap).flat()) {
    if (!blueprint.sections[section] || typeof blueprint.sections[section] !== "object") {
      throw new Error(`Game Blueprint is missing section: ${section}`);
    }
  }
  if (blueprint.dependency_impact) {
    if (blueprint.dependency_impact.execution_enabled !== false
      || !Array.isArray(blueprint.dependency_impact.changed_nodes)
      || !Array.isArray(blueprint.dependency_impact.affected_nodes)
      || !Array.isArray(blueprint.dependency_impact.affected_agents)) {
      throw new Error("Game Blueprint dependency_impact is invalid.");
    }
  }
  return true;
}

function updateGameBlueprint(blueprint, changes, options = {}) {
  validateGameBlueprint(blueprint);
  if (!changes || typeof changes !== "object" || Array.isArray(changes)) {
    throw new Error("Game Blueprint changes must be an object.");
  }
  const updated = clone(blueprint);
  const changedNodes = options.changedNodes || Object.keys(changes).map((key) => (
    key.startsWith("blueprint:") ? key : `blueprint:${key}`
  ));
  for (const [section, value] of Object.entries(changes)) {
    const sectionKey = section.replace(/^blueprint:/, "").split(".")[0];
    if (updated.sections[sectionKey] && value && typeof value === "object" && !Array.isArray(value)) {
      updated.sections[sectionKey] = {
        ...updated.sections[sectionKey],
        ...clone(value),
      };
    }
  }
  updated.blueprint_version = options.version || updated.blueprint_version;
  updated.dependency_impact = analyzeBlueprintChangeImpact(changedNodes, options.dependencyGraphOptions || {});
  validateGameBlueprint(updated);
  return updated;
}

function getAgentBlueprintContext(blueprint, agentId) {
  validateGameBlueprint(blueprint);
  const sections = agentSectionMap[agentId];
  if (!sections) {
    throw new Error(`No Blueprint section map exists for Agent: ${agentId}`);
  }
  return {
    agent: agentId,
    blueprint_version: blueprint.blueprint_version,
    project: clone(blueprint.project),
    dependency_impact: blueprint.dependency_impact ? clone(blueprint.dependency_impact) : null,
    sections: Object.fromEntries(sections.map((section) => [section, clone(blueprint.sections[section])])),
  };
}

function buildAgentBlueprintContexts(blueprint, agentIds) {
  if (!Array.isArray(agentIds) || agentIds.length === 0) {
    throw new Error("Agent Blueprint context requires at least one Agent.");
  }
  return Object.fromEntries(agentIds.map((agentId) => [
    agentId,
    getAgentBlueprintContext(blueprint, agentId),
  ]));
}

function resolveGeneratedPath(filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(generatedDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${generatedDir}.`);
  }
  return resolvedPath;
}

function saveBlueprint(blueprint, outputPath = defaultBlueprintPath) {
  validateGameBlueprint(blueprint);
  const resolvedPath = resolveGeneratedPath(outputPath, "Game Blueprint output");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(blueprint, null, 2)}\n`, "utf8");
  return resolvedPath;
}

module.exports = {
  agentSectionMap,
  analyzeBlueprintChangeImpact,
  buildAgentBlueprintContexts,
  createGameBlueprint,
  getAgentBlueprintContext,
  saveBlueprint,
  updateGameBlueprint,
  validateGameBlueprint,
};
