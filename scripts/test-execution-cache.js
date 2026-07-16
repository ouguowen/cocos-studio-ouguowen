#!/usr/bin/env node

"use strict";

const assert = require("assert");

const {
  createEmptyExecutionCache,
  lookupExecutionCache,
  updateExecutionCache,
  validateExecutionCacheStore,
} = require("../execution-cache/execution-cache");
const { createTaskFingerprint } = require("../execution-cache/task-fingerprint");
const { createRouteScore, updateRouteScore } = require("../execution-cache/route-score");
const { routeTask } = require("../task-router/task-router");

function runTests() {
  const fingerprint = createTaskFingerprint("修改塔防按钮颜色");
  assert.strictEqual(fingerprint, "ui.modify.button.cocos");

  const emptyCache = createEmptyExecutionCache();
  assert.strictEqual(validateExecutionCacheStore(emptyCache), true);

  const miss = lookupExecutionCache("修改塔防按钮颜色", emptyCache);
  assert.strictEqual(miss.status, "miss");
  assert.strictEqual(miss.hit, false);
  assert.strictEqual(miss.fingerprint, "ui.modify.button.cocos");

  const updated = updateExecutionCache("修改塔防按钮颜色", {
    route_type: "fast_path",
    execution_mode: {
      mode: "fast",
      agents: ["artist", "cocos-programmer"],
    },
  }, {
    status: "success",
    execution_time: 12,
    timestamp: "2026-01-01T00:00:00.000Z",
  }, emptyCache);
  assert.strictEqual(validateExecutionCacheStore(updated.store), true);
  assert.strictEqual(updated.entry.route_score.success, 1);
  assert.strictEqual(updated.entry.route_score.fail, 0);
  assert.strictEqual(updated.entry.route_score.execution_time, 12);

  const hit = lookupExecutionCache("修改塔防按钮颜色", updated.store);
  assert.strictEqual(hit.status, "hit");
  assert.strictEqual(hit.hit, true);
  assert.strictEqual(hit.execution_mode.mode, "fast");
  assert.deepStrictEqual(hit.execution_mode.agents, ["artist", "cocos-programmer"]);

  const route = routeTask("修改塔防按钮颜色", {
    executionCacheStore: updated.store,
  });
  assert.strictEqual(route.route_type, "fast_path");
  assert.strictEqual(route.execution_path, "fast");
  assert.strictEqual(route.execution_cache.status, "hit");
  assert.strictEqual(route.execution_mode.mode, "fast");
  assert.deepStrictEqual(route.execution_mode.agents, ["artist", "cocos-programmer"]);
  assert.deepStrictEqual(route.adaptive_reasons, ["execution-cache-fast-path-hit"]);

  const cacheMissRoute = routeTask("新增战斗系统", {
    executionCacheStore: updated.store,
  });
  assert.strictEqual(cacheMissRoute.execution_cache.status, "miss");
  assert.notStrictEqual(cacheMissRoute.adaptive_reasons[0], "execution-cache-fast-path-hit");

  const baseScore = createRouteScore();
  const successScore = updateRouteScore(baseScore, {
    status: "success",
    execution_time: 8,
  });
  const failScore = updateRouteScore(successScore, {
    status: "failed",
    execution_time: 5,
  });
  assert.strictEqual(failScore.success, 1);
  assert.strictEqual(failScore.fail, 1);
  assert.strictEqual(failScore.execution_time, 13);
  assert.strictEqual(failScore.attempts, 2);

  console.log(JSON.stringify({
    test: "execution-cache",
    fingerprint,
    cache_miss: miss.status,
    cache_hit: hit.status,
    cached_mode: route.execution_mode,
    miss_keeps_router_flow: cacheMissRoute.execution_cache.status,
    route_score: failScore,
    execution_enabled: false,
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
