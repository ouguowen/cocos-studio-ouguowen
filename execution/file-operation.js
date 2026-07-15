#!/usr/bin/env node

"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const transactionTemplatePath = path.join(__dirname, "transaction-store.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadTransactionStoreTemplate() {
  const store = JSON.parse(fs.readFileSync(transactionTemplatePath, "utf8"));
  if (!store || store.execution_enabled !== false || !Array.isArray(store.transactions)) {
    throw new Error("Transaction Store template must remain disabled with a transactions array.");
  }
  return store;
}

function hashContent(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function snapshotFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { exists: false, content: null, hash: null };
  }
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    throw new Error(`File operation target must be a file: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf8");
  return { exists: true, content, hash: hashContent(content) };
}

function createDiff(relativePath, before, after) {
  const beforeLines = before.exists ? before.content.split("\n") : [];
  const afterLines = after.exists ? after.content.split("\n") : [];
  let prefix = 0;
  while (prefix < beforeLines.length && prefix < afterLines.length
    && beforeLines[prefix] === afterLines[prefix]) {
    prefix += 1;
  }
  let suffix = 0;
  while (suffix < beforeLines.length - prefix && suffix < afterLines.length - prefix
    && beforeLines[beforeLines.length - 1 - suffix] === afterLines[afterLines.length - 1 - suffix]) {
    suffix += 1;
  }
  const removed = beforeLines.slice(prefix, beforeLines.length - suffix || beforeLines.length);
  const added = afterLines.slice(prefix, afterLines.length - suffix || afterLines.length);
  return {
    path: relativePath,
    changed: before.exists !== after.exists || before.hash !== after.hash,
    before_exists: before.exists,
    after_exists: after.exists,
    removed,
    added,
  };
}

class FileOperation {
  constructor(workspaceManager, options = {}) {
    if (!workspaceManager || typeof workspaceManager.resolve !== "function"
      || typeof workspaceManager.checkPermission !== "function") {
      throw new Error("File Operation requires a Workspace Manager.");
    }
    this.workspace = workspaceManager;
    this.store = options.store || loadTransactionStoreTemplate();
    if (!this.store || this.store.execution_enabled !== false
      || !Array.isArray(this.store.transactions)) {
      throw new Error("File Operation requires a disabled Transaction Store.");
    }
    this.clock = options.clock || (() => new Date().toISOString());
    this.idFactory = options.idFactory || ((index) => `transaction-${String(index).padStart(4, "0")}`);
  }

  nextTransactionId() {
    return this.idFactory(this.store.transactions.length + 1);
  }

  record(operation, relativePath, mode, before, after, status) {
    const transaction = {
      transaction_id: this.nextTransactionId(),
      operation,
      path: relativePath,
      mode,
      status,
      before: clone(before),
      after: clone(after),
      diff: createDiff(relativePath, before, after),
      timestamp: this.clock(),
      rolled_back_at: null,
      rollback_transaction_id: null,
    };
    this.store.transactions.push(transaction);
    return clone(transaction);
  }

  apply(operation, relativePath, nextContent, options = {}) {
    const mode = options.mode || this.workspace.mode;
    const filePath = this.workspace.resolve(relativePath);
    this.workspace.checkPermission(operation, mode);
    const before = snapshotFile(filePath);
    if (operation === "create" && before.exists) {
      throw new Error(`Cannot create an existing file: ${relativePath}`);
    }
    if ((operation === "update" || operation === "delete") && !before.exists) {
      throw new Error(`Cannot ${operation} a missing file: ${relativePath}`);
    }
    if ((operation === "create" || operation === "update") && typeof nextContent !== "string") {
      throw new Error(`${operation} requires string content.`);
    }
    const after = operation === "delete"
      ? { exists: false, content: null, hash: null }
      : { exists: true, content: nextContent, hash: hashContent(nextContent) };
    if (mode === "commit") {
      if (operation === "delete") {
        fs.rmSync(filePath);
      } else {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        const temporaryPath = `${filePath}.ai-game-studio-${process.pid}.tmp`;
        fs.writeFileSync(temporaryPath, nextContent, "utf8");
        fs.renameSync(temporaryPath, filePath);
      }
    }
    const status = mode === "preview" ? "previewed" : mode === "dry-run" ? "validated" : "committed";
    return this.record(operation, relativePath, mode, before, after, status);
  }

  create(relativePath, content, options = {}) {
    return this.apply("create", relativePath, content, options);
  }

  update(relativePath, content, options = {}) {
    return this.apply("update", relativePath, content, options);
  }

  delete(relativePath, options = {}) {
    return this.apply("delete", relativePath, null, options);
  }

  diff(relativePath, nextContent) {
    const filePath = this.workspace.resolve(relativePath);
    this.workspace.checkPermission("diff", "preview");
    const before = snapshotFile(filePath);
    if (typeof nextContent !== "string") {
      throw new Error("diff requires string content.");
    }
    const after = { exists: true, content: nextContent, hash: hashContent(nextContent) };
    return createDiff(relativePath, before, after);
  }

  getTransaction(transactionId) {
    const transaction = this.store.transactions.find((entry) => entry.transaction_id === transactionId);
    if (!transaction) {
      throw new Error(`Unknown transaction: ${transactionId}`);
    }
    return transaction;
  }

  result() {
    return clone(this.store);
  }
}

module.exports = {
  FileOperation,
  createDiff,
  hashContent,
  loadTransactionStoreTemplate,
  snapshotFile,
};
