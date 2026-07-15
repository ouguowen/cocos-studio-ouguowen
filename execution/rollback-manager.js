#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const { snapshotFile } = require("./file-operation");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

class RollbackManager {
  constructor(workspaceManager, fileOperation, options = {}) {
    if (!workspaceManager || typeof workspaceManager.resolve !== "function") {
      throw new Error("Rollback Manager requires a Workspace Manager.");
    }
    if (!fileOperation || typeof fileOperation.getTransaction !== "function") {
      throw new Error("Rollback Manager requires File Operation transaction access.");
    }
    this.workspace = workspaceManager;
    this.fileOperation = fileOperation;
    this.clock = options.clock || (() => new Date().toISOString());
  }

  rollback(transactionId, options = {}) {
    const mode = options.mode || this.workspace.mode;
    this.workspace.checkPermission("rollback", mode);
    const original = this.fileOperation.getTransaction(transactionId);
    if (original.status !== "committed") {
      throw new Error(`Only committed transactions can be rolled back: ${transactionId}`);
    }
    const filePath = this.workspace.resolve(original.path);
    const current = snapshotFile(filePath);
    if (current.exists !== original.after.exists || current.hash !== original.after.hash) {
      const error = new Error(`Rollback conflict: ${original.path} changed after ${transactionId}.`);
      error.code = "ROLLBACK_CONFLICT";
      throw error;
    }
    if (mode === "commit") {
      if (original.before.exists) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        const temporaryPath = `${filePath}.ai-game-studio-rollback-${process.pid}.tmp`;
        fs.writeFileSync(temporaryPath, original.before.content, "utf8");
        fs.renameSync(temporaryPath, filePath);
      } else if (fs.existsSync(filePath)) {
        fs.rmSync(filePath);
      }
    }
    const rollbackTransaction = this.fileOperation.record(
      "rollback",
      original.path,
      mode,
      original.after,
      original.before,
      mode === "commit" ? "committed" : mode === "dry-run" ? "validated" : "previewed",
    );
    if (mode === "commit") {
      original.status = "rolled-back";
      original.rolled_back_at = this.clock();
      original.rollback_transaction_id = rollbackTransaction.transaction_id;
    }
    return {
      original: clone(original),
      rollback: clone(rollbackTransaction),
    };
  }
}

module.exports = {
  RollbackManager,
};
