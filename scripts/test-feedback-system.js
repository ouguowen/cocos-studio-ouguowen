#!/usr/bin/env node

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  createEmptyPerformanceStore,
  createFeedbackReport,
  recordFeedback,
  validateFeedback,
  validatePerformanceStore,
  writeFeedbackReport,
  writePerformanceStore,
} = require("../feedback/execution-feedback");
const {
  rankProvidersByFeedback,
  selectBestProviderByFeedback,
} = require("../feedback/provider-ranking");
const { loadProviderRegistry } = require("../providers/provider-selector");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "generated", "feedback-report.json");

const samples = [
  {
    task_id: "image-qwen-success",
    capability: "image-generation",
    provider: "qwen-image",
    status: "success",
    duration: 800,
    quality_score: 88,
    speed_score: 92,
    success_score: 100,
    validation_result: {
      passed: true,
      message: "Mock quality checks passed.",
    },
  },
  {
    task_id: "image-gpt-success",
    capability: "image-generation",
    provider: "gpt-image",
    status: "success",
    duration: 1000,
    quality_score: 96,
    speed_score: 75,
    success_score: 100,
    validation_result: {
      passed: true,
      message: "Mock quality checks passed.",
    },
  },
  {
    task_id: "image-qwen-failed",
    capability: "image-generation",
    provider: "qwen-image",
    status: "failed",
    duration: 900,
    quality_score: 40,
    speed_score: 85,
    success_score: 0,
    validation_result: {
      passed: false,
      message: "Mock validation failure recorded.",
    },
  },
  {
    task_id: "engine-cocos-success",
    capability: "system-implementation-plan",
    provider: "cocos",
    status: "success",
    duration: 500,
    quality_score: 90,
    speed_score: 90,
    success_score: 100,
    validation_result: {
      passed: true,
      message: "Mock planning checks passed.",
    },
  },
];

function runTests() {
  const registry = loadProviderRegistry();
  for (const sample of samples) {
    assert.strictEqual(validateFeedback(sample, { registry }), true, `${sample.task_id} should validate.`);
  }
  assert.throws(
    () => validateFeedback({ ...samples[0], provider: "unknown-provider" }, { registry }),
    /unknown Provider/,
    "Unknown Providers should be rejected.",
  );

  let store = createEmptyPerformanceStore();
  for (const sample of samples) {
    const result = recordFeedback(sample, {
      registry,
      store,
      write: false,
    });
    assert.strictEqual(result.execution_enabled, false, "Feedback recording must remain non-executable.");
    store = result.store;
  }
  assert.strictEqual(validatePerformanceStore(store), true, "Aggregated Performance Store should validate.");

  const qwenMetrics = store.capabilities["image-generation"]["qwen-image"];
  assert.strictEqual(qwenMetrics.samples, 2, "Qwen should contain two feedback samples.");
  assert.strictEqual(qwenMetrics.success_count, 1, "Qwen should contain one successful sample.");
  assert.strictEqual(qwenMetrics.success_rate, 0.5, "Qwen success rate should be aggregated.");
  assert.strictEqual(qwenMetrics.quality_score, 64, "Qwen quality score should be averaged.");
  writePerformanceStore(store);

  const imageRanking = rankProvidersByFeedback("image-generation", {}, store);
  assert.strictEqual(imageRanking.length, 2, "Two image Providers should have historical feedback.");
  assert.strictEqual(imageRanking[0].provider, "gpt-image", "Historical feedback should rank GPT Image first.");
  assert.strictEqual(
    selectBestProviderByFeedback("image-generation", {}, store).provider,
    "gpt-image",
    "Best Provider selection should follow historical ranking.",
  );

  const rankings = {
    "image-generation": imageRanking,
    "system-implementation-plan": rankProvidersByFeedback("system-implementation-plan", {}, store),
  };
  const report = createFeedbackReport(samples, rankings, { registry });
  const writtenReportPath = writeFeedbackReport(report);
  assert.strictEqual(writtenReportPath, reportPath, "Feedback Report should use the generated output path.");
  assert.ok(fs.existsSync(reportPath), "Feedback Report should be generated.");
  const generatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.strictEqual(generatedReport.execution_enabled, false, "Feedback Report must disable execution.");
  assert.strictEqual(generatedReport.summary.total_feedback, 4, "Feedback Report should include all samples.");
  assert.strictEqual(generatedReport.provider_rankings["image-generation"][0].provider, "gpt-image");

  console.log(JSON.stringify({
    test: "feedback-system",
    schema_validation: true,
    feedback_recording: true,
    performance_aggregation: true,
    historical_ranking: true,
    report_generated: true,
    execution_enabled: false,
    external_calls: false,
    output: "generated/feedback-report.json",
  }, null, 2));
}

try {
  runTests();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
