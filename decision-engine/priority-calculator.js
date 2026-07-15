#!/usr/bin/env node

"use strict";

const STATUS_BONUS = {
  blocked: 35,
  "in-progress": 25,
  pending: 10,
};

const RISK_BONUS = {
  low: 3,
  medium: 10,
  high: 15,
  critical: 20,
};

function clampScore(value) {
  return Number(Math.max(0, Math.min(100, value)).toFixed(2));
}

function tokenize(value) {
  return new Set(
    String(value)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length >= 4),
  );
}

function issueMatchesTask(issue, task) {
  const taskTokens = tokenize(`${task.id} ${task.title} ${task.agent}`);
  const issueTokens = tokenize(`${issue.id} ${issue.description}`);
  return [...taskTokens].some((token) => issueTokens.has(token));
}

function determineRisk(task, openIssues) {
  if (task.status === "blocked") {
    return "high";
  }
  const matchingIssues = openIssues.filter((issue) => issueMatchesTask(issue, task));
  const severityOrder = ["critical", "high", "medium", "low"];
  return severityOrder.find((severity) => matchingIssues.some((issue) => issue.severity === severity)) || "low";
}

function calculateActionPriority(task, context = {}) {
  if (!task || typeof task !== "object" || Array.isArray(task)) {
    throw new Error("Priority Calculator requires a task object.");
  }
  const completedTaskIds = context.completedTaskIds || new Set();
  const openIssues = context.openIssues || [];
  const feedbackScore = context.feedbackScore === undefined ? null : context.feedbackScore;
  const memoryRelevance = context.memoryRelevance || 0;
  const blockedBy = task.depends_on.filter((taskId) => !completedTaskIds.has(taskId));
  const riskLevel = determineRisk(task, openIssues);

  let score = Math.max(10, 50 - (task.priority * 5));
  score += STATUS_BONUS[task.status] || 0;
  score += blockedBy.length === 0 ? 10 : -20;
  score += RISK_BONUS[riskLevel];
  score += context.projectStatus === "blocked" ? 10 : context.projectStatus === "at-risk" ? 5 : 0;
  score += feedbackScore === null ? 0 : (feedbackScore / 100) * 10;
  score += Math.min(5, memoryRelevance * 2);

  return {
    blocked_by: blockedBy,
    risk_level: riskLevel,
    feedback_score: feedbackScore === null ? null : Number(feedbackScore.toFixed(2)),
    memory_relevance: memoryRelevance,
    priority_score: clampScore(score),
  };
}

function rankCandidateActions(actions) {
  if (!Array.isArray(actions)) {
    throw new Error("Priority Calculator actions must be an array.");
  }
  return [...actions].sort((left, right) => (
    right.priority_score - left.priority_score
    || left.base_priority - right.base_priority
    || left.task_id.localeCompare(right.task_id)
  ));
}

function calculateDecisionConfidence(selectedAction) {
  if (!selectedAction) {
    return 0;
  }
  let confidence = 55;
  confidence += selectedAction.blocked_by.length === 0 ? 10 : -20;
  confidence += selectedAction.feedback_score === null ? 0 : 15;
  confidence += Math.min(10, selectedAction.memory_relevance * 2);
  confidence -= ["high", "critical"].includes(selectedAction.risk_level) ? 15 : 0;
  return clampScore(confidence);
}

module.exports = {
  calculateActionPriority,
  calculateDecisionConfidence,
  determineRisk,
  issueMatchesTask,
  rankCandidateActions,
};
