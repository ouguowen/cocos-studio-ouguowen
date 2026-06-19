#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { loadTables } = require("./level-config/csv");
const { createIssueCollector, printIssues } = require("./level-config/issues");
const { buildNormalizedConfig } = require("./level-config/normalize");
const { validateTables } = require("./level-config/validators");

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  const dataDir = path.resolve(args[0]);
  const outputFile = path.resolve(args[1] || path.join(dataDir, "generated-level-config.json"));
  const collector = createIssueCollector();
  const tables = loadTables(dataDir, collector);
  validateTables(tables, collector);

  if (collector.getIssues().length > 0) {
    printIssues(collector.getIssues());
  }

  if (collector.hasErrors()) {
    process.exit(1);
  }

  const normalized = buildNormalizedConfig(tables, dataDir);
  fs.writeFileSync(outputFile, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  console.log(`Exported normalized level config to ${outputFile}`);
}

function printUsage() {
  console.log("Usage: node scripts/export-level-config.js <level-data-directory> [output-file]");
  console.log("");
  console.log("Validate and export the common wave-spawn / stage-based level tables into");
  console.log("normalized JSON for runtime loading.");
}

main();
