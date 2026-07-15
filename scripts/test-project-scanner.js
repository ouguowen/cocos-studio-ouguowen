#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  loadProjectScanReport,
  scanProject,
  validateProjectScanReport,
} = require("../project-scanner/project-scanner");
const {
  buildProjectContext,
  loadProjectContext,
} = require("../project-intelligence/project-context");
const { loadProjectState } = require("../project-intelligence/project-analyzer");

const projectId = "modern-city-defense";

function writeFixtureFile(fixtureRoot, relativePath, content) {
  const filePath = path.join(fixtureRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  return filePath;
}

function createFixture() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cocos-studio-project-scanner-"));
  writeFixtureFile(fixtureRoot, "project.json", JSON.stringify({
    engine: "Cocos Creator",
    version: "3.8.8",
  }, null, 2));
  writeFixtureFile(fixtureRoot, "assets/images/tower.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/animations/tower.anim", "animation metadata");
  writeFixtureFile(fixtureRoot, "assets/ui/hud.png", Buffer.from([0x50, 0x4e, 0x47]));
  writeFixtureFile(fixtureRoot, "assets/audio/theme.ogg", Buffer.from([0x4f, 0x47, 0x47]));
  const battlePath = writeFixtureFile(
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
  return { fixtureRoot, battlePath };
}

function removeFixture(fixtureRoot) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const resolvedFixture = fs.realpathSync(fixtureRoot);
  const relative = path.relative(tempRoot, resolvedFixture);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)
    || !path.basename(resolvedFixture).startsWith("cocos-studio-project-scanner-")) {
    throw new Error(`Refusing to remove unsafe scanner fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function runTests() {
  const { fixtureRoot, battlePath } = createFixture();
  try {
    const battleBefore = fs.readFileSync(battlePath, "utf8");
    const result = scanProject(fixtureRoot, { projectName: projectId });
    const report = result.report;
    assert.strictEqual(result.execution_enabled, false, "Project Scanner must disable execution.");
    assert.strictEqual(validateProjectScanReport(report), true, "Project Scan Report should match schema.");
    assert.strictEqual(report.project, projectId);
    assert.strictEqual(report.engine, "Cocos Creator 3.8.8");
    assert.deepStrictEqual(report.assets.directories, {
      assets: true,
      scripts: true,
      scenes: true,
      prefabs: true,
      resources: true,
    });
    assert.strictEqual(report.assets.total_files, 6, "Asset scan should count fixture resource files.");
    assert.strictEqual(report.assets.image_count, 2, "Asset scan should count images.");
    assert.strictEqual(report.assets.animation_count, 1, "Asset scan should count animations.");
    assert.strictEqual(report.assets.ui_resource_count, 1, "Asset scan should count UI resources.");
    assert.strictEqual(report.assets.audio_count, 1, "Asset scan should count audio resources.");
    assert.strictEqual(report.assets.prefab_count, 1, "Asset scan should count Prefabs.");
    assert.strictEqual(report.assets.resource_count, 1, "Asset scan should count Resources.");
    assert.strictEqual(report.code.script_count, 2, "Code scan should count scripts.");
    assert.strictEqual(report.code.module_count, 2, "Code scan should count modules.");
    assert.strictEqual(report.code.todo_count, 2, "Code scan should count TODO markers.");
    assert.strictEqual(report.scenes.scene_count, 1, "Scene scan should count scenes.");
    assert.strictEqual(report.scenes.node_count, 3, "Scene scan should count serialized nodes.");
    assert.ok(report.warnings.some((warning) => warning.includes("2 TODO marker")));
    assert.strictEqual(report.completion_estimate, 96, "Completion estimate should use scan metadata.");
    assert.strictEqual(fs.readFileSync(battlePath, "utf8"), battleBefore, "Scanner must not modify project files.");

    const loadedReport = loadProjectScanReport();
    assert.deepStrictEqual(loadedReport, report, "Generated Project Scan Report should be readable.");
    const state = loadProjectState();
    const explicitContext = buildProjectContext(state, { projectScan: report });
    assert.deepStrictEqual(explicitContext.project_scan, report, "Project Context should accept Scanner output.");
    const loadedContext = loadProjectContext({ state });
    assert.deepStrictEqual(loadedContext.project_scan, report, "Project Context should read matching Scanner output.");
    assert.strictEqual(loadedContext.project_scan.execution_enabled, false);

    assert.throws(
      () => validateProjectScanReport({ ...report, execution_enabled: true }),
      /execution_enabled false/,
      "Scanner schema should reject enabled execution.",
    );
    assert.throws(
      () => scanProject(path.join(fixtureRoot, "missing-project"), { write: false }),
      /cannot resolve project path/,
      "Missing project paths should be rejected.",
    );

    console.log(JSON.stringify({
      test: "project-scanner",
      project_structure_scan: true,
      asset_analysis: true,
      code_analysis: true,
      scene_analysis: true,
      project_context_integration: true,
      source_files_unchanged: true,
      report_generated: true,
      execution_enabled: false,
      external_calls: false,
      output: "generated/project-scan-report.json",
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
