#!/usr/bin/env node

"use strict";

const { BaseIntegration } = require("./integration-manager");

class CodeIntegration extends BaseIntegration {
  constructor(options = {}) {
    super({
      id: "code-integration",
      type: "code-provider",
      operations: ["createFile", "updateFile"],
      runtimeMode: options.runtimeMode || "mock",
      executionEnabled: false,
    });
  }

  validateOperation(operation, request) {
    super.validateOperation(operation, request);
    if (typeof request.path !== "string" || request.path.trim().length === 0
      || typeof request.content !== "string") {
      throw new Error(`Code Integration ${operation} requires path and string content.`);
    }
    return true;
  }

  createFile(request) {
    return this.execute("createFile", request);
  }

  updateFile(request) {
    return this.execute("updateFile", request);
  }

  perform() {
    throw new Error("Code Integration is interface-only and cannot modify files.");
  }
}

module.exports = {
  CodeIntegration,
};
