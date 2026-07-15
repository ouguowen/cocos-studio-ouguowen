#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const executionDir = __dirname;
const defaultPolicyPath = path.join(executionDir, "permission-policy.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function validatePermissionPolicy(policy) {
  if (!policy || typeof policy !== "object" || Array.isArray(policy)) {
    throw new Error("Execution permission policy must be an object.");
  }
  assertNonEmptyString(policy.schema_version, "Permission policy schema_version");
  if (typeof policy.execution_enabled !== "boolean") {
    throw new Error("Permission policy execution_enabled must be boolean.");
  }
  if (!policy.modes || !policy.operations || !policy.workspace || !policy.commit_requirements) {
    throw new Error("Permission policy is missing execution controls.");
  }
  const modeIds = new Set(["preview", "dry-run", "commit"]);
  if (!modeIds.has(policy.default_mode)) {
    throw new Error("Permission policy default_mode must be preview, dry-run, or commit.");
  }
  for (const modeId of modeIds) {
    if (!policy.modes[modeId] || typeof policy.modes[modeId].writes !== "boolean") {
      throw new Error(`Permission policy mode is invalid: ${modeId}`);
    }
  }
  if (policy.modes.preview.writes || policy.modes["dry-run"].writes || !policy.modes.commit.writes) {
    throw new Error("Permission policy write boundaries are invalid.");
  }
  const operationIds = new Set(["create", "update", "delete", "diff", "rollback"]);
  for (const operationId of operationIds) {
    const modes = policy.operations[operationId];
    if (!Array.isArray(modes) || modes.length === 0
      || modes.some((mode) => !modeIds.has(mode))) {
      throw new Error(`Permission policy operation is invalid: ${operationId}`);
    }
  }
  return true;
}

function loadPermissionPolicy(policyPath = defaultPolicyPath) {
  const resolvedPath = path.resolve(policyPath);
  const relative = path.relative(executionDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Permission policy must stay inside ${executionDir}.`);
  }
  const policy = readJson(resolvedPath, "Execution permission policy");
  validatePermissionPolicy(policy);
  return policy;
}

function createPermissionError(message) {
  const error = new Error(message);
  error.code = "EXECUTION_PERMISSION_DENIED";
  return error;
}

class WorkspaceManager {
  constructor(options = {}) {
    assertNonEmptyString(options.root, "Workspace root");
    this.root = path.resolve(options.root);
    this.policy = clone(options.policy || loadPermissionPolicy());
    validatePermissionPolicy(this.policy);
    this.mode = options.mode || this.policy.default_mode;
    this.execution_enabled = options.executionEnabled === true;
    this.permission_grant = options.permissionGrant ? clone(options.permissionGrant) : null;
    this.validateMode(this.mode);
    this.validateWorkspaceRoot();
  }

  validateWorkspaceRoot() {
    if (this.policy.workspace.require_existing_root
      && (!fs.existsSync(this.root) || !fs.statSync(this.root).isDirectory())) {
      throw new Error(`Workspace root must be an existing directory: ${this.root}`);
    }
    if (!this.policy.workspace.allow_symbolic_links && fs.lstatSync(this.root).isSymbolicLink()) {
      throw new Error(`Workspace root must not be a symbolic link: ${this.root}`);
    }
    return true;
  }

  validateMode(mode) {
    if (!Object.prototype.hasOwnProperty.call(this.policy.modes, mode)) {
      throw new Error(`Unsupported execution mode: ${mode}`);
    }
    return true;
  }

  resolve(relativePath) {
    assertNonEmptyString(relativePath, "Workspace relative path");
    if (relativePath.includes("\0") || path.isAbsolute(relativePath)) {
      throw createPermissionError(`Workspace path must be relative: ${relativePath}`);
    }
    const resolvedPath = path.resolve(this.root, relativePath);
    const relative = path.relative(this.root, resolvedPath);
    if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      throw createPermissionError(`Workspace path escapes the approved root: ${relativePath}`);
    }
    if (!this.policy.workspace.allow_symbolic_links) {
      let currentPath = this.root;
      for (const segment of relative.split(path.sep).filter(Boolean)) {
        currentPath = path.join(currentPath, segment);
        if (fs.existsSync(currentPath) && fs.lstatSync(currentPath).isSymbolicLink()) {
          throw createPermissionError(`Workspace path contains a symbolic link: ${relativePath}`);
        }
      }
    }
    return resolvedPath;
  }

  checkPermission(operation, mode = this.mode) {
    this.validateMode(mode);
    const allowedModes = this.policy.operations[operation];
    if (!allowedModes || !allowedModes.includes(mode)) {
      throw createPermissionError(`Operation ${operation} is not allowed in ${mode} mode.`);
    }
    if (!this.policy.modes[mode].writes) {
      return true;
    }
    if (this.policy.execution_enabled !== true || this.execution_enabled !== true) {
      throw createPermissionError("Commit mode requires enabled policy and runtime execution.");
    }
    const grant = this.permission_grant;
    if (!grant || typeof grant !== "object" || Array.isArray(grant)) {
      throw createPermissionError("Commit mode requires an explicit permission grant.");
    }
    assertNonEmptyString(grant.id, "Permission grant id");
    if (path.resolve(grant.workspace_root || "") !== this.root) {
      throw createPermissionError("Permission grant is not bound to this workspace.");
    }
    if (!Array.isArray(grant.operations) || !grant.operations.includes(operation)) {
      throw createPermissionError(`Permission grant does not allow operation: ${operation}`);
    }
    if (!Array.isArray(grant.modes) || !grant.modes.includes(mode)) {
      throw createPermissionError(`Permission grant does not allow mode: ${mode}`);
    }
    return true;
  }

  describe() {
    return {
      root: this.root,
      mode: this.mode,
      execution_enabled: this.execution_enabled,
      policy_execution_enabled: this.policy.execution_enabled,
      permission_grant_id: this.permission_grant?.id || null,
    };
  }
}

module.exports = {
  WorkspaceManager,
  createPermissionError,
  loadPermissionPolicy,
  validatePermissionPolicy,
};
