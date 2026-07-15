#!/usr/bin/env node

"use strict";

const assert = require("assert");

const {
  loadProviderRegistry,
  rankProviders,
  selectExecutableProvider,
  selectProvider,
} = require("../providers/provider-selector");

function runTests() {
  const registry = loadProviderRegistry();
  assert.strictEqual(registry.providers.length, 4, "Provider Registry should load four Providers.");
  assert.ok(registry.byId.has("comfyui"), "ComfyUI Provider should load.");
  assert.ok(registry.byId.has("gpt-image"), "GPT Image Provider should load.");
  assert.ok(registry.byId.has("qwen-image"), "Qwen Image Provider should load.");
  assert.ok(registry.byId.has("cocos"), "Cocos Provider should load.");
  assert.ok(
    registry.providers.every((provider) => provider.execution_enabled === false),
    "Every Provider should keep execution disabled.",
  );

  const imageProviders = rankProviders("image-generation", { type: "image" }, registry);
  assert.strictEqual(imageProviders.length, 3, "Three Providers should match image-generation.");
  assert.ok(
    imageProviders.every(({ provider }) => provider.capabilities.includes("image-generation")),
    "Capability matching should only return supporting Providers.",
  );

  const fastestDefault = selectProvider("image-generation", { type: "image" }, registry);
  assert.strictEqual(fastestDefault.id, "qwen-image", "Default weighted sort should select Qwen Image.");

  const highestQuality = selectProvider("image-generation", {
    type: "image",
    weights: {
      priority: 1,
      speed: 1,
      quality: 5,
    },
  }, registry);
  assert.strictEqual(highestQuality.id, "gpt-image", "Quality-weighted sort should select GPT Image.");

  const engineProvider = selectProvider("system-implementation-plan", { type: "engine" }, registry);
  assert.strictEqual(engineProvider.id, "cocos", "Engine capability should select Cocos Provider.");
  assert.strictEqual(engineProvider.adapter, "cocos-adapter", "Provider should declare its Adapter.");

  assert.throws(
    () => selectExecutableProvider("image-generation", {}, registry),
    (error) => error.code === "PROVIDER_EXECUTION_DISABLED",
    "Disabled Provider execution should be blocked.",
  );
  assert.throws(
    () => selectProvider("audio-generation", {}, registry),
    /No Provider matches capability/,
    "Unknown capabilities should not produce a Provider.",
  );

  console.log(JSON.stringify({
    test: "provider-registry",
    provider_loading: true,
    capability_matching: true,
    selector_sorting: true,
    disabled_provider_blocked: true,
    provider_count: registry.providers.length,
    external_calls: false,
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
