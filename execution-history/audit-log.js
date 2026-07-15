#!/usr/bin/env node

"use strict";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

class AuditLog {
  constructor(historyStore, transactionJournal, options = {}) {
    if (!historyStore || typeof historyStore.query !== "function") {
      throw new Error("Audit Log requires an Execution History Store.");
    }
    if (!transactionJournal || typeof transactionJournal.entries !== "function") {
      throw new Error("Audit Log requires a Transaction Journal.");
    }
    this.store = historyStore;
    this.journal = transactionJournal;
    this.clock = options.clock || (() => new Date().toISOString());
  }

  generateReport(filters = {}) {
    const records = this.store.query(filters);
    const executionIds = new Set(records.map((record) => record.execution_id));
    const entries = this.journal.entries().filter((entry) => executionIds.has(entry.execution_id));
    const statusCounts = {};
    for (const record of records) {
      statusCounts[record.status] = (statusCounts[record.status] || 0) + 1;
    }
    return {
      schema_version: "1.0.0",
      mode: "audit-only",
      execution_enabled: false,
      generated_at: this.clock(),
      filters: clone(filters),
      summary: {
        execution_count: records.length,
        journal_entry_count: entries.length,
        status_counts: statusCounts,
        recoverable_count: records.filter((record) => record.rollback_point?.restorable).length,
      },
      records,
      journal: clone(entries),
    };
  }
}

module.exports = {
  AuditLog,
};
