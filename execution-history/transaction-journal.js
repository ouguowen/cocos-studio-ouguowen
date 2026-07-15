#!/usr/bin/env node

"use strict";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

class TransactionJournal {
  constructor(historyStore, options = {}) {
    if (!historyStore || typeof historyStore.get !== "function"
      || typeof historyStore.appendJournal !== "function") {
      throw new Error("Transaction Journal requires an Execution History Store.");
    }
    this.store = historyStore;
    this.clock = options.clock || (() => new Date().toISOString());
  }

  findByTransaction(transactionId) {
    if (typeof transactionId !== "string" || transactionId.length === 0) {
      throw new Error("Transaction lookup requires transaction_id.");
    }
    const record = this.store.snapshot().records
      .find((entry) => entry.transaction_id === transactionId);
    if (!record) {
      throw new Error(`Transaction is not linked to an Execution Record: ${transactionId}`);
    }
    return clone(record);
  }

  findRollbackPoint(transactionId) {
    const record = this.findByTransaction(transactionId);
    if (!record.rollback_point) {
      throw new Error(`Execution Record has no rollback point: ${transactionId}`);
    }
    this.store.appendJournal({
      execution_id: record.execution_id,
      transaction_id: record.transaction_id,
      event: "rollback-point-located",
      status: record.status,
      timestamp: this.clock(),
    });
    return {
      execution_id: record.execution_id,
      transaction_id: record.transaction_id,
      rollback_point: clone(record.rollback_point),
    };
  }

  recordRecovery(executionId, phase, status, timestamp) {
    return this.store.appendJournal({
      execution_id: executionId,
      transaction_id: this.store.get(executionId).transaction_id,
      event: `recovery-${phase}`,
      status,
      timestamp,
    });
  }

  entries(filters = {}) {
    return this.store.snapshot().journal.filter((entry) => (
      (filters.execution_id === undefined || entry.execution_id === filters.execution_id)
      && (filters.transaction_id === undefined || entry.transaction_id === filters.transaction_id)
      && (filters.event === undefined || entry.event === filters.event)
    ));
  }
}

module.exports = {
  TransactionJournal,
};
