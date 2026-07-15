#!/usr/bin/env node

const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");

const {
  loadPlannerTemplate,
  planGame,
  validateBlueprint,
} = require("../planner/game-planner");

const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "generated", "game-blueprint.json");
const request = "创建现代城市塔防游戏";

const result = planGame(request, { outputPath });

assert.equal(result.capability.id, "tower-defense", "Planner should identify tower-defense");
assert.equal(result.template.id, "tower-defense", "Planner should load tower-defense template");
assert.ok(result.capability.context_files.length > 0, "Capability context should be available");
assert.ok(fs.statSync(outputPath).isFile(), "Planner should generate game-blueprint.json");

const blueprintText = fs.readFileSync(outputPath, "utf8");
const blueprint = JSON.parse(blueprintText);
validateBlueprint(blueprint);

assert.equal(blueprint.project.genre, "tower-defense");
assert.equal(blueprint.project.engine, "Cocos Creator");
assert.equal(blueprint.project.platform, "mobile");
assert.equal(blueprint.design.theme, "modern-city");
assert.ok(blueprint.design.gameplay_loop.length > 0);
assert.ok(blueprint.systems.some((system) => system.id === "tower-system"));
assert.ok(blueprint.systems.some((system) => system.id === "wave-system"));
assert.ok(blueprint.assets.characters.length > 0);
assert.ok(blueprint.assets.scenes.length > 0);
assert.ok(blueprint.assets.ui.length > 0);
assert.ok(blueprint.assets.audio.length > 0);
assert.ok(blueprint.agents.some((agent) => agent.role === "cocos-game-designer"));
assert.ok(blueprint.agents.some((agent) => agent.role === "cocos-qa"));

assert.throws(
  () => planGame("创建一个三消游戏", { write: false }),
  /No capability matched/,
  "Planner should stop when no capability matches",
);

assert.throws(
  () => loadPlannerTemplate("card-game"),
  /not implemented/,
  "Planner should not pretend placeholder templates are implemented",
);

console.log("Game Planner prototype tests passed: tower-defense blueprint generated and validated.");
