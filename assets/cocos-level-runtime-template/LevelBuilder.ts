import { ConfigManager } from "../cocos-config-runtime-template/ConfigManager";
import { LevelRuntime } from "./LevelRuntime";
import type { LevelRuntimeConfigBundle } from "./LevelTypes";

export class LevelBuilder {
  public constructor(private readonly configManager: ConfigManager) {}

  public build(levelId: string): LevelRuntime {
    const configBundle = this.loadConfigBundle(levelId);
    return new LevelRuntime(configBundle);
  }

  private loadConfigBundle(levelId: string): LevelRuntimeConfigBundle {
    const level = this.configManager.getLevel(levelId);
    const template = this.configManager.getTemplate(level.templateId);
    const map = this.configManager.getMap(level.mapId);
    const objectives = this.configManager.getObjectives(level.objectiveGroupId);
    const waves = this.configManager
      .getWaves(level.waveGroupId)
      .slice()
      .sort((left, right) => left.orderIndex - right.orderIndex)
      .map((wave) => ({
        wave,
        spawns: this.configManager
          .getSpawns(wave.waveId)
          .slice()
          .sort((left, right) => left.spawnTime - right.spawnTime),
      }));
    const reward = this.configManager.getReward(level.rewardId);
    const starRules = level.starRuleId ? this.configManager.getStarRules(level.starRuleId) : [];
    const modifier = level.modifierId ? this.configManager.getModifier(level.modifierId) : null;

    return {
      level,
      template,
      map,
      objectives,
      waves,
      reward,
      starRules,
      modifier,
    };
  }
}
