#!/usr/bin/env node

"use strict";

const {
  loadPerformanceStore,
  validatePerformanceStore,
} = require("./execution-feedback");

function readWeight(value, fallback, label) {
  const resolved = value === undefined ? fallback : value;
  if (typeof resolved !== "number" || !Number.isFinite(resolved) || resolved < 0) {
    throw new Error(`${label} must be a non-negative number.`);
  }
  return resolved;
}

function normalizeRankingRequirements(requirements = {}) {
  if (!requirements || typeof requirements !== "object" || Array.isArray(requirements)) {
    throw new Error("Provider Ranking requirements must be an object.");
  }
  const weights = requirements.weights || {};
  const normalized = {
    min_samples: requirements.min_samples === undefined ? 1 : requirements.min_samples,
    weights: {
      quality: readWeight(weights.quality, 0.35, "Provider Ranking quality weight"),
      speed: readWeight(weights.speed, 0.25, "Provider Ranking speed weight"),
      success: readWeight(weights.success, 0.2, "Provider Ranking success weight"),
      reliability: readWeight(weights.reliability, 0.2, "Provider Ranking reliability weight"),
    },
  };
  if (!Number.isInteger(normalized.min_samples) || normalized.min_samples < 1) {
    throw new Error("Provider Ranking min_samples must be a positive integer.");
  }
  const totalWeight = Object.values(normalized.weights).reduce((total, weight) => total + weight, 0);
  if (totalWeight <= 0) {
    throw new Error("Provider Ranking requires at least one positive weight.");
  }
  normalized.total_weight = totalWeight;
  return normalized;
}

function rankProvidersByFeedback(capability, requirements = {}, store = loadPerformanceStore()) {
  if (typeof capability !== "string" || capability.trim().length === 0) {
    throw new Error("Provider Ranking capability must be a non-empty string.");
  }
  validatePerformanceStore(store);
  const normalized = normalizeRankingRequirements(requirements);
  const providerMetrics = store.capabilities[capability] || {};

  return Object.entries(providerMetrics)
    .filter(([, metrics]) => metrics.samples >= normalized.min_samples)
    .map(([provider, metrics]) => {
      const weightedScore = (metrics.quality_score * normalized.weights.quality)
        + (metrics.speed_score * normalized.weights.speed)
        + (metrics.success_score * normalized.weights.success)
        + ((metrics.success_rate * 100) * normalized.weights.reliability);
      return {
        provider,
        score: Number((weightedScore / normalized.total_weight).toFixed(4)),
        samples: metrics.samples,
        success_rate: metrics.success_rate,
        quality_score: metrics.quality_score,
        speed_score: metrics.speed_score,
        success_score: metrics.success_score,
        average_duration: metrics.average_duration,
      };
    })
    .sort((left, right) => (
      right.score - left.score
      || right.success_rate - left.success_rate
      || right.samples - left.samples
      || left.provider.localeCompare(right.provider)
    ));
}

function selectBestProviderByFeedback(capability, requirements = {}, store = loadPerformanceStore()) {
  const ranking = rankProvidersByFeedback(capability, requirements, store);
  if (ranking.length === 0) {
    throw new Error(`No Provider feedback is available for capability: ${capability}`);
  }
  return ranking[0];
}

module.exports = {
  normalizeRankingRequirements,
  rankProvidersByFeedback,
  selectBestProviderByFeedback,
};
