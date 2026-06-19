const path = require("path");

const { TABLE_DEFS } = require("./table-defs");
const { mapToObject, normalizeValue, toCamelCase, toLowerCamelCase } = require("./utils");

function buildNormalizedConfig(tables, sourceDir) {
  const normalizedTables = {};

  for (const [tableName, table] of Object.entries(tables)) {
    normalizedTables[toLowerCamelCase(tableName)] = table.rows.map((row) => normalizeRow(tableName, row));
  }

  return {
    metadata: {
      schema: "cocos-studio-ouguowen/common-wave-spawn-v1",
      sourceDir: path.resolve(sourceDir),
      generatedAt: new Date().toISOString(),
    },
    tables: normalizedTables,
    lookups: {
      levelsById: indexRows(normalizedTables.level, "levelId"),
      templatesById: indexRows(normalizedTables.levelTemplate, "templateId"),
      enemiesById: indexRows(normalizedTables.enemy, "enemyId"),
      mapsById: indexRows(normalizedTables.map, "mapId"),
      rewardsById: indexRows(normalizedTables.reward, "rewardId"),
      modifiersById: indexRows(normalizedTables.levelModifier, "modifierId"),
    },
    groups: {
      objectivesByGroup: groupRows(normalizedTables.levelObjective, "objectiveGroupId"),
      wavesByGroup: groupRows(normalizedTables.wave, "waveGroupId"),
      spawnsByWave: groupRows(normalizedTables.spawn, "waveId"),
      enemyEntriesByGroup: groupRows(normalizedTables.enemyGroup, "enemyGroupId"),
      formationsById: groupRows(normalizedTables.formation, "formationId"),
      starRulesById: groupRows(normalizedTables.starRule, "starRuleId"),
      dropEntriesByGroup: groupRows(normalizedTables.dropGroup, "dropGroupId"),
    },
  };
}

function normalizeRow(tableName, row) {
  const def = TABLE_DEFS[tableName];
  const result = {};

  for (const field of def.headers) {
    result[toCamelCase(field)] = normalizeValue(field, row[field], def);
  }

  return result;
}

function groupRows(rows = [], field) {
  const groups = new Map();
  for (const row of rows) {
    const key = row[field];
    if (key === null || key === undefined) {
      continue;
    }

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(row);
  }

  return mapToObject(groups);
}

function indexRows(rows = [], field) {
  const index = new Map();
  for (const row of rows) {
    const key = row[field];
    if (key === null || key === undefined) {
      continue;
    }
    index.set(key, row);
  }

  return mapToObject(index);
}

module.exports = {
  buildNormalizedConfig,
};
