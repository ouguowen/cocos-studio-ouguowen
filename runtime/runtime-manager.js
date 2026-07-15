#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const defaultReportPath = path.join(generatedDir, "runtime-report.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a non-empty array.`);
  }
  for (const item of value) {
    assertNonEmptyString(item, `${label} item`);
  }
  if (new Set(value).size !== value.length) {
    throw new Error(`${label} must not contain duplicates.`);
  }
}

class BaseRuntime {
  constructor(options = {}) {
    assertNonEmptyString(options.id, "Runtime id");
    assertNonEmptyString(options.type, `Runtime ${options.id} type`);
    assertNonEmptyString(options.integrationId, `Runtime ${options.id} integration_id`);
    assertStringArray(options.supportedCapabilities, `Runtime ${options.id} supported_capabilities`);
    this.id = options.id;
    this.type = options.type;
    this.integration_id = options.integrationId;
    this.supported_capabilities = [...options.supportedCapabilities];
    this.execution_enabled = options.executionEnabled === true;
    this.integration_manager = null;
    this.last_result = null;
  }

  matches(capability) {
    return this.supported_capabilities.includes(capability);
  }

  validate(request) {
    if (!request || typeof request !== "object" || Array.isArray(request)) {
      throw new Error(`Runtime ${this.id} request must be an object.`);
    }
    for (const field of ["task_id", "agent", "capability"]) {
      assertNonEmptyString(request[field], `Runtime ${this.id} ${field}`);
    }
    if (!this.matches(request.capability)) {
      throw new Error(`Runtime ${this.id} does not support capability: ${request.capability}`);
    }
    return true;
  }

  execute(request) {
    this.validate(request);
    if (this.execution_enabled !== true) {
      const error = new Error(`Runtime ${this.id} execution is disabled.`);
      error.code = "RUNTIME_EXECUTION_DISABLED";
      throw error;
    }
    const result = this.perform(request);
    if (!result || typeof result !== "object" || Array.isArray(result)) {
      throw new Error(`Runtime ${this.id} returned an invalid result.`);
    }
    this.last_result = result;
    return result;
  }

  attachIntegrationManager(integrationManager) {
    if (!integrationManager || typeof integrationManager.get !== "function"
      || typeof integrationManager.execute !== "function") {
      throw new Error(`Runtime ${this.id} requires an Integration Manager.`);
    }
    integrationManager.get(this.integration_id);
    this.integration_manager = integrationManager;
    return this;
  }

  invokeIntegration(operation, request) {
    if (!this.integration_manager) {
      throw new Error(`Runtime ${this.id} has no Integration Manager.`);
    }
    return this.integration_manager.execute(this.integration_id, operation, request);
  }

  perform() {
    throw new Error(`Runtime ${this.id} has no production implementation.`);
  }

  routeIntegration() {
    throw new Error(`Runtime ${this.id} has no Integration route.`);
  }

  result() {
    return this.last_result;
  }
}

class RuntimeManager {
  constructor(options = {}) {
    this.runtime_mode = options.runtimeMode || "mock";
    if (!new Set(["mock", "production"]).has(this.runtime_mode)) {
      throw new Error("Runtime Manager mode must be mock or production.");
    }
    this.execution_enabled = false;
    this.integration_manager = options.integrationManager || null;
    if (this.integration_manager && this.integration_manager.runtime_mode !== this.runtime_mode) {
      throw new Error("Runtime Manager and Integration Manager modes must match.");
    }
    this.runtimes = new Map();
    this.events = [];
  }

  register(runtime) {
    if (!(runtime instanceof BaseRuntime)) {
      throw new Error("Runtime Manager only accepts BaseRuntime instances.");
    }
    if (this.runtimes.has(runtime.id)) {
      throw new Error(`Runtime Manager contains duplicate id: ${runtime.id}`);
    }
    if (this.integration_manager) {
      runtime.attachIntegrationManager(this.integration_manager);
    }
    this.runtimes.set(runtime.id, runtime);
    return runtime;
  }

  match(capability) {
    assertNonEmptyString(capability, "Runtime Manager capability");
    const runtime = [...this.runtimes.values()].find((candidate) => candidate.matches(capability));
    if (!runtime) {
      throw new Error(`No Runtime registered for capability: ${capability}`);
    }
    return runtime;
  }

  execute(request) {
    const runtime = this.match(request.capability);
    runtime.validate(request);
    if (this.runtime_mode === "mock") {
      const integrationResult = runtime.routeIntegration(request);
      const result = {
        runtime: runtime.id,
        runtime_type: runtime.type,
        runtime_mode: "mock",
        task_id: request.task_id,
        capability: request.capability,
        status: "simulated",
        integration: {
          id: integrationResult.integration,
          operation: integrationResult.operation,
          status: integrationResult.status,
        },
        execution_enabled: false,
      };
      this.events.push(clone(result));
      return result;
    }
    return runtime.execute(request);
  }

  list() {
    return [...this.runtimes.values()];
  }

  result() {
    return clone(this.events);
  }
}

function createDefaultRuntimeManager(options = {}) {
  const { CocosRuntime } = require("./cocos-runtime");
  const { AssetRuntime } = require("./asset-runtime");
  const { CodeRuntime } = require("./code-runtime");
  const { GitRuntime } = require("./git-runtime");
  const { createDefaultIntegrationManager } = require("../integration/integration-manager");
  const runtimeMode = options.runtimeMode || "mock";
  const integrationManager = options.integrationManager
    || createDefaultIntegrationManager({ runtimeMode });
  const manager = new RuntimeManager({
    ...options,
    runtimeMode,
    integrationManager,
  });
  manager.register(new CocosRuntime());
  manager.register(new AssetRuntime());
  manager.register(new CodeRuntime());
  manager.register(new GitRuntime());
  return manager;
}

function validateRuntimeReport(report) {
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    throw new Error("Runtime Report must be an object.");
  }
  const required = [
    "runtime_mode",
    "status",
    "registered_runtimes",
    "mock_probe",
    "production_gate",
    "execution_enabled",
  ];
  for (const field of required) {
    if (!Object.prototype.hasOwnProperty.call(report, field)) {
      throw new Error(`Runtime Report is missing field: ${field}`);
    }
  }
  if (report.runtime_mode !== "mock" || report.status !== "ready" || report.execution_enabled !== false) {
    throw new Error("Runtime Report must describe a ready, disabled mock runtime.");
  }
  if (!Array.isArray(report.registered_runtimes) || report.registered_runtimes.length === 0) {
    throw new Error("Runtime Report must contain registered_runtimes.");
  }
  for (const runtime of report.registered_runtimes) {
    if (runtime.execution_enabled !== false || !Array.isArray(runtime.supported_capabilities)) {
      throw new Error(`Runtime Report contains an unsafe Runtime: ${runtime.id || "unknown"}`);
    }
  }
  if (report.mock_probe.status !== "simulated" || report.mock_probe.runtime_mode !== "mock"
    || report.mock_probe.execution_enabled !== false
    || !report.mock_probe.integration
    || report.mock_probe.integration.status !== "simulated") {
    throw new Error("Runtime Report mock_probe is invalid.");
  }
  if (report.production_gate.status !== "blocked"
    || report.production_gate.error_code !== "RUNTIME_EXECUTION_DISABLED"
    || report.production_gate.execution_enabled !== false) {
    throw new Error("Runtime Report production_gate must remain blocked.");
  }
  return true;
}

function createRuntimeReport(probeRequest) {
  const mockManager = createDefaultRuntimeManager({ runtimeMode: "mock" });
  const mockProbe = mockManager.execute(probeRequest);
  const productionManager = createDefaultRuntimeManager({ runtimeMode: "production" });
  let productionGate;
  try {
    productionManager.execute(probeRequest);
    throw new Error("Production Runtime unexpectedly executed.");
  } catch (error) {
    if (error.code !== "RUNTIME_EXECUTION_DISABLED") {
      throw error;
    }
    productionGate = {
      status: "blocked",
      runtime_mode: "production",
      error_code: error.code,
      message: error.message,
      execution_enabled: false,
    };
  }
  const report = {
    runtime_mode: "mock",
    status: "ready",
    registered_runtimes: mockManager.list().map((runtime) => ({
      id: runtime.id,
      type: runtime.type,
      integration_id: runtime.integration_id,
      supported_capabilities: [...runtime.supported_capabilities],
      execution_enabled: runtime.execution_enabled,
    })),
    mock_probe: mockProbe,
    production_gate: productionGate,
    execution_enabled: false,
  };
  validateRuntimeReport(report);
  return report;
}

function writeRuntimeReport(report, reportPath = defaultReportPath) {
  validateRuntimeReport(report);
  const resolvedPath = path.resolve(reportPath);
  const relative = path.relative(generatedDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Runtime Report must stay inside ${generatedDir}.`);
  }
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

module.exports = {
  BaseRuntime,
  RuntimeManager,
  createDefaultRuntimeManager,
  createRuntimeReport,
  validateRuntimeReport,
  writeRuntimeReport,
};
