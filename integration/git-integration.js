#!/usr/bin/env node

"use strict";

const { BaseIntegration } = require("./integration-manager");

class GitIntegration extends BaseIntegration {
  constructor(options = {}) {
    super({
      id: "git-integration",
      type: "version-control",
      operations: ["commit", "rollback"],
      runtimeMode: options.runtimeMode || "mock",
      executionEnabled: false,
    });
  }

  validateOperation(operation, request) {
    super.validateOperation(operation, request);
    const field = operation === "commit" ? "message" : "reference";
    if (typeof request[field] !== "string" || request[field].trim().length === 0) {
      throw new Error(`Git Integration ${operation} requires ${field}.`);
    }
    return true;
  }

  commit(request) {
    return this.execute("commit", request);
  }

  rollback(request) {
    return this.execute("rollback", request);
  }

  perform() {
    throw new Error("Git Integration is interface-only and cannot run version-control commands.");
  }
}

module.exports = {
  GitIntegration,
};
