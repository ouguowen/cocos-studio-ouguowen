#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const memoryDir = __dirname;
const generatedDir = path.join(root, "generated");
const defaultStorePath = path.join(memoryDir, "project-memory-store.json");
const defaultReportPath = path.join(generatedDir, "memory-report.json");
const schemaPaths = {
  project: path.join(memoryDir, "project-memory-schema.json"),
  style: path.join(memoryDir, "style-memory-schema.json"),
  asset: path.join(memoryDir, "asset-memory-schema.json"),
  decision: path.join(memoryDir, "decision-history-schema.json"),
};

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

function resolveInside(baseDir, filePath, label) {
  const resolvedPath = path.resolve(filePath);
  const relative = path.relative(baseDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${baseDir}.`);
  }
  return resolvedPath;
}

function loadSchemas() {
  return Object.fromEntries(
    Object.entries(schemaPaths).map(([name, filePath]) => [name, readJson(filePath, `${name} memory schema`)]),
  );
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertStringArray(value, label, allowEmpty = true) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) {
    throw new Error(`${label} must be ${allowEmpty ? "an" : "a non-empty"} array.`);
  }
  for (const item of value) {
    assertNonEmptyString(item, `${label} item`);
  }
  if (new Set(value).size !== value.length) {
    throw new Error(`${label} must not contain duplicates.`);
  }
}

function validateSchemaFields(value, schema, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  for (const field of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(value, field)) {
      throw new Error(`${label} is missing field: ${field}`);
    }
  }
  const allowed = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(value)) {
    if (!allowed.has(field)) {
      throw new Error(`${label} contains unsupported field: ${field}`);
    }
  }
}

function validateNestedObject(value, schema, label) {
  validateSchemaFields(value, schema, label);
  for (const field of schema.required || []) {
    assertNonEmptyString(value[field], `${label}.${field}`);
  }
}

function validateProjectMemory(projectMemory, schemas = loadSchemas()) {
  const schema = schemas.project;
  validateSchemaFields(projectMemory, schema, "Project Memory");
  for (const field of ["project_id", "project_name", "game_type", "genre", "platform"]) {
    assertNonEmptyString(projectMemory[field], `Project Memory ${field}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(projectMemory.project_id)) {
    throw new Error("Project Memory project_id must use lowercase kebab-case.");
  }
  assertStringArray(projectMemory.design_rules, "Project Memory design_rules");
  assertStringArray(projectMemory.technical_constraints, "Project Memory technical_constraints");
  for (const field of ["art_direction", "audio_direction", "ui_direction"]) {
    validateNestedObject(projectMemory[field], schema.properties[field], `Project Memory ${field}`);
  }
  return true;
}

function validateStyleMemory(styleMemory, schemas = loadSchemas()) {
  const schema = schemas.style;
  validateSchemaFields(styleMemory, schema, "Style Memory");
  for (const field of ["visual_style", "character_style", "environment_style", "ui_style", "animation_style"]) {
    assertNonEmptyString(styleMemory[field], `Style Memory ${field}`);
  }
  assertStringArray(styleMemory.color_palette, "Style Memory color_palette", false);
  return true;
}

function validateAssetMemory(assetMemory, schemas = loadSchemas()) {
  validateSchemaFields(assetMemory, schemas.asset, "Asset Memory");
  for (const field of ["asset_id", "asset_type", "version", "description"]) {
    assertNonEmptyString(assetMemory[field], `Asset Memory ${field}`);
  }
  if (!/^[a-z0-9]+(?:_[a-z0-9]+)*$/.test(assetMemory.asset_id)) {
    throw new Error("Asset Memory asset_id must use lowercase snake_case.");
  }
  assertStringArray(assetMemory.related_assets, `Asset ${assetMemory.asset_id} related_assets`);
  assertStringArray(assetMemory.usage_context, `Asset ${assetMemory.asset_id} usage_context`, false);
  return true;
}

function validateDecisionHistory(decision, schemas = loadSchemas()) {
  validateSchemaFields(decision, schemas.decision, "Decision History");
  for (const field of ["decision_id", "task_id", "decision", "reason", "timestamp"]) {
    assertNonEmptyString(decision[field], `Decision History ${field}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(decision.decision_id)) {
    throw new Error("Decision History decision_id must use lowercase kebab-case.");
  }
  assertStringArray(decision.related_agents, `Decision ${decision.decision_id} related_agents`, false);
  if (Number.isNaN(Date.parse(decision.timestamp))) {
    throw new Error(`Decision ${decision.decision_id} timestamp must be ISO-compatible.`);
  }
  return true;
}

function validateProjectRecord(record, schemas = loadSchemas()) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("Project Memory record must be an object.");
  }
  const requiredFields = ["project_memory", "style_memory", "assets", "decision_history"];
  for (const field of requiredFields) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) {
      throw new Error(`Project Memory record is missing field: ${field}`);
    }
  }
  if (Object.keys(record).some((field) => !requiredFields.includes(field))) {
    throw new Error("Project Memory record contains unsupported fields.");
  }
  validateProjectMemory(record.project_memory, schemas);
  validateStyleMemory(record.style_memory, schemas);
  if (!Array.isArray(record.assets) || !Array.isArray(record.decision_history)) {
    throw new Error("Project Memory assets and decision_history must be arrays.");
  }

  const assetIds = new Set();
  for (const asset of record.assets) {
    validateAssetMemory(asset, schemas);
    if (assetIds.has(asset.asset_id)) {
      throw new Error(`Project Memory contains duplicate Asset: ${asset.asset_id}`);
    }
    assetIds.add(asset.asset_id);
  }
  for (const asset of record.assets) {
    for (const relatedId of asset.related_assets) {
      if (!assetIds.has(relatedId)) {
        throw new Error(`Asset ${asset.asset_id} references unknown related Asset: ${relatedId}`);
      }
    }
  }

  const decisionIds = new Set();
  for (const decision of record.decision_history) {
    validateDecisionHistory(decision, schemas);
    if (decisionIds.has(decision.decision_id)) {
      throw new Error(`Project Memory contains duplicate Decision: ${decision.decision_id}`);
    }
    decisionIds.add(decision.decision_id);
  }
  return true;
}

function createEmptyMemoryStore() {
  return {
    schema_version: "1.0.0",
    mode: "project-context-memory-only",
    execution_enabled: false,
    projects: [],
  };
}

function validateMemoryStore(store) {
  if (!store || typeof store !== "object" || Array.isArray(store)) {
    throw new Error("Project Memory Store must be an object.");
  }
  assertNonEmptyString(store.schema_version, "Project Memory Store schema_version");
  if (store.mode !== "project-context-memory-only" || store.execution_enabled !== false) {
    throw new Error("Project Memory Store must remain context-only with execution disabled.");
  }
  if (!Array.isArray(store.projects)) {
    throw new Error("Project Memory Store projects must be an array.");
  }
  const schemas = loadSchemas();
  const projectIds = new Set();
  for (const record of store.projects) {
    validateProjectRecord(record, schemas);
    const projectId = record.project_memory.project_id;
    if (projectIds.has(projectId)) {
      throw new Error(`Project Memory Store contains duplicate project_id: ${projectId}`);
    }
    projectIds.add(projectId);
  }
  return true;
}

function loadMemoryStore(storePath = defaultStorePath) {
  const resolvedPath = resolveInside(memoryDir, storePath, "Project Memory Store");
  const store = readJson(resolvedPath, "Project Memory Store");
  validateMemoryStore(store);
  return store;
}

function writeMemoryStore(store, storePath = defaultStorePath) {
  validateMemoryStore(store);
  const resolvedPath = resolveInside(memoryDir, storePath, "Project Memory Store");
  fs.writeFileSync(resolvedPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function createMemory(projectMemory, styleMemory, options = {}) {
  const store = clone(options.store || loadMemoryStore(options.storePath || defaultStorePath));
  validateProjectMemory(projectMemory);
  validateStyleMemory(styleMemory);
  if (store.projects.some((record) => record.project_memory.project_id === projectMemory.project_id)) {
    throw new Error(`Project Memory already exists: ${projectMemory.project_id}`);
  }
  store.projects.push({
    project_memory: clone(projectMemory),
    style_memory: clone(styleMemory),
    assets: [],
    decision_history: [],
  });
  validateMemoryStore(store);
  const storePath = options.write === false
    ? null
    : writeMemoryStore(store, options.storePath || defaultStorePath);
  return { store, storePath, execution_enabled: false };
}

function mergeProjectMemory(current, patch) {
  if (!patch) {
    return current;
  }
  if (patch.project_id !== undefined && patch.project_id !== current.project_id) {
    throw new Error("Project Memory project_id cannot be changed.");
  }
  const merged = { ...current, ...patch };
  for (const field of ["art_direction", "audio_direction", "ui_direction"]) {
    if (patch[field]) {
      merged[field] = { ...current[field], ...patch[field] };
    }
  }
  return merged;
}

function updateMemory(projectId, changes, options = {}) {
  assertNonEmptyString(projectId, "Project Memory update project_id");
  if (!changes || typeof changes !== "object" || Array.isArray(changes)) {
    throw new Error("Project Memory changes must be an object.");
  }
  const allowedChanges = new Set(["project_memory", "style_memory", "assets", "decisions"]);
  for (const field of Object.keys(changes)) {
    if (!allowedChanges.has(field)) {
      throw new Error(`Project Memory update contains unsupported field: ${field}`);
    }
  }

  const store = clone(options.store || loadMemoryStore(options.storePath || defaultStorePath));
  const record = store.projects.find((item) => item.project_memory.project_id === projectId);
  if (!record) {
    throw new Error(`Project Memory not found: ${projectId}`);
  }
  record.project_memory = mergeProjectMemory(record.project_memory, changes.project_memory);
  if (changes.style_memory) {
    record.style_memory = { ...record.style_memory, ...changes.style_memory };
  }
  if (changes.assets !== undefined) {
    if (!Array.isArray(changes.assets)) {
      throw new Error("Project Memory assets update must be an array.");
    }
    const assets = new Map(record.assets.map((asset) => [asset.asset_id, asset]));
    for (const asset of changes.assets) {
      validateAssetMemory(asset);
      assets.set(asset.asset_id, clone(asset));
    }
    record.assets = [...assets.values()];
  }
  if (changes.decisions !== undefined) {
    if (!Array.isArray(changes.decisions)) {
      throw new Error("Project Memory decisions update must be an array.");
    }
    const existingIds = new Set(record.decision_history.map((decision) => decision.decision_id));
    for (const decision of changes.decisions) {
      validateDecisionHistory(decision);
      if (existingIds.has(decision.decision_id)) {
        throw new Error(`Decision History is append-only; duplicate id: ${decision.decision_id}`);
      }
      existingIds.add(decision.decision_id);
      record.decision_history.push(clone(decision));
    }
  }

  validateMemoryStore(store);
  const storePath = options.write === false
    ? null
    : writeMemoryStore(store, options.storePath || defaultStorePath);
  return { store, memory: clone(record), storePath, execution_enabled: false };
}

function readMemory(projectId, options = {}) {
  assertNonEmptyString(projectId, "Project Memory read project_id");
  const store = options.store || loadMemoryStore(options.storePath || defaultStorePath);
  validateMemoryStore(store);
  const record = store.projects.find((item) => item.project_memory.project_id === projectId);
  if (!record) {
    throw new Error(`Project Memory not found: ${projectId}`);
  }
  return clone(record);
}

function queryMemory(projectId, task, options = {}) {
  const { queryProjectMemory } = require("./memory-query");
  return queryProjectMemory(readMemory(projectId, options), task);
}

function createMemoryReport(store, queryResults = {}) {
  validateMemoryStore(store);
  return {
    schema_version: "1.0.0",
    mode: "memory-report-only",
    execution_enabled: false,
    summary: {
      project_count: store.projects.length,
      asset_count: store.projects.reduce((total, record) => total + record.assets.length, 0),
      decision_count: store.projects.reduce((total, record) => total + record.decision_history.length, 0),
    },
    projects: store.projects.map((record) => ({
      project_id: record.project_memory.project_id,
      project_name: record.project_memory.project_name,
      game_type: record.project_memory.game_type,
      genre: record.project_memory.genre,
      platform: record.project_memory.platform,
      asset_count: record.assets.length,
      decision_count: record.decision_history.length,
    })),
    query_results: clone(queryResults),
  };
}

function writeMemoryReport(report, reportPath = defaultReportPath) {
  if (!report || report.mode !== "memory-report-only" || report.execution_enabled !== false) {
    throw new Error("Memory Report must remain report-only with execution disabled.");
  }
  const resolvedPath = resolveInside(generatedDir, reportPath, "Memory Report");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

module.exports = {
  createEmptyMemoryStore,
  createMemory,
  createMemoryReport,
  loadMemoryStore,
  queryMemory,
  readMemory,
  updateMemory,
  validateAssetMemory,
  validateDecisionHistory,
  validateMemoryStore,
  validateProjectMemory,
  validateProjectRecord,
  validateStyleMemory,
  writeMemoryReport,
  writeMemoryStore,
};
