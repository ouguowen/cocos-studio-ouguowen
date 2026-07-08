#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "cocos-studio-check-"));

try {
  const generatedConfig = path.join(tempDir, "generated-level-config.json");
  const generatedTypes = path.join(tempDir, "generated-config-types.ts");

  runNode([
    "scripts/export-level-config.js",
    "examples/attack-defense-city/level-config",
    generatedConfig,
  ]);
  runNode(["scripts/export-level-types.js", generatedTypes]);

  assertNonEmptyFile(generatedConfig);
  assertNonEmptyFile(generatedTypes);

  console.log("Generated artifact check passed without writing repository outputs.");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function runNode(args) {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function assertNonEmptyFile(filePath) {
  const stats = fs.statSync(filePath);
  if (!stats.isFile() || stats.size === 0) {
    throw new Error(`Expected non-empty generated artifact: ${filePath}`);
  }
}
