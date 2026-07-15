#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { createGameBlueprint } = require("../blueprint/blueprint-manager");
const { routeAgents } = require("../agent-router/agent-router");
const { routeTask } = require("../task-router/task-router");
const {
  runStudioOrchestrator,
  validateStudioReport,
} = require("../orchestrator/studio-orchestrator");

function writeFixtureFile(fixtureRoot, relativePath, content) {
  const filePath = path.join(fixtureRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function createFixture() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cocos-execution-router-"));
  writeFixtureFile(fixtureRoot, "project.json", JSON.stringify({
    engine: "Cocos Creator",
    version: "3.8.8",
  }, null, 2));
  writeFixtureFile(fixtureRoot, "assets/images/tower.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/ui/hud.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/audio/theme.ogg", Buffer.from([0x4f, 0x47, 0x47]));
  writeFixtureFile(fixtureRoot, "scripts/core/Battle.ts", "export class Battle {} // TODO: runtime hook later\n");
  writeFixtureFile(fixtureRoot, "scripts/ui/Hud.ts", "export class Hud {}\n");
  writeFixtureFile(fixtureRoot, "scenes/main.scene", JSON.stringify([
    { __type__: "cc.SceneAsset" },
    { __type__: "cc.Node", _name: "Canvas" },
    { __type__: "cc.Node", _name: "GameRoot" },
  ], null, 2));
  writeFixtureFile(fixtureRoot, "prefabs/tower.prefab", "{\"__type__\":\"cc.Prefab\"}\n");
  writeFixtureFile(fixtureRoot, "resources/config.json", "{\"waves\":[]}\n");
  return fixtureRoot;
}

function removeFixture(fixtureRoot) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const resolvedFixture = fs.realpathSync(fixtureRoot);
  const relative = path.relative(tempRoot, resolvedFixture);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)
    || !path.basename(resolvedFixture).startsWith("cocos-execution-router-")) {
    throw new Error(`Refusing to remove unsafe Execution Router fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function stageNames(report) {
  return report.stages.map((stage) => stage.stage);
}

function assertNoFullPipelineStages(report) {
  const stages = stageNames(report);
  assert.strictEqual(stages.includes("game-planner"), false);
  assert.strictEqual(stages.includes("task-generator"), false);
  assert.strictEqual(stages.includes("agent-scheduler"), false);
}

function assertFullPipelineStages(report) {
  const stages = stageNames(report);
  assert.ok(stages.includes("game-planner"));
  assert.ok(stages.includes("task-generator"));
  assert.ok(stages.includes("agent-scheduler"));
  assert.ok(stages.includes("agent-executor"));
}

function assertSameMembers(actual, expected, label) {
  assert.deepStrictEqual([...actual].sort(), [...expected].sort(), label);
}

function routeWithBlueprint(request) {
  const blueprint = createGameBlueprint(request);
  const routing = routeTask(request, {
    dependencyImpact: blueprint.dependency_impact,
  });
  const agents = routeAgents(request, routing, { blueprint });
  return { blueprint, routing, agents };
}

function runTests() {
  const uiDecision = routeWithBlueprint("tower defense 修改UI颜色");
  assert.strictEqual(uiDecision.routing.route_type, "fast_path");
  assert.strictEqual(uiDecision.routing.execution_mode.mode, "fast");
  assertSameMembers(uiDecision.routing.execution_mode.agents, ["artist", "cocos-programmer"]);
  assertSameMembers(uiDecision.agents.selected_agents, ["artist", "cocos-programmer"]);

  const uiRun = runStudioOrchestrator("tower defense 修改UI颜色", {
    runId: "run-execution-router-ui",
    activeCapabilityId: "tower-defense",
    write: false,
  });
  assert.ifError(uiRun.error);
  assert.strictEqual(validateStudioReport(uiRun.report), true);
  assert.strictEqual(uiRun.report.routing.route_type, "fast_path");
  assert.strictEqual(uiRun.report.execution_mode.mode, "fast");
  assertNoFullPipelineStages(uiRun.report);

  const battleDecision = routeWithBlueprint("tower defense 新增战斗系统");
  assert.strictEqual(battleDecision.routing.route_type, "full_pipeline");
  assert.strictEqual(battleDecision.routing.execution_mode.mode, "full");
  assertSameMembers(
    battleDecision.routing.execution_mode.agents,
    ["game-designer", "cocos-programmer", "qa"],
  );

  const fullDecision = routeWithBlueprint("tower defense 完整游戏生成");
  assert.strictEqual(fullDecision.routing.route_type, "full_pipeline");
  assert.strictEqual(fullDecision.routing.execution_mode.mode, "full");

  const fixtureRoot = createFixture();
  try {
    const battleRun = runStudioOrchestrator("tower defense 新增战斗系统", {
      runId: "run-execution-router-battle",
      projectId: "execution-router-battle",
      projectRoot: fixtureRoot,
      write: false,
    });
    assert.ifError(battleRun.error);
    assert.strictEqual(battleRun.report.routing.route_type, "full_pipeline");
    assert.strictEqual(battleRun.report.execution_mode.mode, "full");
    assertFullPipelineStages(battleRun.report);

    const fullRun = runStudioOrchestrator("tower defense 完整游戏生成", {
      runId: "run-execution-router-full",
      projectId: "execution-router-full",
      projectRoot: fixtureRoot,
      write: false,
    });
    assert.ifError(fullRun.error);
    assert.strictEqual(fullRun.report.routing.route_type, "full_pipeline");
    assert.strictEqual(fullRun.report.execution_mode.mode, "full");
    assertFullPipelineStages(fullRun.report);

    console.log(JSON.stringify({
      test: "execution-router",
      ui_color_route: uiRun.report.routing.route_type,
      ui_agents: uiRun.report.execution_mode.agents,
      battle_system_route: battleRun.report.routing.route_type,
      full_game_route: fullRun.report.routing.route_type,
      fast_path_skips_planner_task_graph_scheduler: true,
      full_pipeline_keeps_planner_task_graph_scheduler: true,
      runtime_mode: "mock",
      execution_enabled: false,
    }, null, 2));
  } finally {
    removeFixture(fixtureRoot);
  }
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
