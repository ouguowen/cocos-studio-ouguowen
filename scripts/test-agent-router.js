#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  loadActivationPolicy,
  loadAgentRouterRegistry,
  routeAgents,
  validateActivationPolicy,
  validateAgentRouterRegistry,
} = require("../agent-router/agent-router");
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
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cocos-agent-router-"));
  writeFixtureFile(fixtureRoot, "project.json", JSON.stringify({
    engine: "Cocos Creator",
    version: "3.8.8",
  }, null, 2));
  writeFixtureFile(fixtureRoot, "assets/images/tower.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/ui/hud.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/audio/theme.ogg", Buffer.from([0x4f, 0x47, 0x47]));
  writeFixtureFile(fixtureRoot, "scripts/core/Battle.ts", "export class Battle {} // TODO: runtime hook later\n");
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
    || !path.basename(resolvedFixture).startsWith("cocos-agent-router-")) {
    throw new Error(`Refusing to remove unsafe Agent Router fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function assertSameMembers(actual, expected, label) {
  assert.deepStrictEqual([...actual].sort(), [...expected].sort(), label);
}

function stageNames(report) {
  return report.stages.map((stage) => stage.stage);
}

function runTests() {
  const registry = loadAgentRouterRegistry();
  const policy = loadActivationPolicy({ registry });
  assert.strictEqual(validateAgentRouterRegistry(registry), true);
  assert.strictEqual(validateActivationPolicy(policy, registry), true);

  const uiRouting = routeTask("tower defense UI button color small change");
  const uiAgents = routeAgents("tower defense UI button color small change", uiRouting, { registry, policy });
  assert.strictEqual(uiAgents.policy_id, "ui-visual-change");
  assertSameMembers(uiAgents.selected_agents, ["artist", "cocos-programmer"], "UI tasks should activate artist and programmer.");

  const codeRouting = routeTask("tower defense code bug fix");
  const codeAgents = routeAgents("tower defense code bug fix", codeRouting, { registry, policy });
  assert.strictEqual(codeAgents.policy_id, "code-fix");
  assert.deepStrictEqual(codeAgents.selected_agents, ["cocos-programmer"]);

  const fullRouting = routeTask("create a complete tower defense mobile game");
  const fullAgents = routeAgents("create a complete tower defense mobile game", fullRouting, { registry, policy });
  assert.strictEqual(fullAgents.policy_id, "full-production-chain");
  assert.strictEqual(fullAgents.full_agent_chain, true);
  assertSameMembers(fullAgents.selected_agents, [
    "game-designer",
    "cocos-programmer",
    "artist",
    "qa",
  ], "L3 tasks should allow the full Agent chain.");

  const uiRun = runStudioOrchestrator("tower defense UI button color small change", {
    runId: "run-agent-router-ui",
    activeCapabilityId: "tower-defense",
    write: false,
  });
  assert.ifError(uiRun.error);
  assert.strictEqual(validateStudioReport(uiRun.report), true);
  assert.deepStrictEqual(stageNames(uiRun.report), [
    "blueprint-manager",
    "task-router",
    "agent-router",
    "capability-loader",
    "agent-executor",
    "validation-agent",
  ]);
  assertSameMembers(uiRun.report.agent_selection.selected_agents, ["artist", "cocos-programmer"], "UI run should stay limited.");
  assert.deepStrictEqual(Object.keys(uiRun.report.agent_selection.blueprint_context).sort(), ["artist", "cocos-programmer"]);
  assert.deepStrictEqual(Object.keys(uiRun.report.agent_selection.blueprint_context.artist.sections).sort(), ["assets", "ui", "visual"]);

  const codeRun = runStudioOrchestrator("tower defense code bug fix", {
    runId: "run-agent-router-code",
    activeCapabilityId: "tower-defense",
    write: false,
  });
  assert.ifError(codeRun.error);
  assert.deepStrictEqual(codeRun.report.agent_selection.selected_agents, ["cocos-programmer"]);

  const fixtureRoot = createFixture();
  try {
    const fullRun = runStudioOrchestrator("create a complete tower defense mobile game", {
      runId: "run-agent-router-full",
      projectId: "agent-router-full",
      projectRoot: fixtureRoot,
      write: false,
    });
    assert.ifError(fullRun.error);
    assert.strictEqual(fullRun.report.routing.execution_path, "studio");
    assert.strictEqual(fullRun.report.agent_selection.full_agent_chain, true);
    assert.ok(stageNames(fullRun.report).includes("game-planner"));
    assert.ok(stageNames(fullRun.report).includes("task-generator"));
    assert.ok(stageNames(fullRun.report).includes("agent-scheduler"));

    console.log(JSON.stringify({
      test: "agent-router",
      ui_agents: uiRun.report.agent_selection.selected_agents,
      code_fix_agents: codeRun.report.agent_selection.selected_agents,
      full_chain_agents: fullRun.report.agent_selection.selected_agents,
    fast_lane_stages: stageNames(uiRun.report),
      full_pipeline_stage_count: fullRun.report.stages.length,
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
