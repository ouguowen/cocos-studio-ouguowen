#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const defaultCapabilitiesDir = path.join(root, "capabilities");

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read capability JSON ${filePath}: ${error.message}`);
  }
}

function resolveInside(baseDir, relativePath, label) {
  if (typeof relativePath !== "string" || relativePath.length === 0) {
    throw new Error(`${label} must be a non-empty relative path.`);
  }

  if (path.isAbsolute(relativePath)) {
    throw new Error(`${label} must stay inside ${baseDir}: ${relativePath}`);
  }

  const resolved = path.resolve(baseDir, relativePath);
  const relative = path.relative(baseDir, resolved);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} escapes ${baseDir}: ${relativePath}`);
  }

  return resolved;
}

function assertString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`${label} must be an array of non-empty strings.`);
  }
}

function validateCapability(capability, sourcePath) {
  if (!capability || typeof capability !== "object" || Array.isArray(capability)) {
    throw new Error(`Capability file must contain an object: ${sourcePath}`);
  }

  assertString(capability.id, `${sourcePath} id`);
  assertString(capability.name, `${sourcePath} name`);
  assertString(capability.category, `${sourcePath} category`);
  assertStringArray(capability.keywords, `${sourcePath} keywords`);
  assertStringArray(capability.game_genres, `${sourcePath} game_genres`);
  assertStringArray(capability.required_agents, `${sourcePath} required_agents`);
  assertStringArray(capability.context_files, `${sourcePath} context_files`);
  assertStringArray(capability.dependencies, `${sourcePath} dependencies`);

  if (!Number.isInteger(capability.priority) || capability.priority < 0 || capability.priority > 100) {
    throw new Error(`${sourcePath} priority must be an integer from 0 through 100.`);
  }

  const normalizedKeywords = capability.keywords.map(normalizeText);
  if (new Set(normalizedKeywords).size !== normalizedKeywords.length) {
    throw new Error(`${sourcePath} contains duplicate normalized keywords.`);
  }

  for (const contextFile of capability.context_files) {
    const contextPath = resolveInside(root, contextFile, `${sourcePath} context file`);
    if (!fs.statSync(contextPath, { throwIfNoEntry: false })?.isFile()) {
      throw new Error(`${sourcePath} context file does not exist: ${contextFile}`);
    }
  }
}

function loadCapabilities(options = {}) {
  const capabilitiesDir = path.resolve(options.capabilitiesDir || defaultCapabilitiesDir);
  const indexPath = resolveInside(capabilitiesDir, "index.json", "Capability index");
  const index = readJson(indexPath);

  if (!index || typeof index !== "object" || !Array.isArray(index.capabilities)) {
    throw new Error(`${indexPath} must contain a capabilities array.`);
  }

  const capabilities = [];
  const seenIds = new Set();

  for (const entry of index.capabilities) {
    if (!entry || typeof entry !== "object") {
      throw new Error(`${indexPath} contains an invalid capability entry.`);
    }

    assertString(entry.id, `${indexPath} capability id`);
    assertString(entry.file, `${indexPath} capability file`);

    if (path.extname(entry.file).toLowerCase() !== ".json") {
      throw new Error(`${indexPath} capability file must be JSON: ${entry.file}`);
    }

    if (seenIds.has(entry.id)) {
      throw new Error(`${indexPath} contains duplicate capability id: ${entry.id}`);
    }

    const capabilityPath = resolveInside(capabilitiesDir, entry.file, "Capability file");
    const capability = readJson(capabilityPath);
    validateCapability(capability, entry.file);

    if (capability.id !== entry.id) {
      throw new Error(`Capability id mismatch: index=${entry.id}, file=${capability.id}`);
    }

    seenIds.add(capability.id);
    capabilities.push(capability);
  }

  for (const capability of capabilities) {
    for (const dependency of capability.dependencies) {
      if (!seenIds.has(dependency)) {
        throw new Error(`${capability.id} has unresolved dependency: ${dependency}`);
      }
    }
  }

  return capabilities;
}

function normalizeText(value) {
  return String(value).normalize("NFKC").trim().toLocaleLowerCase("en-US");
}

function scoreCapability(query, capability) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return null;
  }

  const normalizedId = normalizeText(capability.id);
  const normalizedName = normalizeText(capability.name);
  const normalizedKeywords = capability.keywords.map(normalizeText);

  let relevance = null;
  if (normalizedQuery === normalizedId) {
    relevance = 10000;
  } else if (normalizedKeywords.includes(normalizedQuery)) {
    relevance = 9000;
  } else if (normalizedQuery === normalizedName) {
    relevance = 8500;
  } else {
    for (const keyword of normalizedKeywords) {
      if (normalizedQuery.includes(keyword)) {
        relevance = Math.max(relevance || 0, 7000 + keyword.length);
      } else if (keyword.includes(normalizedQuery)) {
        relevance = Math.max(relevance || 0, 5000 + normalizedQuery.length);
      }
    }
  }

  if (relevance === null) {
    return null;
  }

  return relevance * 1000 + capability.priority;
}

function matchCapability(query, capabilities) {
  const candidates = capabilities
    .map((capability) => ({
      capability,
      score: scoreCapability(query, capability),
    }))
    .filter((candidate) => candidate.score !== null)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.capability.id.localeCompare(right.capability.id);
    });

  return candidates[0]?.capability || null;
}

function createResult(query, capability) {
  if (!capability) {
    return {
      query,
      matched: false,
      capability: null,
    };
  }

  return {
    query,
    matched: true,
    capability: {
      id: capability.id,
      name: capability.name,
      required_agents: capability.required_agents,
      context_files: capability.context_files,
      dependencies: capability.dependencies,
    },
  };
}

function printUsage() {
  console.log('Usage: node scripts/capability-loader.js "<user request>"');
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exitCode = args.length === 0 ? 1 : 0;
    return;
  }

  try {
    const query = args.join(" ").trim();
    const capability = matchCapability(query, loadCapabilities());
    console.log(JSON.stringify(createResult(query, capability), null, 2));
    process.exitCode = capability ? 0 : 2;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  createResult,
  loadCapabilities,
  matchCapability,
  normalizeText,
};
