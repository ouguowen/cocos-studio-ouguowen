#!/usr/bin/env node

"use strict";

const { AdapterRegistry } = require("../executor/adapters/base-adapter");
const { CocosAdapter } = require("../executor/adapters/cocos-adapter");
const { CodeAdapter } = require("../executor/adapters/code-adapter");
const { ProviderAdapter } = require("../executor/adapters/provider-adapter");
const { AssetRuntime } = require("../runtime/asset-runtime");
const { CocosRuntime } = require("../runtime/cocos-runtime");
const { CodeRuntime } = require("../runtime/code-runtime");
const { GitRuntime } = require("../runtime/git-runtime");
const { RuntimeManager } = require("../runtime/runtime-manager");
const {
  loadProviderRegistry,
  selectProvider,
} = require("../providers/provider-selector");
const {
  assertExecutionPolicy,
  loadExecutionPolicy,
} = require("./execution-policy");
const {
  createBlockedExecutionResult,
  createExecutionResult,
  validateExecutionRequest,
} = require("./execution-result");

function createRoutingAdapterRegistry() {
  const registry = new AdapterRegistry();
  registry.register(new CocosAdapter());
  registry.register(new ProviderAdapter());
  registry.register(new CodeAdapter());
  return registry;
}

function createRoutingRuntimeManager() {
  const manager = new RuntimeManager({ runtimeMode: "mock" });
  manager.register(new CocosRuntime());
  manager.register(new AssetRuntime());
  manager.register(new CodeRuntime());
  manager.register(new GitRuntime());
  return manager;
}

class ExecutionRouter {
  constructor(options = {}) {
    if (!options.fileOperation || typeof options.fileOperation.create !== "function") {
      throw new Error("Execution Router requires File Operation.");
    }
    if (!options.rollbackManager || typeof options.rollbackManager.rollback !== "function") {
      throw new Error("Execution Router requires Rollback Manager.");
    }
    this.fileOperation = options.fileOperation;
    this.rollbackManager = options.rollbackManager;
    this.policy = options.policy || loadExecutionPolicy();
    this.providerRegistry = options.providerRegistry || loadProviderRegistry();
    this.adapterRegistry = options.adapterRegistry || createRoutingAdapterRegistry();
    this.runtimeManager = options.runtimeManager || createRoutingRuntimeManager();
  }

  resolveRoute(request) {
    validateExecutionRequest(request);
    const provider = selectProvider(
      request.capability,
      request.provider_requirements,
      this.providerRegistry,
    );
    const registeredAdapters = this.adapterRegistry.list();
    const declaredAdapter = registeredAdapters.find((candidate) => candidate.id === provider.adapter);
    const adapter = declaredAdapter
      || (provider.type === "image"
        ? registeredAdapters.find((candidate) => candidate.id === "provider-adapter")
        : null);
    if (!adapter) {
      throw new Error(`No Adapter registered for Provider ${provider.id}: ${provider.adapter}`);
    }
    const binding = {
      task_id: request.task_id,
      agent: request.agent,
      tool: request.tool,
      capability: request.capability,
    };
    adapter.validate(binding);
    const runtimeEventCount = this.runtimeManager.result().length;
    const runtime = this.runtimeManager.match(request.capability);
    runtime.validate(binding);
    if (this.runtimeManager.result().length !== runtimeEventCount) {
      throw new Error("Runtime routing must not execute Runtime or Integration events.");
    }
    return {
      capability: request.capability,
      provider: provider.id,
      adapter: adapter.id,
      provider_adapter_contract: provider.adapter,
      runtime: runtime.id,
      tool: request.tool,
      provider_execution: false,
      adapter_execution: false,
      runtime_execution: false,
      integration_execution: false,
    };
  }

  dispatch(request) {
    if (request.operation === "create") {
      return this.fileOperation.create(request.workspace_path, request.content, { mode: request.mode });
    }
    if (request.operation === "update") {
      return this.fileOperation.update(request.workspace_path, request.content, { mode: request.mode });
    }
    if (request.operation === "delete") {
      return this.fileOperation.delete(request.workspace_path, { mode: request.mode });
    }
    if (request.operation === "diff") {
      return {
        transaction_id: null,
        status: request.mode === "preview" ? "previewed" : "validated",
        diff: this.fileOperation.diff(request.workspace_path, request.content),
      };
    }
    if (request.operation === "rollback") {
      const outcome = this.rollbackManager.rollback(request.transaction_id, { mode: request.mode });
      return {
        transaction_id: outcome.rollback.transaction_id,
        status: request.mode === "commit" ? "rolled-back" : outcome.rollback.status,
        diff: outcome.rollback.diff,
      };
    }
    throw new Error(`Unsupported execution operation: ${request.operation}`);
  }

  execute(request) {
    validateExecutionRequest(request);
    let route = null;
    try {
      assertExecutionPolicy(request, this.policy);
      route = this.resolveRoute(request);
      const outcome = this.dispatch(request);
      return createExecutionResult(request, route, {
        status: outcome.status,
        transaction_id: outcome.transaction_id,
        diff: outcome.diff,
      });
    } catch (error) {
      if (new Set(["EXECUTION_CONTRACT_DISABLED", "EXECUTION_PERMISSION_DENIED"]).has(error.code)) {
        return createBlockedExecutionResult(request, error, route);
      }
      throw error;
    }
  }
}

module.exports = {
  ExecutionRouter,
  createRoutingAdapterRegistry,
  createRoutingRuntimeManager,
};
