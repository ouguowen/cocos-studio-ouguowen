#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "execution-schema.json");
const executionSchema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function validateExecutionRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new Error("Execution Request must be an object.");
  }
  const definition = executionSchema.$defs.executionRequest;
  for (const field of definition.required) {
    if (!Object.prototype.hasOwnProperty.call(request, field)) {
      throw new Error(`Execution Request is missing field: ${field}`);
    }
  }
  const allowedFields = new Set(Object.keys(definition.properties));
  for (const field of Object.keys(request)) {
    if (!allowedFields.has(field)) {
      throw new Error(`Execution Request contains unsupported field: ${field}`);
    }
  }
  for (const field of ["request_id", "run_id", "task_id", "agent", "capability", "tool", "workspace_path"]) {
    assertNonEmptyString(request[field], `Execution Request ${field}`);
  }
  if (!definition.properties.operation.enum.includes(request.operation)
    || !definition.properties.mode.enum.includes(request.mode)) {
    throw new Error("Execution Request operation or mode is invalid.");
  }
  if ((request.operation === "create" || request.operation === "update" || request.operation === "diff")
    && typeof request.content !== "string") {
    throw new Error(`Execution Request ${request.operation} requires string content.`);
  }
  if (request.operation === "rollback") {
    assertNonEmptyString(request.transaction_id, "Execution Request rollback transaction_id");
  }
  if (!request.provider_requirements || typeof request.provider_requirements !== "object"
    || Array.isArray(request.provider_requirements)) {
    throw new Error("Execution Request provider_requirements must be an object.");
  }
  if (request.external_execution !== false || request.execution_enabled !== false) {
    throw new Error("Execution Request must keep execution disabled.");
  }
  return true;
}

function validateRoute(route) {
  if (!route || typeof route !== "object" || Array.isArray(route)) {
    throw new Error("Execution Result route must be an object.");
  }
  for (const field of ["capability", "provider", "adapter", "runtime", "tool"]) {
    assertNonEmptyString(route[field], `Execution Result route ${field}`);
  }
  if (route.provider_execution !== false || route.adapter_execution !== false
    || route.runtime_execution !== false || route.integration_execution !== false) {
    throw new Error("Execution Result route must remain selection and validation only.");
  }
  return true;
}

function validateExecutionResult(result) {
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    throw new Error("Execution Result must be an object.");
  }
  const definition = executionSchema.$defs.executionResult;
  for (const field of definition.required) {
    if (!Object.prototype.hasOwnProperty.call(result, field)) {
      throw new Error(`Execution Result is missing field: ${field}`);
    }
  }
  if (!definition.properties.status.enum.includes(result.status)
    || !definition.properties.mode.enum.includes(result.mode)) {
    throw new Error("Execution Result status or mode is invalid.");
  }
  for (const field of ["request_id", "run_id", "task_id"]) {
    assertNonEmptyString(result[field], `Execution Result ${field}`);
  }
  if (result.status === "blocked") {
    if (!result.error || typeof result.error.code !== "string") {
      throw new Error("Blocked Execution Result requires an error.");
    }
  } else {
    validateRoute(result.route);
  }
  if (result.external_execution !== false || result.execution_enabled !== false) {
    throw new Error("Execution Result must keep execution disabled.");
  }
  return true;
}

function createExecutionResult(request, route, outcome) {
  validateExecutionRequest(request);
  validateRoute(route);
  const result = {
    schema_version: "1.0.0",
    request_id: request.request_id,
    run_id: request.run_id,
    task_id: request.task_id,
    status: outcome.status,
    mode: request.mode,
    route: clone(route),
    transaction_id: outcome.transaction_id || null,
    diff: outcome.diff ? clone(outcome.diff) : null,
    error: null,
    external_execution: false,
    execution_enabled: false,
  };
  validateExecutionResult(result);
  return result;
}

function createBlockedExecutionResult(request, error, route = null) {
  validateExecutionRequest(request);
  const result = {
    schema_version: "1.0.0",
    request_id: request.request_id,
    run_id: request.run_id,
    task_id: request.task_id,
    status: "blocked",
    mode: request.mode,
    route: route ? clone(route) : null,
    transaction_id: null,
    diff: null,
    error: {
      code: error.code || "EXECUTION_BLOCKED",
      message: error.message,
    },
    external_execution: false,
    execution_enabled: false,
  };
  validateExecutionResult(result);
  return result;
}

module.exports = {
  createBlockedExecutionResult,
  createExecutionResult,
  validateExecutionRequest,
  validateExecutionResult,
  validateRoute,
};
