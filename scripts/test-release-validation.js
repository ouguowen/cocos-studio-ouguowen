#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  runReleaseValidation,
  validateReleaseReport,
} = require("../release/release-validator");

function removeFixture(fixtureRoot) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const resolvedFixture = fs.realpathSync(fixtureRoot);
  const relative = path.relative(tempRoot, resolvedFixture);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)
    || !path.basename(resolvedFixture).startsWith("ai-game-studio-release-")) {
    throw new Error(`Refusing to remove unsafe release fixture path: ${resolvedFixture}`);
  }
  fs.rmSync(resolvedFixture, { recursive: true, force: true });
}

function runTests() {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-game-studio-release-"));
  try {
    const registeredTestCount = fs.readdirSync(__dirname)
      .filter((name) => /^test-.+\.js$/.test(name)).length;
    const report = runReleaseValidation({
      workspaceRoot: fixtureRoot,
      ciEvidence: {
        status: "PASS",
        command: "pnpm run ci",
        test_count: registeredTestCount,
      },
    });
    assert.strictEqual(validateReleaseReport(report), true);
    assert.strictEqual(report.status, "READY");
    assert.strictEqual(report.target_version, "1.0.0");
    assert.strictEqual(report.package_version, "1.0.0-rc.1");
    assert.strictEqual(report.runtime_mode, "preview");
    assert.strictEqual(report.execution_enabled, false);
    assert.strictEqual(report.ready_for_v1_0_0, true);
    assert.strictEqual(report.checks.length, 8);
    assert.ok(report.checks.every((check) => check.status === "PASS"));
    assert.deepStrictEqual(report.checks.map((check) => check.id), [
      "architecture-completeness",
      "module-registration",
      "execution-contract-chain",
      "runtime-chain",
      "memory-chain",
      "feedback-chain",
      "recovery-chain",
      "ci-all-tests",
    ]);
    assert.strictEqual(
      report.checks.find((check) => check.id === "runtime-chain").evidence.runtime_events,
      0,
    );
    assert.strictEqual(
      report.checks.find((check) => check.id === "recovery-chain").evidence.recovery_status,
      "recovered",
    );
    assert.strictEqual(fs.existsSync(path.join(fixtureRoot, "release-validation/preview.txt")), false);

    const blocked = runReleaseValidation({
      workspaceRoot: fixtureRoot,
      ciEvidence: {
        status: "MISSING",
        command: "pnpm run ci",
        test_count: 0,
      },
    });
    assert.strictEqual(blocked.status, "BLOCKED");
    assert.strictEqual(blocked.ready_for_v1_0_0, false);
    assert.strictEqual(
      blocked.checks.find((check) => check.id === "ci-all-tests").status,
      "FAIL",
    );

    console.log(JSON.stringify({
      test: "release-validation",
      architecture_completeness: true,
      module_registration: true,
      execution_contract_chain: true,
      runtime_chain: true,
      memory_chain: true,
      feedback_chain: true,
      recovery_chain: true,
      ci_all_tests: true,
      missing_ci_evidence_blocked: true,
      registered_tests: registeredTestCount,
      target_version: report.target_version,
      package_version: report.package_version,
      release_status: report.status,
      execution_enabled: false,
      runtime_mode: "preview",
      external_calls: false
    }, null, 2));
  } finally {
    removeFixture(fixtureRoot);
  }
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
