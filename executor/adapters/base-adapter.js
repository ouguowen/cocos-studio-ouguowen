"use strict";

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

class BaseAdapter {
  constructor(options = {}) {
    assertNonEmptyString(options.id, "Adapter id");
    if (!new Set(["mock", "real"]).has(options.mode)) {
      throw new Error(`Adapter ${options.id} mode must be mock or real.`);
    }
    if (!Array.isArray(options.supportedTools) || options.supportedTools.length === 0) {
      throw new Error(`Adapter ${options.id} must declare supported Tools.`);
    }

    this.id = options.id;
    this.mode = options.mode;
    this.supported_tools = [...options.supportedTools];
    this.execution_enabled = options.executionEnabled === true;
    this.last_result = null;
  }

  matches(toolId) {
    return this.supported_tools.includes("*") || this.supported_tools.includes(toolId);
  }

  validate(binding) {
    if (!binding || typeof binding !== "object" || Array.isArray(binding)) {
      throw new Error(`Adapter ${this.id} binding must be an object.`);
    }
    for (const field of ["task_id", "agent", "tool", "capability"]) {
      assertNonEmptyString(binding[field], `Adapter ${this.id} ${field}`);
    }
    if (!this.matches(binding.tool)) {
      throw new Error(`Adapter ${this.id} does not support Tool: ${binding.tool}`);
    }
    return true;
  }

  execute(binding) {
    this.validate(binding);
    if (this.mode === "real" && this.execution_enabled !== true) {
      const error = new Error(`Adapter ${this.id} execution is disabled.`);
      error.code = "ADAPTER_EXECUTION_DISABLED";
      throw error;
    }

    const adapterResult = this.perform(binding);
    if (!adapterResult || typeof adapterResult !== "object" || Array.isArray(adapterResult)) {
      throw new Error(`Adapter ${this.id} returned an invalid result.`);
    }
    this.last_result = adapterResult;
    return adapterResult;
  }

  perform() {
    throw new Error(`Adapter ${this.id} does not implement execution.`);
  }

  result() {
    return this.last_result;
  }
}

class AdapterRegistry {
  constructor() {
    this.adapters = new Map();
  }

  register(adapter) {
    if (!(adapter instanceof BaseAdapter)) {
      throw new Error("Adapter Registry only accepts BaseAdapter instances.");
    }
    if (this.adapters.has(adapter.id)) {
      throw new Error(`Adapter Registry contains duplicate id: ${adapter.id}`);
    }
    this.adapters.set(adapter.id, adapter);
    return adapter;
  }

  match(toolId, mode) {
    assertNonEmptyString(toolId, "Adapter match Tool");
    if (!new Set(["mock", "real"]).has(mode)) {
      throw new Error("Adapter match mode must be mock or real.");
    }

    const candidates = [...this.adapters.values()].filter((adapter) => adapter.mode === mode);
    const adapter = candidates.find((candidate) => candidate.supported_tools.includes(toolId))
      || candidates.find((candidate) => candidate.supported_tools.includes("*"));
    if (!adapter) {
      throw new Error(`No ${mode} Adapter registered for Tool: ${toolId}`);
    }
    return adapter;
  }

  list() {
    return [...this.adapters.values()];
  }
}

module.exports = {
  AdapterRegistry,
  BaseAdapter,
};
