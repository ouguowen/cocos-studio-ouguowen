#!/usr/bin/env node

"use strict";

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  FileOperation,
  loadTransactionStoreTemplate,
} = require("../execution/file-operation");
const { RollbackManager } = require("../execution/rollback-manager");
const {
  WorkspaceManager,
  loadPermissionPolicy,
  validatePermissionPolicy,
} = require("../execution/workspace-manager");

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
    || !path.basename(resolvedFixture).startsWith("ai-game-studio-execution-")) {
    throw new Error(`Refusing to remove unsafe execution fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function runTests() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-game-studio-execution-"));
  const formalStoreBefore = fileHash(formalStorePath);
  try {
    const defaultPolicy = loadPermissionPolicy();
    assert.strictEqual(validatePermissionPolicy(defaultPolicy), true);
    assert.strictEqual(defaultPolicy.execution_enabled, false);
    assert.strictEqual(defaultPolicy.default_mode, "preview");

    const previewWorkspace = new WorkspaceManager({ root: fixtureRoot });
    const previewOperations = new FileOperation(previewWorkspace);
    const preview = previewOperations.create("preview.txt", "preview content\n");
    assert.strictEqual(preview.status, "previewed");
    assert.strictEqual(fs.existsSync(path.join(fixtureRoot, "preview.txt")), false);
    const dryRun = previewOperations.create("dry-run.txt", "dry-run content\n", { mode: "dry-run" });
    assert.strictEqual(dryRun.status, "validated");
    assert.strictEqual(fs.existsSync(path.join(fixtureRoot, "dry-run.txt")), false);

    const blockedWorkspace = new WorkspaceManager({
      root: fixtureRoot,
      mode: "commit",
    });
    const blockedOperations = new FileOperation(blockedWorkspace);
    assert.throws(
      () => blockedOperations.create("blocked.txt", "must not be written\n"),
      (error) => error.code === "EXECUTION_PERMISSION_DENIED",
      "Default commit execution must be blocked.",
    );
    assert.strictEqual(fs.existsSync(path.join(fixtureRoot, "blocked.txt")), false);

    const enabledPolicy = JSON.parse(JSON.stringify(defaultPolicy));
    enabledPolicy.execution_enabled = true;
    const missingGrantWorkspace = new WorkspaceManager({
      root: fixtureRoot,
      mode: "commit",
      policy: enabledPolicy,
      executionEnabled: true,
    });
    assert.throws(
      () => new FileOperation(missingGrantWorkspace).create("missing-grant.txt", "blocked\n"),
      (error) => error.code === "EXECUTION_PERMISSION_DENIED",
      "Commit execution must require a workspace permission grant.",
    );
    const permissionGrant = {
      id: "test-workspace-grant",
      workspace_root: fixtureRoot,
      modes: ["commit"],
      operations: ["create", "update", "delete", "rollback"],
    };
    const commitWorkspace = new WorkspaceManager({
      root: fixtureRoot,
      mode: "commit",
      policy: enabledPolicy,
      executionEnabled: true,
      permissionGrant,
    });
    const transactionStore = loadTransactionStoreTemplate();
    const operations = new FileOperation(commitWorkspace, {
      store: transactionStore,
      clock: () => "2026-01-01T00:00:00.000Z",
    });
    const rollbackManager = new RollbackManager(commitWorkspace, operations, {
      clock: () => "2026-01-01T00:00:01.000Z",
    });
    const relativePath = "sandbox/test-file.txt";
    const targetPath = path.join(fixtureRoot, relativePath);

    const created = operations.create(relativePath, "version one\n");
    assert.strictEqual(created.status, "committed");
    assert.strictEqual(fs.readFileSync(targetPath, "utf8"), "version one\n");

    const diff = operations.diff(relativePath, "version two\n");
    assert.strictEqual(diff.changed, true);
    assert.deepStrictEqual(diff.removed, ["version one"]);
    assert.deepStrictEqual(diff.added, ["version two"]);

    const updated = operations.update(relativePath, "version two\n");
    assert.strictEqual(fs.readFileSync(targetPath, "utf8"), "version two\n");
    fs.writeFileSync(targetPath, "concurrent change\n", "utf8");
    assert.throws(
      () => rollbackManager.rollback(updated.transaction_id),
      (error) => error.code === "ROLLBACK_CONFLICT",
      "Rollback must not overwrite a concurrent file change.",
    );
    fs.writeFileSync(targetPath, "version two\n", "utf8");
    const updateRollback = rollbackManager.rollback(updated.transaction_id);
    assert.strictEqual(updateRollback.original.status, "rolled-back");
    assert.strictEqual(fs.readFileSync(targetPath, "utf8"), "version one\n");

    const deleted = operations.delete(relativePath);
    assert.strictEqual(fs.existsSync(targetPath), false);
    const deleteRollback = rollbackManager.rollback(deleted.transaction_id);
    assert.strictEqual(deleteRollback.original.status, "rolled-back");
    assert.strictEqual(fs.readFileSync(targetPath, "utf8"), "version one\n");

    assert.throws(
      () => operations.create("../outside.txt", "blocked\n"),
      (error) => error.code === "EXECUTION_PERMISSION_DENIED",
      "Workspace traversal must be blocked.",
    );
    const result = operations.result();
    assert.strictEqual(result.execution_enabled, false, "Transaction metadata must not enable execution.");
    assert.strictEqual(result.transactions.length, 5);
    assert.strictEqual(result.transactions[0].transaction_id, created.transaction_id);
    assert.strictEqual(fileHash(formalStorePath), formalStoreBefore, "Formal Transaction Store must not change.");

    console.log(JSON.stringify({
      test: "execution-runtime",
      workspace_management: true,
      preview_no_write: true,
      dry_run_no_write: true,
      file_create: true,
      file_update: true,
      file_delete: true,
      file_diff: true,
      rollback_update: true,
      rollback_delete: true,
      permission_blocked_by_default: true,
      missing_grant_blocked: true,
      rollback_conflict_blocked: true,
      path_escape_blocked: true,
      formal_transaction_store_unchanged: true,
      external_calls: false,
      execution_enabled_default: false,
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
