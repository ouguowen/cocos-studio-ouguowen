#!/usr/bin/env node

"use strict";

function createRouteScore(input = {}) {
  const success = Number.isInteger(input.success) ? input.success : 0;
  const fail = Number.isInteger(input.fail) ? input.fail : 0;
  const executionTime = Number.isFinite(input.execution_time) ? input.execution_time : 0;
  if (success < 0 || fail < 0 || executionTime < 0) {
    throw new Error("Route score values must be non-negative.");
  }
  const attempts = success + fail;
  return {
    success,
    fail,
    execution_time: executionTime,
    attempts,
    success_rate: attempts === 0 ? 0 : success / attempts,
    average_execution_time: attempts === 0 ? 0 : executionTime / attempts,
  };
}

function updateRouteScore(score, result) {
  const current = createRouteScore(score);
  const status = result.status || "success";
  const duration = Number.isFinite(result.execution_time) ? result.execution_time : 0;
  return createRouteScore({
    success: current.success + (status === "success" ? 1 : 0),
    fail: current.fail + (status === "success" ? 0 : 1),
    execution_time: current.execution_time + duration,
  });
}

module.exports = {
  createRouteScore,
  updateRouteScore,
};
