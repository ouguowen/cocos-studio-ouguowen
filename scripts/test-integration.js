#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  createDefaultIntegrationManager,
  createIntegrationReport,
  validateIntegrationReport,
  writeIntegrationReport,
} = require("../integration/integration-manager");
const { createDefaultRuntimeManager } = require("../runtime/runtime-manager");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "integration-report.json");
const virtualCodePath = path.join(root, "generated", "integration-probe.ts");

function runTests() {
  assert.strictEqual(fs.existsSync(virtualCodePath), false, "Virtual code probe must not exist before test.");
  const manager = createDefaultIntegrationManager();
  assert.strictEqual(manager.runtime_mode, "mock", "Integration Manager should default to mock.");
  assert.strictEqual(manager.execution_enabled, false, "Integration Manager should disable execution.");
  assert.strictEqual(manager.list().length, 4, "Four Integrations should register.");
  assert.ok(
    manager.list().every((integration) => integration.execution_enabled === false),
    "Every Integration should default to execution_enabled false.",
  );

  const cocos = manager.get("cocos-integration");
  assert.strictEqual(typeof cocos.createProject, "function");
  assert.strictEqual(typeof cocos.createScene, "function");
  assert.strictEqual(typeof cocos.buildProject, "function");
  assert.strictEqual(cocos.createProject({ project_name: "mock-project" }).status, "simulated");
  assert.strictEqual(cocos.createScene({ project: "mock-project", scene: "main" }).status, "simulated");
  assert.strictEqual(cocos.buildProject({ project: "mock-project" }).status, "simulated");

  const asset = manager.get("asset-integration");
  const assetResult = asset.createAsset({
    asset_id: "hero-spec",
    image_provider: "provider-registry-selection",
  });
  assert.strictEqual(assetResult.status, "simulated");
  assert.strictEqual(
    assetResult.input.image_provider,
    "provider-registry-selection",
    "Asset Integration should retain an abstract image_provider.",
  );

  const code = manager.get("code-integration");
  assert.strictEqual(code.createFile({ path: virtualCodePath, content: "mock" }).status, "simulated");
  assert.strictEqual(code.updateFile({ path: virtualCodePath, content: "mock update" }).status, "simulated");
  assert.strictEqual(fs.existsSync(virtualCodePath), false, "Code Integration must not create or update files.");

  const git = manager.get("git-integration");
  assert.strictEqual(git.commit({ message: "mock commit" }).status, "simulated");
  assert.strictEqual(git.rollback({ reference: "mock-reference" }).status, "simulated");

  const productionManager = createDefaultIntegrationManager({ runtimeMode: "production" });
  const productionCocos = productionManager.get("cocos-integration");
  let productionImplementationReached = false;
  productionCocos.perform = () => {
    productionImplementationReached = true;
    throw new Error("Production Integration implementation must not be reached.");
  };
  assert.throws(
    () => productionCocos.createProject({ project_name: "blocked-project" }),
    (error) => error.code === "INTEGRATION_EXECUTION_DISABLED",
    "Production Integration should be blocked.",
  );
  assert.strictEqual(
    productionImplementationReached,
    false,
    "Integration disabled gate must stop before production implementation.",
  );

  const runtimeManager = createDefaultRuntimeManager({
    runtimeMode: "mock",
    integrationManager: manager,
  });
  assert.ok(
    runtimeManager.list().every((runtime) => runtime.integration_manager === manager),
    "Every Runtime should receive the Integration Manager.",
  );
  const runtime = runtimeManager.match("system-implementation-plan");
  assert.strictEqual(runtime.integration_id, "cocos-integration");
  const runtimeIntegrationProbe = runtime.invokeIntegration("buildProject", {
    project: "runtime-integration-probe",
  });
  assert.strictEqual(runtimeIntegrationProbe.status, "simulated");
  assert.strictEqual(runtimeIntegrationProbe.execution_enabled, false);

  const report = createIntegrationReport();
  assert.strictEqual(validateIntegrationReport(report), true, "Integration Report should validate.");
  const writtenPath = writeIntegrationReport(report);
  assert.strictEqual(writtenPath, reportPath, "Integration Report should use generated output path.");
  assert.ok(fs.existsSync(reportPath), "Integration Report should be generated.");
  const generatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.strictEqual(generatedReport.runtime_mode, "mock");
  assert.strictEqual(generatedReport.production_gate.status, "blocked");
  assert.strictEqual(generatedReport.execution_enabled, false);
  assert.strictEqual(fs.existsSync(virtualCodePath), false, "Integration test must leave no project files.");

  console.log(JSON.stringify({
    test: "real-integration-layer",
    integration_registration: true,
    cocos_interface: true,
    asset_provider_abstraction: true,
    code_interface_no_write: true,
    git_interface_mock: true,
    runtime_integration_connection: true,
    production_integration_blocked: true,
    production_implementation_reached: false,
    report_generated: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/integration-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
