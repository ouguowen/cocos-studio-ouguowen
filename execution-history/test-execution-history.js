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
const { AuditLog } = require("./audit-log");
const { ExecutionHistoryStore, validateExecutionRecord } = require("./execution-history-store");
const { RecoveryManager } = require("./recovery-manager");
const { TransactionJournal } = require("./transaction-journal");

const root = path.resolve(__dirname, "..");
const formalTransactionStorePath = path.join(root, "execution", "transaction-store.json");

function fileHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function removeFixture(fixtureRoot) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const resolvedFixture = fs.realpathSync(fixtureRoot);
  const relative = path.relative(tempRoot, resolvedFixture);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)
    || !path.basename(resolvedFixture).startsWith("ai-game-studio-history-")) {
    throw new Error(`Refusing to remove unsafe history fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function createCommittedExecution(fixtureRoot) {
  const workspacePolicy = loadPermissionPolicy();
  workspacePolicy.execution_enabled = true;
  const workspace = new WorkspaceManager({
    root: fixtureRoot,
    mode: "commit",
    policy: workspacePolicy,
    executionEnabled: true,
    permissionGrant: {
      id: "execution-history-test-grant",
      workspace_root: fixtureRoot,
      modes: ["commit"],
      operations: ["create", "update", "delete", "rollback"],
    },
  });
  const fileOperation = new FileOperation(workspace, {
    store: loadTransactionStoreTemplate(),
    clock: () => "2026-01-01T00:00:00.000Z",
  });
  const rollbackManager = new RollbackManager(workspace, fileOperation);
  const router = new ExecutionRouter({
    fileOperation,
    rollbackManager,
    policy: loadExecutionPolicy({
      execution_enabled: true,
      local_workspace_execution_enabled: true,
    }),
  });
  const executor = new CapabilityExecutor({ router });
  const task = {
    run_id: "run-execution-history-0001",
    task_id: "system-implementation-plan",
    agent: "cocos-programmer",
    capability: "system-implementation-plan",
    tool: "blueprint-system-planner",
    operation: "create",
    workspace_path: "history/system-plan.txt",
    content: "tracked execution\n",
    mode: "commit",
    provider_requirements: { type: "engine" },
  };
  const request = executor.createExecutionRequest(task);
  const result = router.execute(request);
  const transaction = fileOperation.getTransaction(result.transaction_id);
  return { fileOperation, request, result, transaction };
}

function runExecutionHistoryTests() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-game-studio-history-"));
  const formalStoreBefore = fileHash(formalTransactionStorePath);
  try {
    const execution = createCommittedExecution(fixtureRoot);
    const historyPath = path.join(fixtureRoot, "history", "execution-history.json");
    const timestamps = [
      "2026-01-01T00:00:10.000Z",
      "2026-01-01T00:00:11.000Z",
      "2026-01-01T00:00:12.000Z",
      "2026-01-01T00:00:13.000Z",
      "2026-01-01T00:00:14.000Z",
      "2026-01-01T00:00:15.000Z",
    ];
    let timestampIndex = 0;
    const clock = () => timestamps[Math.min(timestampIndex++, timestamps.length - 1)];
    const store = new ExecutionHistoryStore({
      storePath: historyPath,
      allowedRoot: fixtureRoot,
      persistenceEnabled: true,
      clock,
    });
    assert.strictEqual(store.snapshot().mode, "preview");
    assert.strictEqual(store.snapshot().execution_enabled, false);

    const record = store.createRecord(execution.request, execution.result, {
      transaction: execution.transaction,
    });
    assert.strictEqual(validateExecutionRecord(record), true);
    assert.strictEqual(record.run_id, execution.request.run_id);
    assert.strictEqual(record.task_id, execution.request.task_id);
    assert.strictEqual(record.execution_id, "execution-0001");
    assert.strictEqual(record.transaction_id, execution.result.transaction_id);
    assert.strictEqual(record.provider, "cocos");
    assert.strictEqual(record.adapter, "cocos-adapter");
    assert.strictEqual(record.runtime, "cocos-runtime");
    assert.strictEqual(record.rollback_point.restorable, true);
    assert.ok(fs.existsSync(historyPath), "Execution History should persist inside the temp root.");

    const reloadedStore = new ExecutionHistoryStore({
      storePath: historyPath,
      allowedRoot: fixtureRoot,
      persistenceEnabled: true,
      clock,
    });
    assert.strictEqual(reloadedStore.get(record.execution_id).transaction_id, record.transaction_id);
    assert.strictEqual(reloadedStore.query({ run_id: record.run_id }).length, 1);

    const failed = reloadedStore.updateStatus(record.execution_id, "failed", {
      result: {
        ...execution.result,
        status: "failed",
        error: { code: "SIMULATED_RECOVERABLE_FAILURE", message: "Recovery test." },
      },
    });
    assert.strictEqual(failed.status, "failed");

    const journal = new TransactionJournal(reloadedStore, { clock });
    const recovery = new RecoveryManager(reloadedStore, journal, { clock });
    assert.throws(
      () => recovery.recover(record.execution_id, {
        ...execution.result,
        status: "failed",
      }),
      /must be successful/,
      "Failed recovery output must not be accepted.",
    );
    assert.strictEqual(reloadedStore.get(record.execution_id).status, "failed");
    const recovered = recovery.recover(record.execution_id, {
      ...execution.result,
      status: "committed",
      recovery: "replayed-from-persisted-request",
    });
    assert.strictEqual(recovered.status, "recovered");
    assert.strictEqual(recovered.recovery.attempts, 1);
    assert.strictEqual(reloadedStore.query({ status: "recovered" }).length, 1);
    assert.throws(
      () => reloadedStore.updateStatus(record.execution_id, "committed"),
      /Invalid Execution Record transition/,
      "Recovered records must not be rewritten as committed.",
    );

    const rollbackLookup = journal.findRollbackPoint(record.transaction_id);
    assert.strictEqual(rollbackLookup.execution_id, record.execution_id);
    assert.strictEqual(rollbackLookup.rollback_point.path, execution.transaction.path);
    assert.strictEqual(rollbackLookup.rollback_point.restorable, true);

    const audit = new AuditLog(reloadedStore, journal, { clock });
    const report = audit.generateReport({ run_id: record.run_id });
    assert.strictEqual(report.mode, "audit-only");
    assert.strictEqual(report.execution_enabled, false);
    assert.strictEqual(report.summary.execution_count, 1);
    assert.strictEqual(report.summary.status_counts.recovered, 1);
    assert.ok(report.summary.journal_entry_count >= 6);
    assert.strictEqual(report.records[0].execution_id, record.execution_id);
    assert.strictEqual(fileHash(formalTransactionStorePath), formalStoreBefore);

    console.log(JSON.stringify({
      test: "execution-history",
      create_execution_record: true,
      persistent_reload: true,
      execution_query: true,
      update_status: true,
      failed_recovery: true,
      invalid_recovery_blocked: true,
      invalid_status_transition_blocked: true,
      rollback_lookup: true,
      audit_report: true,
      run_id: record.run_id,
      task_id: record.task_id,
      execution_id: record.execution_id,
      transaction_id: record.transaction_id,
      temporary_persistence_only: true,
      formal_transaction_store_unchanged: true,
      external_calls: false,
      execution_enabled: false,
      default_mode: "preview"
    }, null, 2));
  } finally {
    removeFixture(fixtureRoot);
  }
}

if (require.main === module) {
  try {
    runExecutionHistoryTests();
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  runExecutionHistoryTests,
};
