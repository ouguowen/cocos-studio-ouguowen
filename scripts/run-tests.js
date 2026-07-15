#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const mutableStorePaths = [
  path.join(root, "memory", "project-memory-store.json"),
  path.join(root, "feedback", "performance-store.json"),
  path.join(root, "decision-engine", "decision-history.json"),
  path.join(root, "loop-engine", "progress-tracker.json"),
  path.join(root, "project-intelligence", "project-state.json"),
];
const tests = [
  "test-capability-loader.js",
  "test-game-planner.js",
  "test-task-generator.js",
  "test-agent-scheduler.js",
  "test-capability-binding.js",
  "test-agent-executor.js",
  "test-adapter-system.js",
  "test-provider-registry.js",
  "test-feedback-system.js",
  "test-memory-system.js",
  "test-project-intelligence.js",
  "test-decision-engine.js",
  "test-project-scanner.js",
  "test-validation-agent.js",
  "test-loop-engine.js",
  "test-runtime.js",
  "test-integration.js",
  "test-execution-runtime.js",
  "test-execution-contract.js",
  "test-execution-history.js",
  "test-release-validation.js",
  "test-blueprint-manager.js",
  "test-dependency-graph.js",
  "test-execution-router.js",
  "test-task-router.js",
  "test-agent-router.js",
  "test-studio-e2e.js",
];

function resolveTestPath(testName) {
  const testPath = path.resolve(__dirname, testName);
  const relative = path.relative(__dirname, testPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Test path escapes scripts/: ${testName}`);
  }
  if (!fs.existsSync(testPath)) {
    throw new Error(`Missing test file: scripts/${testName}`);
  }
  return testPath;
}

function cleanGeneratedArtifacts() {
  if (!fs.existsSync(generatedDir)) {
    return;
  }
  for (const entry of fs.readdirSync(generatedDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".json")) {
      fs.rmSync(path.join(generatedDir, entry.name));
    }
  }
}

function snapshotMutableStores() {
  return new Map(mutableStorePaths.map((storePath) => [
    storePath,
    fs.existsSync(storePath) ? fs.readFileSync(storePath) : null,
  ]));
}

function restoreMutableStores(snapshot) {
  for (const [storePath, content] of snapshot) {
    if (content === null) {
      if (fs.existsSync(storePath)) {
        fs.rmSync(storePath);
      }
    } else {
      fs.writeFileSync(storePath, content);
    }
  }
}

function runTests() {
  const testPaths = tests.map(resolveTestPath);
  const storeSnapshot = snapshotMutableStores();
  let passed = false;
  cleanGeneratedArtifacts();
  try {
    for (const testPath of testPaths) {
      const relativePath = path.relative(root, testPath).replaceAll("\\", "/");
      console.log(`\n> node ${relativePath}`);
      const result = spawnSync(process.execPath, [testPath], {
        cwd: root,
        stdio: "inherit",
      });
      if (result.error) {
        throw result.error;
      }
      if (result.status !== 0) {
        throw new Error(`${relativePath} failed with exit code ${result.status}.`);
      }
    }
    passed = true;
  } finally {
    restoreMutableStores(storeSnapshot);
  }
  if (passed) {
    cleanGeneratedArtifacts();
  }
  console.log(`\nAll ${testPaths.length} tests passed.`);
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
