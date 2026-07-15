#!/usr/bin/env node

"use strict";

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  runStudioOrchestrator,
  validateStudioReport,
  writeStudioReport,
} = require("../orchestrator/studio-orchestrator");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const reportPath = path.join(generatedDir, "studio-e2e-report.json");
const protectedStorePaths = [
  path.join(root, "memory", "project-memory-store.json"),
  path.join(root, "feedback", "performance-store.json"),
  path.join(root, "decision-engine", "decision-history.json"),
  path.join(root, "loop-engine", "progress-tracker.json"),
];

function writeFixtureFile(fixtureRoot, relativePath, content) {
  const filePath = path.join(fixtureRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  return filePath;
}

function createFixture() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cocos-studio-e2e-"));
  writeFixtureFile(fixtureRoot, "project.json", JSON.stringify({
    engine: "Cocos Creator",
    version: "3.8.8",
  }, null, 2));
  writeFixtureFile(fixtureRoot, "assets/images/tower.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/animations/tower.anim", "animation metadata");
  writeFixtureFile(fixtureRoot, "assets/ui/hud.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/audio/theme.ogg", Buffer.from([0x4f, 0x47, 0x47]));
  writeFixtureFile(
    fixtureRoot,
    "scripts/core/Battle.ts",
    "export class Battle {} // TODO: connect approved runtime later\n",
  );
  writeFixtureFile(
    fixtureRoot,
    "scripts/ui/Hud.ts",
    "export class Hud {} // TODO: add approved UI binding later\n",
  );
  writeFixtureFile(fixtureRoot, "scenes/main.scene", JSON.stringify([
    { __type__: "cc.SceneAsset" },
    { __type__: "cc.Node", _name: "Canvas" },
    { __type__: "cc.Node", _name: "GameRoot" },
    { __type__: "cc.Node", _name: "HUD" },
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
    || !path.basename(resolvedFixture).startsWith("cocos-studio-e2e-")) {
    throw new Error(`Refusing to remove unsafe E2E fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function fileHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function snapshotFiles(filePaths) {
  return Object.fromEntries(filePaths
    .filter((filePath) => fs.existsSync(filePath))
    .map((filePath) => [path.relative(root, filePath).replaceAll("\\", "/"), fileHash(filePath)]));
}

function listGeneratedInputs() {
  if (!fs.existsSync(generatedDir)) {
    return [];
  }
  return fs.readdirSync(generatedDir)
    .filter((name) => name.endsWith(".json") && name !== path.basename(reportPath))
    .map((name) => path.join(generatedDir, name));
}

function assertSnapshotsEqual(before, after, label) {
  assert.deepStrictEqual(after, before, `${label} must not be modified by the in-memory E2E run.`);
}

function stageByName(report, stageName) {
  return report.stages.find((stage) => stage.stage === stageName);
}

function runTests() {
  const fixtureRoot = createFixture();
  try {
    const generatedBefore = snapshotFiles(listGeneratedInputs());
    const storesBefore = snapshotFiles(protectedStorePaths);
    const result = runStudioOrchestrator("创建一个现代城市塔防手游", {
      runId: "run-studio-e2e-0001",
      projectId: "modern-city-defense",
      projectRoot: fixtureRoot,
      write: false,
    });
    const report = result.report;

    assert.ifError(result.error);
    assert.strictEqual(validateStudioReport(report), true);
    assert.strictEqual(report.status, "PASS");
    assert.strictEqual(report.run_id, "run-studio-e2e-0001");
    assert.strictEqual(report.runtime_mode, "mock");
    assert.strictEqual(report.execution_enabled, false);
    assert.match(report.task_id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(report.iteration_id, /^iteration-\d{4}$/);

    const requiredStages = [
      "blueprint-manager",
      "task-router",
      "agent-router",
      "capability-loader",
      "game-planner",
      "task-generator",
      "agent-scheduler",
      "capability-binding",
      "provider-selector",
      "agent-executor",
      "runtime-manager",
      "integration-manager",
      "project-scanner",
      "validation-agent",
      "feedback-system",
      "memory-system",
      "project-intelligence",
      "decision-engine",
      "loop-engine",
    ];
    assert.deepStrictEqual(report.stages.map((stage) => stage.stage), requiredStages);
    assert.strictEqual(report.blueprint_context.execution_enabled, false);
    assert.strictEqual(report.blueprint_context.blueprint_version, "0.1.0");
    assert.strictEqual(report.routing.level, "L3");
    assert.strictEqual(report.routing.execution_path, "studio");
    assert.strictEqual(report.agent_selection.full_agent_chain, true);
    for (const stage of report.stages) {
      assert.strictEqual(stage.status, "PASS", `${stage.stage} should pass.`);
      assert.notStrictEqual(stage.input, null, `${stage.stage} should trace its input.`);
      assert.notStrictEqual(stage.output, null, `${stage.stage} should trace its output.`);
    }

    assert.strictEqual(report.acceptance.matched_capability, "tower-defense");
    assert.strictEqual(report.acceptance.blueprint_valid, true);
    assert.strictEqual(report.acceptance.task_graph_valid, true);
    assert.strictEqual(report.acceptance.agents_resolved, true);
    assert.strictEqual(report.acceptance.capability_provider_matched, true);
    assert.strictEqual(report.acceptance.executor_mock, true);
    assert.strictEqual(report.acceptance.runtime_routed, true);
    assert.strictEqual(report.acceptance.integration_routed, true);
    assert.deepStrictEqual(report.acceptance.validation_statuses, ["FAILED", "WARNING", "PASS"]);
    assert.strictEqual(report.acceptance.failed_regenerated_task, true);
    assert.strictEqual(report.acceptance.warning_policy_applied, true);
    assert.strictEqual(report.acceptance.loop_converged_to_pass, true);
    assert.strictEqual(report.acceptance.feedback_recorded, true);
    assert.strictEqual(report.acceptance.memory_copy_only, true);
    assert.strictEqual(report.acceptance.intelligence_read_scan, true);
    assert.strictEqual(report.acceptance.intelligence_read_validation, true);
    assert.strictEqual(report.acceptance.decision_created, true);
    assert.strictEqual(report.acceptance.trace_complete, true);

    const providerStage = stageByName(report, "provider-selector");
    assert.strictEqual(providerStage.output.execution_enabled, false);
    const executorStage = stageByName(report, "agent-executor");
    assert.strictEqual(executorStage.output.mode, "mock");
    const runtimeStage = stageByName(report, "runtime-manager");
    assert.ok(runtimeStage.output.integration_statuses.every((status) => status === "simulated"));
    const memoryStage = stageByName(report, "memory-system");
    assert.strictEqual(memoryStage.output.store_written, false);

    assertSnapshotsEqual(
      generatedBefore,
      snapshotFiles(listGeneratedInputs()),
      "Pre-existing generated artifacts",
    );
    assertSnapshotsEqual(storesBefore, snapshotFiles(protectedStorePaths), "Formal stores");

    const failed = runStudioOrchestrator("build an unsupported orbital puzzle sandbox", {
      runId: "run-studio-e2e-failure",
      projectId: "unsupported-project",
      projectRoot: fixtureRoot,
      write: false,
    });
    assert.ok(failed.error instanceof Error, "Unsupported requests should return the stage error.");
    assert.strictEqual(failed.report.status, "FAILED");
    assert.strictEqual(failed.report.failed_stage, "capability-loader");
    assert.strictEqual(failed.report.acceptance.fail_fast, true);
    assert.strictEqual(failed.report.stages.length, 4, "Only Blueprint Manager and routers may run before capability matching fails.");
    assert.strictEqual(failed.report.stages[0].stage, "blueprint-manager");
    assert.strictEqual(failed.report.stages[0].status, "PASS");
    assert.strictEqual(failed.report.stages[1].stage, "task-router");
    assert.strictEqual(failed.report.stages[1].status, "PASS");
    assert.strictEqual(failed.report.stages[2].stage, "agent-router");
    assert.strictEqual(failed.report.stages[2].status, "PASS");
    assert.strictEqual(failed.report.stages[3].stage, "capability-loader");
    assert.strictEqual(failed.report.stages[3].status, "FAILED");
    assert.strictEqual(stageByName(failed.report, "game-planner"), undefined);

    const outputPath = writeStudioReport(report);
    assert.strictEqual(outputPath, reportPath);
    assert.deepStrictEqual(JSON.parse(fs.readFileSync(outputPath, "utf8")), report);

    console.log(JSON.stringify({
      test: "studio-e2e",
      natural_language_to_loop: true,
      matched_capability: report.acceptance.matched_capability,
      stage_count: report.stages.length,
      first_stage: report.stages[0].stage,
      blueprint_version: report.blueprint_context.blueprint_version,
      routing_level: report.routing.level,
      selected_agents: report.agent_selection.selected_agents,
      validation_sequence: report.acceptance.validation_statuses,
      fail_fast: true,
      stale_generated_inputs_used: false,
      formal_stores_unchanged: true,
      runtime_mode: report.runtime_mode,
      execution_enabled: report.execution_enabled,
      output: "generated/studio-e2e-report.json",
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
