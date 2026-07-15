#!/usr/bin/env node

"use strict";

class RecoveryManager {
  constructor(historyStore, transactionJournal, options = {}) {
    if (!historyStore || typeof historyStore.updateStatus !== "function") {
      throw new Error("Recovery Manager requires an Execution History Store.");
    }
    if (!transactionJournal || typeof transactionJournal.recordRecovery !== "function") {
      throw new Error("Recovery Manager requires a Transaction Journal.");
    }
    this.store = historyStore;
    this.journal = transactionJournal;
    this.clock = options.clock || (() => new Date().toISOString());
  }

  recover(executionId, recoveryResult) {
    const current = this.store.get(executionId);
    if (current.status !== "failed") {
      throw new Error(`Recovery requires failed status: ${executionId}`);
    }
    if (!recoveryResult || typeof recoveryResult !== "object" || Array.isArray(recoveryResult)) {
      throw new Error("Recovery requires a result object.");
    }
    if (new Set(["failed", "blocked"]).has(recoveryResult.status)
      || recoveryResult.execution_enabled !== false
      || recoveryResult.external_execution !== false) {
      throw new Error("Recovery Result must be successful with execution disabled.");
    }
    const startedAt = this.clock();
    this.store.updateStatus(executionId, "recovering", {
      recovery: {
        attempts: current.recovery.attempts + 1,
        last_recovery_at: startedAt,
        recovered_from_status: current.status,
      },
    });
    this.journal.recordRecovery(executionId, "started", "recovering", startedAt);
    const completedAt = this.clock();
    const recovered = this.store.updateStatus(executionId, "recovered", {
      result: recoveryResult,
      diff: recoveryResult.diff || current.diff,
      recovery: {
        last_recovery_at: completedAt,
      },
    });
    this.journal.recordRecovery(executionId, "completed", "recovered", completedAt);
    return recovered;
  }
}

module.exports = {
  RecoveryManager,
};
