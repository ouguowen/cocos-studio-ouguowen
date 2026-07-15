#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const defaultReportPath = path.join(generatedDir, "integration-report.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
}

class BaseIntegration {
  constructor(options = {}) {
    assertNonEmptyString(options.id, "Integration id");
    assertNonEmptyString(options.type, `Integration ${options.id} type`);
    if (!Array.isArray(options.operations) || options.operations.length === 0) {
      throw new Error(`Integration ${options.id} must declare operations.`);
    }
    for (const operation of options.operations) {
      assertNonEmptyString(operation, `Integration ${options.id} operation`);
    }
    this.id = options.id;
    this.type = options.type;
    this.operations = [...options.operations];
    this.runtime_mode = options.runtimeMode || "mock";
    if (!new Set(["mock", "production"]).has(this.runtime_mode)) {
      throw new Error(`Integration ${this.id} runtime_mode must be mock or production.`);
    }
    this.execution_enabled = options.executionEnabled === true;
    this.events = [];
    this.last_result = null;
  }

  validateOperation(operation, request) {
    assertNonEmptyString(operation, `Integration ${this.id} operation`);
    if (!this.operations.includes(operation)) {
      throw new Error(`Integration ${this.id} does not support operation: ${operation}`);
    }
    assertObject(request, `Integration ${this.id} request`);
    return true;
  }

  execute(operation, request) {
    this.validateOperation(operation, request);
    if (this.runtime_mode === "mock") {
      const result = {
        integration: this.id,
        integration_type: this.type,
        operation,
        runtime_mode: "mock",
        status: "simulated",
        input: clone(request),
        execution_enabled: false,
      };
      this.events.push(clone(result));
      this.last_result = result;
      return result;
    }
    if (this.execution_enabled !== true) {
      const error = new Error(`Integration ${this.id} execution is disabled.`);
      error.code = "INTEGRATION_EXECUTION_DISABLED";
      throw error;
    }
    const result = this.perform(operation, request);
    if (!result || typeof result !== "object" || Array.isArray(result)) {
      throw new Error(`Integration ${this.id} returned an invalid result.`);
    }
    this.last_result = result;
    return result;
  }

  perform() {
    throw new Error(`Integration ${this.id} has no production implementation.`);
  }

  result() {
    return this.last_result;
  }
}

class IntegrationManager {
  constructor(options = {}) {
    this.runtime_mode = options.runtimeMode || "mock";
    if (!new Set(["mock", "production"]).has(this.runtime_mode)) {
      throw new Error("Integration Manager runtime_mode must be mock or production.");
    }
    this.execution_enabled = false;
    this.integrations = new Map();
    this.events = [];
  }

  register(integration) {
    if (!(integration instanceof BaseIntegration)) {
      throw new Error("Integration Manager only accepts BaseIntegration instances.");
    }
    if (integration.runtime_mode !== this.runtime_mode) {
      throw new Error(`Integration ${integration.id} runtime_mode does not match its Manager.`);
    }
    if (this.integrations.has(integration.id)) {
      throw new Error(`Integration Manager contains duplicate id: ${integration.id}`);
    }
    this.integrations.set(integration.id, integration);
    return integration;
  }

  get(integrationId) {
    assertNonEmptyString(integrationId, "Integration Manager integration id");
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error(`Integration Manager contains no integration: ${integrationId}`);
    }
    return integration;
  }

  execute(integrationId, operation, request) {
    const result = this.get(integrationId).execute(operation, request);
    this.events.push(clone(result));
    return result;
  }

  list() {
    return [...this.integrations.values()];
  }

  result() {
    return clone(this.events);
  }
}

function createDefaultIntegrationManager(options = {}) {
  const { CocosIntegration } = require("./cocos-integration");
  const { AssetIntegration } = require("./asset-integration");
  const { CodeIntegration } = require("./code-integration");
  const { GitIntegration } = require("./git-integration");
  const runtimeMode = options.runtimeMode || "mock";
  const manager = new IntegrationManager({ runtimeMode });
  manager.register(new CocosIntegration({ runtimeMode }));
  manager.register(new AssetIntegration({ runtimeMode }));
  manager.register(new CodeIntegration({ runtimeMode }));
  manager.register(new GitIntegration({ runtimeMode }));
  return manager;
}

function validateIntegrationReport(report) {
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    throw new Error("Integration Report must be an object.");
  }
  const required = [
    "runtime_mode",
    "status",
    "registered_integrations",
    "mock_operations",
    "production_gate",
    "execution_enabled",
  ];
  for (const field of required) {
    if (!Object.prototype.hasOwnProperty.call(report, field)) {
      throw new Error(`Integration Report is missing field: ${field}`);
    }
  }
  if (report.runtime_mode !== "mock" || report.status !== "ready" || report.execution_enabled !== false) {
    throw new Error("Integration Report must describe a ready, disabled mock integration layer.");
  }
  if (!Array.isArray(report.registered_integrations) || report.registered_integrations.length !== 4) {
    throw new Error("Integration Report must contain four registered integrations.");
  }
  if (report.registered_integrations.some((integration) => integration.execution_enabled !== false)) {
    throw new Error("Integration Report contains an enabled integration.");
  }
  if (!Array.isArray(report.mock_operations) || report.mock_operations.length !== 4
    || report.mock_operations.some((result) => result.status !== "simulated"
      || result.runtime_mode !== "mock" || result.execution_enabled !== false)) {
    throw new Error("Integration Report mock_operations are invalid.");
  }
  if (report.production_gate.status !== "blocked"
    || report.production_gate.error_code !== "INTEGRATION_EXECUTION_DISABLED"
    || report.production_gate.execution_enabled !== false) {
    throw new Error("Integration Report production_gate must remain blocked.");
  }
  return true;
}

function createIntegrationReport() {
  const mockManager = createDefaultIntegrationManager({ runtimeMode: "mock" });
  const mockOperations = [
    mockManager.execute("cocos-integration", "createProject", { project_name: "integration-probe" }),
    mockManager.execute("asset-integration", "createAsset", {
      asset_id: "asset-probe",
      image_provider: "provider-registry-selection",
    }),
    mockManager.execute("code-integration", "createFile", {
      path: "virtual/probe.ts",
      content: "",
    }),
    mockManager.execute("git-integration", "commit", { message: "mock integration probe" }),
  ];
  const productionManager = createDefaultIntegrationManager({ runtimeMode: "production" });
  let productionGate;
  try {
    productionManager.execute("cocos-integration", "createProject", { project_name: "blocked-probe" });
    throw new Error("Production Integration unexpectedly executed.");
  } catch (error) {
    if (error.code !== "INTEGRATION_EXECUTION_DISABLED") {
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
    registered_integrations: mockManager.list().map((integration) => ({
      id: integration.id,
      type: integration.type,
      operations: [...integration.operations],
      execution_enabled: integration.execution_enabled,
    })),
    mock_operations: mockOperations,
    production_gate: productionGate,
    execution_enabled: false,
  };
  validateIntegrationReport(report);
  return report;
}

function writeIntegrationReport(report, reportPath = defaultReportPath) {
  validateIntegrationReport(report);
  const resolvedPath = path.resolve(reportPath);
  const relative = path.relative(generatedDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Integration Report must stay inside ${generatedDir}.`);
  }
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

module.exports = {
  BaseIntegration,
  IntegrationManager,
  createDefaultIntegrationManager,
  createIntegrationReport,
  validateIntegrationReport,
  writeIntegrationReport,
};
