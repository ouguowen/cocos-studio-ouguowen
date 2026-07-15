#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { scanAssets } = require("./asset-scanner");
const { scanCode } = require("./code-scanner");
const { scanScenes } = require("./scene-scanner");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const schemaPath = path.join(__dirname, "scanner-schema.json");
const defaultReportPath = path.join(generatedDir, "project-scan-report.json");

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

function resolveProjectRoot(projectRoot) {
  if (typeof projectRoot !== "string" || projectRoot.trim().length === 0) {
    throw new Error("Project Scanner requires a project path.");
  }
  let resolvedPath;
  try {
    resolvedPath = fs.realpathSync(path.resolve(projectRoot));
  } catch (error) {
    throw new Error(`Project Scanner cannot resolve project path: ${error.message}`);
  }
  if (!fs.statSync(resolvedPath).isDirectory()) {
    throw new Error(`Project Scanner path is not a directory: ${resolvedPath}`);
  }
  return resolvedPath;
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertCount(value, label) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer.`);
  }
}

function validateProjectScanReport(report, schema = readJson(schemaPath, "Project Scanner schema")) {
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    throw new Error("Project Scan Report must be an object.");
  }
  for (const field of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(report, field)) {
      throw new Error(`Project Scan Report is missing field: ${field}`);
    }
  }
  const allowed = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(report)) {
    if (!allowed.has(field)) {
      throw new Error(`Project Scan Report contains unsupported field: ${field}`);
    }
  }
  assertNonEmptyString(report.project, "Project Scan Report project");
  assertNonEmptyString(report.engine, "Project Scan Report engine");
  if (report.execution_enabled !== false) {
    throw new Error("Project Scan Report must keep execution_enabled false.");
  }
  for (const field of [
    "total_files",
    "image_count",
    "animation_count",
    "ui_resource_count",
    "audio_count",
    "prefab_count",
    "resource_count",
  ]) {
    assertCount(report.assets[field], `Project Scan Report assets.${field}`);
  }
  for (const field of ["assets", "scripts", "scenes", "prefabs", "resources"]) {
    if (typeof report.assets.directories[field] !== "boolean") {
      throw new Error(`Project Scan Report assets.directories.${field} must be boolean.`);
    }
  }
  for (const field of ["script_count", "module_count", "todo_count"]) {
    assertCount(report.code[field], `Project Scan Report code.${field}`);
  }
  for (const field of ["scene_count", "node_count"]) {
    assertCount(report.scenes[field], `Project Scan Report scenes.${field}`);
  }
  if (!Array.isArray(report.warnings) || new Set(report.warnings).size !== report.warnings.length) {
    throw new Error("Project Scan Report warnings must be a unique array.");
  }
  for (const warning of report.warnings) {
    assertNonEmptyString(warning, "Project Scan Report warning");
  }
  if (typeof report.completion_estimate !== "number"
    || report.completion_estimate < 0
    || report.completion_estimate > 100) {
    throw new Error("Project Scan Report completion_estimate must be from 0 to 100.");
  }
  return true;
}

function detectEngine(projectRoot, options = {}) {
  if (options.engine) {
    assertNonEmptyString(options.engine, "Project Scanner engine");
    return options.engine;
  }
  const projectFile = path.join(projectRoot, "project.json");
  if (!fs.existsSync(projectFile)) {
    return "Unknown";
  }
  try {
    const project = readJson(projectFile, "project metadata");
    const engine = project.engine || project.creator || "Cocos Creator";
    return project.version ? `${engine} ${project.version}` : engine;
  } catch {
    return "Unknown";
  }
}

function calculateCompletionEstimate(assets, code, scenes, warnings) {
  const directoryCount = Object.values(assets.directories).filter(Boolean).length;
  let score = (directoryCount / 5) * 20;
  score += assets.total_files > 0 ? 20 : 0;
  score += code.script_count > 0 ? 20 : 0;
  score += scenes.scene_count > 0 ? 20 : 0;
  score += assets.prefab_count > 0 ? 10 : 0;
  score += assets.resource_count > 0 ? 10 : 0;
  score -= Math.min(10, code.todo_count * 2);
  score -= Math.min(10, warnings.filter((warning) => warning.startsWith("Unable to parse scene")).length * 5);
  return Number(Math.max(0, Math.min(100, score)).toFixed(2));
}

function normalizeWarnings(warnings, projectRoot) {
  const normalizedRoot = path.normalize(projectRoot);
  return [...new Set(warnings.map((warning) => warning.split(normalizedRoot).join(".")))];
}

function writeProjectScanReport(report, reportPath = defaultReportPath) {
  validateProjectScanReport(report);
  const resolvedPath = resolveInside(generatedDir, reportPath, "Project Scan Report");
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function loadProjectScanReport(reportPath = defaultReportPath) {
  const resolvedPath = resolveInside(generatedDir, reportPath, "Project Scan Report");
  const report = readJson(resolvedPath, "Project Scan Report");
  validateProjectScanReport(report);
  return report;
}

function scanProject(projectRoot, options = {}) {
  const resolvedRoot = resolveProjectRoot(projectRoot);
  const project = options.projectName || path.basename(resolvedRoot);
  assertNonEmptyString(project, "Project Scanner project name");
  const assetResult = scanAssets(resolvedRoot);
  const codeResult = scanCode(resolvedRoot);
  const sceneResult = scanScenes(resolvedRoot);
  const missingDirectories = Object.entries(assetResult.stats.directories)
    .filter(([, present]) => !present)
    .map(([directory]) => `Project structure is missing ${directory}/.`);
  const warnings = normalizeWarnings([
    ...missingDirectories,
    ...assetResult.warnings,
    ...codeResult.warnings,
    ...sceneResult.warnings,
  ], resolvedRoot);
  const report = {
    project,
    engine: detectEngine(resolvedRoot, options),
    assets: assetResult.stats,
    code: codeResult.stats,
    scenes: sceneResult.stats,
    warnings,
    completion_estimate: calculateCompletionEstimate(
      assetResult.stats,
      codeResult.stats,
      sceneResult.stats,
      warnings,
    ),
    execution_enabled: false,
  };
  validateProjectScanReport(report);
  const reportPath = options.write === false
    ? null
    : writeProjectScanReport(report, options.reportPath || defaultReportPath);
  return { report, reportPath, execution_enabled: false };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h") || args.length !== 1) {
    console.log("Usage: node project-scanner/project-scanner.js <project-path>");
    console.log("Scans project metadata read-only and never launches the game engine.");
    if (args.length !== 1) {
      process.exitCode = args.includes("--help") || args.includes("-h") ? 0 : 1;
    }
    return;
  }
  try {
    const result = scanProject(args[0]);
    console.log(JSON.stringify({
      project: result.report.project,
      engine: result.report.engine,
      completion_estimate: result.report.completion_estimate,
      output: "generated/project-scan-report.json",
      execution_enabled: false,
    }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  calculateCompletionEstimate,
  detectEngine,
  loadProjectScanReport,
  normalizeWarnings,
  resolveProjectRoot,
  scanProject,
  validateProjectScanReport,
  writeProjectScanReport,
};
