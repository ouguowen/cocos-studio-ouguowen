#!/usr/bin/env node

"use strict";

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { FileOperation, loadTransactionStoreTemplate } = require("../execution/file-operation");
const { RollbackManager } = require("../execution/rollback-manager");
const { WorkspaceManager, loadPermissionPolicy } = require("../execution/workspace-manager");
const { CapabilityExecutor } = require("../execution-contract/capability-executor");
const { loadExecutionPolicy } = require("../execution-contract/execution-policy");
const { ExecutionRouter } = require("../execution-contract/execution-router");
const {
  validateExecutionRequest,
  validateExecutionResult,
} = require("../execution-contract/execution-result");

const root = path.resolve(__dirname, "..");
const formalStorePath = path.join(root, "execution", "transaction-store.json");

function fileHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function removeFixture(fixtureRoot) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const resolvedFixture = fs.realpathSync(fixtureRoot);
  const relative = path.relative(tempRoot, resolvedFixture);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)
    || !path.basename(resolvedFixture).startsWith("ai-game-studio-contract-")) {
    throw new Error(`Refusing to remove unsafe contract fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function createTask(overrides = {}) {
  return {
    run_id: "run-execution-contract-0001",
    task_id: "system-implementation-plan",
    agent: "cocos-programmer",
    capability: "system-implementation-plan",
    tool: "blueprint-system-planner",
    operation: "create",
    workspace_path: "contract/system-plan.txt",
    content: "version one\n",
    mode: "preview",
    provider_requirements: { type: "engine" },
    ...overrides,
  };
}

function createContractRuntime(workspace, contractPolicy) {
  const fileOperation = new FileOperation(workspace, {
    store: loadTransactionStoreTemplate(),
    clock: () => "2026-01-01T00:00:00.000Z",
  });
  const rollbackManager = new RollbackManager(workspace, fileOperation, {
    clock: () => "2026-01-01T00:00:01.000Z",
  });
  const router = new ExecutionRouter({
    fileOperation,
    rollbackManager,
    policy: contractPolicy,
  });
  const executor = new CapabilityExecutor({ router });
  return { executor, fileOperation, rollbackManager, router };
}

function runTests() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-game-studio-contract-"));
  const formalStoreBefore = fileHash(formalStorePath);
  try {
    const previewWorkspace = new WorkspaceManager({ root: fixtureRoot });
    const previewRuntime = createContractRuntime(previewWorkspace, loadExecutionPolicy());
    const previewTask = createTask();
    const request = previewRuntime.executor.createExecutionRequest(previewTask);
    assert.strictEqual(validateExecutionRequest(request), true);
    assert.strictEqual(request.capability, "system-implementation-plan");
    assert.strictEqual(request.execution_enabled, false);
    assert.strictEqual(request.external_execution, false);

    const route = previewRuntime.router.resolveRoute(request);
    assert.deepStrictEqual(
      [route.provider, route.adapter, route.runtime],
      ["cocos", "cocos-adapter", "cocos-runtime"],
      "Capability should route through matching Provider, Adapter, and Runtime metadata.",
    );
    assert.strictEqual(route.provider_execution, false);
    assert.strictEqual(route.adapter_execution, false);
    assert.strictEqual(route.runtime_execution, false);
    assert.strictEqual(route.integration_execution, false);

    const previewResult = previewRuntime.executor.executeTask(previewTask);
    assert.strictEqual(validateExecutionResult(previewResult), true);
    assert.strictEqual(previewResult.status, "previewed");
    assert.strictEqual(fs.existsSync(path.join(fixtureRoot, previewTask.workspace_path)), false);
    assert.strictEqual(previewRuntime.router.runtimeManager.result().length, 0);
    const routedAdapter = previewRuntime.router.adapterRegistry.list()
      .find((adapter) => adapter.id === route.adapter);
    assert.strictEqual(routedAdapter.result(), null, "Adapter must be validated but never executed.");

    const assetRequest = previewRuntime.executor.createExecutionRequest(createTask({
      task_id: "asset-requirements",
      agent: "artist",
      capability: "asset-requirements",
      tool: "asset-requirement-catalog",
      workspace_path: "contract/asset-requirements.txt",
      provider_requirements: { type: "image" },
    }));
    const assetRoute = previewRuntime.router.resolveRoute(assetRequest);
    assert.strictEqual(assetRoute.adapter, "provider-adapter");
    assert.strictEqual(assetRoute.runtime, "asset-runtime");
    assert.ok(assetRoute.provider_adapter_contract.endsWith("-adapter"));
    assert.strictEqual(assetRoute.provider_execution, false);

    const blockedResult = previewRuntime.executor.executeTask(createTask({
      mode: "commit",
      workspace_path: "contract/blocked.txt",
    }));
    assert.strictEqual(blockedResult.status, "blocked");
    assert.strictEqual(blockedResult.error.code, "EXECUTION_CONTRACT_DISABLED");
    assert.strictEqual(fs.existsSync(path.join(fixtureRoot, "contract/blocked.txt")), false);

    const workspacePolicy = loadPermissionPolicy();
    workspacePolicy.execution_enabled = true;
    const commitWorkspace = new WorkspaceManager({
      root: fixtureRoot,
      mode: "commit",
      policy: workspacePolicy,
      executionEnabled: true,
      permissionGrant: {
        id: "execution-contract-test-grant",
        workspace_root: fixtureRoot,
        modes: ["commit"],
        operations: ["create", "update", "delete", "rollback"],
      },
    });
    const commitRuntime = createContractRuntime(commitWorkspace, loadExecutionPolicy({
      execution_enabled: true,
      local_workspace_execution_enabled: true,
    }));
    const commitPath = "contract/committed.txt";
    const createResult = commitRuntime.executor.executeTask(createTask({
      mode: "commit",
      workspace_path: commitPath,
    }));
    assert.strictEqual(createResult.status, "committed");
    assert.strictEqual(createResult.execution_enabled, false);
    assert.strictEqual(fs.readFileSync(path.join(fixtureRoot, commitPath), "utf8"), "version one\n");

    const updateTask = createTask({
      mode: "commit",
      operation: "update",
      workspace_path: commitPath,
      content: "version two\n",
    });
    const updateResult = commitRuntime.executor.executeTask(updateTask);
    assert.strictEqual(updateResult.status, "committed");
    assert.strictEqual(fs.readFileSync(path.join(fixtureRoot, commitPath), "utf8"), "version two\n");

    const rollbackResult = commitRuntime.executor.rollbackTask(updateTask, updateResult.transaction_id);
    assert.strictEqual(validateExecutionResult(rollbackResult), true);
    assert.strictEqual(rollbackResult.status, "rolled-back");
    assert.strictEqual(fs.readFileSync(path.join(fixtureRoot, commitPath), "utf8"), "version one\n");
    assert.strictEqual(commitRuntime.router.runtimeManager.result().length, 0);
    assert.strictEqual(fileHash(formalStorePath), formalStoreBefore);

    console.log(JSON.stringify({
      test: "execution-contract",
      capability_match: true,
      execution_request_generated: true,
      provider_selected: route.provider,
      adapter_routed: route.adapter,
      runtime_routed: route.runtime,
      provider_neutral_asset_route: true,
      adapter_executed: false,
      runtime_executed: false,
      integration_executed: false,
      permission_blocked: true,
      rollback_chain: true,
      temporary_workspace_only: true,
      formal_transaction_store_unchanged: true,
      external_calls: false,
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
