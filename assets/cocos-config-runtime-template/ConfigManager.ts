import type {
  EnemyConfig,
  EnemyGroupEntryConfig,
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
import { buildConfigIndex, type ConfigIndex } from "./ConfigIndex";

export class ConfigManager {
  public static fromGeneratedConfig(config: GeneratedLevelConfig): ConfigManager {
    return new ConfigManager(buildConfigIndex(config));
  }

  public constructor(private readonly index: ConfigIndex) {}

  public getLevel(levelId: string): LevelConfig {
    return requireEntry(this.index.levelsById[levelId], "Level", levelId);
  }

  public getTemplate(templateId: string): LevelTemplateConfig {
    return requireEntry(this.index.templatesById[templateId], "LevelTemplate", templateId);
  }

  public getObjectives(objectiveGroupId: string): readonly LevelObjectiveConfig[] {
    return requireGroup(this.index.objectivesByGroup[objectiveGroupId], "LevelObjective", objectiveGroupId);
  }

  public getWaves(waveGroupId: string): readonly WaveConfig[] {
    return requireGroup(this.index.wavesByGroup[waveGroupId], "Wave", waveGroupId);
  }

  public getSpawns(waveId: string): readonly SpawnConfig[] {
    return this.index.spawnsByWave[waveId] ?? [];
  }

  public getEnemy(enemyId: string): EnemyConfig {
    return requireEntry(this.index.enemiesById[enemyId], "Enemy", enemyId);
  }

  public getEnemyGroup(enemyGroupId: string): readonly EnemyGroupEntryConfig[] {
    return requireGroup(this.index.enemyGroupsById[enemyGroupId], "EnemyGroup", enemyGroupId);
  }

  public getMap(mapId: string): MapConfig {
    return requireEntry(this.index.mapsById[mapId], "Map", mapId);
  }

  public getMapPoint(pointId: string): MapPointConfig {
    return requireEntry(this.index.mapPointsById[pointId], "MapPoint", pointId);
  }

  public getMapPoints(mapId: string): readonly MapPointConfig[] {
    return this.index.mapPointsByMap[mapId] ?? [];
  }

  public getReward(rewardId: string): RewardConfig {
    return requireEntry(this.index.rewardsById[rewardId], "Reward", rewardId);
  }

  public getStarRules(starRuleId: string): readonly StarRuleConfig[] {
    return requireGroup(this.index.starRulesById[starRuleId], "StarRule", starRuleId);
  }

  public getModifier(modifierId: string): LevelModifierConfig {
    return requireEntry(this.index.modifiersById[modifierId], "LevelModifier", modifierId);
  }
}

function requireEntry<T>(value: T | undefined, table: string, id: string): T {
  if (value === undefined) {
    throw new Error(`[ConfigManager] Missing ${table} entry: ${id}`);
  }
  return value;
}

function requireGroup<T>(value: readonly T[] | undefined, table: string, id: string): readonly T[] {
  if (value === undefined) {
    throw new Error(`[ConfigManager] Missing ${table} group: ${id}`);
  }
  return value;
}
