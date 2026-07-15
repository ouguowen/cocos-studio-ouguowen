#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { existingDirectories, walkFiles } = require("./asset-scanner");

const SCRIPT_EXTENSIONS = new Set([".ts", ".js", ".tsx", ".jsx"]);
const MAX_SCRIPT_BYTES = 1024 * 1024;

function scanCode(projectRoot) {
  const warnings = [];
  const scriptRoots = existingDirectories([
    path.join(projectRoot, "scripts"),
    path.join(projectRoot, "assets", "scripts"),
  ]);
  const scripts = [];
  const modules = new Set();
  let todoCount = 0;

  for (const scriptRoot of scriptRoots) {
    const rootName = path.basename(scriptRoot).toLowerCase();
    for (const filePath of walkFiles(scriptRoot, warnings)) {
      if (!SCRIPT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) {
        continue;
      }
      scripts.push(filePath);
      const relativeParts = path.relative(scriptRoot, filePath).split(path.sep);
      const moduleName = relativeParts.length > 1
        ? relativeParts[0]
        : path.basename(filePath, path.extname(filePath));
      modules.add(`${rootName}:${moduleName}`);
      const size = fs.statSync(filePath).size;
      if (size > MAX_SCRIPT_BYTES) {
        warnings.push(`Skipped TODO scan for oversized script: ${filePath}`);
        continue;
      }
      const content = fs.readFileSync(filePath, "utf8");
      todoCount += (content.match(/\bTODO\b/gi) || []).length;
    }
  }

  if (todoCount > 0) {
    warnings.push(`Code scan found ${todoCount} TODO marker(s).`);
  }
  return {
    stats: {
      script_count: scripts.length,
      module_count: modules.size,
      todo_count: todoCount,
    },
    warnings: [...new Set(warnings)],
  };
}

module.exports = {
  MAX_SCRIPT_BYTES,
  SCRIPT_EXTENSIONS,
  scanCode,
};
