const { TABLE_DEFS } = require("./table-defs");
const { groupBy, hasValue, indexUnique, isBoolean01, isEnabled, isInteger, isNumber } = require("./utils");

function validateTables(tables, collector) {
  for (const [tableName, table] of Object.entries(tables)) {
    validateGenericRows(table, TABLE_DEFS[tableName], collector);
  }

  const indexes = buildIndexes(tables);
  validateLevels(tables, indexes, collector);
  validateObjectives(tables, indexes, collector);
  validateWaves(tables, indexes, collector);
  validateSpawns(tables, indexes, collector);
  validateEnemyGroups(tables, indexes, collector);
  validateEnemies(tables, indexes, collector);
  validateMaps(tables, indexes, collector);
  validateRewards(tables, indexes, collector);
  validateStars(tables, indexes, collector);
  validateDropGroups(tables, collector);
  validateModifiers(tables, collector);
}

function validateGenericRows(table, def, collector) {
  for (const row of table.rows) {
    for (const field of def.requiredFields || []) {
      if (!hasValue(row[field])) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          field,
          "",
          "required field is empty",
          `fill ${field} with a valid value`,
          def.owner
        );
      }
    }

    for (const field of def.booleans || []) {
      if (hasValue(row[field]) && !isBoolean01(row[field])) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          field,
          row[field],
          "boolean fields must use 0 or 1",
          "replace the value with 0 or 1",
          def.owner
        );
      }
    }

    for (const field of def.ints || []) {
      if (hasValue(row[field]) && !isInteger(row[field])) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          field,
          row[field],
          "field must be an integer",
          "replace the value with a whole number",
          def.owner
        );
      }
    }

    for (const field of def.numbers || []) {
      if (hasValue(row[field]) && !isNumber(row[field])) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          field,
          row[field],
          "field must be numeric",
          "replace the value with a valid number",
          def.owner
        );
      }
    }

    for (const [field, values] of Object.entries(def.recommendedEnums || {})) {
      if (hasValue(row[field]) && !values.includes(row[field])) {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          field,
          row[field],
          `value is outside the recommended enum set (${values.join(", ")})`,
          "confirm the runtime supports this value and document it intentionally",
          def.owner
        );
      }
    }
  }

  for (const uniqueFields of def.unique || []) {
    const seen = new Map();
    for (const row of table.rows) {
      const key = uniqueFields.map((field) => row[field] || "").join("|");
      if (!key) {
        continue;
      }

      if (seen.has(key)) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          uniqueFields.join(","),
          key,
          "duplicate unique key",
          `make ${uniqueFields.join(", ")} unique`,
          def.owner
        );
      } else {
        seen.set(key, row._rowNumber);
      }
    }
  }
}

function buildIndexes(tables) {
  return {
    levelById: indexUnique(tables.Level, "level_id"),
    templateById: indexUnique(tables.LevelTemplate, "template_id"),
    rewardById: indexUnique(tables.Reward, "reward_id"),
    modifierById: indexUnique(tables.LevelModifier, "modifier_id"),
    enemyById: indexUnique(tables.Enemy, "enemy_id"),
    mapById: indexUnique(tables.Map, "map_id"),
    mapPointById: indexUnique(tables.MapPoint, "point_id"),
    waveById: indexUnique(tables.Wave, "wave_id"),
    objectiveById: indexUnique(tables.LevelObjective, "objective_id"),
    objectiveGroups: groupBy(tables.LevelObjective, "objective_group_id"),
    waveGroups: groupBy(tables.Wave, "wave_group_id"),
    enemyGroups: groupBy(tables.EnemyGroup, "enemy_group_id"),
    formationGroups: groupBy(tables.Formation, "formation_id"),
    starRuleGroups: groupBy(tables.StarRule, "star_rule_id"),
    dropGroups: groupBy(tables.DropGroup, "drop_group_id"),
  };
}

function validateLevels(tables, indexes, collector) {
  const table = tables.Level;
  if (!table) {
    return;
  }

  for (const row of table.rows) {
    validateExistingRef(table.file, row, "template_id", indexes.templateById, "LevelTemplate.csv", "Lead Designer", collector);
    validateExistingRef(table.file, row, "map_id", indexes.mapById, "Map.csv", "Level Designer", collector);
    validateExistingRef(table.file, row, "reward_id", indexes.rewardById, "Reward.csv", "Lead Designer", collector);

    validateGroupRef(
      table.file,
      row,
      "wave_group_id",
      indexes.waveGroups,
      "Wave.csv",
      "Level Designer",
      "wave group must contain at least one row",
      collector
    );
    validateGroupRef(
      table.file,
      row,
      "objective_group_id",
      indexes.objectiveGroups,
      "LevelObjective.csv",
      "Lead Designer",
      "objective group must contain at least one row",
      collector
    );

    if (hasValue(row.star_rule_id)) {
      validateGroupRef(
        table.file,
        row,
        "star_rule_id",
        indexes.starRuleGroups,
        "StarRule.csv",
        "Lead Designer",
        "star rule group must exist when referenced",
        collector
      );
    }

    if (hasValue(row.modifier_id)) {
      validateExistingRef(table.file, row, "modifier_id", indexes.modifierById, "LevelModifier.csv", "Lead Designer", collector);
    }

    if (hasValue(row.unlock_level_id)) {
      validateExistingRef(table.file, row, "unlock_level_id", indexes.levelById, "Level.csv", "Lead Designer", collector);
    }

    if (isEnabled(row)) {
      validateEnabledRef(table.file, row, "template_id", indexes.templateById, "template", collector);
      validateEnabledRef(table.file, row, "map_id", indexes.mapById, "map", collector);
      validateEnabledRef(table.file, row, "reward_id", indexes.rewardById, "reward", collector);
      validateEnabledGroup(table.file, row, "wave_group_id", indexes.waveGroups, "wave", collector);
      validateEnabledGroup(table.file, row, "objective_group_id", indexes.objectiveGroups, "objective", collector);

      if (hasValue(row.star_rule_id)) {
        validateEnabledGroup(table.file, row, "star_rule_id", indexes.starRuleGroups, "star rule", collector);
      }

      if (hasValue(row.modifier_id)) {
        validateEnabledRef(table.file, row, "modifier_id", indexes.modifierById, "modifier", collector);
      }
    }

    if (hasValue(row.difficulty) && Number(row.difficulty) <= 0) {
      collector.report(
        "WARN",
        table.file,
        row._rowNumber,
        "difficulty",
        row.difficulty,
        "difficulty should usually be greater than 0",
        "review the intended difficulty scale",
        "Lead Designer"
      );
    }
  }

  detectUnlockCycles(table, collector);
}

function detectUnlockCycles(table, collector) {
  const graph = new Map();
  for (const row of table.rows) {
    if (hasValue(row.level_id) && hasValue(row.unlock_level_id)) {
      graph.set(row.level_id, row.unlock_level_id);
    }
  }

  for (const row of table.rows) {
    const visited = new Set();
    let current = row.level_id;
    while (graph.has(current)) {
      current = graph.get(current);
      if (visited.has(current) || current === row.level_id) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "unlock_level_id",
          row.unlock_level_id,
          "unlock chain is circular",
          "break the unlock loop so progression is acyclic",
          "Lead Designer"
        );
        break;
      }

      visited.add(current);
    }
  }
}

function validateObjectives(tables, indexes, collector) {
  const table = tables.LevelObjective;
  if (!table) {
    return;
  }

  for (const [groupId, rows] of indexes.objectiveGroups.entries()) {
    const enabledRequiredCount = rows.filter((row) => isEnabled(row) && row.required === "1").length;
    if (enabledRequiredCount === 0) {
      collector.report(
        "ERROR",
        table.file,
        rows[0]._rowNumber,
        "objective_group_id",
        groupId,
        "objective group has no enabled required objective",
        "mark at least one objective as required=1 and enabled=1",
        "Lead Designer"
      );
    }
  }

  for (const row of table.rows) {
    if (row.objective_type === "survive_time" && (!isNumber(row.time_limit) || Number(row.time_limit) <= 0)) {
      collector.report(
        "ERROR",
        table.file,
        row._rowNumber,
        "time_limit",
        row.time_limit,
        "survive_time objectives require time_limit > 0",
        "set time_limit to a positive number",
        "Lead Designer"
      );
    }

    if (row.objective_type === "kill_enemy") {
      if (!hasValue(row.target_id)) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "target_id",
          "",
          "kill_enemy objectives require target_id",
          "set target_id to an existing enemy_id",
          "Lead Designer"
        );
      } else if (!indexes.enemyById.has(row.target_id)) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "target_id",
          row.target_id,
          "target enemy does not exist",
          "change target_id or add the enemy to Enemy.csv",
          "Lead Designer"
        );
      }
    }
  }
}

function validateWaves(tables, indexes, collector) {
  const table = tables.Wave;
  if (!table) {
    return;
  }

  for (const [groupId, rows] of indexes.waveGroups.entries()) {
    const seenOrder = new Set();
    const enabledCount = rows.filter(isEnabled).length;
    if (enabledCount === 0) {
      collector.report(
        "ERROR",
        table.file,
        rows[0]._rowNumber,
        "wave_group_id",
        groupId,
        "wave group has no enabled wave",
        "enable at least one wave row or remove the group reference",
        "Level Designer"
      );
    }

    for (const row of rows) {
      if (isInteger(row.order_index) && Number(row.order_index) < 1) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "order_index",
          row.order_index,
          "order_index must start at 1",
          "renumber waves from 1 upward within the group",
          "Level Designer"
        );
      }

      if (seenOrder.has(row.order_index)) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "order_index",
          row.order_index,
          "duplicate order_index inside wave group",
          "make each wave order unique within the group",
          "Level Designer"
        );
      }
      seenOrder.add(row.order_index);

      if (isNumber(row.start_delay) && Number(row.start_delay) < 0) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "start_delay",
          row.start_delay,
          "start_delay must be >= 0",
          "set start_delay to 0 or a positive value",
          "Level Designer"
        );
      }

      if (row.next_wave_rule === "time_pass" && !isNumber(row.next_wave_param)) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "next_wave_param",
          row.next_wave_param,
          "time_pass requires a numeric next_wave_param",
          "set next_wave_param to the number of seconds before the next wave",
          "Level Designer"
        );
      }
    }
  }
}

function validateSpawns(tables, indexes, collector) {
  const table = tables.Spawn;
  if (!table) {
    return;
  }

  for (const row of table.rows) {
    validateExistingRef(table.file, row, "wave_id", indexes.waveById, "Wave.csv", "Level Designer", collector);

    if (row.spawn_rule !== "random_point" && !hasValue(row.map_point_id)) {
      collector.report(
        "ERROR",
        table.file,
        row._rowNumber,
        "map_point_id",
        "",
        "map_point_id is required unless the spawn rule explicitly chooses points at runtime",
        "set map_point_id or change spawn_rule intentionally",
        "Level Designer"
      );
    }

    if (hasValue(row.map_point_id)) {
      validateExistingRef(table.file, row, "map_point_id", indexes.mapPointById, "MapPoint.csv", "Level Designer", collector);
      const point = indexes.mapPointById.get(row.map_point_id);
      if (point && point.point_type !== "enemy_spawn") {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          "map_point_id",
          row.map_point_id,
          "spawn references a map point whose point_type is not enemy_spawn",
          "confirm the point_type is intentional or change it to enemy_spawn",
          "Level Designer"
        );
      }
    }

    validateGroupRef(
      table.file,
      row,
      "enemy_group_id",
      indexes.enemyGroups,
      "EnemyGroup.csv",
      "Level Designer",
      "enemy group must exist when referenced by a spawn",
      collector
    );

    if (hasValue(row.formation_id)) {
      validateGroupRef(
        table.file,
        row,
        "formation_id",
        indexes.formationGroups,
        "Formation.csv",
        "Level Designer",
        "formation must exist when referenced",
        collector
      );

      const slots = (indexes.formationGroups.get(row.formation_id) || []).filter(isEnabled).length;
      if (isInteger(row.count) && slots > 0 && Number(row.count) > slots) {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          "formation_id",
          row.formation_id,
          "formation has fewer enabled slots than the spawn count",
          "add more slots, reduce count, or define repeat behavior intentionally",
          "Level Designer"
        );
      }
    }

    if (isNumber(row.spawn_time) && Number(row.spawn_time) < 0) {
      collector.report(
        "ERROR",
        table.file,
        row._rowNumber,
        "spawn_time",
        row.spawn_time,
        "spawn_time must be >= 0",
        "set spawn_time to 0 or a positive value",
        "Level Designer"
      );
    }

    if (isInteger(row.count) && Number(row.count) <= 0) {
      collector.report(
        "ERROR",
        table.file,
        row._rowNumber,
        "count",
        row.count,
        "spawn count must be > 0",
        "set count to a positive integer",
        "Level Designer"
      );
    }

    if (isNumber(row.interval) && Number(row.interval) < 0) {
      collector.report(
        "ERROR",
        table.file,
        row._rowNumber,
        "interval",
        row.interval,
        "interval must be >= 0",
        "set interval to 0 or a positive value",
        "Level Designer"
      );
    }
  }
}

function validateEnemyGroups(tables, indexes, collector) {
  const table = tables.EnemyGroup;
  if (!table) {
    return;
  }

  for (const [groupId, rows] of indexes.enemyGroups.entries()) {
    const seenEntry = new Set();
    const enabledCount = rows.filter(isEnabled).length;
    if (enabledCount === 0) {
      collector.report(
        "ERROR",
        table.file,
        rows[0]._rowNumber,
        "enemy_group_id",
        groupId,
        "enemy group has no enabled entries",
        "enable at least one enemy-group row or remove the reference",
        "Level Designer"
      );
    }

    for (const row of rows) {
      if (seenEntry.has(row.entry_index)) {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          "entry_index",
          row.entry_index,
          "duplicate entry_index inside enemy group",
          "make entry indexes unique inside the group",
          "Level Designer"
        );
      }
      seenEntry.add(row.entry_index);

      validateExistingRef(table.file, row, "enemy_id", indexes.enemyById, "Enemy.csv", "Level Designer", collector);

      if (hasValue(row.weight) && Number(row.weight) < 0) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "weight",
          row.weight,
          "weight must be non-negative",
          "set weight to 0 or a positive value",
          "Level Designer"
        );
      }

      for (const field of ["level_multiplier", "hp_multiplier", "atk_multiplier"]) {
        if (hasValue(row[field]) && Number(row[field]) <= 0) {
          collector.report(
            "WARN",
            table.file,
            row._rowNumber,
            field,
            row[field],
            "multiplier should usually be greater than 0",
            "review whether this multiplier value is intentional",
            "Level Designer"
          );
        }
      }
    }
  }
}

function validateEnemies(tables, indexes, collector) {
  const table = tables.Enemy;
  if (!table) {
    return;
  }

  for (const row of table.rows) {
    for (const field of ["base_hp", "base_atk", "move_speed"]) {
      if (hasValue(row[field]) && Number(row[field]) <= 0) {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          field,
          row[field],
          `${field} should usually be greater than 0`,
          `review ${field} for this enemy`,
          "Lead Designer"
        );
      }
    }

    if (hasValue(row.drop_group_id)) {
      validateGroupRef(
        table.file,
        row,
        "drop_group_id",
        indexes.dropGroups,
        "DropGroup.csv",
        "Lead Designer",
        "drop group must exist when referenced by an enemy",
        collector
      );
    }
  }

  if (tables.EnemyGroup) {
    for (const row of tables.EnemyGroup.rows) {
      const enemy = indexes.enemyById.get(row.enemy_id);
      if (enemy && isEnabled(row) && !isEnabled(enemy)) {
        collector.report(
          "ERROR",
          tables.EnemyGroup.file,
          row._rowNumber,
          "enemy_id",
          row.enemy_id,
          "enabled enemy group references a disabled enemy",
          "enable the enemy or remove it from the enabled group",
          "Level Designer"
        );
      }
    }
  }
}

function validateMaps(tables, indexes, collector) {
  const table = tables.Map;
  if (!table) {
    return;
  }

  for (const row of table.rows) {
    validateExistingRef(table.file, row, "player_spawn_point", indexes.mapPointById, "MapPoint.csv", "Level Designer", collector);

    const point = indexes.mapPointById.get(row.player_spawn_point);
    if (point) {
      if (point.map_id !== row.map_id) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "player_spawn_point",
          row.player_spawn_point,
          "player spawn point belongs to a different map",
          "point the map to a player spawn inside the same map_id",
          "Level Designer"
        );
      }

      if (point.point_type !== "player_spawn") {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          "player_spawn_point",
          row.player_spawn_point,
          "player spawn point is not marked as point_type=player_spawn",
          "change point_type or confirm the reuse is intentional",
          "Level Designer"
        );
      }
    }
  }
}

function validateRewards(tables, indexes, collector) {
  const table = tables.Reward;
  if (!table) {
    return;
  }

  for (const row of table.rows) {
    for (const field of ["gold", "exp"]) {
      if (hasValue(row[field]) && Number(row[field]) < 0) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          field,
          row[field],
          `${field} must be non-negative`,
          `set ${field} to 0 or a positive integer`,
          "Lead Designer"
        );
      }
    }

    if (hasValue(row.drop_group_id)) {
      validateGroupRef(
        table.file,
        row,
        "drop_group_id",
        indexes.dropGroups,
        "DropGroup.csv",
        "Lead Designer",
        "drop group must exist when referenced by a reward",
        collector
      );
    }
  }
}

function validateStars(tables, indexes, collector) {
  const table = tables.StarRule;
  if (!table) {
    return;
  }

  for (const [ruleId, rows] of indexes.starRuleGroups.entries()) {
    const seenIndex = new Set();
    for (const row of rows) {
      if (seenIndex.has(row.star_index)) {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          "star_index",
          row.star_index,
          "duplicate star_index inside star rule",
          "make star_index unique inside the rule",
          "Lead Designer"
        );
      }
      seenIndex.add(row.star_index);

      if (hasValue(row.reward_id)) {
        validateExistingRef(table.file, row, "reward_id", indexes.rewardById, "Reward.csv", "Lead Designer", collector);
      }
    }

    if (rows.filter(isEnabled).length === 0) {
      collector.report(
        "WARN",
        table.file,
        rows[0]._rowNumber,
        "star_rule_id",
        ruleId,
        "star rule exists but has no enabled rows",
        "enable the intended rows or remove the unused rule",
        "Lead Designer"
      );
    }
  }
}

function validateDropGroups(tables, collector) {
  const table = tables.DropGroup;
  if (!table) {
    return;
  }

  const groups = groupBy(table, "drop_group_id");
  for (const [groupId, rows] of groups.entries()) {
    const seenEntry = new Set();
    if (rows.filter(isEnabled).length === 0) {
      collector.report(
        "WARN",
        table.file,
        rows[0]._rowNumber,
        "drop_group_id",
        groupId,
        "drop group exists but has no enabled entries",
        "enable the intended entries or remove the group",
        "Lead Designer"
      );
    }

    for (const row of rows) {
      if (seenEntry.has(row.entry_index)) {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          "entry_index",
          row.entry_index,
          "duplicate entry_index inside drop group",
          "make entry indexes unique inside the group",
          "Lead Designer"
        );
      }
      seenEntry.add(row.entry_index);

      if (hasValue(row.count) && Number(row.count) <= 0) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "count",
          row.count,
          "drop count must be positive",
          "set count to a positive integer",
          "Lead Designer"
        );
      }

      if (hasValue(row.weight) && Number(row.weight) < 0) {
        collector.report(
          "ERROR",
          table.file,
          row._rowNumber,
          "weight",
          row.weight,
          "drop weight must be non-negative",
          "set weight to 0 or a positive number",
          "Lead Designer"
        );
      }
    }
  }
}

function validateModifiers(tables, collector) {
  const table = tables.LevelModifier;
  if (!table) {
    return;
  }

  for (const row of table.rows) {
    for (const field of ["enemy_hp_ratio", "enemy_atk_ratio", "spawn_speed_ratio"]) {
      if (hasValue(row[field]) && Number(row[field]) <= 0) {
        collector.report(
          "WARN",
          table.file,
          row._rowNumber,
          field,
          row[field],
          "ratio should usually be greater than 0",
          `review whether ${field} is intentional`,
          "Lead Designer"
        );
      }
    }
  }
}

function validateExistingRef(file, row, field, lookup, targetFile, owner, collector) {
  if (!hasValue(row[field])) {
    return;
  }

  if (!lookup || !lookup.has(row[field])) {
    collector.report(
      "ERROR",
      file,
      row._rowNumber,
      field,
      row[field],
      `referenced row does not exist in ${targetFile}`,
      `add ${row[field]} to ${targetFile} or change ${field} to an existing id`,
      owner
    );
  }
}

function validateGroupRef(file, row, field, groups, targetFile, owner, reason, collector) {
  if (!hasValue(row[field])) {
    return;
  }

  const rows = groups ? groups.get(row[field]) : null;
  if (!rows || rows.length === 0) {
    collector.report(
      "ERROR",
      file,
      row._rowNumber,
      field,
      row[field],
      reason || `group does not exist in ${targetFile}`,
      `add ${row[field]} to ${targetFile} or change ${field} to an existing group id`,
      owner
    );
  }
}

function validateEnabledRef(file, row, field, lookup, refLabel, collector) {
  const target = lookup && lookup.get(row[field]);
  if (target && !isEnabled(target)) {
    collector.report(
      "ERROR",
      file,
      row._rowNumber,
      field,
      row[field],
      `enabled level references a disabled ${refLabel}`,
      `enable the ${refLabel} or stop referencing it from enabled content`,
      "Lead Designer"
    );
  }
}

function validateEnabledGroup(file, row, field, groups, refLabel, collector) {
  const targets = groups && groups.get(row[field]);
  if (targets && targets.length > 0 && !targets.some(isEnabled)) {
    collector.report(
      "ERROR",
      file,
      row._rowNumber,
      field,
      row[field],
      `enabled level references a ${refLabel} group with no enabled rows`,
      `enable rows in the ${refLabel} group or stop referencing it`,
      "Lead Designer"
    );
  }
}

module.exports = {
  validateTables,
};
