"use strict";

const { BaseAdapter } = require("./adapters/base-adapter");

class MockExecutionAdapter extends BaseAdapter {
  constructor(options = {}) {
    super({
      id: options.id || "mock-adapter",
      mode: "mock",
      supportedTools: ["*"],
      executionEnabled: false,
    });
    this.failTaskIds = new Set(options.failTaskIds || []);
    this.clock = options.clock || (() => new Date().toISOString());

    if (typeof this.clock !== "function") {
      throw new Error("Mock execution clock must be a function.");
    }
  }

  perform(binding) {
    const timestamp = this.clock();
    if (typeof timestamp !== "string" || timestamp.trim().length === 0) {
      throw new Error("Mock execution timestamp must be a non-empty string.");
    }

    if (this.failTaskIds.has(binding.task_id)) {
      return {
        status: "failed",
        output: `Mock execution failed for task ${binding.task_id} by test configuration.`,
        timestamp,
      };
    }

    return {
      status: "success",
      output: `Mock execution completed for ${binding.task_id} with ${binding.tool}.`,
      timestamp,
    };
  }
}

module.exports = {
  MockExecutionAdapter,
};
