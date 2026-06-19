#!/usr/bin/env node

const path = require("path");

const { loadTables } = require("./level-config/csv");
const { createIssueCollector, printIssues } = require("./level-config/issues");
const { validateTables } = require("./level-config/validators");

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  const dataDir = path.resolve(args[0]);
  const collector = createIssueCollector();
  const tables = loadTables(dataDir, collector);
  validateTables(tables, collector);
  printIssues(collector.getIssues());
  process.exit(collector.hasErrors() ? 1 : 0);
}

function printUsage() {
  console.log("Usage: node scripts/validate-level-config.js <level-data-directory>");
  console.log("");
  console.log("Validate the common wave-spawn / stage-based level tables defined by");
  console.log("cocos-studio-ouguowen. Exits with code 1 when errors are found.");
}

main();
