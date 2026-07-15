#!/usr/bin/env node

const assert = require("assert/strict");

const {
  createResult,
  loadCapabilities,
  matchCapability,
} = require("./capability-loader");

const capabilities = loadCapabilities();
const allowQueries = ["塔防", "防守游戏", "tower defense"];

for (const query of allowQueries) {
  const capability = matchCapability(query, capabilities);
  assert.equal(capability?.id, "tower-defense", `${query} should match tower-defense`);

  const result = createResult(query, capability);
  assert.equal(result.matched, true);
  assert.ok(result.capability.required_agents.length > 0);
  assert.ok(result.capability.context_files.length > 0);
  assert.ok(Array.isArray(result.capability.dependencies));
}

assert.equal(matchCapability("card game", capabilities), null);

console.log("Capability loader prototype tests passed: 3 allow paths, 1 no-match path.");
