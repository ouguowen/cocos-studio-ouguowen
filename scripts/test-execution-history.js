#!/usr/bin/env node

"use strict";

const { runExecutionHistoryTests } = require("../execution-history/test-execution-history");

try {
  runExecutionHistoryTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
