#!/usr/bin/env node

"use strict";

const assert = require("assert");

const { AdapterRegistry } = require("../executor/adapters/base-adapter");
const { CocosAdapter } = require("../executor/adapters/cocos-adapter");
const { ComfyUIAdapter } = require("../executor/adapters/comfyui-adapter");
const { CodeAdapter } = require("../executor/adapters/code-adapter");
const { MockExecutionAdapter } = require("../executor/execution-adapter");
const {
  createDefaultAdapterRegistry,
  runAgentExecutor,
} = require("../executor/agent-executor");

const binding = {
  task_id: "system-implementation-plan",
  agent: "cocos-programmer",
  tool: "blueprint-system-planner",
  capability: "system-implementation-plan",
};
const fixedTimestamp = "2026-01-01T00:00:00.000Z";

function runTests() {
  const registry = new AdapterRegistry();
  const mockAdapter = registry.register(new MockExecutionAdapter({
    clock: () => fixedTimestamp,
  }));
  const cocosAdapter = registry.register(new CocosAdapter());
  const comfyUIAdapter = registry.register(new ComfyUIAdapter());
  const codeAdapter = registry.register(new CodeAdapter());

  assert.strictEqual(registry.list().length, 4, "Four adapters should register.");
  assert.throws(
    () => registry.register(new CocosAdapter()),
    /duplicate id/,
    "Duplicate adapter registration should be blocked.",
  );

  assert.strictEqual(registry.match(binding.tool, "mock"), mockAdapter, "Mock Adapter should match any Tool.");
  assert.strictEqual(registry.match(binding.tool, "real"), cocosAdapter, "Cocos Tool should match Cocos Adapter.");
  assert.strictEqual(
    registry.match("asset-requirement-catalog", "real"),
    comfyUIAdapter,
    "Asset Tool should match ComfyUI Adapter.",
  );
  assert.strictEqual(
    registry.match("validation-checklist-builder", "real"),
    codeAdapter,
    "Validation Tool should match Code Adapter.",
  );

  for (const adapter of registry.list()) {
    assert.strictEqual(typeof adapter.validate, "function", `${adapter.id} should expose validate().`);
    assert.strictEqual(typeof adapter.execute, "function", `${adapter.id} should expose execute().`);
    assert.strictEqual(typeof adapter.result, "function", `${adapter.id} should expose result().`);
    assert.strictEqual(adapter.execution_enabled, false, `${adapter.id} should default to disabled execution.`);
  }

  assert.strictEqual(mockAdapter.validate(binding), true, "Mock binding should validate.");
  const mockResult = mockAdapter.execute(binding);
  assert.strictEqual(mockResult.status, "success", "Mock execution should succeed.");
  assert.strictEqual(mockAdapter.result(), mockResult, "result() should return the latest Adapter result.");

  let realImplementationReached = false;
  cocosAdapter.perform = () => {
    realImplementationReached = true;
    throw new Error("Real implementation must not be reached.");
  };
  assert.throws(
    () => cocosAdapter.execute(binding),
    (error) => error.code === "ADAPTER_EXECUTION_DISABLED",
    "Disabled real Adapter execution should be blocked.",
  );
  assert.strictEqual(realImplementationReached, false, "Disabled execution must stop before implementation code.");

  const defaultRegistry = createDefaultAdapterRegistry({
    mockAdapterOptions: { clock: () => fixedTimestamp },
  });
  const mockRun = runAgentExecutor({ adapterRegistry: defaultRegistry, write: false });
  assert.strictEqual(mockRun.executionResults.mode, "mock", "Executor should default to mock mode.");
  assert.ok(
    mockRun.executionResults.results.every((result) => result.status === "success" && result.mode === "mock"),
    "Default Executor should complete only mock results.",
  );

  assert.throws(
    () => runAgentExecutor({ mode: "real", write: false }),
    (error) => error.code === "ADAPTER_EXECUTION_DISABLED",
    "Executor real mode should route to a real Adapter and block disabled execution.",
  );

  console.log(JSON.stringify({
    test: "adapter-system",
    adapter_registration: true,
    adapter_matching: true,
    mock_execution: true,
    disabled_execution_blocked: true,
    default_mode: "mock",
    real_tools_called: false,
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
