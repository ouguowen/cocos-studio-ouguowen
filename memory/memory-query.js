#!/usr/bin/env node

"use strict";

const TASK_ROUTES = {
  "character-generation": {
    directions: ["art_direction"],
    style_fields: ["visual_style", "color_palette", "character_style", "animation_style"],
    asset_types: ["character", "animation", "portrait"],
  },
  "scene-generation": {
    directions: ["art_direction"],
    style_fields: ["visual_style", "color_palette", "environment_style", "animation_style"],
    asset_types: ["scene", "environment", "animation"],
  },
  "ui-design": {
    directions: ["art_direction", "ui_direction"],
    style_fields: ["visual_style", "color_palette", "ui_style", "animation_style"],
    asset_types: ["ui", "portrait"],
  },
  "audio-design": {
    directions: ["audio_direction"],
    style_fields: [],
    asset_types: ["audio", "music", "sound-effect"],
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function selectAssets(assets, task, route) {
  const byId = new Map(assets.map((asset) => [asset.asset_id, asset]));
  const selectedIds = new Set(
    assets
      .filter((asset) => route.asset_types.includes(asset.asset_type) || asset.usage_context.includes(task))
      .map((asset) => asset.asset_id),
  );

  const pending = [...selectedIds];
  while (pending.length > 0) {
    const asset = byId.get(pending.shift());
    if (!asset) {
      continue;
    }
    for (const relatedId of asset.related_assets) {
      if (!selectedIds.has(relatedId)) {
        selectedIds.add(relatedId);
        pending.push(relatedId);
      }
    }
  }
  return assets.filter((asset) => selectedIds.has(asset.asset_id));
}

function queryProjectMemory(record, task) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("Memory Query requires a Project Memory record.");
  }
  assertNonEmptyString(task, "Memory Query task");
  const route = TASK_ROUTES[task] || {
    directions: ["art_direction", "audio_direction", "ui_direction"],
    style_fields: Object.keys(record.style_memory),
    asset_types: [],
  };
  const directions = Object.fromEntries(
    route.directions.map((field) => [field, clone(record.project_memory[field])]),
  );
  const styleContext = Object.fromEntries(
    route.style_fields.map((field) => [field, clone(record.style_memory[field])]),
  );
  const assets = TASK_ROUTES[task]
    ? selectAssets(record.assets, task, route)
    : record.assets;
  const decisions = record.decision_history.filter((decision) => decision.task_id === task);

  return {
    project_id: record.project_memory.project_id,
    task,
    execution_enabled: false,
    project_context: {
      project_name: record.project_memory.project_name,
      game_type: record.project_memory.game_type,
      genre: record.project_memory.genre,
      platform: record.project_memory.platform,
      design_rules: clone(record.project_memory.design_rules),
      technical_constraints: clone(record.project_memory.technical_constraints),
    },
    directions,
    style_context: styleContext,
    assets: clone(assets),
    decision_history: clone(decisions),
  };
}

module.exports = {
  TASK_ROUTES,
  queryProjectMemory,
  selectAssets,
};
