#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  loadTaskRoutingConfig,
  routeTask,
  validateTaskRoutingConfig,
} = require("../task-router/task-router");
const {
  runStudioOrchestrator,
  validateStudioReport,
} = require("../orchestrator/studio-orchestrator");

function writeFixtureFile(fixtureRoot, relativePath, content) {
  const filePath = path.join(fixtureRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  return filePath;
}

function createFixture() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cocos-task-router-"));
  writeFixtureFile(fixtureRoot, "project.json", JSON.stringify({
    engine: "Cocos Creator",
    version: "3.8.8",
  }, null, 2));
  writeFixtureFile(fixtureRoot, "assets/images/tower.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/animations/tower.anim", "animation metadata");
  writeFixtureFile(fixtureRoot, "assets/ui/hud.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/audio/theme.ogg", Buffer.from([0x4f, 0x47, 0x47]));
  writeFixtureFile(fixtureRoot, "scripts/core/Battle.ts", "export class Battle {} // TODO: runtime hook later\n");
  writeFixtureFile(fixtureRoot, "scripts/ui/Hud.ts", "export class Hud {} // TODO: UI hook later\n");
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
    || !path.basename(resolvedFixture).startsWith("cocos-task-router-")) {
    throw new Error(`Refusing to remove unsafe Task Router fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function stageNames(report) {
  return report.stages.map((stage) => stage.stage);
}

function assertFastLane(request, expectedLevel) {
  const result = runStudioOrchestrator(request, {
    runId: `run-task-router-${expectedLevel.toLowerCase()}`,
    activeCapabilityId: "tower-defense",
    write: false,
  });
  assert.ifError(result.error);
  assert.strictEqual(validateStudioReport(result.report), true);
  assert.strictEqual(result.report.routing.level, expectedLevel);
  assert.strictEqual(result.report.routing.execution_path, "fast");
  assert.strictEqual(result.report.execution_enabled, false);
  assert.deepStrictEqual(stageNames(result.report), [
    "task-router",
    "capability-loader",
    "agent-executor",
    "validation-agent",
  ]);
  assert.strictEqual(result.report.acceptance.planner_skipped, true);
  assert.strictEqual(result.report.acceptance.task_graph_skipped, true);
  assert.strictEqual(result.report.acceptance.scheduler_skipped, true);
  assert.strictEqual(result.report.acceptance.loop_skipped, true);
  return result.report;
}

function assertFullPipeline(request, expectedLevel, fixtureRoot) {
  const result = runStudioOrchestrator(request, {
    runId: `run-task-router-${expectedLevel.toLowerCase()}`,
    projectId: `router-${expectedLevel.toLowerCase()}`,
    projectRoot: fixtureRoot,
    write: false,
  });
  assert.ifError(result.error);
  assert.strictEqual(validateStudioReport(result.report), true);
  assert.strictEqual(result.report.routing.level, expectedLevel);
  assert.strictEqual(result.report.routing.execution_path, "studio");
  assert.strictEqual(stageNames(result.report)[0], "task-router");
  assert.ok(stageNames(result.report).includes("game-planner"));
  assert.ok(stageNames(result.report).includes("task-generator"));
  assert.ok(stageNames(result.report).includes("agent-scheduler"));
  assert.ok(stageNames(result.report).includes("loop-engine"));
  assert.strictEqual(result.report.acceptance.loop_converged_to_pass, true);
  return result.report;
}

function runTests() {
  const config = loadTaskRoutingConfig();
  assert.strictEqual(validateTaskRoutingConfig(config), true);
  assert.strictEqual(config.execution_enabled, false);
  assert.deepStrictEqual(config.fast_lane.allowed_levels, ["L0", "L1"]);

  assert.strictEqual(routeTask("tower defense button color small change").level, "L0");
  assert.strictEqual(routeTask("tower defense add pause feature").level, "L1");
  assert.strictEqual(routeTask("tower defense runtime system refactor").level, "L2");
  assert.strictEqual(routeTask("create a complete tower defense mobile game").level, "L3");

  const l0Report = assertFastLane("tower defense button color small change", "L0");
  const l1Report = assertFastLane("tower defense add pause feature", "L1");

  const fixtureRoot = createFixture();
  try {
    const l2Report = assertFullPipeline("tower defense runtime system refactor", "L2", fixtureRoot);
    const l3Report = assertFullPipeline("create a complete tower defense mobile game", "L3", fixtureRoot);

    console.log(JSON.stringify({
      test: "task-router",
      l0_fast_lane: stageNames(l0Report),
      l1_fast_lane: stageNames(l1Report),
      l2_full_pipeline_stage_count: l2Report.stages.length,
      l3_full_pipeline_stage_count: l3Report.stages.length,
      planner_skipped_for_fast_lane: true,
      task_graph_skipped_for_fast_lane: true,
      scheduler_skipped_for_fast_lane: true,
      loop_skipped_for_fast_lane: true,
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
