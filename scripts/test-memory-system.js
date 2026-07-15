#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  createEmptyMemoryStore,
  createMemory,
  createMemoryReport,
  queryMemory,
  readMemory,
  updateMemory,
  validateMemoryStore,
  writeMemoryReport,
  writeMemoryStore,
} = require("../memory/memory-manager");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "memory-report.json");
const projectId = "modern-city-defense";

const projectMemory = {
  project_id: projectId,
  project_name: "modern-city-defense",
  game_type: "tower-defense",
  genre: "tower-defense",
  platform: "mobile",
  design_rules: [
    "Defend the city core through readable lane decisions.",
    "Tower roles must remain visually distinct.",
  ],
  technical_constraints: [
    "Memory framework must not modify a Cocos project.",
    "All execution integrations remain disabled.",
  ],
  art_direction: {
    style: "modern sci-fi",
    color: "cyan yellow",
    lighting: "high contrast",
  },
  audio_direction: {
    style: "electronic tactical",
    mood: "urgent but controlled",
  },
  ui_direction: {
    style: "clean tactical HUD",
    color: "cyan yellow on charcoal",
    layout: "thumb-reachable mobile controls",
  },
};

const styleMemory = {
  visual_style: "modern sci-fi city defense",
  color_palette: ["cyan", "yellow", "charcoal", "white"],
  character_style: "clean armored silhouettes with readable team colors",
  environment_style: "dense modern city blocks with controlled neon accents",
  ui_style: "high-contrast tactical panels with compact mobile spacing",
  animation_style: "short readable anticipation and impact timing",
};

const assets = [
  {
    asset_id: "hero_001",
    asset_type: "character",
    related_assets: ["idle_animation", "attack_animation", "portrait_hero_001"],
    version: "1.0.0",
    description: "Primary city-defense hero specification.",
    usage_context: ["character-generation", "gameplay"],
  },
  {
    asset_id: "idle_animation",
    asset_type: "animation",
    related_assets: ["hero_001"],
    version: "1.0.0",
    description: "Idle animation relationship for hero_001.",
    usage_context: ["character-generation"],
  },
  {
    asset_id: "attack_animation",
    asset_type: "animation",
    related_assets: ["hero_001"],
    version: "1.0.0",
    description: "Attack animation relationship for hero_001.",
    usage_context: ["character-generation"],
  },
  {
    asset_id: "portrait_hero_001",
    asset_type: "portrait",
    related_assets: ["hero_001"],
    version: "1.0.0",
    description: "UI portrait relationship for hero_001.",
    usage_context: ["character-generation", "ui-design"],
  },
  {
    asset_id: "city_scene_001",
    asset_type: "scene",
    related_assets: [],
    version: "1.0.0",
    description: "Modern city battlefield scene specification.",
    usage_context: ["scene-generation"],
  },
];

const decision = {
  decision_id: "character-style-001",
  task_id: "character-generation",
  decision: "Use modern sci-fi character silhouettes with cyan team markers.",
  reason: "Matches project art direction and keeps combat roles readable.",
  related_agents: ["game-designer", "artist"],
  timestamp: "2026-01-01T00:00:00.000Z",
};

function runTests() {
  let store = createEmptyMemoryStore();
  const created = createMemory(projectMemory, styleMemory, {
    store,
    write: false,
  });
  assert.strictEqual(created.execution_enabled, false, "Memory creation must not enable execution.");
  store = created.store;
  assert.strictEqual(store.projects.length, 1, "Project Memory should be created.");
  assert.throws(
    () => createMemory(projectMemory, styleMemory, { store, write: false }),
    /already exists/,
    "Duplicate Project Memory should be blocked.",
  );

  const updated = updateMemory(projectId, {
    project_memory: {
      design_rules: [
        ...projectMemory.design_rules,
        "Character assets must preserve the shared project palette.",
      ],
    },
    style_memory: {
      animation_style: "short readable anticipation, impact, and recovery timing",
    },
    assets,
    decisions: [decision],
  }, {
    store,
    write: false,
  });
  assert.strictEqual(updated.execution_enabled, false, "Memory update must not enable execution.");
  store = updated.store;
  assert.strictEqual(validateMemoryStore(store), true, "Updated Memory Store should validate.");

  const memory = readMemory(projectId, { store });
  assert.strictEqual(memory.project_memory.project_name, "modern-city-defense", "Project Memory should read.");
  assert.strictEqual(memory.assets.length, 5, "Asset Memory should preserve all relationships.");
  assert.strictEqual(memory.decision_history.length, 1, "Decision History should be stored.");
  assert.strictEqual(
    memory.style_memory.animation_style,
    "short readable anticipation, impact, and recovery timing",
    "Style Memory should update.",
  );

  const characterContext = queryMemory(projectId, "character-generation", { store });
  assert.strictEqual(characterContext.execution_enabled, false, "Memory Query must not enable execution.");
  assert.strictEqual(characterContext.style_context.character_style, styleMemory.character_style);
  assert.deepStrictEqual(characterContext.style_context.color_palette, styleMemory.color_palette);
  assert.strictEqual(characterContext.directions.art_direction.style, "modern sci-fi");
  assert.deepStrictEqual(
    characterContext.assets.map((asset) => asset.asset_id).sort(),
    ["attack_animation", "hero_001", "idle_animation", "portrait_hero_001"].sort(),
    "Character query should include the character and related assets only.",
  );
  assert.strictEqual(characterContext.decision_history[0].decision_id, decision.decision_id);
  assert.ok(
    characterContext.project_context.design_rules.includes("Character assets must preserve the shared project palette."),
    "Character query should include current design rules.",
  );

  assert.throws(
    () => queryMemory("missing-project", "character-generation", { store }),
    /not found/,
    "Unknown projects should be rejected.",
  );
  assert.throws(
    () => updateMemory(projectId, { decisions: [decision] }, { store, write: false }),
    /append-only/,
    "Decision History should reject duplicate decision ids.",
  );

  writeMemoryStore(store);
  const report = createMemoryReport(store, {
    "character-generation": characterContext,
  });
  const writtenReportPath = writeMemoryReport(report);
  assert.strictEqual(writtenReportPath, reportPath, "Memory Report should use the generated path.");
  assert.ok(fs.existsSync(reportPath), "Memory Report should be generated.");
  const generatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.strictEqual(generatedReport.execution_enabled, false, "Memory Report must disable execution.");
  assert.strictEqual(generatedReport.summary.project_count, 1);
  assert.strictEqual(generatedReport.summary.asset_count, 5);
  assert.strictEqual(generatedReport.summary.decision_count, 1);

  console.log(JSON.stringify({
    test: "memory-system",
    create_memory: true,
    update_memory: true,
    read_memory: true,
    query_memory: true,
    style_consistency: true,
    asset_relationships: true,
    decision_history: true,
    report_generated: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/memory-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
