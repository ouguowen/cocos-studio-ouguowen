#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif", ".tga"]);
const ANIMATION_EXTENSIONS = new Set([".anim", ".animation", ".atlas", ".skel"]);
const AUDIO_EXTENSIONS = new Set([".mp3", ".wav", ".ogg", ".m4a", ".aac"]);
const IGNORED_DIRECTORIES = new Set([".git", "node_modules", "library", "temp", "build"]);

function isDirectory(directoryPath) {
  try {
    return fs.statSync(directoryPath).isDirectory();
  } catch {
    return false;
  }
}

function existingDirectories(paths) {
  return [...new Set(paths.filter(isDirectory).map((directoryPath) => path.resolve(directoryPath)))];
}

function walkFiles(directoryPath, warnings, files = []) {
  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isSymbolicLink()) {
      warnings.push(`Skipped symbolic link: ${entryPath}`);
      continue;
    }
    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name.toLowerCase())) {
        walkFiles(entryPath, warnings, files);
      }
      continue;
    }
    if (entry.isFile() && !entry.name.endsWith(".meta") && !entry.name.startsWith(".")) {
      files.push(path.resolve(entryPath));
    }
  }
  return files;
}

function scanAssets(projectRoot) {
  const warnings = [];
  const assetsRoot = path.join(projectRoot, "assets");
  const scriptRoots = existingDirectories([path.join(projectRoot, "scripts"), path.join(assetsRoot, "scripts")]);
  const sceneRoots = existingDirectories([path.join(projectRoot, "scenes"), path.join(assetsRoot, "scenes")]);
  const prefabRoots = existingDirectories([path.join(projectRoot, "prefabs"), path.join(assetsRoot, "prefabs")]);
  const resourceRoots = existingDirectories([path.join(projectRoot, "resources"), path.join(assetsRoot, "resources")]);
  const assetRoots = existingDirectories([assetsRoot, ...prefabRoots, ...resourceRoots]);
  const files = [...new Set(assetRoots.flatMap((directoryPath) => walkFiles(directoryPath, warnings)))];
  const prefabFiles = new Set(prefabRoots.flatMap((directoryPath) => walkFiles(directoryPath, warnings)));
  const resourceFiles = new Set(resourceRoots.flatMap((directoryPath) => walkFiles(directoryPath, warnings)));

  const isUiResource = (filePath) => path.normalize(filePath)
    .split(path.sep)
    .some((segment) => segment.toLowerCase() === "ui");

  return {
    stats: {
      total_files: files.length,
      image_count: files.filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase())).length,
      animation_count: files.filter((filePath) => ANIMATION_EXTENSIONS.has(path.extname(filePath).toLowerCase())).length,
      ui_resource_count: files.filter(isUiResource).length,
      audio_count: files.filter((filePath) => AUDIO_EXTENSIONS.has(path.extname(filePath).toLowerCase())).length,
      prefab_count: [...prefabFiles].filter((filePath) => path.extname(filePath).toLowerCase() === ".prefab").length,
      resource_count: resourceFiles.size,
      directories: {
        assets: isDirectory(assetsRoot),
        scripts: scriptRoots.length > 0,
        scenes: sceneRoots.length > 0,
        prefabs: prefabRoots.length > 0,
        resources: resourceRoots.length > 0,
      },
    },
    warnings: [...new Set(warnings)],
  };
}

module.exports = {
  ANIMATION_EXTENSIONS,
  AUDIO_EXTENSIONS,
  IMAGE_EXTENSIONS,
  existingDirectories,
  scanAssets,
  walkFiles,
};
