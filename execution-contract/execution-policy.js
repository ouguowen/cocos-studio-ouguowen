#!/usr/bin/env node

"use strict";

const defaultExecutionPolicy = Object.freeze({
  schema_version: "1.0.0",
  execution_enabled: false,
  local_workspace_execution_enabled: false,
  external_execution_enabled: false,
  adapter_execution_enabled: false,
  runtime_execution_enabled: false,
  integration_execution_enabled: false,
  default_mode: "preview",
  allowed_modes: ["preview", "dry-run", "commit"],
  allowed_operations: ["create", "update", "delete", "diff", "rollback"],
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createExecutionContractError(message) {
  const error = new Error(message);
  error.code = "EXECUTION_CONTRACT_DISABLED";
  return error;
}

function validateExecutionPolicy(policy) {
  if (!policy || typeof policy !== "object" || Array.isArray(policy)) {
    throw new Error("Execution Contract policy must be an object.");
  }
  const booleanFields = [
    "execution_enabled",
    "local_workspace_execution_enabled",
    "external_execution_enabled",
    "adapter_execution_enabled",
    "runtime_execution_enabled",
    "integration_execution_enabled",
  ];
  for (const field of booleanFields) {
    if (typeof policy[field] !== "boolean") {
      throw new Error(`Execution Contract policy ${field} must be boolean.`);
    }
  }
  if (!Array.isArray(policy.allowed_modes) || !Array.isArray(policy.allowed_operations)
    || !policy.allowed_modes.includes(policy.default_mode)) {
    throw new Error("Execution Contract policy modes and operations are invalid.");
  }
  if (policy.external_execution_enabled || policy.adapter_execution_enabled
    || policy.runtime_execution_enabled || policy.integration_execution_enabled) {
    throw new Error("Execution Contract cannot enable external, Adapter, Runtime, or Integration execution.");
  }
  return true;
}

function loadExecutionPolicy(overrides = {}) {
  const policy = { ...clone(defaultExecutionPolicy), ...clone(overrides) };
  validateExecutionPolicy(policy);
  return policy;
}

function assertExecutionPolicy(request, policy) {
  validateExecutionPolicy(policy);
  if (!policy.allowed_modes.includes(request.mode)) {
    throw createExecutionContractError(`Execution mode is not allowed: ${request.mode}`);
  }
  if (!policy.allowed_operations.includes(request.operation)) {
    throw createExecutionContractError(`Execution operation is not allowed: ${request.operation}`);
  }
  if (request.external_execution !== false || request.execution_enabled !== false) {
    throw createExecutionContractError("Execution Request must keep external execution disabled.");
  }
  if (request.mode === "commit"
    && (policy.execution_enabled !== true || policy.local_workspace_execution_enabled !== true)) {
    throw createExecutionContractError("Commit mode is disabled by the Execution Contract policy.");
  }
  return true;
}

module.exports = {
  assertExecutionPolicy,
  createExecutionContractError,
  defaultExecutionPolicy,
  loadExecutionPolicy,
  validateExecutionPolicy,
};
