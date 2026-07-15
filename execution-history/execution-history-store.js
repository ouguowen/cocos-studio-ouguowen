#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "execution-record-schema.json");
const recordSchema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const allowedStatusTransitions = {
  previewed: ["failed"],
  validated: ["failed"],
  committed: ["failed", "rolled-back"],
  blocked: ["failed"],
  failed: ["recovering"],
  recovering: ["recovered", "failed"],
  recovered: [],
  "rolled-back": [],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function createEmptyHistory() {
  return {
    schema_version: "1.0.0",
    mode: "preview",
    execution_enabled: false,
    records: [],
    journal: [],
  };
}

function validateExecutionRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("Execution Record must be an object.");
  }
  for (const field of recordSchema.required) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) {
      throw new Error(`Execution Record is missing field: ${field}`);
    }
  }
  const allowedFields = new Set(Object.keys(recordSchema.properties));
  for (const field of Object.keys(record)) {
    if (!allowedFields.has(field)) {
      throw new Error(`Execution Record contains unsupported field: ${field}`);
    }
  }
  for (const field of ["run_id", "task_id", "execution_id", "transaction_id", "capability"]) {
    assertNonEmptyString(record[field], `Execution Record ${field}`);
  }
  if (!/^execution-\d{4,}$/.test(record.execution_id)
    || !recordSchema.properties.status.enum.includes(record.status)
    || !recordSchema.properties.mode.enum.includes(record.mode)) {
    throw new Error("Execution Record identity, status, or mode is invalid.");
  }
  if (record.execution_enabled !== false || typeof record.permission?.allowed !== "boolean"
    || record.permission.mode !== record.mode) {
    throw new Error("Execution Record permission or execution boundary is invalid.");
  }
  for (const field of ["timestamp", "updated_at"]) {
    if (Number.isNaN(Date.parse(record[field]))) {
      throw new Error(`Execution Record ${field} must be ISO-compatible.`);
    }
  }
  return true;
}

function validateHistory(history) {
  if (!history || history.mode !== "preview" || history.execution_enabled !== false
    || !Array.isArray(history.records) || !Array.isArray(history.journal)) {
    throw new Error("Execution History must remain a disabled preview store.");
  }
  const executionIds = new Set();
  const transactionIds = new Set();
  for (const record of history.records) {
    validateExecutionRecord(record);
    if (executionIds.has(record.execution_id) || transactionIds.has(record.transaction_id)) {
      throw new Error("Execution History contains duplicate execution or transaction ids.");
    }
    executionIds.add(record.execution_id);
    transactionIds.add(record.transaction_id);
  }
  return true;
}

function createRollbackPoint(transaction) {
  if (!transaction || typeof transaction !== "object") {
    return null;
  }
  return {
    transaction_id: transaction.transaction_id,
    path: transaction.path,
    before_exists: transaction.before?.exists === true,
    before_hash: transaction.before?.hash || null,
    after_exists: transaction.after?.exists === true,
    after_hash: transaction.after?.hash || null,
    restorable: transaction.status === "committed",
  };
}

class ExecutionHistoryStore {
  constructor(options = {}) {
    this.persistence_enabled = options.persistenceEnabled === true;
    this.clock = options.clock || (() => new Date().toISOString());
    this.store_path = options.storePath ? path.resolve(options.storePath) : null;
    this.allowed_root = options.allowedRoot ? path.resolve(options.allowedRoot) : null;
    this.history = createEmptyHistory();
    if (this.persistence_enabled) {
      this.validateStorePath();
    }
    if (this.store_path && fs.existsSync(this.store_path)) {
      this.history = JSON.parse(fs.readFileSync(this.store_path, "utf8"));
      validateHistory(this.history);
    }
  }

  validateStorePath() {
    if (!this.store_path || !this.allowed_root) {
      throw new Error("Persistent Execution History requires storePath and allowedRoot.");
    }
    if (!fs.existsSync(this.allowed_root) || !fs.statSync(this.allowed_root).isDirectory()) {
      throw new Error(`Execution History allowedRoot must be an existing directory: ${this.allowed_root}`);
    }
    const relative = path.relative(this.allowed_root, this.store_path);
    if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)
      || path.extname(this.store_path).toLowerCase() !== ".json") {
      throw new Error("Execution History storePath must be a JSON file inside allowedRoot.");
    }
    let currentPath = this.allowed_root;
    if (fs.lstatSync(currentPath).isSymbolicLink()) {
      throw new Error("Execution History allowedRoot must not be a symbolic link.");
    }
    for (const segment of relative.split(path.sep).filter(Boolean)) {
      currentPath = path.join(currentPath, segment);
      if (fs.existsSync(currentPath) && fs.lstatSync(currentPath).isSymbolicLink()) {
        throw new Error("Execution History storePath must not contain symbolic links.");
      }
    }
    return true;
  }

  save() {
    validateHistory(this.history);
    if (!this.persistence_enabled) {
      return null;
    }
    fs.mkdirSync(path.dirname(this.store_path), { recursive: true });
    const temporaryPath = `${this.store_path}.${process.pid}.tmp`;
    try {
      fs.writeFileSync(temporaryPath, `${JSON.stringify(this.history, null, 2)}\n`, "utf8");
      fs.renameSync(temporaryPath, this.store_path);
    } finally {
      if (fs.existsSync(temporaryPath)) {
        fs.rmSync(temporaryPath);
      }
    }
    return this.store_path;
  }

  nextExecutionId() {
    const highestId = this.history.records.reduce((highest, record) => (
      Math.max(highest, Number.parseInt(record.execution_id.split("-").at(-1), 10))
    ), 0);
    return `execution-${String(highestId + 1).padStart(4, "0")}`;
  }

  createRecord(request, result, options = {}) {
    const timestamp = this.clock();
    const executionId = this.nextExecutionId();
    const transactionId = result.transaction_id || `transaction-${executionId}`;
    const route = result.route || {};
    const record = {
      schema_version: "1.0.0",
      run_id: request.run_id,
      task_id: request.task_id,
      execution_id: executionId,
      transaction_id: transactionId,
      status: result.status,
      mode: request.mode,
      capability: request.capability,
      provider: route.provider || null,
      adapter: route.adapter || null,
      runtime: route.runtime || null,
      request: clone(request),
      result: clone(result),
      diff: result.diff ? clone(result.diff) : null,
      permission: {
        allowed: result.status !== "blocked",
        code: result.error?.code || null,
        mode: request.mode,
      },
      rollback_point: createRollbackPoint(options.transaction),
      timestamp,
      updated_at: timestamp,
      recovery: {
        attempts: 0,
        last_recovery_at: null,
        recovered_from_status: null,
      },
      execution_enabled: false,
    };
    validateExecutionRecord(record);
    this.history.records.push(record);
    this.appendJournal({
      execution_id: executionId,
      transaction_id: transactionId,
      event: "execution-recorded",
      status: record.status,
      timestamp,
    }, false);
    this.save();
    return clone(record);
  }

  get(executionId) {
    assertNonEmptyString(executionId, "Execution id");
    const record = this.history.records.find((entry) => entry.execution_id === executionId);
    if (!record) {
      throw new Error(`Execution Record not found: ${executionId}`);
    }
    return clone(record);
  }

  query(filters = {}) {
    const records = this.history.records.filter((record) => (
      (filters.run_id === undefined || record.run_id === filters.run_id)
      && (filters.task_id === undefined || record.task_id === filters.task_id)
      && (filters.status === undefined || record.status === filters.status)
      && (filters.capability === undefined || record.capability === filters.capability)
    ));
    return clone(records);
  }

  updateStatus(executionId, status, changes = {}) {
    if (!recordSchema.properties.status.enum.includes(status)) {
      throw new Error(`Unsupported Execution Record status: ${status}`);
    }
    const record = this.history.records.find((entry) => entry.execution_id === executionId);
    if (!record) {
      throw new Error(`Execution Record not found: ${executionId}`);
    }
    const previousStatus = record.status;
    if (status !== previousStatus && !allowedStatusTransitions[previousStatus].includes(status)) {
      throw new Error(`Invalid Execution Record transition: ${previousStatus} -> ${status}`);
    }
    record.status = status;
    record.updated_at = this.clock();
    if (changes.result !== undefined) {
      record.result = clone(changes.result);
    }
    if (changes.diff !== undefined) {
      record.diff = clone(changes.diff);
    }
    if (changes.recovery !== undefined) {
      record.recovery = { ...record.recovery, ...clone(changes.recovery) };
    }
    validateExecutionRecord(record);
    this.appendJournal({
      execution_id: record.execution_id,
      transaction_id: record.transaction_id,
      event: "status-updated",
      previous_status: previousStatus,
      status,
      timestamp: record.updated_at,
    }, false);
    this.save();
    return clone(record);
  }

  appendJournal(event, persist = true) {
    const entry = {
      journal_id: `journal-${String(this.history.journal.length + 1).padStart(4, "0")}`,
      ...clone(event),
    };
    this.history.journal.push(entry);
    if (persist) {
      this.save();
    }
    return clone(entry);
  }

  snapshot() {
    return clone(this.history);
  }
}

module.exports = {
  ExecutionHistoryStore,
  createEmptyHistory,
  createRollbackPoint,
  validateExecutionRecord,
  validateHistory,
};
