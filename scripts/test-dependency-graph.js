#!/usr/bin/env node

"use strict";

const assert = require("assert");

const {
  analyzeBlueprintChangeImpact,
  createGameBlueprint,
  updateGameBlueprint,
} = require("../blueprint/blueprint-manager");
const {
  createDefaultDependencyGraph,
  createEmptyDependencyGraph,
  findAffectedNodes,
  getAffectedAgents,
  registerDependency,
} = require("../dependency-graph/dependency-graph");
const { routeAgents } = require("../agent-router/agent-router");
const { routeTask } = require("../task-router/task-router");

function assertSameMembers(actual, expected, label) {
  assert.deepStrictEqual([...actual].sort(), [...expected].sort(), label);
}

function runTests() {
  const graph = createEmptyDependencyGraph();
  registerDependency(graph, "blueprint:visual.theme", "agent:artist", {
    reason: "Visual theme affects Artist.",
  });
  registerDependency(graph, "agent:artist", "asset:ui", {
    reason: "Artist affects UI assets.",
  });
  assertSameMembers(
    findAffectedNodes(graph, ["blueprint:visual.theme"]),
    ["blueprint:visual.theme", "agent:artist", "asset:ui"],
    "Dependency graph should return transitive affected nodes.",
  );
  assertSameMembers(
    getAffectedAgents(graph, ["blueprint:visual.theme"]),
    ["artist"],
    "Dependency graph should return affected Agents.",
  );

  const defaultGraph = createDefaultDependencyGraph();
  const combatImpact = analyzeBlueprintChangeImpact(["blueprint:combat.enemy"], { graph: defaultGraph });
  assertSameMembers(
    combatImpact.affected_agents,
    ["game-designer", "cocos-programmer", "qa"],
    "Combat changes should affect Designer, Programmer, and QA.",
  );

  const uiBlueprint = createGameBlueprint("tower defense UI button color small change");
  assertSameMembers(
    uiBlueprint.dependency_impact.affected_agents,
    ["artist", "cocos-programmer"],
    "UI Blueprint impact should stay limited to Artist and Programmer.",
  );
  const uiRouting = routeTask("tower defense UI button color small change");
  const uiAgents = routeAgents("tower defense UI button color small change", uiRouting, {
    blueprint: uiBlueprint,
  });
  assertSameMembers(
    uiAgents.selected_agents,
    ["artist", "cocos-programmer"],
    "Agent Router should activate only UI-affected Agents.",
  );

  const updatedBlueprint = updateGameBlueprint(uiBlueprint, {
    "combat.enemy": {
      enemy_family: "armored drones",
    },
  }, {
    changedNodes: ["blueprint:combat.enemy"],
    version: "0.1.1",
  });
  assert.strictEqual(updatedBlueprint.blueprint_version, "0.1.1");
  assertSameMembers(
    updatedBlueprint.dependency_impact.affected_agents,
    ["game-designer", "cocos-programmer", "qa"],
    "Blueprint update should query dependency impact automatically.",
  );

  const combatRouting = routeTask("tower defense battle system enemy behavior change");
  const combatAgents = routeAgents("tower defense battle system enemy behavior change", combatRouting, {
    blueprint: updatedBlueprint,
  });
  assertSameMembers(
    combatAgents.selected_agents,
    ["game-designer", "cocos-programmer"],
    "Agent Router should intersect policy Agents with affected Agents.",
  );
  assert.deepStrictEqual(
    Object.keys(combatAgents.blueprint_context).sort(),
    ["cocos-programmer", "game-designer"],
  );

  console.log(JSON.stringify({
    test: "dependency-graph",
    dependency_registered: true,
    visual_affected_agents: getAffectedAgents(graph, ["blueprint:visual.theme"]),
    combat_affected_agents: combatImpact.affected_agents,
    ui_selected_agents: uiAgents.selected_agents,
    combat_selected_agents: combatAgents.selected_agents,
    execution_enabled: false,
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
