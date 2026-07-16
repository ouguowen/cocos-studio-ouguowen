#!/usr/bin/env node

"use strict";

function normalizeText(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function hasAny(text, signals) {
  return signals.some((signal) => text.includes(signal));
}

function detectDomain(normalized) {
  if (hasAny(normalized, ["ui", "button", "panel", "hud", "\u754c\u9762", "\u6309\u94ae", "\u9762\u677f"])) {
    return "ui";
  }
  if (hasAny(normalized, ["battle", "combat", "enemy", "wave", "\u6218\u6597", "\u654c\u4eba", "\u6ce2\u6b21"])) {
    return "combat";
  }
  if (hasAny(normalized, ["asset", "visual", "color", "\u7f8e\u672f", "\u89c6\u89c9", "\u989c\u8272"])) {
    return "visual";
  }
  if (hasAny(normalized, ["code", "script", "component", "\u4ee3\u7801", "\u811a\u672c", "\u7ec4\u4ef6"])) {
    return "code";
  }
  return "game";
}

function detectAction(normalized) {
  if (hasAny(normalized, ["modify", "change", "adjust", "update", "fix", "\u4fee\u6539", "\u8c03\u6574", "\u66f4\u65b0", "\u4fee\u590d"])) {
    return "modify";
  }
  if (hasAny(normalized, ["add", "create", "new", "\u65b0\u589e", "\u521b\u5efa", "\u6dfb\u52a0"])) {
    return "add";
  }
  if (hasAny(normalized, ["remove", "delete", "\u5220\u9664", "\u79fb\u9664"])) {
    return "remove";
  }
  return "plan";
}

function detectTarget(normalized, domain) {
  if (hasAny(normalized, ["button", "\u6309\u94ae"])) {
    return "button";
  }
  if (hasAny(normalized, ["color", "\u989c\u8272"])) {
    return domain === "ui" ? "button" : "theme";
  }
  if (hasAny(normalized, ["enemy", "\u654c\u4eba"])) {
    return "enemy";
  }
  if (hasAny(normalized, ["system", "\u7cfb\u7edf"])) {
    return "system";
  }
  if (hasAny(normalized, ["component", "\u7ec4\u4ef6"])) {
    return "component";
  }
  return "task";
}

function detectEngine(normalized) {
  if (hasAny(normalized, ["cocos", "cocos creator", "\u5854\u9632", "tower defense"])) {
    return "cocos";
  }
  return "cocos";
}

function createTaskFingerprint(request) {
  const normalized = normalizeText(request);
  if (normalized.length === 0) {
    throw new Error("Task fingerprint request must be non-empty.");
  }
  const domain = detectDomain(normalized);
  return [
    domain,
    detectAction(normalized),
    detectTarget(normalized, domain),
    detectEngine(normalized),
  ].join(".");
}

module.exports = {
  createTaskFingerprint,
  normalizeText,
};
