import type {
  DropGroupEntryConfig,
  EnemyConfig,
  EnemyGroupEntryConfig,
  FormationSlotConfig,
  GeneratedLevelConfig,
  LevelConfig,
  LevelModifierConfig,
  LevelObjectiveConfig,
  LevelTemplateConfig,
  MapConfig,
  MapPointConfig,
  RewardConfig,
  SpawnConfig,
  StarRuleConfig,
  WaveConfig,
} from "./ConfigTypes";

export interface ConfigIndex {
  readonly levelsById: Readonly<Record<string, LevelConfig>>;
  readonly templatesById: Readonly<Record<string, LevelTemplateConfig>>;
  readonly objectivesByGroup: Readonly<Record<string, readonly LevelObjectiveConfig[]>>;
  readonly wavesByGroup: Readonly<Record<string, readonly WaveConfig[]>>;
  readonly spawnsByWave: Readonly<Record<string, readonly SpawnConfig[]>>;
  readonly enemyGroupsById: Readonly<Record<string, readonly EnemyGroupEntryConfig[]>>;
  readonly enemiesById: Readonly<Record<string, EnemyConfig>>;
  readonly mapsById: Readonly<Record<string, MapConfig>>;
  readonly mapPointsById: Readonly<Record<string, MapPointConfig>>;
  readonly mapPointsByMap: Readonly<Record<string, readonly MapPointConfig[]>>;
  readonly formationsById: Readonly<Record<string, readonly FormationSlotConfig[]>>;
  readonly rewardsById: Readonly<Record<string, RewardConfig>>;
  readonly starRulesById: Readonly<Record<string, readonly StarRuleConfig[]>>;
  readonly dropGroupsById: Readonly<Record<string, readonly DropGroupEntryConfig[]>>;
  readonly modifiersById: Readonly<Record<string, LevelModifierConfig>>;
}

export function buildConfigIndex(config: GeneratedLevelConfig): ConfigIndex {
  const mapPointsById = indexBy(config.tables.mapPoint, "pointId");
  const mapPointsByMap = groupBy(config.tables.mapPoint, "mapId");

  return Object.freeze({
    levelsById: config.lookups.levelsById,
    templatesById: config.lookups.templatesById,
    objectivesByGroup: config.groups.objectivesByGroup,
    wavesByGroup: config.groups.wavesByGroup,
    spawnsByWave: config.groups.spawnsByWave,
    enemyGroupsById: config.groups.enemyEntriesByGroup,
    enemiesById: config.lookups.enemiesById,
    mapsById: config.lookups.mapsById,
    mapPointsById,
    mapPointsByMap,
    formationsById: config.groups.formationsById,
    rewardsById: config.lookups.rewardsById,
    starRulesById: config.groups.starRulesById,
    dropGroupsById: config.groups.dropEntriesByGroup,
    modifiersById: config.lookups.modifiersById,
  });
}

function indexBy<T extends object>(
  rows: readonly T[],
  field: keyof T
): Readonly<Record<string, T>> {
  const result: Record<string, T> = {};
  for (const row of rows) {
    const value = row[field] as unknown;
    if (typeof value === "string" && value.length > 0) {
      result[value] = row;
    }
  }
  return Object.freeze(result);
}

function groupBy<T extends object>(
  rows: readonly T[],
  field: keyof T
): Readonly<Record<string, readonly T[]>> {
  const result: Record<string, T[]> = {};
  for (const row of rows) {
    const value = row[field] as unknown;
    if (typeof value !== "string" || value.length === 0) {
      continue;
    }
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(row);
  }
  return Object.freeze(result);
}
