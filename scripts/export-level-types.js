#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { generateTypesSource } = require("./level-config/typegen");

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(0);
  }

  const outputFile = path.resolve(args[0] || "LevelConfigTypes.ts");
  const source = generateTypesSource();
  fs.writeFileSync(outputFile, source, "utf8");
  console.log(`Exported TypeScript config types to ${outputFile}`);
}

function printUsage() {
  console.log("Usage: node scripts/export-level-types.js [output-file]");
  console.log("");
  console.log("Generate TypeScript config interfaces for the common wave-spawn /");
  console.log("stage-based schema used by cocos-studio-ouguowen.");
}

main();
