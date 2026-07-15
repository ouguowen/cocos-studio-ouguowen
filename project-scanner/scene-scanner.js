#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { existingDirectories, walkFiles } = require("./asset-scanner");

const SCENE_EXTENSIONS = new Set([".scene", ".fire"]);

function countSerializedNodes(value, visited = new Set()) {
  if (!value || typeof value !== "object" || visited.has(value)) {
    return 0;
  }
  visited.add(value);
  let count = value.__type__ === "cc.Node" || value.type === "Node" ? 1 : 0;
  for (const child of Object.values(value)) {
    if (child && typeof child === "object") {
      count += countSerializedNodes(child, visited);
    }
  }
  return count;
}

function scanScenes(projectRoot) {
  const warnings = [];
  const sceneRoots = existingDirectories([
    path.join(projectRoot, "scenes"),
    path.join(projectRoot, "assets", "scenes"),
  ]);
  const sceneFiles = [...new Set(
    sceneRoots
      .flatMap((directoryPath) => walkFiles(directoryPath, warnings))
      .filter((filePath) => SCENE_EXTENSIONS.has(path.extname(filePath).toLowerCase())),
  )];
  let nodeCount = 0;

  for (const sceneFile of sceneFiles) {
    try {
      nodeCount += countSerializedNodes(JSON.parse(fs.readFileSync(sceneFile, "utf8")));
    } catch (error) {
      warnings.push(`Unable to parse scene ${sceneFile}: ${error.message}`);
    }
  }
  return {
    stats: {
      scene_count: sceneFiles.length,
      node_count: nodeCount,
    },
    warnings: [...new Set(warnings)],
  };
}

module.exports = {
  SCENE_EXTENSIONS,
  countSerializedNodes,
  scanScenes,
};
