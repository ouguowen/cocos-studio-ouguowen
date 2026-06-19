import { LevelRuntime } from "./LevelRuntime";
import type { LevelSystem, RewardCalculationOptions, RewardResult } from "./LevelTypes";

export class RewardSystem implements LevelSystem {
  public readonly id = "reward-system";

  public constructor(private readonly runtime: LevelRuntime) {}

  public start(): void {}

  public stop(): void {}

  public calculateResult(options: RewardCalculationOptions): RewardResult {
    const config = this.runtime.getConfigBundle();
    const reward = config.reward;
    const achievedStarRuleIds = new Set(options.achievedStarRuleIds ?? []);

    const starRewardIds = config.starRules
      .filter((starRule) => starRule.rewardId !== null)
      .filter((starRule) => {
        if (achievedStarRuleIds.size === 0) {
          return true;
        }
        return achievedStarRuleIds.has(starRule.starRuleId);
      })
      .map((starRule) => starRule.rewardId as string);

    return {
      rewardId: reward.rewardId,
      gold: reward.gold ?? 0,
      exp: reward.exp ?? 0,
      dropGroupId: reward.dropGroupId,
      firstClearRewardId: options.isFirstClear ? reward.firstClearRewardId : null,
      starRewardIds,
    };
  }
}
