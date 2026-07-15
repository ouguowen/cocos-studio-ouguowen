#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const rulesDir = __dirname;
const defaultRulesPath = path.join(rulesDir, "validation-rules.json");
const OPERATORS = new Set(["min", "max", "equals", "not-equals"]);

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${label} ${filePath}: ${error.message}`);
  }
}

function resolveRulesPath(rulesPath) {
  const resolvedPath = path.resolve(rulesPath || defaultRulesPath);
  const relative = path.relative(rulesDir, resolvedPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Validation Rules must stay inside ${rulesDir}.`);
  }
  return resolvedPath;
}

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function validateRules(rules) {
  if (!rules || typeof rules !== "object" || Array.isArray(rules)) {
    throw new Error("Validation Rules must be an object.");
  }
  assertNonEmptyString(rules.schema_version, "Validation Rules schema_version");
  if (rules.mode !== "validation-rules-only" || rules.execution_enabled !== false) {
    throw new Error("Validation Rules must remain rules-only with execution disabled.");
  }
  if (!Array.isArray(rules.rules) || rules.rules.length === 0) {
    throw new Error("Validation Rules must contain rules.");
  }
  const ids = new Set();
  for (const rule of rules.rules) {
    for (const field of ["id", "category", "source", "operator", "severity", "message", "recommendation"]) {
      assertNonEmptyString(rule[field], `Validation Rule ${field}`);
    }
    if (ids.has(rule.id)) {
      throw new Error(`Validation Rules contain duplicate id: ${rule.id}`);
    }
    ids.add(rule.id);
    if (!new Set(["completeness", "quality"]).has(rule.category)) {
      throw new Error(`Validation Rule ${rule.id} has invalid category.`);
    }
    if (!OPERATORS.has(rule.operator)) {
      throw new Error(`Validation Rule ${rule.id} has invalid operator.`);
    }
    if (!new Set(["error", "warning"]).has(rule.severity)) {
      throw new Error(`Validation Rule ${rule.id} has invalid severity.`);
    }
    if (!Number.isFinite(rule.penalty) || rule.penalty < 0 || rule.penalty > 100) {
      throw new Error(`Validation Rule ${rule.id} has invalid penalty.`);
    }
    if (!Object.prototype.hasOwnProperty.call(rule, "expected")) {
      throw new Error(`Validation Rule ${rule.id} is missing expected.`);
    }
  }
  return true;
}

function loadValidationRules(rulesPath = defaultRulesPath) {
  const rules = readJson(resolveRulesPath(rulesPath), "Validation Rules");
  validateRules(rules);
  return rules;
}

function getValue(input, source) {
  assertNonEmptyString(source, "Validation Rule source");
  return source.split(".").reduce((current, field) => {
    if (new Set(["__proto__", "prototype", "constructor"]).has(field)) {
      throw new Error(`Validation Rule source contains an unsafe field: ${field}`);
    }
    if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(current, field)) {
      throw new Error(`Validation Rule source does not exist: ${source}`);
    }
    return current[field];
  }, input);
}

function compare(observed, operator, expected) {
  switch (operator) {
    case "min":
      return typeof observed === "number" && observed >= expected;
    case "max":
      return typeof observed === "number" && observed <= expected;
    case "equals":
      return observed === expected;
    case "not-equals":
      return observed !== expected;
    default:
      throw new Error(`Unsupported Validation Rule operator: ${operator}`);
  }
}

function displayValue(value) {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function evaluateRule(rule, input) {
  const observed = getValue(input, rule.source);
  if (compare(observed, rule.operator, rule.expected)) {
    return null;
  }
  return {
    finding: {
      rule_id: rule.id,
      category: rule.category,
      severity: rule.severity,
      message: rule.message,
      observed: displayValue(observed),
      expected: `${rule.operator} ${displayValue(rule.expected)}`,
    },
    recommendation: rule.recommendation,
    penalty: rule.penalty,
  };
}

function runRuleEngine(input, rules = loadValidationRules()) {
  validateRules(rules);
  const failures = rules.rules
    .map((rule) => evaluateRule(rule, input))
    .filter(Boolean);
  const penalty = failures.reduce((total, failure) => total + failure.penalty, 0);
  return {
    findings: failures.map((failure) => failure.finding),
    recommendations: [...new Set(failures.map((failure) => failure.recommendation))],
    score: Math.max(0, 100 - penalty),
    execution_enabled: false,
  };
}

module.exports = {
  compare,
  evaluateRule,
  getValue,
  loadValidationRules,
  runRuleEngine,
  validateRules,
};
