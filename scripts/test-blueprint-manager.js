#!/usr/bin/env node

"use strict";

const assert = require("assert");

const {
  buildAgentBlueprintContexts,
  createGameBlueprint,
  getAgentBlueprintContext,
  validateGameBlueprint,
} = require("../blueprint/blueprint-manager");

function keys(value) {
  return Object.keys(value).sort();
}

function runTests() {
  const blueprint = createGameBlueprint("create a modern city tower defense mobile game", {
    version: "1.2.0",
    projectId: "modern-city-defense",
  });
  assert.strictEqual(validateGameBlueprint(blueprint), true);
  assert.strictEqual(blueprint.blueprint_version, "1.2.0");
  assert.strictEqual(blueprint.project.project_id, "modern-city-defense");
  assert.strictEqual(blueprint.project.genre, "tower-defense");
  assert.strictEqual(blueprint.execution_enabled, false);

  const artist = getAgentBlueprintContext(blueprint, "artist");
  assert.deepStrictEqual(keys(artist.sections), ["assets", "ui", "visual"]);
  assert.strictEqual(artist.blueprint_version, "1.2.0");

  const programmer = getAgentBlueprintContext(blueprint, "cocos-programmer");
  assert.deepStrictEqual(keys(programmer.sections), ["code", "components", "systems"]);

  const designer = getAgentBlueprintContext(blueprint, "game-designer");
  assert.deepStrictEqual(keys(designer.sections), ["design", "gameplay"]);

  const qa = getAgentBlueprintContext(blueprint, "qa");
  assert.deepStrictEqual(keys(qa.sections), ["test", "validation"]);

  const contexts = buildAgentBlueprintContexts(blueprint, [
    "artist",
    "cocos-programmer",
    "game-designer",
    "qa",
  ]);
  assert.deepStrictEqual(keys(contexts), ["artist", "cocos-programmer", "game-designer", "qa"]);

  console.log(JSON.stringify({
    test: "blueprint-manager",
    blueprint_created: true,
    blueprint_version: blueprint.blueprint_version,
    project_id: blueprint.project.project_id,
    artist_sections: keys(artist.sections),
    programmer_sections: keys(programmer.sections),
    designer_sections: keys(designer.sections),
    qa_sections: keys(qa.sections),
    execution_enabled: blueprint.execution_enabled,
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
