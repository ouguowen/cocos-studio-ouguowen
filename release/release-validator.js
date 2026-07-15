#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const { FileOperation, loadTransactionStoreTemplate } = require("../execution/file-operation");
const { RollbackManager } = require("../execution/rollback-manager");
const { WorkspaceManager } = require("../execution/workspace-manager");
const { CapabilityExecutor } = require("../execution-contract/capability-executor");
const { loadExecutionPolicy } = require("../execution-contract/execution-policy");
const { ExecutionRouter } = require("../execution-contract/execution-router");
const { AuditLog } = require("../execution-history/audit-log");
const { ExecutionHistoryStore } = require("../execution-history/execution-history-store");
const { RecoveryManager } = require("../execution-history/recovery-manager");
const { TransactionJournal } = require("../execution-history/transaction-journal");
const { createEmptyPerformanceStore, recordFeedback, validatePerformanceStore } = require("../feedback/execution-feedback");
const { rankProvidersByFeedback } = require("../feedback/provider-ranking");
const { loadPerformanceStore } = require("../feedback/execution-feedback");
const { loadMemoryStore, queryMemory, validateMemoryStore } = require("../memory/memory-manager");
const { loadProviderRegistry } = require("../providers/provider-selector");
const { loadAgentRegistry } = require("../scheduler/agent-registry");
const { loadCapabilities } = require("../scripts/capability-loader");

const root = path.resolve(__dirname, "..");
const checklistPath = path.join(__dirname, "release-checklist.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadReleaseChecklist() {
  const checklist = JSON.parse(fs.readFileSync(checklistPath, "utf8"));
  if (!checklist || checklist.target_version !== "1.0.0"
    || checklist.runtime_mode !== "preview" || checklist.execution_enabled !== false
    || !Array.isArray(checklist.checks) || checklist.checks.length !== 8) {
    throw new Error("Release Checklist is invalid or unsafe.");
  }
  if (Object.values(checklist.release_boundaries).some((enabled) => enabled !== false)) {
    throw new Error("Release Checklist cannot enable external or production execution.");
  }
  return checklist;
}

function assertPaths(check) {
  const missing = check.paths.filter((relativePath) => !fs.existsSync(path.join(root, relativePath)));
  if (missing.length > 0) {
    throw new Error(`${check.id} is missing paths: ${missing.join(", ")}`);
  }
  return check.paths.length;
}

function createPreviewChain(workspaceRoot) {
  const workspace = new WorkspaceManager({ root: workspaceRoot });
  const fileOperation = new FileOperation(workspace, {
    store: loadTransactionStoreTemplate(),
    clock: () => "2026-01-01T00:00:00.000Z",
  });
  const rollbackManager = new RollbackManager(workspace, fileOperation);
  const router = new ExecutionRouter({
    fileOperation,
    rollbackManager,
    policy: loadExecutionPolicy(),
  });
  const executor = new CapabilityExecutor({ router });
  const task = {
    run_id: "run-release-validation-0001",
    task_id: "system-implementation-plan",
    agent: "cocos-programmer",
    capability: "system-implementation-plan",
    tool: "blueprint-system-planner",
    operation: "create",
    workspace_path: "release-validation/preview.txt",
    content: "release validation preview\n",
    mode: "preview",
    provider_requirements: { type: "engine" },
  };
  const request = executor.createExecutionRequest(task);
  const result = router.execute(request);
  const transaction = fileOperation.getTransaction(result.transaction_id);
  return { executor, fileOperation, request, result, router, transaction };
}

function validateArchitecture(checklist, packageJson) {
  const check = checklist.checks.find((entry) => entry.id === "architecture-completeness");
  const pathCount = assertPaths(check);
  if (!checklist.accepted_package_versions.includes(packageJson.version)) {
    throw new Error(`Package version is not a v1.0.0 release candidate: ${packageJson.version}`);
  }
  return { path_count: pathCount, package_version: packageJson.version };
}

function validateModuleRegistration(checklist) {
  const check = checklist.checks.find((entry) => entry.id === "module-registration");
  assertPaths(check);
  const capabilities = loadCapabilities();
  const agents = loadAgentRegistry();
  const providers = loadProviderRegistry();
  if (!capabilities.some((capability) => capability.id === "tower-defense")
    || agents.agents.length < 4 || providers.providers.length < 1) {
    throw new Error("Required Capability, Agent, or Provider registrations are missing.");
  }
  return {
    capabilities: capabilities.length,
    agents: agents.agents.length,
    providers: providers.providers.length,
  };
}

function validateExecutionContract(checklist, chain) {
  const check = checklist.checks.find((entry) => entry.id === "execution-contract-chain");
  assertPaths(check);
  const { request, result } = chain;
  if (request.execution_enabled !== false || result.execution_enabled !== false
    || result.status !== "previewed" || result.route.provider !== "cocos"
    || result.route.adapter !== "cocos-adapter" || result.route.runtime !== "cocos-runtime") {
    throw new Error("Execution Contract preview chain is incomplete.");
  }
  return {
    request_id: request.request_id,
    transaction_id: result.transaction_id,
    route: clone(result.route),
  };
}

function validateRuntimeChain(checklist, chain, workspaceRoot) {
  const check = checklist.checks.find((entry) => entry.id === "runtime-chain");
  assertPaths(check);
  if (chain.router.runtimeManager.result().length !== 0
    || chain.result.route.adapter_execution !== false
    || chain.result.route.runtime_execution !== false
    || chain.result.route.integration_execution !== false
    || fs.existsSync(path.join(workspaceRoot, chain.request.workspace_path))) {
    throw new Error("Runtime chain executed outside preview boundaries.");
  }
  return {
    runtime_events: 0,
    adapter_execution: false,
    integration_execution: false,
    workspace_written: false,
  };
}

function validateMemoryChain(checklist) {
  const check = checklist.checks.find((entry) => entry.id === "memory-chain");
  assertPaths(check);
  const store = loadMemoryStore();
  validateMemoryStore(store);
  if (store.projects.length === 0) {
    throw new Error("Memory Store contains no validation project.");
  }
  const projectId = store.projects[0].project_memory.project_id;
  const context = queryMemory(projectId, "system-implementation-plan", { store });
  return {
    project_id: projectId,
    project_count: store.projects.length,
    context_sections: Object.keys(context).length,
  };
}

function validateFeedbackChain(checklist, chain) {
  const check = checklist.checks.find((entry) => entry.id === "feedback-chain");
  assertPaths(check);
  validatePerformanceStore(loadPerformanceStore());
  const providerRegistry = loadProviderRegistry();
  const feedback = recordFeedback({
    task_id: chain.request.task_id,
    capability: chain.request.capability,
    provider: chain.result.route.provider,
    status: "success",
    duration: 1,
    quality_score: 100,
    speed_score: 100,
    success_score: 100,
    validation_result: { passed: true, message: "Release preview validation passed." },
  }, {
    registry: providerRegistry,
    store: createEmptyPerformanceStore(),
    write: false,
  });
  const ranking = rankProvidersByFeedback(chain.request.capability, {}, feedback.store);
  if (ranking.length === 0) {
    throw new Error("Feedback chain produced no Provider ranking.");
  }
  return { feedback_recorded: true, ranked_provider: ranking[0].provider };
}

function validateRecoveryChain(checklist, chain) {
  const check = checklist.checks.find((entry) => entry.id === "recovery-chain");
  assertPaths(check);
  let clockIndex = 0;
  const clock = () => `2026-01-01T00:00:${String(10 + clockIndex++).padStart(2, "0")}.000Z`;
  const store = new ExecutionHistoryStore({ clock });
  const record = store.createRecord(chain.request, chain.result, { transaction: chain.transaction });
  store.updateStatus(record.execution_id, "failed", {
    result: { ...chain.result, status: "failed" },
  });
  const journal = new TransactionJournal(store, { clock });
  const recovery = new RecoveryManager(store, journal, { clock });
  const recovered = recovery.recover(record.execution_id, chain.result);
  const rollback = journal.findRollbackPoint(record.transaction_id);
  const audit = new AuditLog(store, journal, { clock }).generateReport({ run_id: record.run_id });
  if (recovered.status !== "recovered" || rollback.execution_id !== record.execution_id
    || audit.summary.execution_count !== 1) {
    throw new Error("Recovery chain did not produce recoverable audit evidence.");
  }
  return {
    execution_id: record.execution_id,
    recovery_status: recovered.status,
    rollback_located: true,
    audit_entries: audit.summary.journal_entry_count,
  };
}

function validateCi(checklist, packageJson, ciEvidence) {
  const check = checklist.checks.find((entry) => entry.id === "ci-all-tests");
  assertPaths(check);
  const testFiles = fs.readdirSync(path.join(root, "scripts"))
    .filter((name) => /^test-.+\.js$/.test(name));
  const runner = fs.readFileSync(path.join(root, "scripts", "run-tests.js"), "utf8");
  const missingTests = testFiles.filter((name) => !runner.includes(name));
  if (missingTests.length > 0 || testFiles.length < checklist.minimum_registered_tests) {
    throw new Error(`CI test registration is incomplete: ${missingTests.join(", ")}`);
  }
  for (const script of ["ci", "test", "check", "validate:docs"]) {
    if (typeof packageJson.scripts[script] !== "string") {
      throw new Error(`Package script is missing: ${script}`);
    }
  }
  if (!ciEvidence || ciEvidence.status !== "PASS"
    || ciEvidence.test_count < testFiles.length || ciEvidence.command !== "pnpm run ci") {
    throw new Error("Release validation requires passing pnpm run ci evidence.");
  }
  return { registered_tests: testFiles.length, ci_command: ciEvidence.command };
}

function runCheck(id, operation) {
  try {
    return { id, status: "PASS", evidence: operation(), issues: [] };
  } catch (error) {
    return { id, status: "FAIL", evidence: null, issues: [error.message] };
  }
}

function validateReleaseReport(report) {
  if (!report || report.target_version !== "1.0.0"
    || report.runtime_mode !== "preview" || report.execution_enabled !== false
    || !Array.isArray(report.checks) || report.checks.length !== 8) {
    throw new Error("Release Validation Report is invalid or unsafe.");
  }
  if (report.ready_for_v1_0_0 !== report.checks.every((check) => check.status === "PASS")) {
    throw new Error("Release readiness does not match required check results.");
  }
  return true;
}

function runReleaseValidation(options = {}) {
  if (!options.workspaceRoot) {
    throw new Error("Release validation requires a workspaceRoot for preview validation.");
  }
  const checklist = loadReleaseChecklist();
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const chain = createPreviewChain(options.workspaceRoot);
  const checks = [
    runCheck("architecture-completeness", () => validateArchitecture(checklist, packageJson)),
    runCheck("module-registration", () => validateModuleRegistration(checklist)),
    runCheck("execution-contract-chain", () => validateExecutionContract(checklist, chain)),
    runCheck("runtime-chain", () => validateRuntimeChain(checklist, chain, options.workspaceRoot)),
    runCheck("memory-chain", () => validateMemoryChain(checklist)),
    runCheck("feedback-chain", () => validateFeedbackChain(checklist, chain)),
    runCheck("recovery-chain", () => validateRecoveryChain(checklist, chain)),
    runCheck("ci-all-tests", () => validateCi(checklist, packageJson, options.ciEvidence)),
  ];
  const ready = checks.every((check) => check.status === "PASS");
  const report = {
    schema_version: "1.0.0",
    target_version: checklist.target_version,
    package_version: packageJson.version,
    status: ready ? "READY" : "BLOCKED",
    runtime_mode: "preview",
    execution_enabled: false,
    checks,
    remaining_risks: [
      "Real Provider, Cocos, MCP, and external API execution remain unvalidated and disabled.",
      "Execution History does not yet provide cross-process locking or a tamper-evident hash chain.",
      "Permission grants are local objects and are not cryptographically signed or remotely attested.",
      "The v1.0.0 release proves architecture and deterministic preview behavior, not production game generation."
    ],
    ready_for_v1_0_0: ready,
  };
  validateReleaseReport(report);
  return report;
}

module.exports = {
  loadReleaseChecklist,
  runReleaseValidation,
  validateReleaseReport,
};
